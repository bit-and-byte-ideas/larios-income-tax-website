import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

interface ServiceDetail {
  title: string;
  duration: string;
  consultation: string;
  image: string;
}

@Component({
  selector: 'app-service-detail-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatChipsModule],
  templateUrl: './service-detail-page.html',
  styleUrl: './service-detail-page.css',
})
export class ServiceDetailPage implements OnInit {
  service: ServiceDetail | null = null;
  contactAddress = '3317 El Cajon Blvd, San Diego, CA 92104, USA';

  private serviceData: Record<string, ServiceDetail> = {
    'tax-preparation': {
      title: 'Tax Preparation',
      duration: '50 min',
      consultation: 'Free Consultation',
      image: '/assets/images/tax-preparation.avif',
    },
    'immigration-services': {
      title: 'Immigration Services',
      duration: '50 min',
      consultation: 'Free Consultation',
      image: '/assets/images/immigration-services.avif',
    },
    translations: {
      title: 'Translations',
      duration: '1 hr 50 min',
      consultation: 'Free Consultation',
      image: '/assets/images/transaltion-services.avif',
    },
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const serviceId = params['id'];
      this.service = this.serviceData[serviceId] || null;
    });
  }

  onBookNow(): void {
    // Placeholder for future implementation
  }
}
