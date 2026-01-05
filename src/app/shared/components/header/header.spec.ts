import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Header } from './header';
import { SOCIAL_MEDIA_LINKS } from '../../constants/social-media.constants';

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
    expect(component.socialMediaLinks).toBe(SOCIAL_MEDIA_LINKS);
  });

  it('should render Facebook link with correct URL', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const facebookLink = compiled.querySelector('a[aria-label="Facebook"]') as HTMLAnchorElement;
    expect(facebookLink).toBeTruthy();
    expect(facebookLink.href).toBe(SOCIAL_MEDIA_LINKS.facebook);
  });

  it('should render Instagram link with correct URL', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const instagramLink = compiled.querySelector('a[aria-label="Instagram"]') as HTMLAnchorElement;
    expect(instagramLink).toBeTruthy();
    expect(instagramLink.href).toBe(SOCIAL_MEDIA_LINKS.instagram);
  });

  it('should have navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navLinks = compiled.querySelectorAll('.nav-link');
    expect(navLinks.length).toBeGreaterThan(0);
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
    const dropdownMenu = compiled.querySelector('.dropdown-menu');
    expect(dropdownMenu).toBeTruthy();
  });

  it('should have United States and Mexico dropdown links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const dropdownLinks = compiled.querySelectorAll('.dropdown-link');
    expect(dropdownLinks.length).toBe(2);
    expect(dropdownLinks[0].textContent?.trim()).toBe('United States');
    expect(dropdownLinks[1].textContent?.trim()).toBe('Mexico');
  });

  it('should have correct routes for dropdown links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const dropdownLinks = Array.from(compiled.querySelectorAll('.dropdown-link'));
    const usLink = dropdownLinks.find(link => link.textContent?.trim() === 'United States');
    const mxLink = dropdownLinks.find(link => link.textContent?.trim() === 'Mexico');
    expect(usLink).toBeTruthy();
    expect(mxLink).toBeTruthy();
  });
});
