import { Component } from '@angular/core';
import { SOCIAL_MEDIA_LINKS } from '../../../../shared/constants/social-media.constants';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [],
  templateUrl: './contact-section.html',
  styleUrl: './contact-section.css',
})
export class ContactSection {
  readonly socialMediaLinks = SOCIAL_MEDIA_LINKS;
}
