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
    briefDescription:
      'Expert tax preparation for individuals and businesses with maximum refund guarantee.',
    description:
      'Our professional tax preparation services ensure accurate filing and maximum refunds for both individuals and businesses. We handle all tax forms including 1040, Schedule C, and corporate returns. Our experienced team stays current with the latest tax laws and deductions to optimize your return. Whether you have simple W-2 income or complex business transactions, we provide personalized service to meet your unique tax situation. We also offer year-round tax planning advice to help you make informed financial decisions.',
  },
  {
    id: 'immigration-services',
    title: 'Immigration Services',
    image: '/assets/images/immigration-services.avif',
    duration: '50 min',
    consultation: 'Free Consultation',
    featured: true,
    briefDescription:
      'Comprehensive immigration assistance including visa applications, green cards, and family petitions.',
    description:
      'Navigate the complex immigration process with confidence through our comprehensive immigration services. We assist with family-based petitions, employment visas, green card applications, naturalization, DACA renewals, and adjustment of status. Our knowledgeable team provides step-by-step guidance through each stage of your immigration journey, ensuring all paperwork is completed accurately and submitted on time. We help you understand your options, prepare required documentation, and communicate effectively with USCIS. Let us handle the details while you focus on building your future in the United States.',
  },
  {
    id: 'translations',
    title: 'Translations',
    image: '/assets/images/transaltion-services.avif',
    duration: '1 hr 50 min',
    consultation: 'Free Consultation',
    featured: true,
    briefDescription:
      'Certified translation services for legal, immigration, and official documents.',
    description:
      'Professional translation services for all your legal, immigration, and official document needs. We provide certified translations that are accepted by USCIS, courts, universities, and government agencies. Our experienced translators handle birth certificates, marriage certificates, divorce decrees, academic transcripts, financial documents, contracts, and more. Each translation is carefully reviewed for accuracy and includes a certificate of translation authenticity. We maintain strict confidentiality and ensure quick turnaround times without compromising quality. Trust us to bridge language barriers for your important documentation.',
  },
  {
    id: 'e-file-rapid-refund',
    title: 'E-File & Rapid Refund',
    image: '/assets/images/e-file-rapid-refund.avif',
    duration: '30 min',
    consultation: 'Free Consultation',
    featured: false,
    briefDescription: 'Fast electronic filing with IRS-approved rapid refund options.',
    description:
      'Get your tax refund faster with our electronic filing and rapid refund services. We submit your return electronically directly to the IRS, reducing processing time significantly compared to paper filing. Our rapid refund options can get money in your hands within days, not weeks. We partner with trusted financial institutions to provide refund advance loans for qualifying taxpayers. Track your refund status in real-time and receive notifications when your return is accepted. All e-filing is secure, encrypted, and IRS-approved for your peace of mind.',
  },
  {
    id: 'dual-citizenship',
    title: 'Dual Citizenship',
    image: '/assets/images/larios_tax_logo_transparent.avif',
    duration: '1 hr',
    consultation: 'Free Consultation',
    featured: false,
    briefDescription: 'Expert guidance for obtaining and maintaining dual citizenship status.',
    description:
      'Explore the benefits and requirements of dual citizenship with our expert guidance. We help you understand eligibility requirements, gather necessary documentation, and navigate the application process for dual nationality. Whether you are seeking to reclaim citizenship by descent, establish dual status through marriage, or maintain citizenship ties to your country of origin, we provide comprehensive support. Our services include document authentication, application preparation, and ongoing consultation throughout the process. We explain the rights, responsibilities, and potential implications of holding dual citizenship to help you make informed decisions.',
  },
  {
    id: 'us-citizenship',
    title: 'U.S. Citizenship',
    image: '/assets/images/larios_tax_logo_transparent.avif',
    duration: '1 hr',
    consultation: 'Free Consultation',
    featured: false,
    briefDescription: 'Complete support for naturalization and U.S. citizenship applications.',
    description:
      'Achieve your dream of becoming a U.S. citizen with our comprehensive naturalization services. We guide you through every step of the citizenship process, from determining eligibility to preparing for your interview and oath ceremony. Our services include Form N-400 preparation, documentation gathering, interview preparation with practice questions, and civics test study support. We help ensure your application is complete and accurate to avoid delays or denials. Our team stays with you throughout the entire process, providing encouragement and expert advice. Start your journey to U.S. citizenship with confidence.',
  },
  {
    id: 'global-entry-sentri',
    title: 'Global Entry/Sentri',
    image: '/assets/images/larios_tax_logo_transparent.avif',
    duration: '45 min',
    consultation: 'Free Consultation',
    featured: false,
    briefDescription:
      'Application assistance for trusted traveler programs to expedite border crossings.',
    description:
      'Streamline your travel experience with Global Entry and SENTRI trusted traveler programs. We assist with the complete application process for these U.S. Customs and Border Protection programs that expedite clearance for pre-approved, low-risk travelers. Global Entry provides expedited processing through U.S. customs, while SENTRI offers dedicated lanes at the U.S.-Mexico border. Our service includes application completion, document preparation, background check support, and interview scheduling assistance. We help you understand program benefits, eligibility requirements, and the renewal process. Save hours at the border and airport with these valuable programs.',
  },
  {
    id: 'itins',
    title: 'ITINs',
    image: '/assets/images/larios_tax_logo_transparent.avif',
    duration: '40 min',
    consultation: 'Free Consultation',
    featured: false,
    briefDescription:
      'Individual Taxpayer Identification Number applications and renewals for tax filing.',
    description:
      'Obtain or renew your Individual Taxpayer Identification Number (ITIN) for federal tax reporting purposes. ITINs are essential for individuals who have tax filing or reporting requirements but do not qualify for a Social Security Number. We assist with new ITIN applications, renewals for expired numbers, and dependent ITINs for family members. As IRS-authorized Certifying Acceptance Agents, we can authenticate your original documents, so you do not have to mail them to the IRS. Our service includes Form W-7 preparation, document certification, and application submission. We ensure your ITIN application is processed correctly and efficiently.',
  },
  {
    id: 'tourist-visas',
    title: 'Tourist Visas',
    image: '/assets/images/larios_tax_logo_transparent.avif',
    duration: '45 min',
    consultation: 'Free Consultation',
    featured: false,
    briefDescription: 'Tourist visa application support for visitors to the United States.',
    description:
      'Plan your visit to the United States with our tourist visa application support services. We help with B-1/B-2 visitor visa applications for tourism, family visits, medical treatment, or business activities. Our services include DS-160 form completion, visa interview preparation, supporting documentation guidance, and consular appointment scheduling. We help you demonstrate strong ties to your home country and clearly state the purpose of your visit to maximize approval chances. Our team provides country-specific advice based on your circumstances and helps you avoid common mistakes that lead to visa denials. Make your U.S. travel plans a reality.',
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
