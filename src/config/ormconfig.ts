import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../entities/User';
import { Team } from '../entities/Team';
import { Game } from '../entities/Game';
import { Guess } from '../entities/Guess';
import { Result } from '../entities/Result';
import { PushSubscription } from '../entities/PushSubscription';
import path from 'path';

dotenv.config();

const isProd = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: ['query', 'error', 'schema', 'warn', 'info', 'log', 'migration'],
  entities: isProd ? ['dist/entities/*.js'] : [User, Team, Game, Guess, Result, PushSubscription],
  migrations: isProd ? ['dist/migrations/*.js'] : ['src/migrations/*.ts'],
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