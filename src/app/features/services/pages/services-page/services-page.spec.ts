import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ServicesPage } from './services-page';

describe('ServicesPage', () => {
  let component: ServicesPage;
  let fixture: ComponentFixture<ServicesPage>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ServicesPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
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
    const titles = Array.from(compiled.querySelectorAll('.service-content h2')).map(el =>
      el.textContent?.trim()
    );
    expect(titles).toContain('TAX PREPARATION');
    expect(titles).toContain('IMMIGRATION SERVICES');
    expect(titles).toContain('TRANSLATIONS');
    expect(titles).toContain('E-FILE & RAPID REFUND');
    expect(titles).toContain('DUAL CITIZENSHIP');
  });

  it('should have alternating layout', () => {
    expect(component.isReverse(0)).toBe(false);
    expect(component.isReverse(1)).toBe(true);
    expect(component.isReverse(2)).toBe(false);
    expect(component.isReverse(3)).toBe(true);
  });

  it('should have service images', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const images = compiled.querySelectorAll('.service-image img');
    expect(images.length).toBe(9);

    images.forEach(img => {
      expect((img as HTMLImageElement).src).toBeTruthy();
    });
  });

  it('should have clickable service cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const serviceCards = compiled.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
      expect(card.getAttribute('role')).toBe('button');
      expect(card.getAttribute('tabindex')).toBe('0');
    });
  });

  it('should have aria-label for accessibility', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const firstCard = compiled.querySelector('.service-card');
    const ariaLabel = firstCard?.getAttribute('aria-label');

    expect(ariaLabel).toContain('View details and book');
  });

  it('should navigate to service detail page when card is clicked', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    const compiled = fixture.nativeElement as HTMLElement;
    const firstCard = compiled.querySelector('.service-card') as HTMLElement;

    firstCard.click();

    expect(navigateSpy).toHaveBeenCalledWith(['/book-online', 'tax-preparation']);
  });

  it('should navigate to correct service when different cards are clicked', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    const compiled = fixture.nativeElement as HTMLElement;
    const serviceCards = compiled.querySelectorAll('.service-card') as NodeListOf<HTMLElement>;

    // Click second card (Immigration Services)
    serviceCards[1].click();
    expect(navigateSpy).toHaveBeenCalledWith(['/book-online', 'immigration-services']);

    // Click third card (Translations)
    serviceCards[2].click();
    expect(navigateSpy).toHaveBeenCalledWith(['/book-online', 'translations']);
  });

  it('should call navigateToService method when card is clicked', () => {
    const navigateSpy = vi.spyOn(component, 'navigateToService');
    const compiled = fixture.nativeElement as HTMLElement;
    const firstCard = compiled.querySelector('.service-card') as HTMLElement;

    firstCard.click();

    expect(navigateSpy).toHaveBeenCalledWith('tax-preparation');
  });
});
