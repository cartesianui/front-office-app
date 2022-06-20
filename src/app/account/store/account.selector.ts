/* eslint-disable max-len */
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { AccountState } from './account.reducer';
import { AuthToken, AuthUser } from '../models';
import { State } from '@app/app.store';

export const getAccountState = createFeatureSelector<State, AccountState>('account');
export const getAuthLoaded: MemoizedSelector<object, boolean> = createSelector(getAccountState, (state: AccountState) => state.loaded);
export const getAuthLoading: MemoizedSelector<object, boolean> = createSelector(getAccountState, (state: AccountState) => state.loading);
export const getAuthFailed: MemoizedSelector<object, boolean> = createSelector(getAccountState, (state: AccountState) => state.failed);
export const getAuthToken: MemoizedSelector<object, AuthToken> = createSelector(getAccountState, (state: AccountState) => state.authenticated.token);
export const getAuthenticatedUser: MemoizedSelector<object, AuthUser> = createSelector(getAccountState, (state: AccountState) => state.user);
export const getAuthenticated: MemoizedSelector<object, object> = createSelector(getAccountState, (state: AccountState) => state.authenticated);
/* eslint-enable max-len */
