import { NgModule } from '@angular/core';

import { PreferencesComponent } from './preferences.component';
import { PreferencesRoutingModule } from './preferences-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [PreferencesRoutingModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [PreferencesComponent]
})
export class PreferencesModule {}
