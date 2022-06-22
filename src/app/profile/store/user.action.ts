import { createAction, props } from '@ngrx/store';
import { type, RequestCriteria } from '@cartesianui/core';
import { User, UserRoles, SearchUserForm, Role, SearchRoleForm } from '../models';

/**
 * Update User Actions
 */
export const doUpdateUser = createAction(type('[User] Do Update User'), props<{ id: string; form: User }>());
export const doUpdateUserSuccess = createAction(type('[User] Do Update User Success'), props<{ user: User }>());
export const doUpdateUserFail = createAction(type('[User] Do Update User Fail'));

/**
 * Fetch User Actions
 */
export const doFetchUser = createAction(type('[User] Do Fetch User'), props<{ id: string; criteria?: RequestCriteria<SearchUserForm> }>());
export const doFetchUserSuccess = createAction(type('[User] Do Fetch User Success'), props<{ user: User }>());
export const doFetchUserFail = createAction(type('[User] Do Fetch User Fail'));

/**
 * Fetch User Profile Actions
 */
export const doFetchAuthenticatedUser = createAction(type('[User] Do Fetch Authenticated User'), props<{ token: string }>());
export const doFetchAuthenticatedUserSuccess = createAction(type('[User] Do Fetch Authenticated User Success'), props<{ user: User }>());
export const doFetchAuthenticatedUserFail = createAction(type('[User] Do Fetch Authenticated Fail'));

/**
 * Fetch Roles Actions
 */
export const doFetchRoles = createAction(type('[User] Do Fetch Roles'), props<{ requestCriteria: RequestCriteria<SearchRoleForm> }>());
export const doFetchRolesSuccess = createAction(type('[User] Do Fetch Roles Success'), props<{ roles: Role[] }>());
export const doFetchRolesFail = createAction(type('[User] Do Fetch Roles Fail'), props<{ error: any }>());

/**
 * Fetch Roles Actions
 */
export const doSyncRoles = createAction(type('[User] Do Sync Roles'), props<{ roleForm: UserRoles }>());
export const doSyncRolesSuccess = createAction(type('[User] Do Sync Roles Success'), props<{ user: User }>());
export const doSyncRolesFail = createAction(type('[User] Do Sync Roles Fail'), props<{ error: any }>());
