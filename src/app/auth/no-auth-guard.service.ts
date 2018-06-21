import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.auth.ifLogined()) {
      this.router.navigate(['/'])
      return false
    } else {
      return true;
    }
  }
}
