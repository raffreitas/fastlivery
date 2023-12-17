import { Entity, UniqueEntityID } from '@/@common/entities';
import { Optional } from '@/@common/types';
import { OrderItem } from './order-item';

export enum OrderStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
}

export interface OrderProps {
  items: OrderItem[];
  customerId: UniqueEntityID;
  status: OrderStatus;
  createdAt: Date;
}

export class Order extends Entity<OrderProps> {
  static create(props: Optional<OrderProps, 'createdAt'>, id?: UniqueEntityID) {
    const order = new Order(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return order;
  }

  get items() {
    return this.props.items;
  }

  total() {
    return this.items.reduce((acc, item) => acc + item.total(), 0);
  }
}
