/* eslint-disable max-len */
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { UserState } from './user.state';
import { userFeatureKey } from './user.reducer';

export const getUserState = createFeatureSelector<UserState>(userFeatureKey);

export const getUserLoading: MemoizedSelector<object, boolean> = createSelector(getUserState, (state: UserState) => state.detail.loading);

export const getUserLoaded: MemoizedSelector<object, boolean> = createSelector(getUserState, (state: UserState) => state.detail.loaded);

export const getUserFailed: MemoizedSelector<object, boolean> = createSelector(getUserState, (state: UserState) => state.detail.failed);

export const getUserDetail: MemoizedSelector<object, object> = createSelector(getUserState, (state: UserState) => state.detail.data);

export const getProfile: MemoizedSelector<object, object> = createSelector(getUserState, (state: UserState) => state.detail.data);

export const getRolesLoading: MemoizedSelector<object, boolean> = createSelector(getUserState, (state: UserState) => state.roleListing.loading);

export const getRolesLoaded: MemoizedSelector<object, boolean> = createSelector(getUserState, (state: UserState) => state.roleListing.loaded);

export const getRolesFailed: MemoizedSelector<object, boolean> = createSelector(getUserState, (state: UserState) => state.roleListing.failed);

export const getRolesFetchData: MemoizedSelector<object, object> = createSelector(getUserState, (state: UserState) => state.roleListing.data.data);
