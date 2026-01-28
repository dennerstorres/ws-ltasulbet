import cron from 'node-cron';
import { GameModel } from '../models/Game';
import { GuessModel } from '../models/Guess';
import { Guess } from '../entities/Guess';

export class GuessBlockingService {
  static start(): void {
    const cronExpression = process.env.GUESS_BLOCK_CRON || '0 12 * * 6';
    const timezone = process.env.TZ || 'America/Sao_Paulo';

    cron.schedule(
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
    const nextGame = await GameModel.findFirstUpcomingGame(referenceDate);
    if (!nextGame) {
      console.log('[GuessBlockingService] No upcoming games found, skipping.');
      return;
    }

    const weekNumber = nextGame.weekNumber;
    const gamesOfWeek = await GameModel.findByWeekNumber(weekNumber);
    if (!gamesOfWeek.length) {
      console.log(`[GuessBlockingService] No games found for week ${weekNumber}, skipping.`);
      return;
    }

    const gameIds = gamesOfWeek.map(game => game.id);
    const guesses = await GuessModel.findByGameIds(gameIds);

    const guessIdsToFinish = this.collectGuessesToFinish(guesses, gameIds);

    if (guessIdsToFinish.length) {
      await GuessModel.finishMany(guessIdsToFinish);
    }

    const updatedCount = await GameModel.disallowGuessesByWeek(weekNumber);

    console.log(
      `[GuessBlockingService] Blocked guesses for week ${weekNumber}. Games updated: ${updatedCount}. Guesses finished: ${guessIdsToFinish.length}.`
    );
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
}
