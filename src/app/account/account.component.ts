import { Component, OnInit, ViewEncapsulation, Injector, Renderer2 } from '@angular/core';
import { BaseComponent } from '@cartesianui/common';

@Component({
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountComponent extends BaseComponent implements OnInit {
  constructor(injector: Injector, private renderer: Renderer2) {
    super(injector);
  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'login-page');
  }
}
