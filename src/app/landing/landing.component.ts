import { Component, Injector } from '@angular/core';
import { BaseComponent } from '@cartesianui/common';

@Component({
  templateUrl: 'landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent extends BaseComponent {
  constructor(injector: Injector) {
    super(injector);
  }
}
