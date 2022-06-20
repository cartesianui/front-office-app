import { Role, User } from '../models';

export interface RoleState {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: Role | null;
}

export interface RolesState {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: {
    data: Array<Role>;
    meta: object;
  };
}

export interface UserListingState {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: {
    data: Array<User>;
    meta: object;
  };
}

export interface UserDetailState {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  data: User | null;
}

export interface UserState {
  detail: UserDetailState;
  roleListing: RolesState;
  roleDetail: RoleState;
}
