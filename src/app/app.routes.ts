import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'cursos', pathMatch: 'full' },
  {
    path: 'cursos',
    loadComponent: () => import('./pages/cursos/cursos.page').then((m) => m.CursosPage),
  },
  {
    path: 'registro',
    loadComponent: () => import('./pages/registro/registro.page').then((m) => m.RegistroPage),
  },
  {
    path: 'boletin/:id',
    loadComponent: () => import('./pages/boletin/boletin.page').then((m) => m.BoletinPage),
  },
];
