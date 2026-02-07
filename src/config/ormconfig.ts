import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../entities/User';
import { Team } from '../entities/Team';
import { Game } from '../entities/Game';
import { Guess } from '../entities/Guess';
import { Result } from '../entities/Result';
import { PushSubscription } from '../entities/PushSubscription';
import { GuessBlockingEvent } from '../entities/GuessBlockingEvent';
import path from 'path';

dotenv.config();
const isTsRuntime = __filename.endsWith('.ts');

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: ['query', 'error', 'schema', 'warn', 'info', 'log', 'migration'],
  entities: isTsRuntime
    ? [User, Team, Game, Guess, Result, PushSubscription, GuessBlockingEvent]
    : [path.join(__dirname, '../entities/*.js')],
  migrations: isTsRuntime
    ? [path.join(__dirname, '../migrations/*.ts')]
    : [path.join(__dirname, '../migrations/*.js')],
  subscribers: [],
  maxQueryExecutionTime: 1000,
  extra: {
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
    multipleStatements: true,
    insertIgnore: true
  }
}); 