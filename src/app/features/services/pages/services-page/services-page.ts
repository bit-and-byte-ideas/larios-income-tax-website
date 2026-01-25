import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { getAllServices } from '../../../../shared/constants/services.constants';
import { Service } from '../../../../shared/models/service.model';

@Component({
  selector: 'app-services-page',
  imports: [MatCardModule],
  templateUrl: './services-page.html',
  styleUrl: './services-page.css',
})
export class ServicesPage {
  readonly services: Service[] = getAllServices();

  constructor(private router: Router) {}

  /**
   * Navigates to the service detail page for booking
   */
  navigateToService(serviceId: string): void {
    this.router.navigate(['/book-online', serviceId]);
  }
}
