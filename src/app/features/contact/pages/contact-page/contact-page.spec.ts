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
      expect(component.currentLocation?.labels.callButtonText).toBe('Call Us for an Appointment');
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

    it('should have call button with correct text', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const callButton = compiled.querySelector('.call-button');
      expect(callButton).toBeTruthy();
      expect(callButton?.textContent).toContain('Call Us for an Appointment');
    });

    it('should have call button with correct phone link', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const callButton = compiled.querySelector('.call-button') as HTMLAnchorElement;
      expect(callButton).toBeTruthy();
      expect(callButton.href).toContain(
        'tel:' + BUSINESS_INFO.locations.us.contact.phone.replace(/[^0-9+]/g, '')
      );
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
      expect(component.currentLocation?.labels.callButtonText).toBe('Llámenos para una Cita');
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

    it('should have Spanish call button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const callButton = compiled.querySelector('.call-button');
      expect(callButton?.textContent).toContain('Llámenos para una Cita');
    });

    it('should have call button with correct phone link for Mexico', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const callButton = compiled.querySelector('.call-button') as HTMLAnchorElement;
      expect(callButton).toBeTruthy();
      expect(callButton.href).toContain(
        'tel:' + BUSINESS_INFO.locations.mexico.contact.phone.replace(/[^0-9+]/g, '')
      );
    });
  });
});
