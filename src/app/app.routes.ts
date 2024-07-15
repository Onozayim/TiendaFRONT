import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { guestGuard } from './guards/guest/guest.guard';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
  { path: 'user', component: UserComponent, canActivate: [authGuard] },
  { path: 'user2', component: UserComponent, canActivate: [authGuard] },
];
