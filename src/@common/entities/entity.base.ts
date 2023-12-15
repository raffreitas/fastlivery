import { UniqueEntityID } from './unique-entity-id';

export abstract class Entity<Props> {
  protected readonly _id: UniqueEntityID;

  public readonly props: Props;

  constructor(props: Props, id?: UniqueEntityID) {
    this._id = id ?? new UniqueEntityID();
    this.props = props;
  }

  public get id() {
    return this._id;
  }

  public equals(entity: Entity<unknown>) {
    if (entity === this) {
      return true;
    }

    if (entity._id === this._id) {
      return true;
    }

    return false;
  }
}
