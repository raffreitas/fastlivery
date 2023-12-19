import fastify from 'fastify';
import { appRoutes } from './modules';

export const app = fastify();

app.register(appRoutes, { prefix: '/api' });
