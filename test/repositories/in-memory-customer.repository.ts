import { CustomerRepository } from '@/domain/customer/application/repositories/customer.repository';
import { Customer } from '@/domain/customer/enterprise/entities/customer.entity';

export class InMemoryCustomerRepository implements CustomerRepository {
  items: Customer[] = [];

  async create(customer: Customer): Promise<void> {
    this.items.push(customer);
  }
}
