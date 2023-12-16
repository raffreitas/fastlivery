import { Entity, UniqueEntityID } from '@/@common/entities';
import { Optional } from '@/@common/types';

export interface ProductProps {
  name: string;
  price: number;
  quantity: number;
  createdAt: Date;
}

export class Product extends Entity<ProductProps> {
  static create(props: Optional<ProductProps, 'createdAt'>, id?: UniqueEntityID) {
    const product = new Product(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return product;
  }
}
