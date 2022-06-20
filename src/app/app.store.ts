import { AccountState } from '@app/account/store';
import { UserState } from '@app/profile/store';

export interface State {
  account: AccountState;
  user: UserState;
}
