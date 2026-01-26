import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { Service } from '../../../../shared/models/service.model';
import { getServiceById } from '../../../../shared/constants/services.constants';
import { BUSINESS_INFO } from '../../../../shared/constants/business-info.constants';

@Component({
  selector: 'app-service-detail-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatChipsModule],
  templateUrl: './service-detail-page.html',
  styleUrl: './service-detail-page.css',
})
export class ServiceDetailPage implements OnInit {
  service: Service | null = null;
  contactAddress =
    BUSINESS_INFO.locations.us.address.formattedShort ||
    BUSINESS_INFO.locations.us.address.formatted;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const serviceId = params['id'];
      this.service = getServiceById(serviceId) || null;
    });
  }

  onBookNow(): void {
    // Placeholder for future implementation
  }
}
