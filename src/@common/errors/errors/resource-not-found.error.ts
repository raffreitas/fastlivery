import { DomainError } from '../domain.error';

export class ResourceNotFoundError extends DomainError {
  constructor(resource: string) {
    super(`${resource} not found`);
  }
}
