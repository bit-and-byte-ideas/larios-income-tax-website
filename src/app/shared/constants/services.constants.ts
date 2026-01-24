import { Service } from '../models/service.model';

/**
 * Centralized business services catalog for Lario's Income Tax
 *
 * This is the single source of truth for all services offered.
 * Services marked as `featured: true` will appear on the home page.
 *
 * To add a new service:
 * 1. Add a new Service object to this array
 * 2. Ensure you have an image at the specified path, or use the placeholder
 * 3. Set `featured: true` if you want it on the home page
 * 4. The service will automatically appear on the Services and Book Online pages
 *
 * Future: This array could be replaced with data from an API
 */
export const BUSINESS_SERVICES: readonly Service[] = [
  {
    id: 'tax-preparation',
    title: 'Tax Preparation',
    image: '/assets/images/tax-preparation.avif',
    duration: '50 min',
    consultation: 'Free Consultation',
    featured: true,
    description: 'Professional tax preparation services for individuals and businesses',
  },
  {
    id: 'immigration-services',
    title: 'Immigration Services',
    image: '/assets/images/immigration-services.avif',
    duration: '50 min',
    consultation: 'Free Consultation',
    featured: true,
    description: 'Comprehensive immigration assistance and documentation services',
  },
  {
    id: 'translations',
    title: 'Translations',
    image: '/assets/images/transaltion-services.avif',
    duration: '1 hr 50 min',
    consultation: 'Free Consultation',
    featured: true,
    description: 'Professional translation services for legal and official documents',
  },
  {
    id: 'e-file-rapid-refund',
    title: 'E-File & Rapid Refund',
    image: '/assets/images/e-file-rapid-refund.avif',
    duration: '30 min',
    consultation: 'Free Consultation',
    featured: false,
    description: 'Fast electronic filing and quick refund processing',
  },
  {
    id: 'dual-citizenship',
    title: 'Dual Citizenship',
    image: '/assets/images/larios_tax_logo_transparent.avif',
    duration: '1 hr',
    consultation: 'Free Consultation',
    featured: false,
    description: 'Assistance with dual citizenship applications and documentation',
  },
  {
    id: 'us-citizenship',
    title: 'U.S. Citizenship',
    image: '/assets/images/larios_tax_logo_transparent.avif',
    duration: '1 hr',
    consultation: 'Free Consultation',
    featured: false,
    description: 'Guidance and support for U.S. citizenship applications',
  },
  {
    id: 'global-entry-sentri',
    title: 'Global Entry/Sentri',
    image: '/assets/images/larios_tax_logo_transparent.avif',
    duration: '45 min',
    consultation: 'Free Consultation',
    featured: false,
    description: 'Application assistance for Global Entry and SENTRI trusted traveler programs',
  },
  {
    id: 'itins',
    title: 'ITINs',
    image: '/assets/images/larios_tax_logo_transparent.avif',
    duration: '40 min',
    consultation: 'Free Consultation',
    featured: false,
    description: 'Individual Taxpayer Identification Number application and renewal services',
  },
  {
    id: 'tourist-visas',
    title: 'Tourist Visas',
    image: '/assets/images/larios_tax_logo_transparent.avif',
    duration: '45 min',
    consultation: 'Free Consultation',
    featured: false,
    description: 'Tourist visa application support and documentation assistance',
  },
] as const;

/**
 * Helper function to get services filtered by featured status
 */
export function getFeaturedServices(): Service[] {
  return BUSINESS_SERVICES.filter(service => service.featured);
}

/**
 * Helper function to get all services
 */
export function getAllServices(): Service[] {
  return [...BUSINESS_SERVICES];
}

/**
 * Helper function to get a service by ID
 */
export function getServiceById(id: string): Service | undefined {
  return BUSINESS_SERVICES.find(service => service.id === id);
}
