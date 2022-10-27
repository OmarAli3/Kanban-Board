export abstract class BaseModel {
  private _id: number;

  constructor(args: any) {
    this._id = args?.id;
  }

  get id() {
    return this._id;
  }
  set id(newId: number) {
    throw new Error("Cannot set id");
  }

  abstract toJSON(): object;
}
