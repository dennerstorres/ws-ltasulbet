import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Game } from './Game';
import { Team } from './Team';

@Entity('guess')
export class Guess {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  gameId!: number;

  @Column()
  userId!: number;

  @Column()
  team1Id!: number;

  @Column()
  team2Id!: number;

  @Column()
  score1!: number;

  @Column()
  score2!: number;

  @Column()
  date!: Date;

  @Column()
  type!: string;

  @Column()
  points!: number;

  @Column()
  finished!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => Game)
  @JoinColumn({ name: 'gameId' })
  game!: Game;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'team1Id' })
  team1!: Team;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'team2Id' })
  team2!: Team;
} 