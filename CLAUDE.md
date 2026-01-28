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
ng serve            # Start development server (default locale: en-US)
npm run start:en    # Start development server in English
npm run start:es    # Start development server in Spanish
ng build            # Build for production (both locales)
npm run build:i18n  # Build for production (both locales)
npm run build:en    # Build English locale only
npm run build:es    # Build Spanish locale only
ng test             # Run unit tests
ng test --include='**/path/to/component.spec.ts'  # Run single test file
ng e2e              # Run end-to-end tests
ng lint             # Run linter
```

### Internationalization (i18n)

```bash
npm run extract-i18n  # Extract translatable text from templates and code
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

> **Note**: Online booking functionality is temporarily disabled. Service detail pages are currently accessible through
> the `/services` route. Booking functionality will be re-enabled in a future update.

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
     briefDescription: 'Short 1-2 sentence description for the services list page.',
     description: 'Comprehensive, detailed description that explains the service thoroughly. This appears on the service detail page and should be 3-5 sentences.',
   }
   ```

2. **Add the service image**:
   - Place the image in `/public/assets/images/`
   - Or use the placeholder: `/assets/images/larios_tax_logo_transparent.avif`

3. **That's it!** The service will automatically appear on:
   - **Services Page** (`/services`) - All services displayed in a 2-column grid (large screens) with brief descriptions
   - **Service Detail Page** (`/services/:id`) - Full service details with elaborate description
   - **Home Page** (`/`) - Only if `featured: true`

#### User Navigation Flow

Users can access service details by:

1. **From Services Page** (`/services`): Click any service card to navigate to its detail page (`/services/:id`)

#### Layout Features

- **Services Page**: Displays 2 cards side-by-side on large screens (>1024px), single column on smaller screens
- **Brief Descriptions**: Shown on services list page to give quick overview
- **Detailed Descriptions**: Shown on service detail page under "About This Service" section

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
  briefDescription: string; // Brief description for services list page
  description: string; // Detailed description for service detail page
}
```

**Description Fields:**

- `briefDescription`: Short, concise description (1-2 sentences) displayed on the services list page
- `description`: Comprehensive, detailed description displayed on the service detail page

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

## Internationalization (i18n) Architecture

The application is fully bilingual, supporting both **English (en-US)** and **Spanish (es-MX)** using Angular's built-in
i18n system.

### Overview

- **Primary Market**: United States (English)
- **Secondary Market**: Mexico (Spanish)
- **Default Locale**: English (en-US)
- **URL Structure**:
  - English: `https://lariosincometax.com/` (root)
  - Spanish: `https://lariosincometax.com/es/` (under `/es/` path)

### Locale-Aware Features

#### Language Switcher

The header includes a language switcher component with flag buttons:

- **🇺🇸 US Flag**: Switches to English
- **🇲🇽 Mexico Flag**: Switches to Spanish

The active language is highlighted, and clicking switches the locale by navigating to the appropriate URL path.

#### Contact Page Behavior

The contact page automatically displays the appropriate office based on the current locale:

- **English (en-US)**: Shows United States office (San Diego)
- **Spanish (es-MX)**: Shows Mexico office (Tijuana)

No URL parameter needed - the locale determines which office information to display.

### Technical Implementation

#### Build Configuration

The project uses Angular's i18n compile-time translation approach:

**angular.json Configuration:**

```json
{
  "i18n": {
    "sourceLocale": "en-US",
    "locales": {
      "es-MX": {
        "translation": "src/locale/messages.es-MX.xlf",
        "baseHref": "/es/"
      }
    }
  }
}
```

**Build Output Structure:**

```text
dist/larios-income-tax/
├── browser/
│   ├── en-US/          # English build
│   │   └── index.html
│   └── es-MX/          # Spanish build
│       └── index.html
└── ...
```

#### Translation Files

Translation files are stored in XLIFF 1.2 format:

- **Source**: `src/locale/messages.xlf` (English, auto-generated)
- **Spanish**: `src/locale/messages.es-MX.xlf` (manually translated)

#### Adding Translations

**1. Mark text for translation in templates:**

```html
<h1 i18n="Context|Description">Text to translate</h1>
<img [alt]="dynamicValue" i18n-alt="Context|Description" />
```

**2. Mark text for translation in TypeScript:**

```typescript
import { $localize } from '@angular/localize/init';

const text = $localize`:Context|Description:Text to translate`;
```

**3. Extract messages:**

```bash
npm run extract-i18n
```

This updates `src/locale/messages.xlf` with new translation units.

**4. Add Spanish translations:**

Edit `src/locale/messages.es-MX.xlf` and add `<target>` elements:

```xml
<trans-unit id="..." datatype="html">
  <source>English text</source>
  <target>Texto en español</target>
  <context-group purpose="location">...</context-group>
  <note priority="1" from="description">Description</note>
</trans-unit>
```

**5. Test the translation:**

```bash
npm run build:es       # Build Spanish version
npm run start:es       # Test Spanish in development
```

#### SEO and Hreflang

All pages include proper hreflang links for SEO:

```typescript
alternateLocales: [
  { hreflang: 'en-US', href: 'https://lariosincometax.com/' },
  { hreflang: 'es-MX', href: 'https://lariosincometax.com/es/' },
];
```

These are automatically injected into the `<head>` by the `SeoService`.

#### Azure Static Web Apps Configuration

The `staticwebapp.config.json` handles locale routing:

- Requests to `/` serve English content from `/browser/en-US/`
- Requests to `/es/` serve Spanish content from `/browser/es-MX/`
- SPA fallback routes work within each locale

### Translation Management

#### Service Descriptions

All service titles, durations, and descriptions in `services.constants.ts` use `$localize`:

```typescript
{
  id: 'tax-preparation',
  title: $localize`:Services|Tax Preparation service title:Tax Preparation`,
  description: $localize`:Services|Tax Preparation full description:Our professional tax preparation services...`,
  // ...
}
```

#### Current Translation Coverage

- ✅ Header navigation
- ✅ Footer content
- ✅ Home page (hero, services overview, contact section)
- ✅ Services page
- ✅ Service detail pages (all 9 services)
- ✅ Contact page (forms, labels, office info)
- ✅ All service descriptions and metadata
- ✅ SEO metadata (titles, descriptions, keywords)

### Development Workflow

1. **Add new feature with text**:
   - Use `i18n` attributes in templates
   - Use `$localize` in TypeScript code

2. **Extract new translations**:

   ```bash
   npm run extract-i18n
   ```

3. **Add Spanish translations** to `messages.es-MX.xlf`

4. **Test both locales**:

   ```bash
   npm run start:en   # Test English
   npm run start:es   # Test Spanish
   ```

5. **Build for production**:

   ```bash
   npm run build:i18n  # Builds both locales
   ```

### Notes

- **Compile-time translation**: Translations are embedded at build time, not runtime
- **No language detection**: Users must manually switch languages via the flag switcher
- **Separate builds**: Each locale is a completely separate Angular application build
- **No shared code at runtime**: English and Spanish builds are independent
- **SEO friendly**: Each locale has its own URL structure and proper hreflang tags
