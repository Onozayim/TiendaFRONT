import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { guestGuard } from './guards/guest/guest.guard';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
  { path: '', component: HomeComponent },
  { path: 'user', component: UserComponent, canActivate: [authGuard] },
];
