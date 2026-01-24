import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SOCIAL_MEDIA_LINKS } from '../../../../shared/constants/social-media.constants';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './contact-section.html',
  styleUrl: './contact-section.css',
})
export class ContactSection {
  readonly socialMediaLinks = SOCIAL_MEDIA_LINKS;

  constructor(private router: Router) {}

  navigateToContact(): void {
    this.router.navigate(['/contact/united-states']);
  }
}
