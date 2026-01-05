import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookOnlinePage } from './book-online-page';

describe('BookOnlinePage', () => {
  let component: BookOnlinePage;
  let fixture: ComponentFixture<BookOnlinePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookOnlinePage],
    }).compileComponents();

    fixture = TestBed.createComponent(BookOnlinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have three services', () => {
    expect(component.services.length).toBe(3);
  });

  it('should render three service cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const serviceCards = compiled.querySelectorAll('.service-card');
    expect(serviceCards.length).toBe(3);
  });

  it('should display correct service titles', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const titles = Array.from(compiled.querySelectorAll('.service-title')).map(el =>
      el.textContent?.trim()
    );
    expect(titles).toEqual(['Tax Preparation', 'Immigration Services', 'Translations']);
  });

  it('should have Read More links for each service', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const readMoreLinks = compiled.querySelectorAll('.read-more-link');
    expect(readMoreLinks.length).toBe(3);
    readMoreLinks.forEach(link => {
      expect(link.textContent?.trim()).toBe('Read More');
    });
  });

  it('should have Book Now buttons for each service', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const bookNowButtons = compiled.querySelectorAll('.book-now-button');
    expect(bookNowButtons.length).toBe(3);
    bookNowButtons.forEach(button => {
      expect(button.textContent?.trim()).toBe('Book Now');
    });
  });

  it('should display service duration and consultation info', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const durations = compiled.querySelectorAll('.service-duration');
    const consultations = compiled.querySelectorAll('.service-consultation');

    expect(durations.length).toBe(3);
    expect(consultations.length).toBe(3);

    consultations.forEach(consultation => {
      expect(consultation.textContent?.trim()).toBe('Free Consultation');
    });
  });

  it('should have service images', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const images = compiled.querySelectorAll('.service-image img');
    expect(images.length).toBe(3);

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
