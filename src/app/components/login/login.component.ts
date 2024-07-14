import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  loginParams = {
    email: '',
    password: '',
  };

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(this.loginParams.email, [
        Validators.required,
        Validators.minLength(1),
        Validators.email,
      ]),
      password: new FormControl(this.loginParams.password, [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
