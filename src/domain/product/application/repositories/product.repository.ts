import { Product } from '../../enterprise/entities/product.entity';

export interface ProductRepository {
  create(product: Product): Promise<void>;
}
