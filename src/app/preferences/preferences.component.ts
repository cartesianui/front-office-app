import { Component, Injector } from '@angular/core';
import { BaseComponent } from '@cartesianui/common';

@Component({
  templateUrl: 'preferences.component.html'
})
export class PreferencesComponent extends BaseComponent {
  constructor(injector: Injector) {
    super(injector);
  }
}
