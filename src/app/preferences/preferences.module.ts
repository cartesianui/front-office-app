import { NgModule } from '@angular/core';

import { PreferencesComponent } from './preferences.component';
import { PreferencesRoutingModule } from './preferences-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [PreferencesRoutingModule, CommonModule],
  declarations: [PreferencesComponent]
})
export class PreferencesModule {}
