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
    path: 'services/:id',
    loadComponent: () =>
      import('./features/services/pages/service-detail-page/service-detail-page').then(
        m => m.ServiceDetailPage
      ),
  },
  // Temporarily disabled - booking functionality will be re-enabled in the future
  // {
  //   path: 'book-online',
  //   loadComponent: () =>
  //     import('./features/book-online/pages/book-online-page/book-online-page').then(
  //       m => m.BookOnlinePage
  //     ),
  // },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/pages/contact-page/contact-page').then(m => m.ContactPage),
  },
];
