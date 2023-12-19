import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { CustomerRepository } from '@/domain/customer/application/repositories/customer.repository';
import { CreateCustomerUseCase } from '@/domain/customer/application/use-cases/create-customer.usecase';

const createCustomerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  isEnterprise: z.boolean(),
  enterpriseName: z.optional(z.string()),
  document: z.optional(z.string()),
});

export class CreateCustomerController {
  private readonly useCase: CreateCustomerUseCase;
  constructor(private readonly customerRepository: CustomerRepository) {
    this.useCase = new CreateCustomerUseCase(this.customerRepository);
  }

  handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const { name, email, password, isEnterprise, document, enterpriseName } = createCustomerSchema.parse(request.body);

    await this.useCase.execute({
      name,
      email,
      password,
      isEnterprise,
      document,
      enterpriseName,
    });

    return reply.status(201).send();
  };
}
