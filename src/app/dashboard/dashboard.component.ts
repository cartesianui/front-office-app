import { Component, Injector } from '@angular/core';
import { BaseComponent } from '@cartesianui/common';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent extends BaseComponent {
  constructor(injector: Injector) {
    super(injector);
  }
}
