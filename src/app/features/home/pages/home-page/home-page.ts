import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { ServicesOverview } from '../../components/services-overview/services-overview';
import { ContactSection } from '../../components/contact-section/contact-section';
import { SeoService } from '../../../../core/services/seo.service';
import {
  getOrganizationSchema,
  getWebSiteSchema,
  getUSLocalBusinessSchema,
  getMexicoLocalBusinessSchema,
} from '../../../../shared/constants/seo-schema.constants';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [Hero, ServicesOverview, ContactSection],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit, OnDestroy {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.setPageMetadata({
      title: 'Larios Income Tax & Immigration | San Diego & Tijuana | Bilingual Services',
      description:
        'Professional bilingual tax preparation and immigration services in San Diego, CA and Tijuana, Mexico. Expert ITIN applications, citizenship assistance, translations, and tax filing. Free consultation available.',
      keywords: [
        'income tax services San Diego',
        'immigration services San Diego',
        'bilingual tax services',
        'tax preparation Tijuana',
        'ITIN application services',
        'San Diego tax help',
        'visa assistance',
        'citizenship services',
        'translation services',
        'income tax preparation',
        'immigration attorney',
        'tax office near me',
      ],
      url: 'https://lariosincometax.com/',
      image: 'https://lariosincometax.com/assets/images/og-image.jpg',
      type: 'website',
      locale: 'en_US',
      alternateLocales: [
        { hreflang: 'en-US', href: 'https://lariosincometax.com/' },
        { hreflang: 'es-MX', href: 'https://lariosincometax.com/contact/mexico' },
      ],
    });

    // Set geographic metadata for local SEO
    this.seoService.setGeoMetadata({
      region: 'US-CA',
      placename: 'San Diego',
      latitude: 32.757883,
      longitude: -117.105243,
    });

    // Add structured data for homepage
    this.seoService.addMultipleStructuredData([
      getOrganizationSchema(),
      getWebSiteSchema(),
      getUSLocalBusinessSchema(),
      getMexicoLocalBusinessSchema(),
    ]);
  }

  ngOnDestroy(): void {
    this.seoService.removeStructuredData();
  }
}
