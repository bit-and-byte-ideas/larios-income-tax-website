import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ServiceDetailPage } from './service-detail-page';

describe('ServiceDetailPage', () => {
  let component: ServiceDetailPage;
  let fixture: ComponentFixture<ServiceDetailPage>;

  describe('with valid service', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ServiceDetailPage],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              params: of({ id: 'tax-preparation' }),
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ServiceDetailPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should load service data from route params', () => {
      expect(component.service).toBeTruthy();
      expect(component.service?.title).toBe('Tax Preparation');
    });

    it('should display service title', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const title = compiled.querySelector('.service-title');
      expect(title?.textContent).toBe('Tax Preparation');
    });

    it('should display three info boxes', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const infoBoxes = compiled.querySelectorAll('.info-box');
      expect(infoBoxes.length).toBe(3);
    });

    it('should display duration, consultation, and address', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const infoBoxes = Array.from(compiled.querySelectorAll('.info-box p')).map(el =>
        el.textContent?.trim()
      );
      expect(infoBoxes[0]).toBe('50 min');
      expect(infoBoxes[1]).toBe('Free Consultation');
      expect(infoBoxes[2]).toBe('3317 El Cajon Blvd');
    });

    it('should have Book Now button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const button = compiled.querySelector('.book-now-button');
      expect(button?.textContent?.trim()).toBe('Book Now');
    });

    it('should display service image', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const img = compiled.querySelector('.service-image img') as HTMLImageElement;
      expect(img).toBeTruthy();
      expect(img.src).toContain('tax-preparation.avif');
    });

    it('should display contact details section', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const heading = compiled.querySelector('.contact-heading');
      const address = compiled.querySelector('.contact-address');
      expect(heading?.textContent).toBe('Contact Details');
      expect(address?.textContent).toBe('3317 El Cajon Blvd, San Diego, CA 92104, USA');
    });

    it('should have correct contact address', () => {
      expect(component.contactAddress).toBe('3317 El Cajon Blvd, San Diego, CA 92104, USA');
    });
  });

  describe('with invalid service', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ServiceDetailPage],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              params: of({ id: 'invalid-service' }),
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ServiceDetailPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should display error message for invalid service', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const errorMessage = compiled.querySelector('.error-message');
      expect(errorMessage?.textContent?.trim()).toBe('Service not found');
    });

    it('should have null service', () => {
      expect(component.service).toBeNull();
    });
  });

  describe('Immigration Services', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ServiceDetailPage],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              params: of({ id: 'immigration-services' }),
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ServiceDetailPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should load Immigration Services data', () => {
      expect(component.service?.title).toBe('Immigration Services');
      expect(component.service?.duration).toBe('50 min');
    });
  });

  describe('Translations', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ServiceDetailPage],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              params: of({ id: 'translations' }),
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ServiceDetailPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should load Translations data', () => {
      expect(component.service?.title).toBe('Translations');
      expect(component.service?.duration).toBe('1 hr 50 min');
    });
  });
});
