# Features

This document describes the implemented features of the Larios Income Tax website.

## Navigation

### Header

**Location:** `src/app/shared/components/header/`

The site header provides consistent navigation across all pages:

- **Two-tier design:**
  - Top section (white background): Business logo and title
  - Bottom section (dark background): Navigation, contact info, social media
- **Navigation menu** with dropdown for Contact:
  - Home
  - Services
  - Contact (dropdown)
    - United States
    - Mexico
  - _(Book Online temporarily disabled - will be re-enabled in the future)_
- **Contact information:** Email and phone displayed in header
- **Social media icons:** Facebook and Instagram with hover effects
- **Sticky positioning:** Header remains visible during scroll
- **Responsive design:** Adapts to mobile, tablet, and desktop screens

### Footer

**Location:** `src/app/shared/components/footer/`

The site footer displays business locations and copyright:

- **Two-tier design:**
  - Top section: Dual location display
    - San Diego, CA location with address, email, phone
    - Tijuana, B.C. location with address
  - Bottom section: Copyright notice
- **White background** with thin black divider line
- **Responsive layout:** Stacks vertically on mobile devices

## Landing Page

**Location:** `src/app/features/home/pages/home-page/`

### Hero Section

**Component:** `src/app/features/home/components/hero/`

- **Parallax background:** Fixed background image creates depth effect
- **Business branding:** Prominent display of business name and tagline
- **Call-to-action button:** "View Our Services" with smooth scroll to services section
- **Typography:** Large, bold heading with professional styling
- **Responsive:** Background and text scale appropriately on all devices

### Services Overview

**Component:** `src/app/features/home/components/services-overview/`

Showcases three main service offerings:

1. **Tax Preparation** - Individual and business tax filing
2. **Immigration Services** - Immigration assistance and documentation
3. **Translations** - Professional translation services

Each service displays:

- Service title
- Brief description
- AVIF image for optimal compression
- Responsive grid layout (3 columns desktop, 1 column mobile)

### Contact Section

**Component:** `src/app/features/home/components/contact-section/`

- **Contact form** with fields: Name, Email, Subject, Message, Submit button
- **Dual location display:**
  - San Diego, CA: Address, email, phone
  - Tijuana, B.C.: Address
- **Social media integration:** Facebook and Instagram icons
- **Form styling:** Minimalist design with bottom borders only
- **Responsive layout:** Form and contact info stack on mobile

## Services Page

**Location:** `src/app/features/services/pages/services-page/`

Detailed information about four service offerings in alternating layout:

1. **Tax Preparation**
   - Individual tax returns
   - Business tax filing
   - Tax planning and consultation

2. **Immigration Services**
   - Immigration documentation
   - Visa assistance
   - Citizenship applications

3. **Notary Services**
   - Document notarization
   - Certified translations
   - Legal documentation

4. **Translations**
   - Professional translation services
   - Multiple language support
   - Certified translations

**Design:**

- Alternating image-left/image-right layout using CSS Grid
- Service images in AVIF format
- Service descriptions with detailed bullet points
- Responsive: Stacks vertically on mobile devices

## Service Detail Pages

> **Note:** Online booking functionality is temporarily disabled. Service detail pages are currently accessible through
> the `/services` route. Booking functionality will be re-enabled in a future update.

**Location:** `src/app/features/services/pages/service-detail-page/`

Dynamic detail page for each service, accessible via service cards on the Services page:

**Routes:**

- `/services/tax-preparation`
- `/services/immigration-services`
- `/services/translations`
- `/services/e-file-rapid-refund`
- `/services/dual-citizenship`
- `/services/us-citizenship`
- `/services/global-entry-sentri`
- `/services/itins`
- `/services/tourist-visas`

**Content:**

- Service title
- Two info chips: Duration, Consultation type
- "Call Us For an Appointment" button (links to US office phone number)
- Service image
- Service description section with detailed information

**Implementation:**

- Single component template with dynamic data
- Route parameter determines which service to display
- Error handling for invalid service IDs
- Service-specific SEO metadata and structured data

## Contact Pages

**Location:** `src/app/features/contact/pages/contact-page/`

Bilingual contact pages with location-specific data and Google Maps integration.

### Routes

- `/contact` → redirects to `/contact/united-states`
- `/contact/united-states` - English version
- `/contact/mexico` - Spanish version

### United States Contact Page

**Language:** English

**Content:**

- Heading: "CONTACT US"
- Subheading: "Contact us to see how our expertise and personalized services can save you time, money, and frustration."
- Professional team image
- Contact form with validation:
  - Name (required)
  - Email (required, email format validation)
  - Subject (required)
  - Message (required)
  - Submit button (disabled when form invalid)
- Contact information:
  - Address: 3317 El Cajon Blvd San Diego CA United States 92104
  - Email: <lariosincometax@gmail.com>
  - Phone: (619) 972-3350
- Google Maps iframe with San Diego location

### Mexico Contact Page

**Language:** Spanish

**Content:**

- Heading: "CONTÁCTENOS"
- Subheading: "Contáctenos para ver cómo nuestra experiencia y servicios personalizados
  pueden ahorrarle tiempo, dinero y frustraciones."
- Professional team image
- Contact form (Spanish labels):
  - Nombre (required)
  - Correo Electrónico (required, email format validation)
  - Asunto (required)
  - Mensaje (required)
  - Enviar button (disabled when form invalid)
- Contact information:
  - Address: Av. Las Plazas No. 17101-1 Fracc Rinconada De Otay Tijuana, B.C
  - Email: <lariosincometax@gmail.com>
  - Phone: (619) 972-3350
- Google Maps iframe with Tijuana location

### Technical Implementation

- **Reactive forms** with Angular FormBuilder and validators
- **Location-based data structures** with bilingual labels
- **SafePipe** custom pipe for sanitizing Google Maps iframe URLs
- **Route parameters** determine which location data to display
- **Brown/tan background** matching brand aesthetic
- **Responsive layout:** Form and map stack on mobile devices

## Shared Components & Utilities

### SafePipe

**Location:** `src/app/shared/pipes/safe-pipe.ts`

Custom pipe for bypassing Angular's security sanitization:

- Used for Google Maps iframe URLs
- Implements `DomSanitizer.bypassSecurityTrustResourceUrl()`
- Standalone pipe for easy importing

### Social Media Constants

**Location:** `src/app/shared/constants/social-media.constants.ts`

Frozen constants for social media URLs:

```typescript
export const SOCIAL_MEDIA_LINKS = Object.freeze({
  facebook: 'https://www.facebook.com/Larios-income-tax-and-immigration-1579801562253516/',
  instagram: 'https://www.instagram.com/lariosincometaxandimmigration/',
} as const);
```

- Immutable using `Object.freeze()`
- Used in Header and ContactSection components
- Centralized for DRY principle

## Design System

### Colors

- **Primary Text:** Dark brown/black (`--color-primary-text`)
- **Background:** White (`--color-background`)
- **Accent:** Beige/tan (`--color-accent-beige`)

### Typography

- **Font Family:** brandon-grot-w01-light, sans-serif
- **Headings:** Light weight (300), letter-spacing 0.05em
- **Body Text:** Regular weight (400), line-height 1.6

### Spacing

CSS variables for consistent spacing:

- `--spacing-sm`: 0.5rem
- `--spacing-md`: 1rem
- `--spacing-lg`: 2rem
- `--spacing-xl`: 4rem

### Images

- **Format:** AVIF for optimal compression
- **Location:** `/public/assets/images/`
- **Favicon:** tax-icon.avif (same as header logo)

## Responsive Design

All pages and components are responsive:

- **Mobile-first approach:** Base styles for mobile, media queries for larger screens
- **Breakpoints:**
  - 640px: Small tablets
  - 768px: Medium tablets
  - 968px: Small desktops
  - 1200px: Large desktops
- **Grid layouts:** Automatically adjust columns based on screen size
- **Typography scaling:** Font sizes reduce on smaller screens
- **Navigation:** Wraps and centers on mobile devices

## Testing

All features include comprehensive unit tests:

- **Total Tests:** 74 passing tests
- **Coverage:** Components, user interactions, routing, form validation
- **Test Framework:** Vitest
- **Test Files:**
  - Header: 9 tests
  - Contact Section: 8 tests
  - Social Media Constants: 4 tests
  - Book Online Page: 11 tests
  - Service Detail Page: 13 tests
  - Contact Page: 27 tests (including bilingual tests)
  - App: 2 tests

## Future Enhancements

Placeholder implementations for future development:

- **Online booking system:** Service detail pages currently link to phone number; future implementation will include
  online appointment scheduling
- **Form submission:** Contact forms ready for backend integration
- **E2E testing:** Framework to be added (Cypress or Playwright)
- **Analytics integration:** Google Analytics or similar
- **SEO optimization:** Meta tags, structured data
- **Performance monitoring:** Real User Monitoring (RUM)
