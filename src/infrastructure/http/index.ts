import { typeorm } from '../db/typeorm';
import { app } from './fastify';

async function start() {
  await typeorm.initialize();
  await app.listen({
    port: 3000,
  });
}

start();
