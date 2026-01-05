import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafePipe } from '../../../../shared/pipes/safe-pipe';

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
  imports: [CommonModule, ReactiveFormsModule, SafePipe],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css',
})
export class ContactPage implements OnInit {
  contactForm: FormGroup;
  currentLocation: LocationData | null = null;

  private locationData: Record<string, LocationData> = {
    'united-states': {
      country: 'United States',
      address: '3317 El Cajon Blvd San Diego CA United States 92104',
      email: 'lariosincometax@gmail.com',
      phone: '(619) 283-2828',
      mapSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3356.9876543210!2d-117.1234567!3d32.7654321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s3317%20El%20Cajon%20Blvd%2C%20San%20Diego%2C%20CA%2092104!5e0!3m2!1sen!2sus!4v1234567890',
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
      country: 'Mexico',
      address: 'Av. Las Plazas No. 17101-1 Fracc Rinconada De Otay Tijuana, B.C',
      email: 'lariosincometax@gmail.com',
      phone: '(619) 283-2828',
      mapSrc:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3356.9876543210!2d-116.9876543!3d32.5432109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAv.%20Las%20Plazas%20No.%2017101-1%2C%20Tijuana%2C%20B.C.!5e0!3m2!1sen!2smx!4v1234567890',
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
