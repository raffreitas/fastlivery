import { FastifyInstance } from 'fastify';
import { CreateCustomerController } from './controllers';
import { TypeormCustomerRepository } from '@/infrastructure/db/typeorm/repositories';

const typeormCustomerRepository = new TypeormCustomerRepository();

const createCustomerController = new CreateCustomerController(typeormCustomerRepository);

export async function customerRoutes(app: FastifyInstance) {
  app.post('/sign-up', createCustomerController.handle);
}
