import { CustomerRepository } from '@/domain/customer/application/repositories/customer.repository';
import { Customer } from '@/domain/customer/enterprise/entities/customer.entity';

export class InMemoryCustomerRepository implements CustomerRepository {
  items: Customer[] = [];

  async create(customer: Customer): Promise<void> {
    this.items.push(customer);
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = this.items.find((item) => item.id.toString() === id);

    return customer || null;
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = this.items.find((item) => item.email === email);

    return customer || null;
  }
}
