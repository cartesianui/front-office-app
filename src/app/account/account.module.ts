import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AxisHttpInterceptor } from '@cartesianui/core';

import { CommonModule as CartesianCommonModule } from '@cartesianui/common';
import { SharedModule } from '@shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { AccountEffects, reducer as accountReducer } from './store';
import { AccountSandbox } from './account.sandbox';
import { AuthService, AuthHttpService, AccountLanguagesComponent, AccountHeaderComponent, AccountFooterComponent } from './shared';

import { AccountComponent } from './account.component';
import { LoginComponent } from './ui/login/login.component';
import { RegisterComponent } from './ui/register/register.component';

// Third Party
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AccountRoutingModule,
    SharedModule,
    CartesianCommonModule,
    ModalModule.forChild(),
    StoreModule.forFeature('account', accountReducer),
    EffectsModule.forFeature([AccountEffects])
  ],
  declarations: [AccountComponent, LoginComponent, RegisterComponent, AccountLanguagesComponent, AccountHeaderComponent, AccountFooterComponent],
  providers: [AuthHttpService, AccountSandbox, AuthService, { provide: HTTP_INTERCEPTORS, useClass: AxisHttpInterceptor, multi: true }],
  entryComponents: [LoginComponent]
})
export class AccountModule {}
