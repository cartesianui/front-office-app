import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { State } from '@app/app.store';
import { ProfileHttpService } from '../profile-http.service';
import * as userActions from './user.action';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private profileHttpService: ProfileHttpService, private store: Store<State>) {}

  /**
   * Fetch Authenticated User effect
   */
  fetchAuthenticatedUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.doFetchAuthenticatedUser),
      map((action) => action.token),
      switchMap((token) => {
        return this.profileHttpService.profile(token).pipe(
          map((user) =>
            userActions.doFetchAuthenticatedUserSuccess({
              user: user.data
            })
          ),
          catchError((error) => of(userActions.doFetchAuthenticatedUserFail()))
        );
      })
    )
  );

  /**
   * Fetch User effect
   */
  fetchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.doFetchUser),
      map((action) => Object.assign({}, { id: action.id, criteria: action.criteria })),
      switchMap((object) => {
        const res = object.criteria ? this.profileHttpService.filteredUser(object.id, object.criteria) : this.profileHttpService.user(object.id);
        return res.pipe(
          map((user) =>
            userActions.doFetchUserSuccess({
              user: user.data
            })
          ),
          catchError((error) => of(userActions.doFetchUserFail()))
        );
      })
    )
  );

  /**
   * Update User effect
   */
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.doUpdateUser),
      map((action) => Object.assign({}, { id: action.id, form: action.form })),
      switchMap((data) => {
        return this.profileHttpService.updateUser(data.id, data.form).pipe(
          map((user) =>
            userActions.doUpdateUserSuccess({
              user: user.data
            })
          ),
          catchError((error) => of(userActions.doUpdateUserFail()))
        );
      })
    )
  );
}
