import { Entity, UniqueEntityID } from '@/@common/entities';

export interface OrderItemProps {
  productId: string;
  price: number;
  quantity: number;
}

export class OrderItem extends Entity<OrderItemProps> {
  static create(props: OrderItemProps, id?: UniqueEntityID) {
    const orderItem = new OrderItem(props, id);
    return orderItem;
  }

  get productId() {
    return this.props.productId;
  }

  get quantity() {
    return this.props.quantity;
  }

  total() {
    return this.props.price * this.props.quantity;
  }
}
