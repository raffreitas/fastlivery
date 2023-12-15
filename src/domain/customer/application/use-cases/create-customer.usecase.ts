import { Customer } from '../../enterprise/entities/customer.entity';
import { Address } from '../../enterprise/entities/value-objects';
import { CustomerRepository } from '../repositories/customer.repository';

export interface CreateCustomerInput {
  name: string;
  email: string;
  password: string;
  isEnterprise: boolean;
  enterpriseName?: string;
  document?: string;
  street: string;
  number: number;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export class CreateCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(input: CreateCustomerInput) {
    const { name, email, password, isEnterprise, enterpriseName, document, street, number, complement, neighborhood, city, state, zipCode } = input;

    const address = Address.create({
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      zipCode,
    });

    const customer = Customer.create({
      name,
      email,
      password,
      isEnterprise,
      enterpriseName,
      document,
      address,
    });

    await this.customerRepository.create(customer);
  }
}
