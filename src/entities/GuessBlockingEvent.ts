import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export type GuessBlockingOutcome = 'success' | 'skipped' | 'failure';

@Entity('guess_blocking_event')
export class GuessBlockingEvent {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  triggeredAt!: Date;

  @Column({ type: 'int', nullable: true })
  weekNumber!: number | null;

  @Column({ length: 20 })
  outcome!: GuessBlockingOutcome;

  @Column({ type: 'varchar', length: 255, nullable: true })
  message!: string | null;

  @Column({ type: 'int', default: 0 })
  gamesUpdated!: number;

  @Column({ type: 'int', default: 0 })
  guessesFinished!: number;

  @Column({ length: 120 })
  cronExpression!: string;

  @Column({ length: 64 })
  timezone!: string;

  @Column({ type: 'datetime' })
  referenceDate!: Date;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt!: Date;
}
