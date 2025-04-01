import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../entities/User';
import { Team } from '../entities/Team';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: ['query', 'error', 'schema', 'warn', 'info', 'log', 'migration'],
  entities: [User, Team],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
  maxQueryExecutionTime: 1000,
  extra: {
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
  }
}); 