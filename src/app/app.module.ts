import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER, LOCALE_ID, InjectionToken } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppConstants, HttpServiceModule, AxisHttpInterceptor } from '@cartesianui/ng-axis';
import { CommonModule as CartesianCommonModule } from '@cartesianui/common';
import { SharedModule } from '@shared/shared.module';

import { AppInitializerService } from './app-initializer.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppSandbox } from './app.sandbox';

// Third Party
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export function getCurrentLanguage(): string {
  if (axis.localization.currentLanguage.name) {
    return axis.localization.currentLanguage.name;
  }

  return 'en';
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpServiceModule.forRoot(),
    CartesianCommonModule.forRoot(),
    SharedModule.forRoot(),
    AppRoutingModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot()
  ],
  declarations: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AxisHttpInterceptor, multi: true },
    {
      provide: API_BASE_URL,
      useFactory: () => AppConstants.remoteServiceBaseUrl
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (appInitializer: AppInitializerService) => appInitializer.init(),
      deps: [AppInitializerService],
      multi: true
    },
    { provide: LOCALE_ID, useFactory: getCurrentLanguage },
    AppSandbox
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
