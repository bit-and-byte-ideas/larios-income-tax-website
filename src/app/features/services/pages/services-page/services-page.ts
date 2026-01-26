import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { getAllServices } from '../../../../shared/constants/services.constants';
import { Service } from '../../../../shared/models/service.model';
import { SeoService } from '../../../../core/services/seo.service';
import {
  getServicesListSchema,
  getBreadcrumbSchema,
} from '../../../../shared/constants/seo-schema.constants';

@Component({
  selector: 'app-services-page',
  imports: [MatCardModule],
  templateUrl: './services-page.html',
  styleUrl: './services-page.css',
})
export class ServicesPage implements OnInit, OnDestroy {
  readonly services: Service[] = getAllServices();

  constructor(
    private router: Router,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.seoService.setPageMetadata({
      title: 'Our Services | Tax, Immigration & Translation | Larios Income Tax',
      description:
        'Complete tax preparation, immigration assistance, certified translations, ITIN applications, citizenship services, and more. Serving San Diego and Tijuana with bilingual expertise. View all our professional services.',
      keywords: [
        'tax services',
        'immigration services',
        'translation services',
        'ITIN application',
        'citizenship services',
        'visa assistance',
        'tax preparation',
        'immigration attorney',
        'certified translations',
        'dual citizenship',
        'global entry',
        'sentri application',
      ],
      url: 'https://lariosincometax.com/services',
      image: 'https://lariosincometax.com/assets/images/og-image.jpg',
      type: 'website',
    });

    // Add structured data for services list
    this.seoService.addMultipleStructuredData([
      getServicesListSchema(this.services),
      getBreadcrumbSchema([
        { name: 'Home', url: 'https://lariosincometax.com/' },
        { name: 'Services', url: 'https://lariosincometax.com/services' },
      ]),
    ]);
  }

  ngOnDestroy(): void {
    this.seoService.removeStructuredData();
  }

  /**
   * Navigates to the service detail page for booking
   */
  navigateToService(serviceId: string): void {
    this.router.navigate(['/book-online', serviceId]);
  }
}
