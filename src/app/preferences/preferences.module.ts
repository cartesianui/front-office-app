import { NgModule } from '@angular/core';

import { PreferencesComponent } from './preferences.component';
import { PreferencesRoutingModule } from './preferences-routing.module';

@NgModule({
  imports: [PreferencesRoutingModule],
  declarations: [PreferencesComponent]
})
export class PreferencesModule {}
