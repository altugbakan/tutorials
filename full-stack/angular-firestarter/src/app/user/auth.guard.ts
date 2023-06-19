import { Auth } from '@angular/fire/auth';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { SnackService } from '../services/snack.service';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
class AuthGuard {
  constructor(private afAuth: Auth, private snack: SnackService) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const user = this.afAuth.currentUser;
    const isLoggedIn = !!user;
    if (!isLoggedIn) {
      this.snack.authError();
    }
    return isLoggedIn;
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthGuard).canActivate(route, state);
};
