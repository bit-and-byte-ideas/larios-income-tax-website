/**
 * Production Environment Configuration
 *
 * This file contains environment-specific settings for production.
 * Values here are used when building with `ng build` or `npm run build`.
 */

export const environment = {
  production: true,
  recaptchaSiteKey: 'YOUR_PROD_RECAPTCHA_SITE_KEY', // Replaced by GitHub Actions during build
  apiUrl: 'https://api.lariosincometax.com/api', // Update with actual production API URL
  businessInfo: {
    name: 'Larios Income Tax',
    phone: '+1 (619) 972-3350',
    email: 'info@lariosincometax.com',
    address: {
      street: '3317 El Cajon Blvd',
      city: 'San Diego',
      state: 'CA',
      zip: '92104',
    },
  },
  googleMaps: {
    apiKey: '', // Add Google Maps API key from environment variable
    defaultZoom: 15,
  },
  analytics: {
    enabled: true,
    trackingId: '', // Add Google Analytics tracking ID
  },
};
