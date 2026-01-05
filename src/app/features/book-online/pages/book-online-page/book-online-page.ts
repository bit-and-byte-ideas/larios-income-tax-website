import { Component } from '@angular/core';

@Component({
  selector: 'app-book-online-page',
  standalone: true,
  imports: [],
  templateUrl: './book-online-page.html',
  styleUrl: './book-online-page.css',
})
export class BookOnlinePage {
  services = [
    {
      title: 'Tax Preparation',
      image: '/assets/images/tax-preparation.avif',
      duration: '50 min',
      consultation: 'Free Consultation',
      readMoreLink: '#',
      bookNowLink: '#',
    },
    {
      title: 'Immigration Services',
      image: '/assets/images/immigration-services.avif',
      duration: '50 min',
      consultation: 'Free Consultation',
      readMoreLink: '#',
      bookNowLink: '#',
    },
    {
      title: 'Translations',
      image: '/assets/images/transaltion-services.avif',
      duration: '1 hr 50 min',
      consultation: 'Free Consultation',
      readMoreLink: '#',
      bookNowLink: '#',
    },
  ];
}
