import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(public afAuth: Auth) {}

  ngOnInit(): void {}
}
