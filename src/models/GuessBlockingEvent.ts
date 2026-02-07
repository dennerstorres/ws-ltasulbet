import { AppDataSource } from '../config/ormconfig';
import { GuessBlockingEvent, GuessBlockingOutcome } from '../entities/GuessBlockingEvent';

export class GuessBlockingEventModel {
  private static repository = AppDataSource.getRepository(GuessBlockingEvent);

  static async logEvent(eventData: {
    weekNumber: number | null;
    outcome: GuessBlockingOutcome;
    message?: string | null;
    gamesUpdated?: number;
    guessesFinished?: number;
    cronExpression: string;
    timezone: string;
    referenceDate: Date;
    triggeredAt?: Date;
  }): Promise<GuessBlockingEvent> {
    const event = this.repository.create({
      weekNumber: eventData.weekNumber,
      outcome: eventData.outcome,
      message: eventData.message ?? null,
      gamesUpdated: eventData.gamesUpdated ?? 0,
      guessesFinished: eventData.guessesFinished ?? 0,
      cronExpression: eventData.cronExpression,
      timezone: eventData.timezone,
      referenceDate: eventData.referenceDate,
      triggeredAt: eventData.triggeredAt || new Date()
    });

    return this.repository.save(event);
  }

  static async findRecent(limit = 50): Promise<GuessBlockingEvent[]> {
    return this.repository.find({
      order: { triggeredAt: 'DESC' },
      take: limit
    });
  }

  static async findLatest(): Promise<GuessBlockingEvent | null> {
    const [latest] = await this.repository.find({
      order: { triggeredAt: 'DESC' },
      take: 1
    });
    return latest || null;
  }
}
