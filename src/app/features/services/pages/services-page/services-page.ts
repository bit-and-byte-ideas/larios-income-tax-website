import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgClass } from '@angular/common';
import { getAllServices } from '../../../../shared/constants/services.constants';
import { Service } from '../../../../shared/models/service.model';

@Component({
  selector: 'app-services-page',
  imports: [MatCardModule, NgClass],
  templateUrl: './services-page.html',
  styleUrl: './services-page.css',
})
export class ServicesPage {
  readonly services: Service[] = getAllServices();

  /**
   * Determines if a service card should use the reverse layout
   * (image on left, content on right)
   */
  isReverse(index: number): boolean {
    return index % 2 !== 0;
  }
}
