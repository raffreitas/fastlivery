import { DomainError } from '@/@common/errors';

export interface AddressProps {
  street: string;
  number: number;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export class Address {
  private constructor(private readonly input: AddressProps) {
    this.validate();
  }

  static create(props: AddressProps) {
    const address = new Address(props);

    return address;
  }

  private validate() {
    Object.values(this.input).forEach((value) => {
      if (typeof value === 'string' && !value.trim()) {
        throw new DomainError('Invalid address');
      }
      if (typeof value === 'number' && value < 0) {
        throw new DomainError('Invalid address');
      }
    });
  }

  get street() {
    return this.input.street;
  }

  get number() {
    return this.input.number;
  }

  get complement() {
    return this.input.complement;
  }

  get neighborhood() {
    return this.input.neighborhood;
  }

  get city() {
    return this.input.city;
  }

  get state() {
    return this.input.state;
  }

  get zipCode() {
    return this.input.zipCode;
  }
}
