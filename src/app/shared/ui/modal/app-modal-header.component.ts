import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, Injector } from '@angular/core';
import { BaseComponent } from '@cartesianui/common';

@Component({
  selector: 'app-modal-header',
  templateUrl: './app-modal-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppModalHeaderComponent extends BaseComponent {
  @Input() title: string;

  @Output() closeClick = new EventEmitter<number>();

  constructor(injector: Injector) {
    super(injector);
  }
}
