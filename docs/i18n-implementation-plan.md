# Internationalization (i18n) Implementation Plan

## Overview

This document outlines the plan to implement bilingual support (English/Spanish) for the Larios Income Tax website using
Angular's built-in i18n (@angular/localize).

## Architecture

### URL Structure (SEO-Optimized)

- **English (Primary)**: `https://lariosincometax.com/` - Default locale
- **Spanish**: `https://lariosincometax.com/es/` - Spanish locale

### Technology Stack

- **Framework**: Angular i18n (@angular/localize)
- **Build Strategy**: Separate builds per locale (en-US, es-MX)
- **Deployment**: Azure Static Web Apps with locale-based routing
- **SEO**: hreflang tags, locale-specific sitemaps

## Requirements

### Content Strategy

1. **Footer**: Show both US and Mexico locations in both languages
2. **Contact Page**:
   - English version: Show US office only
   - Spanish version: Show Mexico office only
3. **Services**: Translate all service titles and descriptions
4. **Primary Market**: US/English (default)

### User Experience

- Language switcher in header with US/MX flags
- Contact menu becomes single link (no submenu)
- Automatic locale detection based on URL path
- Language persistence across navigation

## Implementation Phases

### Phase 1: Setup & Configuration ✅ COMPLETED

- [x] Install @angular/localize
- [ ] Configure angular.json for multi-locale builds
- [ ] Update package.json build scripts
- [ ] Configure source locale and target locales

### Phase 2: Template Preparation

- [ ] Add i18n attributes to header component
- [ ] Add i18n attributes to footer component
- [ ] Add i18n attributes to home page components
- [ ] Add i18n attributes to services pages
- [ ] Add i18n attributes to contact page
- [ ] Add i18n descriptions for context

### Phase 3: Translation Extraction

- [ ] Run `ng extract-i18n` to generate messages.xlf
- [ ] Review extracted messages for completeness
- [ ] Verify all user-facing text is marked for translation
- [ ] Check for missing i18n attributes

### Phase 4: Spanish Translation

- [ ] Create messages.es-MX.xlf translation file
- [ ] Translate navigation menu items
- [ ] Translate all service titles and descriptions
- [ ] Translate form labels and buttons
- [ ] Translate error messages and validation
- [ ] Translate footer content
- [ ] Quality check all translations

### Phase 5: Language Switcher Component

- [ ] Create language-switcher component
- [ ] Add US and Mexico flag assets
- [ ] Implement locale detection logic
- [ ] Add switcher to header component
- [ ] Style switcher for desktop and mobile
- [ ] Test locale switching functionality

### Phase 6: Contact Page Refactor

- [ ] Remove location routing parameter
- [ ] Update contact page to use locale
- [ ] Show US office for English locale
- [ ] Show Mexico office for Spanish locale
- [ ] Update header navigation (remove Contact dropdown)
- [ ] Update contact page tests

### Phase 7: SEO Implementation

- [ ] Add hreflang links to index.html per locale
- [ ] Create locale-specific sitemaps
- [ ] Update meta tags per locale
- [ ] Add alternate link tags
- [ ] Configure locale-specific structured data
- [ ] Test SEO tags in both locales

### Phase 8: Build Configuration

- [ ] Update angular.json build configurations
- [ ] Configure localize options for each locale
- [ ] Update build scripts in package.json
- [ ] Test local builds for both locales
- [ ] Verify output directory structure

### Phase 9: Azure Static Web Apps Configuration

- [ ] Update staticwebapp.config.json for locale routing
- [ ] Configure route rules for /es/\* paths
- [ ] Test fallback routes
- [ ] Update deployment workflow
- [ ] Configure locale-specific rewrites

### Phase 10: Testing

- [ ] Test all routes in English locale
- [ ] Test all routes in Spanish locale
- [ ] Test language switcher
- [ ] Test SEO tags and hreflang
- [ ] Test contact page in both locales
- [ ] Verify footer shows both locations
- [ ] Run all unit tests
- [ ] Update failing tests for i18n

### Phase 11: Deployment

- [ ] Update GitHub Actions workflows
- [ ] Configure build to output both locales
- [ ] Update deployment scripts
- [ ] Deploy to development environment
- [ ] Verify both locales accessible
- [ ] Test language switching in production

### Phase 12: Documentation

- [ ] Update CLAUDE.md with i18n guidelines
- [ ] Document translation workflow
- [ ] Create i18n developer guide
- [ ] Update architecture.md
- [ ] Update features.md
- [ ] Create translation maintenance guide

## Technical Details

### File Structure

```text
src/
├── locale/
│   ├── messages.xlf (source - English)
│   └── messages.es-MX.xlf (Spanish translations)
├── app/
│   └── shared/
│       └── components/
│           └── language-switcher/
├── assets/
│   └── images/
│       ├── flag-us.svg
│       └── flag-mx.svg
```

### Build Output Structure

```text
dist/
└── larios-income-tax/
    ├── browser/ (en-US - default)
    └── es/
        └── browser/ (es-MX)
```

### Angular.json Configuration

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
  },
  "build": {
    "configurations": {
      "production": {
        "localize": true
      },
      "en-US": {
        "localize": ["en-US"]
      },
      "es-MX": {
        "localize": ["es-MX"]
      }
    }
  }
}
```

### Azure Static Web Apps Routing

```json
{
  "routes": [
    {
      "route": "/es/*",
      "rewrite": "/es/index.html"
    },
    {
      "route": "/*",
      "rewrite": "/index.html"
    }
  ],
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/es/*"]
  }
}
```

### SEO Implementation

```html
<!-- English version -->
<link rel="alternate" hreflang="en-US" href="https://lariosincometax.com/" />
<link rel="alternate" hreflang="es-MX" href="https://lariosincometax.com/es/" />
<link rel="alternate" hreflang="x-default" href="https://lariosincometax.com/" />

<!-- Spanish version -->
<link rel="alternate" hreflang="en-US" href="https://lariosincometax.com/" />
<link rel="alternate" hreflang="es-MX" href="https://lariosincometax.com/es/" />
<link rel="alternate" hreflang="x-default" href="https://lariosincometax.com/" />
```

## Service Translations

### Services to Translate

1. **Tax Preparation** → Preparación de Impuestos
2. **Immigration Services** → Servicios de Inmigración
3. **Translations** → Traducciones
4. **E-File & Rapid Refund** → Presentación Electrónica y Reembolso Rápido
5. **Dual Citizenship** → Doble Ciudadanía
6. **U.S. Citizenship** → Ciudadanía Estadounidense
7. **Global Entry/Sentri** → Global Entry/Sentri
8. **ITINs** → ITINs (Número de Identificación Personal del Contribuyente)
9. **Tourist Visas** → Visas de Turista

### Translation Notes

- Keep technical terms like "ITIN" and "SENTRI" in English (industry standard)
- Maintain professional tone in Spanish translations
- Use Mexican Spanish conventions
- Ensure consistency in terminology across all pages

## Contact Page Logic

### English Version (`/contact`)

- Show only US office information
- Display San Diego address
- Show US phone number and email
- Google Maps embed for San Diego location
- Form labels in English

### Spanish Version (`/es/contact`)

- Show only Mexico office information
- Display Tijuana address
- Show Mexico phone numbers
- Google Maps embed for Tijuana location
- Form labels in Spanish

## Language Switcher Design

### Header Integration

- Position: Top right of header, before social icons
- Desktop: Show flag with "English" / "Español" text
- Mobile: Show flag icon only
- Behavior: Maintains current route in new locale
- Example: `/services/tax-preparation` → `/es/services/tax-preparation`

### Flag Assets

- US Flag: SVG, 24x24px
- Mexico Flag: SVG, 24x24px
- Accessible alt text in both languages

## Testing Strategy

### Unit Tests

- Test locale detection
- Test language switcher navigation
- Test contact page content per locale
- Test translated service titles

### E2E Tests (Future)

- Navigate between locales
- Verify content translation
- Test form submissions in both languages
- Verify SEO tags

### Manual Testing Checklist

- [ ] Navigate to / (English)
- [ ] Navigate to /es/ (Spanish)
- [ ] Switch language from English to Spanish
- [ ] Switch language from Spanish to English
- [ ] Verify contact page shows correct office
- [ ] Verify footer shows both locations
- [ ] Check all services translated
- [ ] Verify forms work in both languages
- [ ] Test navigation persistence across locales

## Rollback Plan

If issues arise after deployment:

1. Revert angular.json to single locale
2. Remove language switcher component
3. Restore original contact page routing
4. Redeploy English-only version
5. Debug i18n issues in development

## Success Criteria

- ✅ Both English and Spanish sites fully functional
- ✅ SEO properly configured with hreflang
- ✅ Language switcher works smoothly
- ✅ Contact page shows correct office per locale
- ✅ All services translated accurately
- ✅ Footer shows both locations in both languages
- ✅ All existing functionality preserved
- ✅ Unit tests passing
- ✅ Build and deployment successful

## Resources

- [Angular i18n Guide](https://angular.io/guide/i18n)
- [Azure Static Web Apps Routing](https://docs.microsoft.com/azure/static-web-apps/configuration)
- [hreflang Implementation](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [XLIFF Format Documentation](https://docs.oasis-open.org/xliff/xliff-core/v2.0/xliff-core-v2.0.html)

## Next Steps

1. Review this implementation plan
2. Approve approach and timeline
3. Begin Phase 2: Template Preparation
4. Execute phases sequentially
5. Test thoroughly at each phase
6. Deploy to development for UAT
7. Deploy to production

## Estimated Timeline

- **Phase 2-4** (Template & Translation): 4-6 hours
- **Phase 5-6** (Components & Routing): 2-3 hours
- **Phase 7-9** (SEO & Configuration): 2-3 hours
- **Phase 10-11** (Testing & Deployment): 2-3 hours
- **Phase 12** (Documentation): 1-2 hours

**Total Estimated Time**: 11-17 hours

## Notes

- This is a comprehensive refactor affecting the entire application
- Recommend thorough testing before production deployment
- Consider soft launch with development URL first
- Monitor SEO rankings after deployment
- Be prepared to make translation refinements based on user feedback
