import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { getFeaturedServices } from '../../../../shared/constants/services.constants';
import { Service } from '../../../../shared/models/service.model';

@Component({
  selector: 'app-services-overview',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './services-overview.html',
  styleUrl: './services-overview.css',
})
export class ServicesOverview {
  readonly featuredServices: Service[] = getFeaturedServices();
}
