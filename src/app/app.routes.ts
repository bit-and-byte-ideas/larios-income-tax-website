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
  {
    path: 'book-online',
    loadComponent: () =>
      import('./features/book-online/pages/book-online-page/book-online-page').then(
        m => m.BookOnlinePage
      ),
  },
  {
    path: 'book-online/:id',
    loadComponent: () =>
      import('./features/book-online/pages/service-detail-page/service-detail-page').then(
        m => m.ServiceDetailPage
      ),
  },
];
