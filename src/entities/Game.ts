import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Team } from './Team';

@Entity('game')
export class Game {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'team1Id' })
  team1Id!: number;

  @Column({ name: 'team2Id' })
  team2Id!: number;

  @Column({ type: 'date' })
  date!: Date;

  @Column({ type: 'time' })
  time!: string;

  @Column({ type: 'char', length: 3 })
  type!: string;

  @Column({ name: 'weekNumber', type: 'tinyint' })
  weekNumber!: number;

  @Column({ name: 'guessAllowed', type: 'tinyint' })
  guessAllowed!: number;

  @Column({ name: 'guessFinished', type: 'tinyint' })
  guessFinished!: number;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt!: Date;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'team1Id' })
  team1!: Team;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'team2Id' })
  team2!: Team;
} 