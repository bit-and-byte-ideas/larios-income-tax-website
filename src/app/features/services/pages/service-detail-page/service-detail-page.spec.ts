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

    it('should display two info chips', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const chips = compiled.querySelectorAll('mat-chip');
      expect(chips.length).toBe(2);
    });

    it('should display duration and consultation', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const chips = Array.from(compiled.querySelectorAll('mat-chip')).map(el =>
        el.textContent?.trim()
      );
      expect(chips[0]).toBe('50 min');
      expect(chips[1]).toBe('Free Consultation');
    });

    it('should have Call Us For an Appointment link', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const button = compiled.querySelector('.book-now-button') as HTMLAnchorElement;
      expect(button?.textContent?.trim()).toContain('Call Us For an Appointment');
      expect(button?.href).toContain('tel:');
    });

    it('should display service image', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const img = compiled.querySelector('mat-card img') as HTMLImageElement;
      expect(img).toBeTruthy();
      expect(img.src).toContain('tax-preparation.avif');
    });

    it('should display service description section', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const descriptionSection = compiled.querySelector('.service-description');
      expect(descriptionSection).toBeTruthy();

      const heading = descriptionSection?.querySelector('h2');
      expect(heading?.textContent?.trim()).toBe('About This Service');

      const description = descriptionSection?.querySelector('p');
      expect(description?.textContent?.trim()).toBeTruthy();
      expect(description?.textContent?.trim().length).toBeGreaterThan(50);
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

  describe('E-File & Rapid Refund', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ServiceDetailPage],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              params: of({ id: 'e-file-rapid-refund' }),
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ServiceDetailPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should load E-File & Rapid Refund data', () => {
      expect(component.service?.title).toBe('E-File & Rapid Refund');
      expect(component.service?.duration).toBe('30 min');
    });
  });

  describe('Dual Citizenship', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ServiceDetailPage],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              params: of({ id: 'dual-citizenship' }),
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ServiceDetailPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should load Dual Citizenship data', () => {
      expect(component.service?.title).toBe('Dual Citizenship');
      expect(component.service?.duration).toBe('1 hr');
    });

    it('should display placeholder image for new services', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const img = compiled.querySelector('mat-card img') as HTMLImageElement;
      expect(img.src).toContain('larios_tax_logo_transparent.avif');
    });
  });

  describe('ITINs', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ServiceDetailPage],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              params: of({ id: 'itins' }),
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ServiceDetailPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should load ITINs data', () => {
      expect(component.service?.title).toBe('ITINs');
      expect(component.service?.duration).toBe('40 min');
    });
  });
});
