import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from '@cartesianui/common';

@Component({
  templateUrl: 'preferences.component.html',
  styleUrls: ['preferences.component.scss']
})
export class PreferencesComponent extends BaseComponent implements OnInit {
  interface = {
    theme: 'light',
    colorScheme: 'blue'
  };
  notifications = {
    enabled: true,
    chat: true,
    promotions: false,
    updates: true
  };

  formGroup = new FormGroup({
    enabled: new FormControl(this.notifications.enabled),
    chat: new FormControl(this.notifications.chat),
    promotions: new FormControl(this.notifications.promotions),
    updates: new FormControl(this.notifications.updates)
  });

  themes = [
    { name: 'Light', value: 'light' },
    { name: 'Dark', value: 'dark' },
    { name: 'System', value: 'sys' }
  ];

  colorSchemes = [
    { name: 'blue', color: '#007aff' },
    { name: 'purple', color: '#7a00ff' },
    { name: 'green', color: '#00ff7a' },
    { name: 'red', color: '#ff007a' }
  ];

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.formGroup.controls.enabled.valueChanges.subscribe((v: boolean) => {
      this.onNotificationsChange(v);
    });
  }

  private onNotificationsChange(enabled: boolean) {
    const ctrls = this.formGroup.controls;
    console.log(enabled);
    if (enabled) {
      ctrls.chat.enable();
      ctrls.promotions.enable();
      ctrls.updates.enable();
    } else {
      ctrls.chat.disable();
      ctrls.promotions.disable();
      ctrls.updates.disable();
    }
  }
}
