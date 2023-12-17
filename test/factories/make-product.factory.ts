import { UniqueEntityID } from '@/@common/entities';
import { Product, ProductProps } from '@/domain/product/enterprise/entities/product.entity';
import { faker } from '@faker-js/faker';

export function makeProduct(override: Partial<ProductProps>, id?: UniqueEntityID) {
  const product = Product.create(
    {
      name: faker.commerce.productName(),
      price: +faker.commerce.price(),
      quantity: faker.number.int(),
      ...override,
    },
    id,
  );

  return product;
}
