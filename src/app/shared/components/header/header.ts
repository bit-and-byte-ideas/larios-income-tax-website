import { Component } from '@angular/core';
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
  readonly usLocation = BUSINESS_INFO.locations.us;
  readonly socialMediaLinks = BUSINESS_INFO.socialMedia;
}
