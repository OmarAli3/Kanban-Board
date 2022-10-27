import { BaseModel } from "./BaseModel";

export class UserModel extends BaseModel {
  private _name: string;
  private _nickname: string;
  private _email: string;

  constructor(args: any) {
    super(args);
    this._name = args?.name;
    this._nickname = args?.nickname;
    this._email = args?.email;
  }

  get name() {
    return this._name;
  }
  set name(newName: string) {
    this._name = newName;
  }

  get nickname() {
    return this._nickname;
  }
  set nickname(newNickname: string) {
    this._nickname = newNickname;
  }

  get email() {
    return this._email;
  }
  set email(newEmail: string) {
    this._email = newEmail;
  }
  
  // @override
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      nickname: this.nickname,
      email: this.email,
    };
  }
}
