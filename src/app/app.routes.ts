import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/pages/home-page/home-page').then(m => m.HomePage),
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./features/services/pages/services-page/services-page').then(m => m.ServicesPage),
  },
];
