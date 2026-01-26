import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import {
  PageMetadata,
  OpenGraphConfig,
  TwitterCardConfig,
  GeoMetadata,
} from '../../shared/models/seo.model';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private structuredDataScript: HTMLScriptElement | null = null;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {}

  /**
   * Set comprehensive page metadata including title, description, OG tags, and Twitter cards
   */
  setPageMetadata(config: PageMetadata): void {
    // Set page title
    this.titleService.setTitle(config.title);

    // Primary meta tags
    this.metaService.updateTag({ name: 'title', content: config.title });
    this.metaService.updateTag({ name: 'description', content: config.description });

    if (config.keywords && config.keywords.length > 0) {
      this.metaService.updateTag({ name: 'keywords', content: config.keywords.join(', ') });
    }

    // Open Graph tags
    this.setOpenGraphTags({
      title: config.title,
      description: config.description,
      url: config.url,
      image: config.image,
      type: config.type || 'website',
      locale: config.locale || 'en_US',
      siteName: 'Larios Income Tax and Immigration',
    });

    // Twitter Card tags
    this.setTwitterCardTags({
      card: config.image ? 'summary_large_image' : 'summary',
      title: config.title,
      description: config.description,
      image: config.image,
    });

    // Canonical URL
    this.setCanonicalUrl(config.url);

    // Alternate locales (hreflang)
    if (config.alternateLocales && config.alternateLocales.length > 0) {
      this.setAlternateLocales(config.alternateLocales);
    }
  }

  /**
   * Set Open Graph meta tags for social media sharing
   */
  setOpenGraphTags(config: OpenGraphConfig): void {
    this.metaService.updateTag({ property: 'og:type', content: config.type || 'website' });
    this.metaService.updateTag({ property: 'og:url', content: config.url });
    this.metaService.updateTag({ property: 'og:title', content: config.title });
    this.metaService.updateTag({ property: 'og:description', content: config.description });

    if (config.image) {
      this.metaService.updateTag({ property: 'og:image', content: config.image });
    }

    if (config.locale) {
      this.metaService.updateTag({ property: 'og:locale', content: config.locale });
    }

    if (config.siteName) {
      this.metaService.updateTag({ property: 'og:site_name', content: config.siteName });
    }
  }

  /**
   * Set Twitter Card meta tags for Twitter sharing
   */
  setTwitterCardTags(config: TwitterCardConfig): void {
    this.metaService.updateTag({ name: 'twitter:card', content: config.card });
    this.metaService.updateTag({ name: 'twitter:title', content: config.title });
    this.metaService.updateTag({ name: 'twitter:description', content: config.description });

    if (config.image) {
      this.metaService.updateTag({ name: 'twitter:image', content: config.image });
    }

    if (config.site) {
      this.metaService.updateTag({ name: 'twitter:site', content: config.site });
    }

    if (config.creator) {
      this.metaService.updateTag({ name: 'twitter:creator', content: config.creator });
    }
  }

  /**
   * Set canonical URL to avoid duplicate content issues
   */
  setCanonicalUrl(url: string): void {
    // Remove existing canonical link if any
    const existingLink = this.document.querySelector('link[rel="canonical"]');
    if (existingLink) {
      existingLink.remove();
    }

    // Add new canonical link
    const link: HTMLLinkElement = this.document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    this.document.head.appendChild(link);
  }

  /**
   * Set alternate locale links (hreflang) for bilingual content
   */
  setAlternateLocales(locales: { hreflang: string; href: string }[]): void {
    // Remove existing alternate links
    const existingLinks = this.document.querySelectorAll('link[rel="alternate"]');
    existingLinks.forEach(link => link.remove());

    // Add new alternate links
    locales.forEach(locale => {
      const link: HTMLLinkElement = this.document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', locale.hreflang);
      link.setAttribute('href', locale.href);
      this.document.head.appendChild(link);
    });
  }

  /**
   * Set geographic meta tags for local SEO
   */
  setGeoMetadata(geo: GeoMetadata): void {
    this.metaService.updateTag({ name: 'geo.region', content: geo.region });
    this.metaService.updateTag({ name: 'geo.placename', content: geo.placename });
    this.metaService.updateTag({
      name: 'geo.position',
      content: `${geo.latitude};${geo.longitude}`,
    });
    this.metaService.updateTag({
      name: 'ICBM',
      content: `${geo.latitude}, ${geo.longitude}`,
    });
  }

  /**
   * Add structured data (JSON-LD) to the page
   */
  addStructuredData(schema: any): void {
    // Remove existing structured data if any
    this.removeStructuredData();

    // Create new script element
    this.structuredDataScript = this.document.createElement('script');
    this.structuredDataScript.type = 'application/ld+json';
    this.structuredDataScript.text = JSON.stringify(schema);
    this.document.head.appendChild(this.structuredDataScript);
  }

  /**
   * Add multiple structured data schemas to the page
   */
  addMultipleStructuredData(schemas: any[]): void {
    // Remove existing structured data if any
    this.removeStructuredData();

    // Create new script element with @graph for multiple schemas
    this.structuredDataScript = this.document.createElement('script');
    this.structuredDataScript.type = 'application/ld+json';
    this.structuredDataScript.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': schemas,
    });
    this.document.head.appendChild(this.structuredDataScript);
  }

  /**
   * Remove structured data from the page (cleanup)
   */
  removeStructuredData(): void {
    if (this.structuredDataScript) {
      this.structuredDataScript.remove();
      this.structuredDataScript = null;
    }
  }
}
