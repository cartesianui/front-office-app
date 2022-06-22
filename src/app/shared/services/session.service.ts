import { TenancyService, TokenService, convertObjectKeysToCamel } from '@cartesianui/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Application } from '@shared/models';
import { AuthUser } from '@app/account/models';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private _user: AuthUser;
  private _application: Application;

  constructor(private _httpClient: HttpClient, private _tokenService: TokenService, private _tenancyService: TenancyService) {}

  /* eslint-disable @typescript-eslint/dot-notation */
  init(): Promise<any> {
    const token = this._tokenService.getToken();

    const requestHeaders = {};

    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }

    return new Promise<any>((resolve, reject) => {
      this._httpClient
        .get<any>(`v1/profile`, { headers: requestHeaders })
        .toPromise()
        .then(
          (result: any) => {
            this._user = new AuthUser(convertObjectKeysToCamel(result.data));
            resolve(this._user);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  get application(): Application {
    return this._application;
  }

  get user(): AuthUser {
    return this._user;
  }

  get userId(): string {
    return this.user ? this.user.id : null;
  }

  getShownLoginName(): string {
    const userName = this._user.email;

    return userName;
  }
}
