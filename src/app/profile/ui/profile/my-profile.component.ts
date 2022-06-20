import { Component } from '@angular/core';
import { ProfileSandbox as ProfileSandbox } from '@app/profile/profile.sandbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'my-profile',
  templateUrl: './my-profile.component.html'
})
export class MyProfileComponent {
  token;
  user;

  subscriptions: Array<Subscription> = [];
  constructor(protected _sandbox: ProfileSandbox) {
    this.registerEvents();
    this._sandbox.fetchProfile(this.token);
  }

  registerEvents() {
    this.subscriptions.push(this._sandbox.token$.subscribe((token) => (this.token = token)));
    this.subscriptions.push(this._sandbox.profile$.subscribe((user) => (this.user = user)));
  }
}
