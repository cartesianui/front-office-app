import { NavItemType } from './shared/models';

/** List of items to show in the navigation */
export const navItems: NavItemType[] = [
  {
    name: 'Home',
    url: '/home',
    icon: 'fa fa-home'
  },
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'fa fa-tachometer-alt'
  },
  {
    name: 'Profile',
    url: '/profile',
    icon: 'fa fa-user-circle'
  },
  {
    title: 'Settings'
  },
  {
    name: 'Preferences',
    url: '/preferences',
    icon: 'fa fa-cog'
  }
];
