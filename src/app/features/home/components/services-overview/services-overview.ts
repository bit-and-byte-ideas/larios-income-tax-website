import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services-overview',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './services-overview.html',
  styleUrl: './services-overview.css',
})
export class ServicesOverview {}
