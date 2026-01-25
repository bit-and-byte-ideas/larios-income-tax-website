# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Frontend website for lariosincometax.com - an Angular-based web application for income tax services.

## Technology Stack

- **Framework**: Angular
- **Language**: TypeScript

## Common Commands

### Development

```bash
npm install          # Install dependencies
ng serve            # Start development server
ng build            # Build for production
ng test             # Run unit tests
ng test --include='**/path/to/component.spec.ts'  # Run single test file
ng e2e              # Run end-to-end tests
ng lint             # Run linter
```

### Angular CLI

```bash
ng generate component <name>   # Generate new component
ng generate service <name>     # Generate new service
ng generate module <name>      # Generate new module
```

## Architecture Notes

This is a new project with minimal code. When implementing features:

- Follow Angular best practices and style guide
- Use Angular CLI for generating components, services, and modules
- Organize features into modules for scalability
- Place shared components, services, and utilities in a `shared/` directory
- Place core services (singleton services) in a `core/` module
- Use lazy loading for feature modules to optimize bundle size

## Environment Configuration

Environment-specific configurations should be placed in `.env` files (excluded from version control per .gitignore).

## Services Management

### Centralized Services System

The application uses a centralized services catalog defined in
`src/app/shared/constants/services.constants.ts`. This is the **single source of truth** for all
business services.

#### Adding a New Service

To add a new service to the application:

1. **Add the service to the constants file**:

   ```typescript
   // src/app/shared/constants/services.constants.ts
   {
     id: 'new-service-id',           // Unique identifier (kebab-case)
     title: 'New Service Name',       // Display title
     image: '/assets/images/new-service.avif',  // Image path
     duration: '1 hr',                // Service duration
     consultation: 'Free Consultation',
     featured: true,                  // Set to true to show on home page
     description: 'Service description for future use',
   }
   ```

2. **Add the service image**:
   - Place the image in `/public/assets/images/`
   - Or use the placeholder: `/assets/images/larios_tax_logo_transparent.avif`

3. **That's it!** The service will automatically appear on:
   - **Services Page** (`/services`) - All services are displayed
   - **Book Online Page** (`/book-online`) - All services are available for booking
   - **Service Detail Page** (`/book-online/:id`) - Automatically populated when users click "Read More"
   - **Home Page** (`/`) - Only if `featured: true`

#### Service Model

Services follow this TypeScript interface:

```typescript
interface Service {
  id: string; // Unique identifier
  title: string; // Display title
  image: string; // Path to image
  duration: string; // Service duration
  consultation: string; // Consultation info
  featured: boolean; // Show on home page?
  description?: string; // Optional description
}
```

#### Helper Functions

The constants file provides helper functions:

- `getAllServices()` - Returns all services
- `getFeaturedServices()` - Returns only featured services
- `getServiceById(id)` - Returns a specific service by ID

#### Future API Integration

The current static array can be easily replaced with API data:

```typescript
// Future implementation example
export async function getAllServices(): Promise<Service[]> {
  const response = await fetch('/api/services');
  return response.json();
}
```

#### Current Services

1. Tax Preparation (featured)
2. Immigration Services (featured)
3. Translations (featured)
4. E-File & Rapid Refund
5. Dual Citizenship
6. U.S. Citizenship
7. Global Entry/Sentri
8. ITINs
9. Tourist Visas
