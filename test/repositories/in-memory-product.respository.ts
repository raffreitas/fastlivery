import { ProductRepository } from '@/domain/product/application/repositories/product.repository';
import { Product } from '@/domain/product/enterprise/entities/product.entity';

export class InMemoryProductRepository implements ProductRepository {
  items: Product[] = [];

  async create(product: Product): Promise<void> {
    this.items.push(product);
  }
}
