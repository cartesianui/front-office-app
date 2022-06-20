import { Component, Injector } from '@angular/core';
import { BaseComponent } from '@cartesianui/common';

@Component({
  template: `<router-outlet></router-outlet>`
})
export class ProfileComponent extends BaseComponent {
  constructor(injector: Injector) {
    super(injector);
  }
}
