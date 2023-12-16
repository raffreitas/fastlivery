import { Product } from '../../enterprise/entities/product.entity';
import { ProductRepository } from '../repositories/product.repository';

export interface CreateProductUseCaseInput {
  name: string;
  price: number;
  quantity: number;
}

export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({ name, price, quantity }: CreateProductUseCaseInput) {
    const product = Product.create({ name, price, quantity });
    await this.productRepository.create(product);
    return product;
  }
}
