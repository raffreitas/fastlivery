import { InMemoryCustomerRepository } from '@test/repositories/in-memory-customer.repository';
import { CreateCustomerUseCase } from './create-customer.usecase';
import { CustomerAlreadyExistsError } from './errors/customer-already-exists.error';
import { makeCustomer } from '@test/factories';

let inMemoryCustomerRepository: InMemoryCustomerRepository;
let sut: CreateCustomerUseCase;

describe('CreateCustomerUseCase', () => {
  beforeEach(() => {
    inMemoryCustomerRepository = new InMemoryCustomerRepository();
    sut = new CreateCustomerUseCase(inMemoryCustomerRepository);
  });

  it('should create a customer', async () => {
    const customerInput = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      isEnterprise: false,
      street: 'Rua A',
      number: 123,
      neighborhood: 'Bairro A',
      city: 'Cidade A',
      state: 'Estado A',
      zipCode: '12345-123',
    };

    await sut.execute(customerInput);

    expect(inMemoryCustomerRepository.items.length).toBe(1);
    expect(inMemoryCustomerRepository.items[0].id.toString()).toEqual(expect.any(String));
  });

  it('should not create a customer if email already exists', async () => {
    const customer1 = makeCustomer({ email: 'johndoe@email.com' });
    inMemoryCustomerRepository.items.push(customer1);

    const customerInput = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      isEnterprise: false,
    };

    const result = await sut.execute(customerInput);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(CustomerAlreadyExistsError);
  });
});
