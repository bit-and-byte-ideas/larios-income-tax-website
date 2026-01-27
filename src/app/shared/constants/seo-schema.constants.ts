import { BUSINESS_INFO } from './business-info.constants';
import { Service } from '../models/service.model';

/**
 * Organization Schema for Larios Income Tax and Immigration
 * Used on homepage and throughout the site
 */
export function getOrganizationSchema(): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://lariosincometax.com/#organization',
    name: BUSINESS_INFO.nameFull,
    alternateName: BUSINESS_INFO.name,
    url: 'https://lariosincometax.com',
    logo: 'https://lariosincometax.com/assets/images/larios_tax_logo_transparent.avif',
    description: BUSINESS_INFO.tagline,
    sameAs: [BUSINESS_INFO.socialMedia.facebook, BUSINESS_INFO.socialMedia.instagram],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS_INFO.locations.us.contact.phoneFormatted,
        contactType: 'customer service',
        areaServed: ['US', 'MX'],
        availableLanguage: ['English', 'Spanish'],
      },
    ],
  };
}

/**
 * LocalBusiness Schema for US Office (San Diego)
 */
export function getUSLocalBusinessSchema(): any {
  const usLocation = BUSINESS_INFO.locations.us;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://lariosincometax.com/contact/united-states#localbusiness',
    name: `${BUSINESS_INFO.nameFull} - San Diego`,
    image: 'https://lariosincometax.com/assets/images/larios_tax_logo_transparent.avif',
    url: 'https://lariosincometax.com',
    telephone: usLocation.contact.phoneFormatted,
    email: usLocation.contact.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: usLocation.address.street,
      addressLocality: usLocation.address.city,
      addressRegion: usLocation.address.state,
      postalCode: usLocation.address.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 32.757883,
      longitude: -117.105243,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'San Diego',
      },
      {
        '@type': 'City',
        name: 'Tijuana',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Tax and Immigration Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tax Preparation',
            description: 'Professional tax preparation and filing services',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Immigration Services',
            description: 'Comprehensive immigration assistance and visa services',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'ITIN Application',
            description: 'Individual Taxpayer Identification Number application services',
          },
        },
      ],
    },
  };
}

/**
 * LocalBusiness Schema for Mexico Office (Tijuana)
 */
export function getMexicoLocalBusinessSchema(): any {
  const mexicoLocation = BUSINESS_INFO.locations.mexico;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://lariosincometax.com/contact/mexico#localbusiness',
    name: `${BUSINESS_INFO.nameFull} - Tijuana`,
    image: 'https://lariosincometax.com/assets/images/larios_tax_logo_transparent.avif',
    url: 'https://lariosincometax.com',
    telephone: mexicoLocation.contact.phoneFormatted,
    email: mexicoLocation.contact.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: mexicoLocation.address.street,
      addressLocality: mexicoLocation.address.city,
      addressRegion: mexicoLocation.address.state,
      addressCountry: 'MX',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 32.520837,
      longitude: -116.971385,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Tijuana',
      },
      {
        '@type': 'City',
        name: 'San Diego',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Impuestos e Inmigración',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Preparación de Impuestos',
            description: 'Servicios profesionales de preparación y presentación de impuestos',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Servicios de Inmigración',
            description: 'Asistencia integral en inmigración y servicios de visa',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Aplicación de ITIN',
            description:
              'Servicios de solicitud de Número de Identificación Personal del Contribuyente',
          },
        },
      ],
    },
  };
}

/**
 * Service Schema Generator
 * Creates a Service schema for individual service pages
 */
export function getServiceSchema(service: Service): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `https://lariosincometax.com/services/${service.id}#service`,
    serviceType: service.title,
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: BUSINESS_INFO.nameFull,
      url: 'https://lariosincometax.com',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'San Diego',
        '@id': 'https://en.wikipedia.org/wiki/San_Diego',
      },
      {
        '@type': 'City',
        name: 'Tijuana',
        '@id': 'https://en.wikipedia.org/wiki/Tijuana',
      },
    ],
    availableLanguage: ['English', 'Spanish'],
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
    },
  };
}

/**
 * Breadcrumb Schema Generator
 * Creates breadcrumb navigation schema based on the current path
 */
export function getBreadcrumbSchema(breadcrumbs: { name: string; url: string }[]): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/**
 * ItemList Schema for Services Page
 * Lists all available services
 */
export function getServicesListSchema(services: Service[]): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': 'https://lariosincometax.com/services#serviceslist',
    name: 'Tax and Immigration Services',
    description: 'Complete list of services offered by Larios Income Tax and Immigration',
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        '@id': `https://lariosincometax.com/services/${service.id}#service`,
        name: service.title,
        description: service.briefDescription,
        url: `https://lariosincometax.com/services/${service.id}`,
      },
    })),
  };
}

/**
 * WebSite Schema with SearchAction
 * Helps search engines understand the site structure
 */
export function getWebSiteSchema(): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://lariosincometax.com/#website',
    url: 'https://lariosincometax.com',
    name: BUSINESS_INFO.nameFull,
    description: BUSINESS_INFO.tagline,
    publisher: {
      '@id': 'https://lariosincometax.com/#organization',
    },
    inLanguage: ['en-US', 'es-MX'],
  };
}
