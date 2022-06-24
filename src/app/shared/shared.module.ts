import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule as CartesianCommonModule } from '@cartesianui/common';
import { SessionService, RouteGuard } from './services';
import {
  AppPaginationControlsComponent,
  AppValidationSummaryComponent,
  AppModalHeaderComponent,
  AppModalFooterComponent,
  DefaultLayoutComponent,
  SidebarComponent,
  HeaderComponent,
  RatingComponent
} from './ui';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts';
import { GuestLayoutComponent } from './ui/layout/guest-layout.component';

const APP_LAYOUT_COMPONENTS = [DefaultLayoutComponent, GuestLayoutComponent, SidebarComponent, HeaderComponent];
const APP_GENERIC_COMPONENTS = [RatingComponent];

@NgModule({
  imports: [CommonModule, RouterModule, CartesianCommonModule, RouterModule, FormsModule, ReactiveFormsModule, NgxPaginationModule, BsDropdownModule.forRoot(), TabsModule.forRoot(), ChartsModule],
  declarations: [AppPaginationControlsComponent, AppValidationSummaryComponent, AppModalHeaderComponent, AppModalFooterComponent, ...APP_LAYOUT_COMPONENTS, ...APP_GENERIC_COMPONENTS],
  exports: [APP_GENERIC_COMPONENTS]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [SessionService, RouteGuard]
    };
  }
}
