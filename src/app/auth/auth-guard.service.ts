import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) {}

  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.auth.ifLogined()) {
      this.router.navigate(['/login'])
      this.toastr.warning('还未登录或者登录已过期，请先登录！',"警告")
      return false
    } else {
      return true;
    }
  }

  canActivateChild(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ) {
    if (!this.auth.ifLogined()) {
      this.router.navigate(['/login'])
      this.toastr.warning('还未登录或者登录已过期，请先登录！',"警告")
      return false
    } else {
      return true;
    }
  }
}
