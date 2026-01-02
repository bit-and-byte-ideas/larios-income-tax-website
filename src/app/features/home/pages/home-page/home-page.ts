import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { ServicesOverview } from '../../components/services-overview/services-overview';
import { ContactSection } from '../../components/contact-section/contact-section';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [Hero, ServicesOverview, ContactSection],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {}
