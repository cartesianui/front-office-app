import { Action, createReducer, on } from '@ngrx/store';
import { AuthToken, AuthUser } from '../models';
import * as fromAccountActions from './account.action';

//TODO: Refactor state should be in seprate file
// Check and Remove dependency from user
export interface AccountState {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  user: AuthUser;
  authenticated: { status: boolean; token: AuthToken };
}

const INITIAL_STATE: AccountState = {
  loading: false,
  loaded: false,
  failed: false,
  user: new AuthUser(),
  authenticated: { status: false, token: new AuthToken() }
};

const createAccountReducers = createReducer(
  INITIAL_STATE,
  on(fromAccountActions.doAuthenticate, fromAccountActions.doFetchAuthenticatedUser, fromAccountActions.doRegister, fromAccountActions.doLogout, (state) => {
    return Object.assign({}, state, {
      loading: true,
      loaded: false,
      failed: false
    });
  }),
  on(fromAccountActions.doAuthenticateSuccess, (state, { authToken }) => {
    return Object.assign({}, state, {
      loaded: true,
      loading: false,
      failed: false,
      authenticated: { status: true, token: authToken }
    });
  }),
  on(fromAccountActions.doRegisterSuccess, (state, { user }) => {
    return Object.assign({}, state, {
      loaded: true,
      loading: false,
      failed: false,
      user
    });
  }),
  on(fromAccountActions.doFetchAuthenticatedUserSuccess, (state, { user }) => {
    return Object.assign({}, state, {
      loaded: true,
      loading: false,
      failed: false,
      user
    });
  }),
  on(fromAccountActions.doAddAuthenticatedUser, (state, { user }) => {
    return Object.assign({}, state, {
      loaded: true,
      loading: false,
      failed: false,
      user
    });
  }),
  on(fromAccountActions.doLogoutSuccess, (state) => {
    return Object.assign({}, state, INITIAL_STATE);
  }),
  on(fromAccountActions.doAuthenticateFail, fromAccountActions.doFetchAuthenticatedUserFail, fromAccountActions.doLogoutFail, fromAccountActions.doRegisterFail, (state) => {
    return Object.assign({}, INITIAL_STATE, { failed: true });
  }),
  on(fromAccountActions.doAddAuthToken, (state, { authToken }) => {
    return Object.assign({}, state, { token: authToken });
  })
);

export function reducer(state: AccountState | undefined, action: Action) {
  return createAccountReducers(state, action);
}
