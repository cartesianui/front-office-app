import { Injectable } from '@angular/core';
import { NotifyService, PermissionCheckerService } from '@cartesianui/ng-axis';
import { SessionService } from './session.service';

import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';

@Injectable()
export class RouteGuard implements CanActivate, CanActivateChild {
  constructor(private _permissionChecker: PermissionCheckerService, private _router: Router, private _sessionService: SessionService, private _notifyService: NotifyService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this._sessionService.user) {
      this._router.navigate(['/account/login']);
      return false;
    }

    if (!route.data || !route.data.permission) {
      return true;
    }

    if (this._permissionChecker.isGranted(route.data.permission)) {
      return true;
    }

    this._notifyService.warn("You don't have required permissions", 'Restricted Access', { position: 'bottom-end' });

    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}
