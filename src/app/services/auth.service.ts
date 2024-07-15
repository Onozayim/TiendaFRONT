import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { LoginBody } from '../models/Params/LoginBody';
import { LoginResponse } from '../models/Responses/LoginResponse';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwt: string | null | undefined;
  user: User = null;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient
  ) {
    const localStorage = document.defaultView?.localStorage;
    this.jwt = localStorage?.getItem('jwt');

    if (!this.jwt) return;

    const helper = new JwtHelperService();

    if (helper.isTokenExpired(this.jwt)) {
      localStorage?.removeItem('jwt');
      return;
    }

    this.user = helper.decodeToken<User>(this.jwt);
  }

  isAuthenticated(): boolean {
    return this.user != null;
  }

  login(body: LoginBody) {
    return this.http.post<LoginResponse>('/v1/auth/login', body, {
      reportProgress: true,
      // observe: 'events',
    });
  }

  saveJwt(jwt: string) {
    this.document.defaultView?.localStorage.setItem('jwt', jwt);
    window.location.href = '/user';
  }

  logout() {
    this.document.defaultView?.localStorage.removeItem('jwt');
    window.location.href = '/login';
  }
}
