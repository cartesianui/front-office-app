import { Injectable, Injector } from '@angular/core';
import { Sandbox } from '@cartesianui/common';
import { Store, select } from '@ngrx/store';
import { State } from '@app/app.store';

@Injectable()
export class AppSandbox extends Sandbox {
  constructor(protected store: Store<State>, protected injector: Injector) {
    super(injector);
  }
}
