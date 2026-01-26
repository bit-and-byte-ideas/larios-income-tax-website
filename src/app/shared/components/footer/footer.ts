import { Component } from '@angular/core';
import { BUSINESS_INFO } from '../../constants/business-info.constants';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  readonly businessInfo = BUSINESS_INFO;
  readonly usLocation = BUSINESS_INFO.locations.us;
  readonly mexicoLocation = BUSINESS_INFO.locations.mexico;
}
