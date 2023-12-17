import { DomainError } from '@/@common/errors';

export class CustomerAlreadyExistsError extends DomainError {
  constructor(identifier: string) {
    super(`Customer with identifier "${identifier}" already exists`);
  }
}
