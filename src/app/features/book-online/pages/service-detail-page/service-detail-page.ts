import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { Service } from '../../../../shared/models/service.model';
import { getServiceById } from '../../../../shared/constants/services.constants';
import { BUSINESS_INFO } from '../../../../shared/constants/business-info.constants';
import { SeoService } from '../../../../core/services/seo.service';
import { PageMetadata } from '../../../../shared/models/seo.model';
import {
  getServiceSchema,
  getBreadcrumbSchema,
} from '../../../../shared/constants/seo-schema.constants';

@Component({
  selector: 'app-service-detail-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatChipsModule],
  templateUrl: './service-detail-page.html',
  styleUrl: './service-detail-page.css',
})
export class ServiceDetailPage implements OnInit, OnDestroy {
  service: Service | null = null;
  contactAddress =
    BUSINESS_INFO.locations.us.address.formattedShort ||
    BUSINESS_INFO.locations.us.address.formatted;

  constructor(
    private route: ActivatedRoute,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const serviceId = params['id'];
      this.service = getServiceById(serviceId) || null;

      // Set SEO metadata for the specific service
      if (this.service) {
        this.setServiceSeo(this.service);
      }
    });
  }

  ngOnDestroy(): void {
    this.seoService.removeStructuredData();
  }

  onBookNow(): void {
    // Placeholder for future implementation
  }

  /**
   * Set SEO metadata dynamically based on the service
   */
  private setServiceSeo(service: Service): void {
    const seoConfig = this.getServiceSeoConfig(service);
    this.seoService.setPageMetadata(seoConfig);

    // Add structured data for this service
    this.seoService.addMultipleStructuredData([
      getServiceSchema(service),
      getBreadcrumbSchema([
        { name: 'Home', url: 'https://lariosincometax.com/' },
        { name: 'Services', url: 'https://lariosincometax.com/services' },
        { name: service.title, url: `https://lariosincometax.com/book-online/${service.id}` },
      ]),
    ]);
  }

  /**
   * Get service-specific SEO configuration
   */
  private getServiceSeoConfig(service: Service): PageMetadata {
    const baseUrl = 'https://lariosincometax.com';
    const serviceUrl = `${baseUrl}/book-online/${service.id}`;

    // Service-specific SEO metadata
    const serviceMetadata: Record<
      string,
      { title: string; description: string; keywords: string[] }
    > = {
      'tax-preparation': {
        title: 'Tax Preparation Services San Diego & Tijuana | Larios Income Tax',
        description:
          'Expert tax preparation for individuals and businesses. Maximum refund guarantee. Bilingual service in San Diego and Tijuana. Free consultation available.',
        keywords: [
          'tax preparation San Diego',
          'income tax services',
          'tax filing San Diego',
          'bilingual tax help',
          'tax return preparation',
          'tax refund',
        ],
      },
      'immigration-services': {
        title: 'Immigration Services San Diego & Tijuana | Visas, Green Cards, Citizenship',
        description:
          'Comprehensive immigration assistance including family petitions, green cards, naturalization, and DACA. Expert bilingual service in San Diego and Tijuana.',
        keywords: [
          'immigration services San Diego',
          'immigration services Tijuana',
          'visa assistance',
          'green card application',
          'naturalization help',
          'DACA services',
        ],
      },
      itins: {
        title: 'ITIN Application Services San Diego | Individual Taxpayer ID Number',
        description:
          'Professional ITIN application and renewal services. IRS-authorized Certifying Acceptance Agent. No need to mail original documents. Bilingual assistance available.',
        keywords: [
          'ITIN application services',
          'ITIN San Diego',
          'individual taxpayer identification number',
          'ITIN renewal',
          'tax ID number',
        ],
      },
      translations: {
        title: 'Certified Translation Services San Diego & Tijuana | Larios Income Tax',
        description:
          'Professional certified translation services for legal documents, immigration papers, and more. English to Spanish and Spanish to English. Fast turnaround.',
        keywords: [
          'certified translation services',
          'translation San Diego',
          'Spanish translation',
          'document translation',
          'legal translation',
        ],
      },
      'dual-citizenship': {
        title: 'Dual Citizenship Services San Diego & Tijuana | Larios Income Tax',
        description:
          'Expert assistance with dual citizenship applications. Navigate the complex process with our bilingual team serving San Diego and Tijuana.',
        keywords: [
          'dual citizenship',
          'dual citizenship application',
          'citizenship services',
          'Mexican citizenship',
          'US citizenship',
        ],
      },
      'us-citizenship': {
        title: 'U.S. Citizenship Services San Diego | Naturalization Help',
        description:
          'Complete U.S. citizenship and naturalization assistance. Preparation for citizenship test, application help, and interview coaching. Bilingual service.',
        keywords: [
          'US citizenship',
          'naturalization services',
          'citizenship test preparation',
          'naturalization interview',
          'citizenship application',
        ],
      },
      'global-entry-sentri': {
        title: 'Global Entry & SENTRI Application Services | Trusted Traveler Programs',
        description:
          'Professional assistance with Global Entry and SENTRI applications. Fast-track your border crossings. Expert guidance through the entire application process.',
        keywords: [
          'global entry',
          'SENTRI application',
          'trusted traveler program',
          'border crossing pass',
          'TSA precheck',
        ],
      },
      'e-file-rapid-refund': {
        title: 'E-File & Rapid Refund Services San Diego | Fast Tax Returns',
        description:
          'Fast electronic filing with rapid refund options. Get your tax refund in as little as 7-14 days. Secure, accurate, and convenient e-filing service.',
        keywords: [
          'e-file taxes',
          'rapid refund',
          'fast tax return',
          'electronic filing',
          'quick tax refund',
        ],
      },
      'tourist-visas': {
        title: 'Tourist Visa Services | U.S. Visitor Visa Assistance',
        description:
          'Expert assistance with U.S. tourist visa (B-2) applications. Interview preparation, documentation help, and application guidance. Bilingual service.',
        keywords: [
          'tourist visa',
          'visitor visa',
          'B-2 visa',
          'US visa application',
          'visa interview preparation',
        ],
      },
    };

    const metadata = serviceMetadata[service.id] || {
      title: `${service.title} | Larios Income Tax and Immigration`,
      description: service.description,
      keywords: [service.title, 'San Diego', 'Tijuana', 'bilingual services'],
    };

    return {
      title: metadata.title,
      description: metadata.description,
      keywords: metadata.keywords,
      url: serviceUrl,
      image: `${baseUrl}/assets/images/og-image.jpg`,
      type: 'website',
    };
  }
}
