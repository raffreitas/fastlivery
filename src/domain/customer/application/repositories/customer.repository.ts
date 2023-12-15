import { Customer } from '../../enterprise/entities/customer.entity';

export interface CustomerRepository {
  create(customer: Customer): Promise<void>;
}
