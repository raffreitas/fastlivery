import { Customer } from '@/domain/customer/enterprise/entities/customer.entity';
import { TypeormCustomerEntity } from '../typeorm/entities/customer';
import { UniqueEntityID } from '@/@common/entities';
import { Address } from '@/domain/customer/enterprise/entities/value-objects';

export class CustomerMapper {
  static toDomain(customer: TypeormCustomerEntity) {
    let address;

    if (customer?.street && customer?.number && customer?.neighborhood && customer?.city && customer?.state && customer?.zipCode) {
      address = Address.create({
        street: customer.street,
        number: customer.number,
        complement: customer.complement,
        neighborhood: customer.neighborhood,
        city: customer.city,
        state: customer.state,
        zipCode: customer.zipCode,
      });
    }

    return Customer.create(
      {
        name: customer.name,
        email: customer.email,
        password: customer.password,
        isEnterprise: customer.isEnterprise,
        enterpriseName: customer.enterpriseName,
        document: customer.document,
        createdAt: customer.createdAt,
        address,
      },
      new UniqueEntityID(customer.id),
    );
  }
  static toPersistence(customer: Customer) {
    return {
      id: customer.id.toString(),
      name: customer.name,
      email: customer.email,
      password: customer.password,
      isEnterprise: customer.isEnterprise,
      enterpriseName: customer.enterpriseName,
      document: customer.document,
      street: customer.address?.street,
      number: customer.address?.number,
      complement: customer.address?.complement,
      neighborhood: customer.address?.neighborhood,
      city: customer.address?.city,
      state: customer.address?.state,
      zipCode: customer.address?.zipCode,
    };
  }
}
