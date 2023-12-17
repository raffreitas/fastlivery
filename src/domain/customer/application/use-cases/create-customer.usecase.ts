import { Either, left, right } from '@/@common/either';
import { Customer } from '../../enterprise/entities/customer.entity';
import { Address } from '../../enterprise/entities/value-objects';
import { CustomerRepository } from '../repositories/customer.repository';
import { CustomerAlreadyExistsError } from './errors/customer-already-exists.error';
import { FieldIsRequiredError } from '@/@common/errors/errors/field-is-required.error';

export interface CreateCustomerInput {
  name: string;
  email: string;
  password: string;
  isEnterprise: boolean;
  enterpriseName?: string;
  document?: string;
  street?: string;
  number?: number;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

type CreateCustomerOutput = Either<CustomerAlreadyExistsError, { customer: Customer }>;

export class CreateCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(input: CreateCustomerInput): Promise<CreateCustomerOutput> {
    const { name, email, password, isEnterprise, enterpriseName, document, street, number, complement, neighborhood, city, state, zipCode } = input;

    const customerAlreadyExists = await this.customerRepository.findByEmail(email);

    if (customerAlreadyExists) {
      return left(new CustomerAlreadyExistsError(email));
    }

    if (isEnterprise && !enterpriseName) {
      return left(new FieldIsRequiredError('enterpriseName'));
    }

    let address: Address | undefined;

    if (street && number && neighborhood && city && state && zipCode) {
      address = Address.create({
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        zipCode,
      });
    }

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

    return right({ customer });
  }
}
