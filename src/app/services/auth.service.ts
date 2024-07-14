import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwt: any | null | undefined;
  user: User = null;

  constructor(@Inject(DOCUMENT) private document: Document) {
    const localStorage = document.defaultView?.localStorage;
    this.jwt = localStorage?.getItem('jwt');

    if(!this.jwt) return;

    const helper = new JwtHelperService();

    if(helper.isTokenExpired(this.jwt)) {
      localStorage?.removeItem('jwt');
      return;
    }

    this.user = helper.decodeToken<User>(this.jwt);
  }

  isAuthenticated() : boolean {
    return this.user != null;
  }
}
