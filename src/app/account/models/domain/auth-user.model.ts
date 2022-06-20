import { ParentModel } from '@cartesianui/common';

export interface IAuthUser {
  id: string | undefined;
  name: string | undefined;
  nickname: string | undefined;
  birth: string | undefined;
  confirmed: boolean | undefined;
  email: string | undefined;
  gender: string | undefined;
  logged: boolean | undefined;
}

export class AuthUser extends ParentModel implements IAuthUser {
  public id: string;
  public name: string;
  public nickname: string;
  public birth: string;
  public confirmed: boolean;
  public email: string;
  public gender: string;
  public logged: boolean;

  constructor(data?: IAuthUser) {
    super(data);
  }
}
