import { Component, OnInit } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss'],
})
export class EmailLoginComponent implements OnInit {
  form!: FormGroup;

  type: 'login' | 'signup' | 'reset' = 'signup';
  loading = false;

  serverMessage: string | null = null;

  constructor(private afAuth: Auth, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', []],
    });
  }

  changeType(val: 'login' | 'signup' | 'reset'): void {
    this.type = val;
  }

  get isLogin(): boolean {
    return this.type === 'login';
  }

  get isSignup(): boolean {
    return this.type === 'signup';
  }

  get isPasswordReset(): boolean {
    return this.type === 'reset';
  }

  get email(): AbstractControl {
    return this.form.get('email')!;
  }

  get password(): AbstractControl {
    return this.form.get('password')!;
  }

  get passwordConfirm(): AbstractControl {
    return this.form.get('passwordConfirm')!;
  }

  get passwordDoesMatch(): boolean {
    if (this.type !== 'signup') {
      return true;
    } else {
      if (this.password.value !== this.passwordConfirm.value) {
        this.passwordConfirm.setErrors({ notSame: true });
        return false;
      } else {
        this.passwordConfirm.setErrors(null);
        return true;
      }
    }
  }

  async onSubmit() {
    this.loading = true;

    const email = this.email.value;
    const password = this.password.value;

    try {
      if (this.isLogin) {
        await signInWithEmailAndPassword(this.afAuth, email, password);
      }
      if (this.isSignup) {
        await createUserWithEmailAndPassword(this.afAuth, email, password);
      }
      if (this.isPasswordReset) {
        await sendPasswordResetEmail(this.afAuth, email);
        this.serverMessage = 'Check your email';
      }
    } catch (err: any) {
      this.serverMessage = err;
    }

    this.loading = false;
  }
}
