import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-book-online-page',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './book-online-page.html',
  styleUrl: './book-online-page.css',
})
export class BookOnlinePage {
  services = [
    {
      id: 'tax-preparation',
      title: 'Tax Preparation',
      image: '/assets/images/tax-preparation.avif',
      duration: '50 min',
      consultation: 'Free Consultation',
    },
    {
      id: 'immigration-services',
      title: 'Immigration Services',
      image: '/assets/images/immigration-services.avif',
      duration: '50 min',
      consultation: 'Free Consultation',
    },
    {
      id: 'translations',
      title: 'Translations',
      image: '/assets/images/transaltion-services.avif',
      duration: '1 hr 50 min',
      consultation: 'Free Consultation',
    },
  ];
}
