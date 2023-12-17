import { makeCustomer, makeProduct } from '@test/factories';
import { InMemoryCustomerRepository, InMemoryOrderRepository, InMemoryProductRepository } from '@test/repositories';

import { CreateOrderUseCase } from './create-order';

import { ResourceNotFoundError } from '@/@common/errors';
import { InsufficientProductQuantityError } from './errors/insufficient-product-quantity.error';

let inMemoryCustomerRepository: InMemoryCustomerRepository;
let inMemoryOrderRepository: InMemoryOrderRepository;
let inMemoryProductRepository: InMemoryProductRepository;

let sut: CreateOrderUseCase;

describe('Create Order UseCase', () => {
  beforeEach(() => {
    inMemoryCustomerRepository = new InMemoryCustomerRepository();
    inMemoryOrderRepository = new InMemoryOrderRepository();
    inMemoryProductRepository = new InMemoryProductRepository();

    sut = new CreateOrderUseCase(inMemoryProductRepository, inMemoryCustomerRepository, inMemoryOrderRepository);
  });

  it('should create an order', async () => {
    const customer = makeCustomer({ isEnterprise: false });
    const product = makeProduct({ quantity: 10 });

    await inMemoryCustomerRepository.create(customer);
    await inMemoryProductRepository.create(product);

    const result = await sut.execute({
      customerId: customer.id.toString(),
      items: [
        {
          productId: product.id.toString(),
          quantity: 5,
        },
      ],
    });

    expect(result.isRight()).toBeTruthy();
    expect(inMemoryOrderRepository.items[0].items[0].productId).toEqual(product.id.toString());
  });

  it('should not create an order if customer does not exist', async () => {
    const product = makeProduct({ quantity: 10 });

    await inMemoryProductRepository.create(product);

    const result = await sut.execute({
      customerId: 'invalid-customer-id',
      items: [
        {
          productId: product.id.toString(),
          quantity: 5,
        },
      ],
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not create an order if product does not exist', async () => {
    const customer = makeCustomer({ isEnterprise: false });

    await inMemoryCustomerRepository.create(customer);

    const result = await sut.execute({
      customerId: customer.id.toString(),
      items: [
        {
          productId: 'invalid-product-id',
          quantity: 5,
        },
      ],
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not create an order if product quantity is insufficient', async () => {
    const customer = makeCustomer({ isEnterprise: false });
    const product = makeProduct({ quantity: 10 });

    await inMemoryCustomerRepository.create(customer);
    await inMemoryProductRepository.create(product);

    const result = await sut.execute({
      customerId: customer.id.toString(),
      items: [
        {
          productId: product.id.toString(),
          quantity: 15,
        },
      ],
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(InsufficientProductQuantityError);
  });
});
