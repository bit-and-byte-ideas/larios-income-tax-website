import { Component, OnInit, OnDestroy, Inject, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { SafePipe } from '../../../../shared/pipes/safe-pipe';
import { getAllServices } from '../../../../shared/constants/services.constants';
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
  mapSrc: string;
  labels: {
    heading: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    submit: string;
    addressLabel: string;
    subheading: string;
  };
}

@Component({
  selector: 'app-contact-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SafePipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css',
})
export class ContactPage implements OnInit, OnDestroy {
  contactForm: FormGroup;
  currentLocation: LocationData | null = null;
  subjects: string[] = [...getAllServices().map(service => service.title), 'Other'];

  private locationData: Record<string, LocationData> = {
    'united-states': {
      country: BUSINESS_INFO.locations.us.address.country,
      address: BUSINESS_INFO.locations.us.address.formatted,
      email: BUSINESS_INFO.locations.us.contact.email,
      phone: BUSINESS_INFO.locations.us.contact.phoneFormatted,
      mapSrc: BUSINESS_INFO.locations.us.mapEmbed,
      labels: {
        heading: 'CONTACT US',
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        submit: 'Submit',
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
      mapSrc: BUSINESS_INFO.locations.mexico.mapEmbed,
      labels: {
        heading: 'CONTÁCTENOS',
        name: 'Nombre',
        email: 'Correo Electrónico',
        subject: 'Asunto',
        message: 'Mensaje',
        submit: 'Enviar',
        addressLabel: 'Dirección',
        subheading:
          'Contáctenos para ver cómo nuestra experiencia y servicios personalizados pueden ahorrarle tiempo, dinero y frustraciones.',
      },
    },
  };

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private fb: FormBuilder,
    private seoService: SeoService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

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

  onSubmit(): void {
    if (this.contactForm.valid) {
      // Placeholder for future implementation
      console.log('Form submitted:', this.contactForm.value);
    }
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
