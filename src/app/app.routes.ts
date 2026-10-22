import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.page').then((m) => m.HomePage),
    title: 'Dr. Jeison Patiño · Médico general',
  },
  {
    path: 'admin/login',
    loadComponent: () => import('./features/admin/login/login.page').then((m) => m.LoginPage),
    title: 'Acceso del consultorio',
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () => import('./features/admin/citas/citas.page').then((m) => m.CitasPage),
    title: 'Solicitudes de cita',
  },
  { path: '**', redirectTo: '' },
];
