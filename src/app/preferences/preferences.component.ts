import { Component, Injector } from '@angular/core';
import { BaseComponent } from '@cartesianui/common';

type ThemeType = 'dark' | 'light' | 'sys';
type ColorSchemeType = 'blue' | 'purple' | 'green' | 'red';

@Component({
  templateUrl: 'preferences.component.html',
  styleUrls: ['preferences.component.scss']
})
export class PreferencesComponent extends BaseComponent {
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

  get themeName() {
    return this.themes.find((t) => t.value === this.interface.theme).name;
  }
  setTheme = (theme: ThemeType) => (this.interface.theme = theme);
}
