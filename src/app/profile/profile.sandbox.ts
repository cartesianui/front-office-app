import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { RequestCriteria } from '@cartesianui/ng-axis';
import { Sandbox } from '@cartesianui/common';
import { UserState, userActions, userSelectors } from './store';
import { getAuthToken } from '../account/store/account.selector';
import { User } from './models/entities/user.model';
import { UserRoles } from './models/entities/user-roles.model';
import { SearchRoleForm } from './models/forms/search-role.model';
import { SearchUserForm } from './models';

@Injectable()
export class ProfileSandbox extends Sandbox {
  public userLoading$ = this.store.pipe(select(userSelectors.getUserLoading));
  public userLoaded$ = this.store.pipe(select(userSelectors.getUserLoaded));
  public userFailed$ = this.store.pipe(select(userSelectors.getUserFailed));
  public profile$ = this.store.pipe(select(userSelectors.getProfile));

  public rolesLoading$ = this.store.pipe(select(userSelectors.getRolesLoading));
  public rolesLoaded$ = this.store.pipe(select(userSelectors.getRolesLoaded));
  public rolesFailed$ = this.store.pipe(select(userSelectors.getRolesFailed));
  public rolesFetchData$ = this.store.pipe(select(userSelectors.getRolesFetchData));

  private subscriptions: Array<Subscription> = [];

  token$ = this.store.pipe(select(getAuthToken));

  constructor(protected store: Store<UserState>, private _router: Router, protected injector: Injector) {
    super(injector);
    this.registerUserEvents();
  }

  /**
   * Dispatches update user action
   *
   * @param id id of the user to edit data of
   * @param form data of the user to edit
   */
  public updateUser(id: string, form: User): void {
    this.store.dispatch(userActions.doUpdateUser({ id, form }));
  }

  /**
   * Dispatches fetch profile action
   */
  public fetchProfile(token: string): void {
    this.store.dispatch(userActions.doFetchAuthenticatedUser({ token }));
  }

  /**
   * Dispatches fetch user action with a request criteria
   *
   * @param id ID of the user to fetch
   * @param criteria Request Criteria
   */
  public fetchFilteredUserById(id: string, criteria: RequestCriteria<SearchUserForm>): void {
    this.store.dispatch(userActions.doFetchUser({ id, criteria }));
  }

  /**
   * Unsubscribe from events
   */
  public unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  /**
   * Registers events
   */
  private registerUserEvents(): void {
    // Subscribes to login success event and redirects user to home page
  }

  /**
   * Dispatches fetch roles action
   * TODO: Replace this function call from auth sandbox
   */
  public fetchRoles(criteria: RequestCriteria<SearchRoleForm>): void {
    this.store.dispatch(userActions.doFetchRoles({ requestCriteria: criteria }));
  }

  /**
   * Dispatches sync roles on user action
   * TODO: Replace this function call from auth sandbox
   */
  public syncRolesOnUser(form: UserRoles): void {
    this.store.dispatch(userActions.doSyncRoles({ roleForm: form }));
  }
}
