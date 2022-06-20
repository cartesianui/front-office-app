import { ParentModel } from '@cartesianui/common';

export interface IAuthToken {
  tokenType: string | undefined;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  expiresIn: number | undefined;
}

export class AuthToken extends ParentModel implements IAuthToken {
  tokenType: string | undefined;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  expiresIn: number | undefined;

  constructor(data?: IAuthToken) {
    super(data);
  }
}
