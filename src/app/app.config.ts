import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Router, NavigationEnd } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { APP_INITIALIZER } from '@angular/core';
import { filter } from 'rxjs';

import { routes } from './app.routes';

function scrollToTopOnNavigation(router: Router) {
  return () => {
    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      window.scrollTo(0, 0);
    });
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    {
      provide: APP_INITIALIZER,
      useFactory: scrollToTopOnNavigation,
      deps: [Router],
      multi: true,
    },
  ],
};
