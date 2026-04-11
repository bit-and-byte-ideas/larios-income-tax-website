import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

const ALLOWED_RESOURCE_URL_ORIGINS = ['https://www.google.com'];

@Pipe({
  name: 'safe',
  standalone: true,
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string, type: string): SafeResourceUrl {
    if (type === 'resourceUrl') {
      try {
        const parsed = new URL(url);
        const allowed = ALLOWED_RESOURCE_URL_ORIGINS.some(
          (origin) => parsed.origin === origin,
        );
        if (allowed) {
          return this.sanitizer.bypassSecurityTrustResourceUrl(url);
        }
      } catch {
        // Invalid URL - fall through to return empty
      }
      return this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
    }
    return url as unknown as SafeResourceUrl;
  }
}
