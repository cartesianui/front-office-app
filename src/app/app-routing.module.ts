import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuard } from '@shared/services';
import { DefaultLayoutComponent } from '@shared/ui';
import { navItems } from '@app/nav.data';
import { GuestLayoutComponent } from '@shared/ui';

const routes: Routes = [
  {
    path: '',
    component: GuestLayoutComponent,
    data: {
      title: '',
      navItems: navItems
    },
    children: [
      {
        path: 'account',
        loadChildren: () => import('@app/account/account.module').then((m) => m.AccountModule), // Lazy load account module
        data: { preload: true }
      },
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('@app/landing/landing.module').then((m) => m.LandingModule)
      }
    ]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivateChild: [RouteGuard],
    data: {
      title: '',
      navItems: navItems
    },
    children: [
      {
        path: 'home',
        loadChildren: () => import('@app/home/home.module').then((m) => m.HomeModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('@app/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('@app/profile/profile.module').then((m) => m.ProfileModule)
      },
      {
        path: 'preferences',
        loadChildren: () => import('@app/preferences/preferences.module').then((m) => m.PreferencesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
