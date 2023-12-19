import { CustomerRepository } from '@/domain/customer/application/repositories/customer.repository';
import { Customer } from '@/domain/customer/enterprise/entities/customer.entity';
import { typeorm } from '..';
import { TypeormCustomerEntity } from '../entities/customer/customer.entity';
import { CustomerMapper } from '../../mappers/customer.mapper';

export class TypeormCustomerRepository implements CustomerRepository {
  private repository = typeorm.getRepository(TypeormCustomerEntity);

  async create(customer: Customer) {
    const customerPersistence = CustomerMapper.toPersistence(customer);
    await this.repository.save(customerPersistence);
  }

  async findById(id: string) {
    const customer = await this.repository.findOneBy({ id });

    if (!customer) {
      return null;
    }

    return CustomerMapper.toDomain(customer);
  }

  async findByEmail(email: string) {
    const customer = await this.repository.findOneBy({ email });
    if (!customer) {
      return null;
    }

    return CustomerMapper.toDomain(customer);
  }
}
