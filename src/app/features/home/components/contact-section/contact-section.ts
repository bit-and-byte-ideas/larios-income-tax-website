import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SOCIAL_MEDIA_LINKS } from '../../../../shared/constants/social-media.constants';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './contact-section.html',
  styleUrl: './contact-section.css',
})
export class ContactSection {
  readonly socialMediaLinks = SOCIAL_MEDIA_LINKS;
}
