import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginBody } from '../../models/Params/LoginBody';
import { ErrorResponses } from '../../models/Responses/ErrorsResponses';
import { NgFor, NgIf } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  loginParams: LoginBody = {
    email: '',
    password: '',
  };

  loginErrors: ErrorResponses | null = null;

  isLoading = true;

  constructor(private authService: AuthService) {
    this.isLoading = authService.isAuthenticated();
  }

  ngOnInit(): void {
    this.isLoading = false;
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

  login() {
    this.loginForm.disable();

    // const body: LoginBody = {
    //   password: this.password?.value,
    //   email: this.email?.value,
    // };

    const body: LoginBody = {
      password: this.password?.value,
      email: this.email?.value,
    };

    this.authService.login(body).subscribe({
      next: (response) => {
        this.authService.saveJwt(response.data.jwt);
      },
      error: (error) => {
        this.loginErrors = error.error;
        this.loginForm.enable();
      },
    });
    // this.authService.login(body).pipe(catchError((err) => {
    //   console.log(err);
    //   return of([]);
    // }), map (n => {
    //   console.log(n);
    // })).subscribe((event) => {
    //   switch(event.type) {
    //     case HttpEventType.UploadProgress:
    //       console.log(event.loaded);
    //       break;
    //     case HttpEventType.Response:
    //       console.log(event);
    //       break;
    //     case HttpEventType.ResponseHeader:
    //       if(!event.ok) {
    //         // this.loginErrors = event.
    //       }
    //       this.loginForm.enable();
    //       break;
    //   }
    // });
    // .subscribe(event => {
    //   switch(event.type) {
    //     case HttpEventType.UploadProgress:
    //       console.log(event.loaded);
    //       break;
    //     case HttpEventType.Response:
    //       console.log(event);
    //       break;
    //     case HttpEventType.ResponseHeader:
    //       if(!event.ok) {
    //         // this.loginErrors = event.
    //       }
    //       this.loginForm.enable();
    //       break;
    //   }
    // });
  }
}
