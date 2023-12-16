import { Entity, UniqueEntityID } from '@/@common/entities';
import { Address } from './value-objects';
import { Optional } from '@/@common/types';

export interface CustomerProps {
  name: string;
  email: string;
  password: string;
  address?: Address;
  isEnterprise: boolean;
  enterpriseName?: string;
  document?: string;
  createdAt: Date;
}

export class Customer extends Entity<CustomerProps> {
  static create(props: Optional<CustomerProps, 'createdAt'>, id?: UniqueEntityID) {
    const customer = new Customer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return customer;
  }
}