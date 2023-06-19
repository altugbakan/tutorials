import { Directive, HostListener } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

import * as firebase from 'firebase/app';

@Directive({
  selector: '[appGoogleSignin]',
})
export class GoogleSigninDirective {
  constructor(private afAuth: Auth) {}

  @HostListener('click')
  async onclick() {
    const result = await signInWithPopup(this.afAuth, new GoogleAuthProvider());
  }
}
