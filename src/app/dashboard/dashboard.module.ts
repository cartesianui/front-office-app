import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  imports: [DashboardRoutingModule, BsDropdownModule, ChartsModule, CommonModule, SharedModule],
  declarations: [DashboardComponent]
})
export class DashboardModule {}
