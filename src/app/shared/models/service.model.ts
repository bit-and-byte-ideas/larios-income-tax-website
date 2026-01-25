/**
 * Represents a business service offered by Lario's Income Tax
 */
export interface Service {
  /** Unique identifier for the service (kebab-case) */
  id: string;

  /** Display title of the service */
  title: string;

  /** Path to the service image */
  image: string;

  /** Estimated duration of the service */
  duration: string;

  /** Consultation information */
  consultation: string;

  /** Whether this service should be featured on the home page */
  featured: boolean;

  /** Brief description displayed on services list page */
  briefDescription: string;

  /** Detailed description displayed on service detail page */
  description: string;
}
