import { OrderRepository } from '@/domain/order/application/repositories/order-repository';
import { Order } from '@/domain/order/enterprise/entities/order.entity';

export class InMemoryOrderRepository implements OrderRepository {
  items: Order[] = [];
  async create(order: Order): Promise<void> {
    this.items.push(order);
  }
}
