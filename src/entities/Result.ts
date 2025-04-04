import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Game } from './Game';

@Entity('result')
export class Result {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  gameId!: number;

  @Column()
  score1!: number;

  @Column()
  score2!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => Game)
  @JoinColumn({ name: 'gameId' })
  game!: Game;
} 