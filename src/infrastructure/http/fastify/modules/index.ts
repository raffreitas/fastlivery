import { FastifyInstance } from 'fastify';
import { customerRoutes } from './customer';

export async function appRoutes(app: FastifyInstance) {
  app.register(customerRoutes, { prefix: '/customer' });
}
