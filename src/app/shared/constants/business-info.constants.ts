/**
 * Centralized Business Information Constants
 * Single source of truth for all Larios Income Tax business information
 */

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  formatted: string;
  formattedShort?: string;
}

export interface ContactInfo {
  phone: string;
  phoneFormatted: string;
  phoneLink: string;
  email: string;
  emailLink: string;
}

export interface LocationInfo {
  name: string;
  address: Address;
  contact: ContactInfo;
  mapEmbed: string;
  additionalPhones?: string[];
}

export interface BusinessInfo {
  name: string;
  nameFull: string;
  tagline: string;
  locations: {
    us: LocationInfo;
    mexico: LocationInfo;
  };
  socialMedia: {
    facebook: string;
    instagram: string;
  };
}

/**
 * Main business information object
 * Update this single location to change business info across the entire application
 */
export const BUSINESS_INFO: BusinessInfo = {
  name: 'Larios Income Tax',
  nameFull: 'Larios Income Tax and Immigration',
  tagline: 'Feel the Larios Income Tax and Immigration Difference',

  locations: {
    us: {
      name: 'United States Office',
      address: {
        street: '3317 El Cajon Blvd',
        city: 'San Diego',
        state: 'CA',
        zip: '92104',
        country: 'United States',
        formatted: '3317 El Cajon Blvd San Diego CA United States 92104',
        formattedShort: '3317 El Cajon Blvd, San Diego, CA 92104, USA',
      },
      contact: {
        phone: '6199723350',
        phoneFormatted: '(619) 972-3350',
        phoneLink: 'tel:+16199723350',
        email: 'lariosincometax@gmail.com',
        emailLink: 'mailto:lariosincometax@gmail.com',
      },
      mapEmbed:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3356.5897544985876!2d-117.10524328481468!3d32.75788398098057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d9535fabc2d28f%3A0x78363cb93e9be632!2s3317%20El%20Cajon%20Blvd%2C%20San%20Diego%2C%20CA%2092104!5e0!3m2!1sen!2sus!4v1625157600000!5m2!1sen!2sus',
      additionalPhones: ['(619) 949-8007'], // WhatsApp
    },
    mexico: {
      name: 'Mexico Office',
      address: {
        street: 'Av. Las Plazas No. 17101-1',
        city: 'Tijuana',
        state: 'B.C',
        zip: '',
        country: 'Mexico',
        formatted: 'Av. Las Plazas No. 17101-1 Fracc Rinconada De Otay Tijuana, B.C',
        formattedShort: 'Av. Las Plazas No. 17101-1 Fracc Rinconada De Otay Tijuana, B.C',
      },
      contact: {
        phone: '6199498007',
        phoneFormatted: '(619) 949-8007',
        phoneLink: 'tel:+16199498007',
        email: 'alianzalatina18@gmail.com',
        emailLink: 'mailto:alianzalatina18@gmail.com',
      },
      mapEmbed:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3365.0924847384447!2d-116.97138468481978!3d32.520836580643805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d948b8e8f0f9c9%3A0x5c5f5c5f5c5f5c5f!2sAv.%20Las%20Plazas%2017101%2C%20Rinconada%20de%20Otay%2C%2022106%20Tijuana%2C%20B.C.%2C%20Mexico!5e0!3m2!1sen!2sus!4v1625157700000!5m2!1sen!2sus',
      additionalPhones: ['(664) 623-1817'],
    },
  },

  socialMedia: {
    facebook: 'https://www.facebook.com/Larios-income-tax-and-immigration-1579801562253516/',
    instagram: 'https://www.instagram.com/lariosincometaxandimmigration/',
  },
};

/**
 * Helper functions for common business info operations
 */

export function getUSLocation(): LocationInfo {
  return BUSINESS_INFO.locations.us;
}

export function getMexicoLocation(): LocationInfo {
  return BUSINESS_INFO.locations.mexico;
}

export function getLocationByKey(key: 'us' | 'mexico'): LocationInfo {
  return BUSINESS_INFO.locations[key];
}

export function getPrimaryPhone(): string {
  return BUSINESS_INFO.locations.us.contact.phoneFormatted;
}

export function getPrimaryEmail(): string {
  return BUSINESS_INFO.locations.us.contact.email;
}

export function getBusinessName(): string {
  return BUSINESS_INFO.name;
}

export function getBusinessNameFull(): string {
  return BUSINESS_INFO.nameFull;
}

export function getSocialMediaLinks() {
  return BUSINESS_INFO.socialMedia;
}

export function getCopyright(): string {
  const currentYear = new Date().getFullYear();
  return `© 2024-${currentYear} BY LARIOS INCOME TAX AND IMMIGRATION.`;
}
