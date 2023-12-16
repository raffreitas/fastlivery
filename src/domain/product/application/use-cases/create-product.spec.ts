import { InMemoryProductRepository } from '@test/repositories/in-memory-product.respository';
import { CreateProductUseCase } from './create-product';

let inMemoryProductRepository: InMemoryProductRepository;
let sut: CreateProductUseCase;

describe('CreateProduct UseCase', () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository();
    sut = new CreateProductUseCase(inMemoryProductRepository);
  });
  it('should create a product', () => {
    const product = {
      name: 'Product 1',
      price: 10,
      quantity: 10,
    };

    sut.execute(product);

    expect(inMemoryProductRepository.items).toHaveLength(1);
    expect(inMemoryProductRepository.items[0].id.toString()).toEqual(expect.any(String));
  });
});
