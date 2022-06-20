import { Injectable, Injector } from '@angular/core';
import { PlatformLocation, registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AppConstants, UiService, TenancyService, TokenService, convertObjectKeysToCamel } from '@cartesianui/ng-axis';
import { SessionService } from '@shared/services';
import { AuthUser } from '@app/account/models';
import * as moment from 'moment-timezone';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {
  constructor(
    private _injector: Injector,
    private _platformLocation: PlatformLocation,
    private _httpClient: HttpClient,
    private _uiService: UiService,
    private _tokenService: TokenService,
    private _tenancyService: TenancyService
  ) {}

  init(): () => Promise<boolean> {
    return () => {
      this._uiService.setBusy();
      return new Promise<boolean>((resolve, reject) => {
        const host = this.getHostName();
        const appBaseUrl = this.getDocumentOrigin() + this.getBaseHref();
        AppConstants.appBaseHref = this.getBaseHref();
        AppConstants.appBaseUrl = appBaseUrl;
        this.getApplicationConfig(appBaseUrl, () => {
          this.getConfigurations(() => {
            axis.event.trigger('axis.dynamicScriptsInitialized');
            // ----------------------------------------------------------
            //            Data flow for App Session Service
            // ----------------------------------------------------------
            // Diversion #1:
            // Rule: General rule is, every thing is controlled through sandbox, sandbox has all features and only access to api services.
            // Exception: app session service is exception to that rule, as it is directly communicating with api

            // Diversion #2:
            // Rule: As redux principle, NgRx Store should be only source of truth, i.e data should flow from store only.
            // Exception: app session is exception to that as well, SessionService holds session data, and it hydrated directly through api.

            // do not use constructor injection for SessionService
            const sessionService = this._injector.get(SessionService);
            sessionService.init().then(
              (user: AuthUser) => {
                this._uiService.clearBusy();
                if (this.shouldLoadLocale()) {
                  const angularLocale = this.convertAxisLocaleToAngularLocale(axis.localization.currentLanguage.name);
                  import(`@angular/common/locales/${angularLocale}.js`).then((module) => {
                    registerLocaleData(module.default);
                    resolve(true);
                  }, reject);
                } else {
                  resolve(true);
                }
              },
              (err) => {
                this._uiService.clearBusy();
                resolve(true);
              }
            );
          });
        });
      });
    };
  }

  private getApplicationConfig(appRootUrl: string, callback: () => void) {
    this._httpClient.get<any>(`${appRootUrl}assets/${environment.appConfig}`, {}).subscribe((response) => {
      // AppConstants.appBaseUrl = response.appBaseUrl; // No need tp use from config,
      AppConstants.remoteServiceBaseUrl = response.remoteServiceBaseUrl;
      AppConstants.localeMappings = response.localeMappings;
      AppConstants.tenancy = response.tenancy;

      callback();
    });
  }

  private getConfigurations(callback: () => void): void {
    const cookieLangValue = axis.utils.getCookieValue(`Axis-Localization-CultureName`);
    const token = this._tokenService.getToken();

    const requestHeaders = {};

    if (cookieLangValue) {
      requestHeaders[`.Axis-Culture`] = `c=${cookieLangValue}|uic=${cookieLangValue}`;
    }

    if (token) {
      requestHeaders[`Authorization`] = `Bearer ${token}`;
    }

    this._httpClient
      .get<any>(`${AppConstants.remoteServiceBaseUrl}/configurations`, {
        headers: requestHeaders
      })
      .subscribe(
        (response) => {
          const result = convertObjectKeysToCamel(response);

          _.merge(axis, result);

          axis.clock.provider = this.getCurrentClockProvider(result.clock.provider);

          // To show dates in selected language
          moment.locale(axis.localization.currentLanguage.name);

          if (axis.clock.provider.supportsMultipleTimezone) {
            moment.tz.setDefault(axis.timing.timeZoneInfo.iana.timeZoneId);
          }

          callback();
        },
        (error) => {
          callback();
        }
      );
  }

  private getBaseHref(): string {
    const baseUrl = this._platformLocation.getBaseHrefFromDOM();
    if (baseUrl) {
      return baseUrl;
    }

    return '/';
  }

  private getHostName(): string {
    const port = document.location.port ? ':' + document.location.port : '';
    return document.location.hostname + port;
  }

  private getDocumentOrigin(): string {
    if (!document.location.origin) {
      const port = document.location.port ? ':' + document.location.port : '';
      return document.location.protocol + '//' + document.location.hostname + port;
    }

    return document.location.origin;
  }

  private shouldLoadLocale(): boolean {
    return axis.localization.currentLanguage.name && axis.localization.currentLanguage.name !== 'en-US';
  }

  private convertAxisLocaleToAngularLocale(locale: string): string {
    if (!AppConstants.localeMappings) {
      return locale;
    }

    const localeMapings = _.filter(AppConstants.localeMappings, {
      from: locale
    });
    if (localeMapings && localeMapings.length) {
      return localeMapings[0].to;
    }

    return locale;
  }

  private getCurrentClockProvider(currentProviderName: string): axis.timing.IClockProvider {
    if (currentProviderName === 'unspecifiedClockProvider') {
      return axis.timing.unspecifiedClockProvider;
    }

    if (currentProviderName === 'utcClockProvider') {
      return axis.timing.utcClockProvider;
    }

    return axis.timing.localClockProvider;
  }
}
