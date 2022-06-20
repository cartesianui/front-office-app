import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavItemType } from '@app/shared/models';

@Component({
  selector: 'app-sidebar',
  styleUrls: ['./sidebar.component.scss'],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  public sidebar: Element;
  isSidebarOpen = false;
  public navItems: NavItemType[];

  public constructor(private route: ActivatedRoute) {
    this.navItems = route.snapshot.data['navItems'];
  }

  public toggleSidebar() {
    if (this.isSidebarOpen) {
      this.sidebar.classList.remove('open');
      this.isSidebarOpen = false;
    } else {
      this.sidebar.classList.add('open');
      this.isSidebarOpen = true;
    }
  }
}
