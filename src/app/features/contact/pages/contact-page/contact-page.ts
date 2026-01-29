import { Component, OnInit, OnDestroy, Inject, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SafePipe } from '../../../../shared/pipes/safe-pipe';
import { BUSINESS_INFO } from '../../../../shared/constants/business-info.constants';
import { SeoService } from '../../../../core/services/seo.service';
import {
  getUSLocalBusinessSchema,
  getMexicoLocalBusinessSchema,
  getBreadcrumbSchema,
} from '../../../../shared/constants/seo-schema.constants';

interface LocationData {
  country: string;
  address: string;
  email: string;
  phone: string;
  phoneRaw: string;
  mapSrc: string;
  labels: {
    heading: string;
    callButtonText: string;
    addressLabel: string;
    subheading: string;
  };
}

@Component({
  selector: 'app-contact-page',
  imports: [CommonModule, SafePipe, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css',
})
export class ContactPage implements OnInit, OnDestroy {
  currentLocation: LocationData | null = null;

  private locationData: Record<string, LocationData> = {
    'united-states': {
      country: BUSINESS_INFO.locations.us.address.country,
      address: BUSINESS_INFO.locations.us.address.formatted,
      email: BUSINESS_INFO.locations.us.contact.email,
      phone: BUSINESS_INFO.locations.us.contact.phoneFormatted,
      phoneRaw: BUSINESS_INFO.locations.us.contact.phone,
      mapSrc: BUSINESS_INFO.locations.us.mapEmbed,
      labels: {
        heading: 'CONTACT US',
        callButtonText: 'Call Us for an Appointment',
        addressLabel: 'Address',
        subheading:
          'Contact us to see how our expertise and personalized services can save you time, money, and frustration.',
      },
    },
    mexico: {
      country: BUSINESS_INFO.locations.mexico.address.country,
      address: BUSINESS_INFO.locations.mexico.address.formatted,
      email: BUSINESS_INFO.locations.mexico.contact.email,
      phone: BUSINESS_INFO.locations.mexico.contact.phoneFormatted,
      phoneRaw: BUSINESS_INFO.locations.mexico.contact.phone,
      mapSrc: BUSINESS_INFO.locations.mexico.mapEmbed,
      labels: {
        heading: 'CONTÁCTENOS',
        callButtonText: 'Llámenos para una Cita',
        addressLabel: 'Dirección',
        subheading:
          'Contáctenos para ver cómo nuestra experiencia y servicios personalizados pueden ahorrarle tiempo, dinero y frustraciones.',
      },
    },
  };

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    // Automatically determine location based on locale
    // English locale shows US office, Spanish locale shows Mexico office
    const location = this.locale === 'es-MX' ? 'mexico' : 'united-states';
    this.currentLocation = this.locationData[location] || null;

    // Set SEO metadata based on location
    if (location === 'united-states') {
      this.setUnitedStatesSeo();
    } else if (location === 'mexico') {
      this.setMexicoSeo();
    }
  }

  ngOnDestroy(): void {
    this.seoService.removeStructuredData();
  }

  /**
   * Set SEO metadata for United States location
   */
  private setUnitedStatesSeo(): void {
    this.seoService.setPageMetadata({
      title: 'Contact Us San Diego | Larios Income Tax & Immigration Office',
      description:
        'Visit our San Diego office at 3317 El Cajon Blvd. Call (619) 972-3350 for bilingual tax and immigration services. Free consultation available. Serving San Diego and Tijuana.',
      keywords: [
        'tax office San Diego',
        'immigration office San Diego',
        'El Cajon Blvd tax services',
        'contact Larios Income Tax',
        'San Diego tax help',
        'bilingual tax services',
      ],
      url: 'https://lariosincometax.com/contact',
      image: 'https://lariosincometax.com/assets/images/og-image.jpg',
      type: 'website',
      locale: 'en_US',
      alternateLocales: [
        { hreflang: 'en-US', href: 'https://lariosincometax.com/contact' },
        { hreflang: 'es-MX', href: 'https://lariosincometax.com/es/contact' },
      ],
    });

    // Set geographic metadata for San Diego
    this.seoService.setGeoMetadata({
      region: 'US-CA',
      placename: 'San Diego',
      latitude: 32.757883,
      longitude: -117.105243,
    });

    // Add structured data for US location
    this.seoService.addMultipleStructuredData([
      getUSLocalBusinessSchema(),
      getBreadcrumbSchema([
        { name: 'Home', url: 'https://lariosincometax.com/' },
        { name: 'Contact', url: 'https://lariosincometax.com/contact' },
      ]),
    ]);
  }

  /**
   * Set SEO metadata for Mexico location
   */
  private setMexicoSeo(): void {
    this.seoService.setPageMetadata({
      title: 'Contáctenos Tijuana | Oficina Larios Income Tax e Inmigración',
      description:
        'Visite nuestra oficina en Tijuana, Av. Las Plazas No. 17101-1. Llame al (619) 949-8007 para servicios bilingües de impuestos e inmigración. Consulta gratuita disponible.',
      keywords: [
        'servicios de impuestos Tijuana',
        'servicios de inmigración Tijuana',
        'preparación de impuestos México',
        'oficina de impuestos Tijuana',
        'ayuda con impuestos bilingüe',
      ],
      url: 'https://lariosincometax.com/es/contact',
      image: 'https://lariosincometax.com/assets/images/og-image.jpg',
      type: 'website',
      locale: 'es_MX',
      alternateLocales: [
        { hreflang: 'en-US', href: 'https://lariosincometax.com/contact' },
        { hreflang: 'es-MX', href: 'https://lariosincometax.com/es/contact' },
      ],
    });

    // Set geographic metadata for Tijuana
    this.seoService.setGeoMetadata({
      region: 'MX-BC',
      placename: 'Tijuana',
      latitude: 32.520837,
      longitude: -116.971385,
    });

    // Add structured data for Mexico location
    this.seoService.addMultipleStructuredData([
      getMexicoLocalBusinessSchema(),
      getBreadcrumbSchema([
        { name: 'Home', url: 'https://lariosincometax.com/es/' },
        { name: 'Contacto', url: 'https://lariosincometax.com/es/contact' },
      ]),
    ]);
  }
}
