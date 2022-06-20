import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AxisHttpInterceptor } from '@cartesianui/ng-axis';
import { CommonModule as CartesianCommonModule } from '@cartesianui/common';

import { userFeatureKey, userReducers, UserEffects } from './store';

import { UserRoutingModule } from './profile-routing.module';
import { ProfileHttpService } from './profile-http.service';
import { ProfileSandbox } from './profile.sandbox';

import { ProfileComponent } from './profile.component';
import { MyProfileComponent } from './ui/profile/my-profile.component';
import { EditProfileComponent } from './ui/edit/edit-profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CartesianCommonModule.forFeature(),
    UserRoutingModule,
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
    NgxDatatableModule,
    TypeaheadModule,
    StoreModule.forFeature(userFeatureKey, userReducers),
    EffectsModule.forFeature([UserEffects])
  ],
  declarations: [ProfileComponent, MyProfileComponent, EditProfileComponent],
  providers: [ProfileHttpService, ProfileSandbox, { provide: HTTP_INTERCEPTORS, useClass: AxisHttpInterceptor, multi: true }]
})
export class ProfileModule {}
