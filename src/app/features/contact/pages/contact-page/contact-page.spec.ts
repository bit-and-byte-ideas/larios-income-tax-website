import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LOCALE_ID } from '@angular/core';
import { ContactPage } from './contact-page';
import { BUSINESS_INFO } from '../../../../shared/constants/business-info.constants';

describe('ContactPage', () => {
  let component: ContactPage;
  let fixture: ComponentFixture<ContactPage>;

  describe('United States location', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ContactPage],
        providers: [{ provide: LOCALE_ID, useValue: 'en-US' }],
      }).compileComponents();

      fixture = TestBed.createComponent(ContactPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should load United States location data', () => {
      expect(component.currentLocation).toBeTruthy();
      expect(component.currentLocation?.country).toBe('United States');
    });

    it('should display English labels', () => {
      expect(component.currentLocation?.labels.heading).toBe('CONTACT US');
      expect(component.currentLocation?.labels.name).toBe('Name');
      expect(component.currentLocation?.labels.email).toBe('Email');
      expect(component.currentLocation?.labels.subject).toBe('Subject');
      expect(component.currentLocation?.labels.message).toBe('Message');
      expect(component.currentLocation?.labels.submit).toBe('Submit');
    });

    it('should display US address', () => {
      expect(component.currentLocation?.address).toBe(BUSINESS_INFO.locations.us.address.formatted);
    });

    it('should display contact heading', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const heading = compiled.querySelector('.contact-heading');
      expect(heading?.textContent).toBe('CONTACT US');
    });

    it('should display subheading text', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const subheading = compiled.querySelector('.contact-subheading');
      expect(subheading?.textContent).toBe(
        'Contact us to see how our expertise and personalized services can save you time, money, and frustration.'
      );
    });

    it('should display professionals image', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const img = compiled.querySelector('.contact-image') as HTMLImageElement;
      expect(img).toBeTruthy();
      expect(img.src).toContain('professionals.avif');
    });

    it('should have contact form with required fields', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const nameInput = compiled.querySelector('#name');
      const emailInput = compiled.querySelector('#email');
      const subjectInput = compiled.querySelector('#subject');
      const messageInput = compiled.querySelector('#message');
      expect(nameInput).toBeTruthy();
      expect(emailInput).toBeTruthy();
      expect(subjectInput).toBeTruthy();
      expect(messageInput).toBeTruthy();
    });

    it('should have submit button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const submitButton = compiled.querySelector('.submit-button');
      expect(submitButton?.textContent?.trim()).toBe('Submit');
    });

    it('should disable submit button when form is invalid', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const submitButton = compiled.querySelector('.submit-button') as HTMLButtonElement;
      expect(submitButton.disabled).toBe(true);
    });

    it('should enable submit button when form is valid', () => {
      component.contactForm.patchValue({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test message',
      });
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const submitButton = compiled.querySelector('.submit-button') as HTMLButtonElement;
      expect(submitButton.disabled).toBe(false);
    });

    it('should display contact information', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const infoItems = compiled.querySelectorAll('.info-item');
      expect(infoItems.length).toBeGreaterThan(0);
    });

    it('should display Google Maps iframe', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const iframe = compiled.querySelector('.map-container iframe');
      expect(iframe).toBeTruthy();
    });

    it('should have correct email and phone links', () => {
      expect(component.currentLocation?.email).toBe(BUSINESS_INFO.locations.us.contact.email);
      expect(component.currentLocation?.phone).toBe(
        BUSINESS_INFO.locations.us.contact.phoneFormatted
      );
    });
  });

  describe('Mexico location', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ContactPage],
        providers: [{ provide: LOCALE_ID, useValue: 'es-MX' }],
      }).compileComponents();

      fixture = TestBed.createComponent(ContactPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should load Mexico location data', () => {
      expect(component.currentLocation).toBeTruthy();
      expect(component.currentLocation?.country).toBe('Mexico');
    });

    it('should display Spanish labels', () => {
      expect(component.currentLocation?.labels.heading).toBe('CONTÁCTENOS');
      expect(component.currentLocation?.labels.name).toBe('Nombre');
      expect(component.currentLocation?.labels.email).toBe('Correo Electrónico');
      expect(component.currentLocation?.labels.subject).toBe('Asunto');
      expect(component.currentLocation?.labels.message).toBe('Mensaje');
      expect(component.currentLocation?.labels.submit).toBe('Enviar');
    });

    it('should display Mexico address', () => {
      expect(component.currentLocation?.address).toBe(
        BUSINESS_INFO.locations.mexico.address.formatted
      );
    });

    it('should display Spanish heading', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const heading = compiled.querySelector('.contact-heading');
      expect(heading?.textContent).toBe('CONTÁCTENOS');
    });

    it('should display Spanish subheading text', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const subheading = compiled.querySelector('.contact-subheading');
      expect(subheading?.textContent).toBe(
        'Contáctenos para ver cómo nuestra experiencia y servicios personalizados pueden ahorrarle tiempo, dinero y frustraciones.'
      );
    });

    it('should display Spanish submit button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const submitButton = compiled.querySelector('.submit-button');
      expect(submitButton?.textContent?.trim()).toBe('Enviar');
    });
  });

  describe('Form validation', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ContactPage],
        providers: [{ provide: LOCALE_ID, useValue: 'en-US' }],
      }).compileComponents();

      fixture = TestBed.createComponent(ContactPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should require name field', () => {
      const nameControl = component.contactForm.get('name');
      expect(nameControl?.valid).toBe(false);
      nameControl?.setValue('John Doe');
      expect(nameControl?.valid).toBe(true);
    });

    it('should require email field', () => {
      const emailControl = component.contactForm.get('email');
      expect(emailControl?.valid).toBe(false);
      emailControl?.setValue('john@example.com');
      expect(emailControl?.valid).toBe(true);
    });

    it('should validate email format', () => {
      const emailControl = component.contactForm.get('email');
      emailControl?.setValue('invalid-email');
      expect(emailControl?.valid).toBe(false);
      emailControl?.setValue('valid@email.com');
      expect(emailControl?.valid).toBe(true);
    });

    it('should require subject field', () => {
      const subjectControl = component.contactForm.get('subject');
      expect(subjectControl?.valid).toBe(false);
      subjectControl?.setValue('Test Subject');
      expect(subjectControl?.valid).toBe(true);
    });

    it('should require message field', () => {
      const messageControl = component.contactForm.get('message');
      expect(messageControl?.valid).toBe(false);
      messageControl?.setValue('Test message');
      expect(messageControl?.valid).toBe(true);
    });
  });
});
