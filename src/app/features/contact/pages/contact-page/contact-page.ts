import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { SafePipe } from '../../../../shared/pipes/safe-pipe';
import { getAllServices } from '../../../../shared/constants/services.constants';
import { BUSINESS_INFO } from '../../../../shared/constants/business-info.constants';

interface LocationData {
  country: string;
  address: string;
  email: string;
  phone: string;
  mapSrc: string;
  labels: {
    heading: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    submit: string;
    addressLabel: string;
    subheading: string;
  };
}

@Component({
  selector: 'app-contact-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SafePipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css',
})
export class ContactPage implements OnInit {
  contactForm: FormGroup;
  currentLocation: LocationData | null = null;
  subjects: string[] = [...getAllServices().map(service => service.title), 'Other'];

  private locationData: Record<string, LocationData> = {
    'united-states': {
      country: BUSINESS_INFO.locations.us.address.country,
      address: BUSINESS_INFO.locations.us.address.formatted,
      email: BUSINESS_INFO.locations.us.contact.email,
      phone: BUSINESS_INFO.locations.us.contact.phoneFormatted,
      mapSrc: BUSINESS_INFO.locations.us.mapEmbed,
      labels: {
        heading: 'CONTACT US',
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        submit: 'Submit',
        addressLabel: 'Address',
        subheading:
          'Contact us to see how our expertise and personalized services can save you time, money, and frustration.',
      },
    },
    mexico: {
      country: BUSINESS_INFO.locations.mexico.address.country,
      address: BUSINESS_INFO.locations.mexico.address.formatted,
      email: BUSINESS_INFO.locations.mexico.contact.email,
      phone: BUSINESS_INFO.locations.mexico.contact.phoneFormatted,
      mapSrc: BUSINESS_INFO.locations.mexico.mapEmbed,
      labels: {
        heading: 'CONTÁCTENOS',
        name: 'Nombre',
        email: 'Correo Electrónico',
        subject: 'Asunto',
        message: 'Mensaje',
        submit: 'Enviar',
        addressLabel: 'Dirección',
        subheading:
          'Contáctenos para ver cómo nuestra experiencia y servicios personalizados pueden ahorrarle tiempo, dinero y frustraciones.',
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const location = params['location'];
      this.currentLocation = this.locationData[location] || null;
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      // Placeholder for future implementation
      console.log('Form submitted:', this.contactForm.value);
    }
  }
}
