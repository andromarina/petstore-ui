import { Routes } from '@angular/router';
import { adminGuard } from './core/admin.guard';
import { authGuard } from './core/auth.guard';
import { guestGuard } from './core/guest.guard';
import { Dashboard } from './features/dashboard/dashboard';
import { Login } from './features/auth/login/login';
import { UsersList } from './features/users-list/users-list';
import { UsersPerformance } from './features/users-performance/users-performance';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
    canActivate: [guestGuard],
  },
  {
    path: '',
    component: Dashboard,
    canActivate: [authGuard],
  },
  {
    path: 'users',
    component: UsersList,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'users-performance',
    component: UsersPerformance,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '' },
];
