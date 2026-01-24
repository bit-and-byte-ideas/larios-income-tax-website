import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { getAllServices } from '../../../../shared/constants/services.constants';
import { Service } from '../../../../shared/models/service.model';

@Component({
  selector: 'app-book-online-page',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './book-online-page.html',
  styleUrl: './book-online-page.css',
})
export class BookOnlinePage {
  readonly services: Service[] = getAllServices();
}
