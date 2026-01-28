import { Component, Inject, LOCALE_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BUSINESS_INFO } from '../../constants/business-info.constants';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    LanguageSwitcher,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly businessInfo = BUSINESS_INFO;
  readonly socialMediaLinks = BUSINESS_INFO.socialMedia;
  readonly currentLocation;

  constructor(@Inject(LOCALE_ID) private locale: string) {
    // Use Mexico location for Spanish locale, US location for English
    this.currentLocation =
      this.locale === 'es-MX' ? BUSINESS_INFO.locations.mexico : BUSINESS_INFO.locations.us;
  }
}
