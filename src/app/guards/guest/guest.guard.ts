import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { tap } from 'rxjs';

export const guestGuard: CanActivateFn = (route, state) => {
  return !inject(AuthService).isAuthenticated()
    ? true
    : inject(Router).createUrlTree(['/user']);
};
