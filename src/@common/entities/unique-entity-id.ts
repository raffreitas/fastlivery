import { randomUUID } from 'node:crypto';

export class UniqueEntityID {
  private readonly _id: string;

  constructor(id?: string) {
    this._id = id ?? randomUUID();
  }

  public get id() {
    return this._id;
  }

  toString() {
    return this._id.toString();
  }
}
