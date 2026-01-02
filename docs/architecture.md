# Architecture

## Overview

The Larios Income Tax website follows Angular best practices with a modular, scalable architecture
designed for maintainability and performance.

## Project Structure

```text
src/
├── app/
│   ├── core/           # Singleton services, guards, interceptors
│   ├── shared/         # Shared components, directives, pipes
│   ├── features/       # Feature modules (home, services, contact, about)
│   └── app.ts          # Root component
├── environments/       # Environment configurations
└── styles.css          # Global styles
```

## Module Organization

### Core Module

The Core Module contains singleton services that should be loaded only once in the application.

**Location:** `src/app/core/`

**Contents:**

- **services/** - Singleton services (authentication, API, logging)
- **guards/** - Route guards (auth guard, role guard)
- **interceptors/** - HTTP interceptors (token, error handling)

**Usage:** Import only once in the root AppModule. Never import in feature modules.

```typescript
import { CoreModule } from './core/core.module';

@NgModule({
  imports: [CoreModule, ...]
})
export class AppModule { }
```

### Shared Module

The Shared Module contains reusable components, directives, and pipes used across feature modules.

**Location:** `src/app/shared/`

**Contents:**

- **components/** - Reusable UI components (buttons, cards, modals)
- **directives/** - Custom directives (highlight, tooltip)
- **pipes/** - Custom pipes (date formatting, text transforms)

**Usage:** Import in any feature module that needs shared functionality.

```typescript
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule, ...]
})
export class FeatureModule { }
```

### Feature Modules

Feature modules encapsulate distinct application features with lazy loading for optimal performance.

**Location:** `src/app/features/`

**Planned Features:**

- **home/** - Home page with hero section and overview
- **services/** - Income tax and immigration services information
- **contact/** - Contact information, form, and location
- **about/** - Business information and credentials

**Structure Example:**

```text
feature-name/
├── components/
│   ├── feature-component-1/
│   └── feature-component-2/
├── services/
│   └── feature.service.ts
├── feature-name-routing.module.ts
└── feature-name.module.ts
```

**Lazy Loading:**

```typescript
export const routes: Routes = [
  {
    path: 'services',
    loadChildren: () => import('./features/services/services.module').then(m => m.ServicesModule),
  },
];
```

## Design Patterns

### Singleton Pattern

Used for core services (API, authentication, logging) to ensure single instance across app.

### Lazy Loading Pattern

Feature modules are lazy loaded to reduce initial bundle size and improve load time.

### Module Pattern

Clear separation between core, shared, and feature modules for better organization.

### Component Communication

- **Input/Output** - Parent-child communication
- **Services** - Cross-component communication
- **RxJS Subjects** - Complex state management

## Routing Strategy

- **Hash-based routing** not used (cleaner URLs)
- **Lazy loading** for all feature modules
- **Route guards** for protected routes
- **Preloading strategy** for improved UX

## State Management

Currently using Angular services for state management. Can be upgraded to NgRx if complexity grows.

## Build Configuration

### Development

- Source maps enabled
- No optimization
- Fast rebuilds

### Production

- AOT compilation
- Tree shaking
- Minification
- Bundle budgets enforced (500kB warning, 1MB error)

## Performance Optimizations

1. **Lazy Loading** - Feature modules loaded on demand
1. **OnPush Change Detection** - For performance-critical components
1. **TrackBy Functions** - In ngFor loops
1. **Async Pipe** - Automatic subscription management
1. **Production Build** - AOT, minification, tree shaking

## Security Considerations

- **XSS Protection** - Angular sanitizes templates by default
- **CSRF Protection** - Implement in API interceptor
- **Content Security Policy** - Configure in Nginx
- **Strict TypeScript** - Enabled for type safety

## Testing Strategy

- **Unit Tests** - Vitest for component and service testing
- **E2E Tests** - Framework TBD (Cypress or Playwright recommended)
- **Code Coverage** - Target 80%+ coverage

## Scalability

The architecture supports growth through:

- Modular feature organization
- Lazy loading for performance
- Clear separation of concerns
- Reusable shared components
- Service-based state management

## Guidelines

- **Core Module:** Import only once, contains singletons
- **Shared Module:** Import in features, contains reusables
- **Feature Modules:** Use lazy loading for optimal performance
- **Styling:** Follow warm, professional aesthetic
- **Responsive Design:** Mobile-first approach with accessibility
