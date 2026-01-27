/**
 * Development Environment Configuration
 *
 * This file contains environment-specific settings for development.
 * Values here are used when running `ng serve` or building without production flag.
 */

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
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
    enabled: false,
    trackingId: '',
  },
};
