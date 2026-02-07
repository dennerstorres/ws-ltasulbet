import cron, { ScheduledTask } from 'node-cron';
import { parseExpression } from 'cron-parser';
import { GameModel } from '../models/Game';
import { GuessModel } from '../models/Guess';
import { Guess } from '../entities/Guess';
import { GuessBlockingEventModel } from '../models/GuessBlockingEvent';
import { GuessBlockingOutcome } from '../entities/GuessBlockingEvent';

export class GuessBlockingService {
  private static task: ScheduledTask | null = null;

  static start(): void {
    const { cronExpression, timezone } = this.getConfig();

    this.task = cron.schedule(
      cronExpression,
      () => {
        this.blockCurrentWeek().catch(error => {
          console.error('[GuessBlockingService] Failed to block guesses:', error);
        });
      },
      { timezone }
    );

    console.log(`[GuessBlockingService] Scheduled with cron ${cronExpression} (TZ=${timezone})`);
  }

  static async blockCurrentWeek(referenceDate = new Date()): Promise<void> {
    const { cronExpression, timezone } = this.getConfig();

    try {
      const nextGame = await GameModel.findFirstUpcomingGame(referenceDate);
      if (!nextGame) {
        console.log('[GuessBlockingService] No upcoming games found, skipping.');
        await this.recordEvent({
          weekNumber: null,
          outcome: 'skipped',
          message: 'No upcoming games found',
          gamesUpdated: 0,
          guessesFinished: 0,
          cronExpression,
          timezone,
          referenceDate
        });
        return;
      }

      const weekNumber = nextGame.weekNumber;
      const gamesOfWeek = await GameModel.findByWeekNumber(weekNumber);
      if (!gamesOfWeek.length) {
        console.log(`[GuessBlockingService] No games found for week ${weekNumber}, skipping.`);
        await this.recordEvent({
          weekNumber,
          outcome: 'skipped',
          message: `No games found for week ${weekNumber}`,
          gamesUpdated: 0,
          guessesFinished: 0,
          cronExpression,
          timezone,
          referenceDate
        });
        return;
      }

      const gameIds = gamesOfWeek.map(game => game.id);
      const guesses = await GuessModel.findByGameIds(gameIds);

      const guessIdsToFinish = this.collectGuessesToFinish(guesses, gameIds);

      if (guessIdsToFinish.length) {
        await GuessModel.finishMany(guessIdsToFinish);
      }

      const updatedCount = await GameModel.disallowGuessesByWeek(weekNumber);

      await this.recordEvent({
        weekNumber,
        outcome: 'success',
        message: `Blocked guesses for week ${weekNumber}`,
        gamesUpdated: updatedCount,
        guessesFinished: guessIdsToFinish.length,
        cronExpression,
        timezone,
        referenceDate
      });

      console.log(
        `[GuessBlockingService] Blocked guesses for week ${weekNumber}. Games updated: ${updatedCount}. Guesses finished: ${guessIdsToFinish.length}.`
      );
    } catch (error) {
      await this.recordEvent({
        weekNumber: null,
        outcome: 'failure',
        message: error instanceof Error ? error.message : 'Unknown error',
        gamesUpdated: 0,
        guessesFinished: 0,
        cronExpression,
        timezone,
        referenceDate
      });

      throw error;
    }
  }

  private static collectGuessesToFinish(guesses: Guess[], gameIds: number[]): number[] {
    const guessIdsToFinish = new Set<number>();
    if (!guesses.length || !gameIds.length) {
      return [];
    }

    const guessesByUser = new Map<number, Guess[]>();
    for (const guess of guesses) {
      const userGuesses = guessesByUser.get(guess.userId) || [];
      userGuesses.push(guess);
      guessesByUser.set(guess.userId, userGuesses);
    }

    for (const [, userGuesses] of guessesByUser) {
      const hasAllGames = gameIds.every(gameId => userGuesses.some(guess => guess.gameId === gameId));
      if (hasAllGames) {
        userGuesses.forEach(guess => guessIdsToFinish.add(guess.id));
      }
    }

    return Array.from(guessIdsToFinish);
  }

  static async getStatus() {
    const { cronExpression, timezone } = this.getConfig();
    let nextRunAt: string | null = null;
    let nextRunError: string | null = null;

    try {
      const interval = parseExpression(cronExpression, { tz: timezone });
      nextRunAt = interval.next().toDate().toISOString();
    } catch (error) {
      nextRunError = error instanceof Error ? error.message : 'Failed to compute next run';
    }

    const lastEvent = await GuessBlockingEventModel.findLatest();

    return {
      scheduled: Boolean(this.task),
      cronExpression,
      timezone,
      nextRunAt,
      nextRunError,
      lastEvent
    };
  }

  static async getHistory(limit = 50) {
    return GuessBlockingEventModel.findRecent(limit);
  }

  private static getConfig() {
    return {
      cronExpression: process.env.GUESS_BLOCK_CRON || '0 12 * * 6',
      timezone: process.env.TZ || 'America/Cuiaba'
    };
  }

  private static async recordEvent(eventData: {
    weekNumber: number | null;
    outcome: GuessBlockingOutcome;
    message: string | null;
    gamesUpdated: number;
    guessesFinished: number;
    cronExpression: string;
    timezone: string;
    referenceDate: Date;
  }) {
    try {
      await GuessBlockingEventModel.logEvent(eventData);
    } catch (loggingError) {
      console.error('[GuessBlockingService] Failed to log event', loggingError);
    }
  }
}
