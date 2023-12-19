import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const typeorm = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: ['src/infrastructure/db/typeorm/entities/*{.ts,.js}'],
  synchronize: true,
  logging: true,
});
