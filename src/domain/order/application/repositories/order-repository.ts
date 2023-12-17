import { Order } from '../../enterprise/entities/order.entity';

export interface OrderRepository {
  create(order: Order): Promise<void>;
}
