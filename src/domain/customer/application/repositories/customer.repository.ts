import { Customer } from '../../enterprise/entities/customer.entity';

export interface CustomerRepository {
  create(customer: Customer): Promise<void>;
  findById(id: string): Promise<Customer | null>;
}
