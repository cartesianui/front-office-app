import { ParentModel } from '@cartesianui/common';

export interface IRole {
  id?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  displayName?: string | undefined;
  level?: number | undefined;
  permissions?: any | undefined;
}

export class Role extends ParentModel implements IRole {
  id: string;
  name: string;
  description: string;
  displayName: string;
  level: number;
  permissions: any;

  constructor(data?: IRole) {
    super(data);
  }
}
