import { Action, createReducer, on } from '@ngrx/store';
import { UserDetailState } from './user.state';
import * as userActions from './user.action';

const INITIAL_STATE: UserDetailState = {
  loading: false,
  loaded: false,
  failed: false,
  data: null
};

const createUserDetailReducers = createReducer(
  INITIAL_STATE,
  on(userActions.doFetchAuthenticatedUser, userActions.doUpdateUser, (state) => {
    return Object.assign({}, state, {
      loading: true,
      loaded: false,
      failed: false
    });
  }),
  on(userActions.doFetchAuthenticatedUserSuccess, userActions.doUpdateUserSuccess, (state, { user }) => {
    return Object.assign({}, state, {
      loaded: true,
      loading: false,
      failed: false,
      data: user
    });
  }),
  on(userActions.doFetchAuthenticatedUserFail, userActions.doUpdateUserFail, (state) => {
    return Object.assign({}, INITIAL_STATE, { failed: true });
  })
);

export function reducer(state: UserDetailState | undefined, action: Action) {
  return createUserDetailReducers(state, action);
}
