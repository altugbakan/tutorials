import { Auth } from '@angular/fire/auth';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { SnackService } from '../services/snack.service';
import { inject } from '@angular/core';

class AuthGuard {
  constructor(private afAuth: Auth, private snack: SnackService) {}

  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): boolean {
    const user = this.afAuth.currentUser;
    const isLoggedIn = !!user;
    if (!isLoggedIn) {
      this.snack.authError();
    }
    return isLoggedIn;
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  const guard = new AuthGuard(inject(Auth), inject(SnackService));
  return guard.canActivate(route, state);
};
