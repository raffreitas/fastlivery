import { DomainError } from '@/@common/errors';

export class InsufficientProductQuantityError extends DomainError {
  constructor() {
    super('Insufficient product quantity');
  }
}
