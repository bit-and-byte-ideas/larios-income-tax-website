import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { getAllServices } from '../../../../shared/constants/services.constants';
import { Service } from '../../../../shared/models/service.model';
import { SeoService } from '../../../../core/services/seo.service';

@Component({
  selector: 'app-book-online-page',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './book-online-page.html',
  styleUrl: './book-online-page.css',
})
export class BookOnlinePage implements OnInit, OnDestroy {
  readonly services: Service[] = getAllServices();

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.setPageMetadata({
      title: 'Book Online | Schedule Your Appointment | Larios Income Tax',
      description:
        'Schedule your tax preparation, immigration consultation, or translation service online. Quick and easy booking for our San Diego and Tijuana offices. Free consultation available.',
      keywords: [
        'book tax appointment',
        'schedule immigration consultation',
        'online booking tax services',
        'schedule appointment San Diego',
        'book immigration appointment',
      ],
      url: 'https://lariosincometax.com/book-online',
      image: 'https://lariosincometax.com/assets/images/og-image.jpg',
      type: 'website',
    });
  }

  ngOnDestroy(): void {
    this.seoService.removeStructuredData();
  }
}
