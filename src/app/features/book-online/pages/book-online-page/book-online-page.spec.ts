import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BookOnlinePage } from './book-online-page';

describe('BookOnlinePage', () => {
  let component: BookOnlinePage;
  let fixture: ComponentFixture<BookOnlinePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookOnlinePage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BookOnlinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have nine services', () => {
    expect(component.services.length).toBe(9);
  });

  it('should render nine service cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const serviceCards = compiled.querySelectorAll('.service-card');
    expect(serviceCards.length).toBe(9);
  });

  it('should display correct service titles', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const titles = Array.from(compiled.querySelectorAll('.service-title')).map(el =>
      el.textContent?.trim()
    );
    expect(titles).toContain('Tax Preparation');
    expect(titles).toContain('Immigration Services');
    expect(titles).toContain('Translations');
    expect(titles).toContain('E-File & Rapid Refund');
    expect(titles).toContain('Dual Citizenship');
  });

  it('should have Read More links for each service', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const readMoreLinks = compiled.querySelectorAll('.read-more-link');
    expect(readMoreLinks.length).toBe(9);
    readMoreLinks.forEach(link => {
      expect(link.textContent?.trim()).toBe('Read More');
    });
  });

  it('should have service IDs for routing', () => {
    expect(component.services[0].id).toBe('tax-preparation');
    expect(component.services[1].id).toBe('immigration-services');
    expect(component.services[2].id).toBe('translations');
    expect(component.services[3].id).toBe('e-file-rapid-refund');
  });

  it('should have Book Now buttons for each service', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const bookNowButtons = compiled.querySelectorAll('.book-now-button');
    expect(bookNowButtons.length).toBe(9);
    bookNowButtons.forEach(button => {
      expect(button.textContent?.trim()).toBe('Book Now');
    });
  });

  it('should display service duration and consultation info', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const durations = compiled.querySelectorAll('.service-duration');
    const consultations = compiled.querySelectorAll('.service-consultation');

    expect(durations.length).toBe(9);
    expect(consultations.length).toBe(9);

    consultations.forEach(consultation => {
      expect(consultation.textContent?.trim()).toBe('Free Consultation');
    });
  });

  it('should have service images', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const images = compiled.querySelectorAll('mat-card img');
    expect(images.length).toBe(9);

    images.forEach(img => {
      expect((img as HTMLImageElement).src).toBeTruthy();
    });
  });

  it('should have correct duration for Tax Preparation and Immigration Services', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const durations = Array.from(compiled.querySelectorAll('.service-duration')).map(el =>
      el.textContent?.trim()
    );
    expect(durations[0]).toBe('50 min');
    expect(durations[1]).toBe('50 min');
  });

  it('should have correct duration for Translations', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const durations = Array.from(compiled.querySelectorAll('.service-duration')).map(el =>
      el.textContent?.trim()
    );
    expect(durations[2]).toBe('1 hr 50 min');
  });
});
