import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ValidationService } from '@cartesianui/core';
import { Sandbox } from '@cartesianui/common';
import { AuthUser, LoginForm, UserRegistrationForm } from './models';
import { AuthService } from './shared';
import { actions } from './store';
import { selectors as fromAccountSelectors } from '@app/account/store';
import { State } from '@app/app.store';
import { SessionService } from '@shared/services';

@Injectable()
export class AccountSandbox extends Sandbox {
  public isAuthenticated$ = this.store.pipe(select(fromAccountSelectors.getAuthenticated));
  public loginLoading$ = this.store.pipe(select(fromAccountSelectors.getAuthLoading));
  public loginLoaded$ = this.store.pipe(select(fromAccountSelectors.getAuthLoaded));
  public authFailed$ = this.store.pipe(select(fromAccountSelectors.getAuthFailed));
  public authLoaded$ = this.store.pipe(select(fromAccountSelectors.getAuthLoaded));
  public authLoading$ = this.store.pipe(select(fromAccountSelectors.getAuthLoading));

  private subscriptions: Array<Subscription> = [];

  constructor(
    protected store: Store<State>,
    private _router: Router,
    private _accountService: AuthService,
    public validationService: ValidationService,
    protected injector: Injector,
    private sessionService: SessionService
  ) {
    super(injector);
    this.registerAuthEvents();
  }

  /**
   * Dispatches login action
   *
   * @param LoginForm form AuthUser login form
   */
  public authenticate(form: LoginForm): void {
    this.store.dispatch(actions.doAuthenticate({ loginForm: form }));
  }

  /**
   * Dispatches register action
   *
   * @param RegisterForm form AuthUser registration form
   */
  public register(form: UserRegistrationForm): void {
    this.store.dispatch(actions.doRegister({ registerForm: form }));
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
  private registerAuthEvents(): void {
    // Subscribes to login success event and redirects user to home page
    this.subscriptions.push(
      this.isAuthenticated$.subscribe((authenticated: any) => {
        if (authenticated.status === true) {
          // This is the only place we are using auth token from state
          // After this it will/should not be used from state
          // account service will save access token in cookie, and it will always be used from there
          // In case of page load we are not maintaining account state
          // SessionService will be used else where to make session persistent
          this._accountService.processAuthenticateResult(authenticated.token).then(
            (logged) => {
              if (logged) {
                this.sessionService.init().then(
                  (user: AuthUser) => {
                    if (user) {
                      this.store.dispatch(actions.doAddAuthenticatedUser({ user }));
                      //this._router.navigate(['/']);
                      location.href = '/';
                    }
                  },
                  (err: HttpErrorResponse) => {}
                );
              }
            },
            (err) => {}
          );
        }
      })
    );
  }
}
