import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, RouterLink } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Header } from './header';
import { BUSINESS_INFO } from '../../constants/business-info.constants';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have social media links from constants', () => {
    expect(component.socialMediaLinks).toBe(BUSINESS_INFO.socialMedia);
  });

  it('should render Facebook link with correct URL', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const facebookLink = compiled.querySelector('a[aria-label="Facebook"]') as HTMLAnchorElement;
    expect(facebookLink).toBeTruthy();
    expect(facebookLink.href).toBe(BUSINESS_INFO.socialMedia.facebook);
  });

  it('should render Instagram link with correct URL', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const instagramLink = compiled.querySelector('a[aria-label="Instagram"]') as HTMLAnchorElement;
    expect(instagramLink).toBeTruthy();
    expect(instagramLink.href).toBe(BUSINESS_INFO.socialMedia.instagram);
  });

  it('should have navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navButtons = compiled.querySelectorAll('.nav-button');
    expect(navButtons.length).toBeGreaterThan(0);
  });

  it('should have contact information', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const emailLink = compiled.querySelector('a[href^="mailto:"]');
    const phoneLink = compiled.querySelector('a[href^="tel:"]');
    expect(emailLink).toBeTruthy();
    expect(phoneLink).toBeTruthy();
  });

  it('should have Contact dropdown menu', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const contactMenu = compiled.querySelector('mat-menu');
    expect(contactMenu).toBeTruthy();
  });

  it('should have United States and Mexico dropdown links', () => {
    // Find the contact button (4th nav button)
    const navButtons = fixture.debugElement.queryAll(By.css('.nav-button'));
    const contactButton = navButtons.find(
      btn => btn.nativeElement.textContent?.trim() === 'Contact'
    );
    expect(contactButton).toBeTruthy();

    // Trigger the menu to open
    contactButton!.nativeElement.click();
    fixture.detectChanges();

    // Now query for menu items in the overlay
    const menuButtons = document.querySelectorAll('button[mat-menu-item]');
    expect(menuButtons.length).toBe(2);
    expect(menuButtons[0].textContent?.trim()).toBe('United States');
    expect(menuButtons[1].textContent?.trim()).toBe('Mexico');
  });
});
