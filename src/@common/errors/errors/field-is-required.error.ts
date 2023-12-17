import { DomainError } from '../domain.error';

export class FieldIsRequiredError extends DomainError {
  constructor(field: string) {
    super(`Field "${field}" is required`);
  }
}
