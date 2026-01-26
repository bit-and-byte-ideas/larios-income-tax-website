export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  url: string;
  image?: string;
  type?: 'website' | 'article';
  locale?: string;
  alternateLocales?: AlternateLocale[];
}

export interface AlternateLocale {
  hreflang: string;
  href: string;
}

export interface OpenGraphConfig {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: 'website' | 'article';
  locale?: string;
  siteName?: string;
}

export interface TwitterCardConfig {
  card: 'summary' | 'summary_large_image' | 'app' | 'player';
  title: string;
  description: string;
  image?: string;
  site?: string;
  creator?: string;
}

export interface GeoMetadata {
  region: string;
  placename: string;
  latitude: number;
  longitude: number;
}
