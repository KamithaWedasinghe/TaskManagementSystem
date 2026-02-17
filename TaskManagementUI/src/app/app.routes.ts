
import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { authGuard } from './features/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: Login,
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
