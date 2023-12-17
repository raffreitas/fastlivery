import { ProductRepository } from '@/domain/product/application/repositories/product.repository';
import { Product } from '@/domain/product/enterprise/entities/product.entity';

export class InMemoryProductRepository implements ProductRepository {
  items: Product[] = [];

  async create(product: Product): Promise<void> {
    this.items.push(product);
  }
  async findByIds(ids: string[]): Promise<Product[] | null> {
    const products = this.items.filter((item) => ids.includes(item.id.toString()));

    return products;
  }
}
