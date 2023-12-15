import { Address } from './address';

describe('Customer Address Value Object', () => {
  it('should be able to create a Address', () => {
    const address = Address.create({
      city: 'São Paulo',
      neighborhood: 'Jardim Paulista',
      number: 100,
      state: 'SP',
      street: 'Av. Paulista',
      zipCode: '01310-100',
    });

    expect(address.number).toBe(100);
  });

  it('should not be able to create a Address with invalid values (empty strings)', () => {
    expect(() =>
      Address.create({
        city: 'São Paulo',
        neighborhood: 'Jardim Paulista',
        number: 100,
        state: 'SP',
        street: '',
        zipCode: '01310-100',
      }),
    ).toThrowError('Invalid address');
  });

  it('should not be able to create a Address with invalid values (negative number)', () => {
    expect(() =>
      Address.create({
        city: 'São Paulo',
        neighborhood: 'Jardim Paulista',
        number: -100,
        state: 'SP',
        street: 'Av. Paulista',
        zipCode: '01310-100',
      }),
    ).toThrowError('Invalid address');
  });
});
