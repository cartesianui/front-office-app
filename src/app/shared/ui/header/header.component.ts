import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  routeData: { [key: string]: any };

  public isDark = false;

  constructor(route: ActivatedRoute, router: Router) {
    const updateData = (event?: any) => {
      if (event === undefined || event instanceof NavigationEnd) {
        this.routeData = route.snapshot.data;
      }
    };
    updateData();
    router.events.subscribe(updateData);
  }

  toggleDarkMode() {
    this.isDark = !this.isDark;
  }
}
