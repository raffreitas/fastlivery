import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '@/@common/entities';
import { Customer, CustomerProps } from '@/domain/customer/enterprise/entities/customer.entity';

export function makeCustomer(override: Partial<CustomerProps>, id?: UniqueEntityID) {
  const customer = Customer.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      isEnterprise: false,
      password: faker.internet.password(),
      ...override,
    },
    id,
  );

  return customer;
}
