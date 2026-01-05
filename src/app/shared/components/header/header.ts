import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SOCIAL_MEDIA_LINKS } from '../../constants/social-media.constants';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly socialMediaLinks = SOCIAL_MEDIA_LINKS;
}
