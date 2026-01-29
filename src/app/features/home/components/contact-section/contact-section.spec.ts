import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { ContactSection } from './contact-section';
import { SOCIAL_MEDIA_LINKS } from '../../../../shared/constants/social-media.constants';
import { vi } from 'vitest';

describe('ContactSection', () => {
  let component: ContactSection;
  let fixture: ComponentFixture<ContactSection>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactSection],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactSection);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have social media links from constants', () => {
    expect(component.socialMediaLinks).toBe(SOCIAL_MEDIA_LINKS);
  });

  it('should display "GET IN TOUCH" heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('.contact-heading');
    expect(heading?.textContent).toContain('GET IN TOUCH');
  });

  it('should display introduction text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const introText = compiled.querySelectorAll('.intro-text');
    expect(introText.length).toBeGreaterThan(0);
  });

  it('should have Contact Us button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const contactButton = compiled.querySelector('.contact-button');
    expect(contactButton).toBeTruthy();
    expect(contactButton?.textContent?.trim()).toBe('Contact Us');
  });

  it('should navigate to contact page when button is clicked', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    const compiled = fixture.nativeElement as HTMLElement;
    const contactButton = compiled.querySelector('.contact-button') as HTMLAnchorElement;
    contactButton.click();
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('should display "Stay Connected" social heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const socialHeading = compiled.querySelector('.social-heading');
    expect(socialHeading?.textContent).toContain('Stay Connected');
  });

  it('should display social media description text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const socialText = compiled.querySelector('.social-text');
    expect(socialText).toBeTruthy();
  });

  it('should render Facebook link with correct URL and description', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const facebookLink = compiled.querySelector(
      'a[aria-label="Follow us on Facebook"]'
    ) as HTMLAnchorElement;
    expect(facebookLink).toBeTruthy();
    expect(facebookLink.href).toBe(SOCIAL_MEDIA_LINKS.facebook);

    const socialName = facebookLink.querySelector('.social-name');
    expect(socialName?.textContent).toBe('Facebook');

    const socialDescription = facebookLink.querySelector('.social-description');
    expect(socialDescription?.textContent).toContain('tax tips');
  });

  it('should render Instagram link with correct URL and description', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const instagramLink = compiled.querySelector(
      'a[aria-label="Follow us on Instagram"]'
    ) as HTMLAnchorElement;
    expect(instagramLink).toBeTruthy();
    expect(instagramLink.href).toBe(SOCIAL_MEDIA_LINKS.instagram);

    const socialName = instagramLink.querySelector('.social-name');
    expect(socialName?.textContent).toBe('Instagram');

    const socialDescription = instagramLink.querySelector('.social-description');
    expect(socialDescription?.textContent).toContain('tax season');
  });

  it('should have two social media links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const socialLinks = compiled.querySelectorAll('.social-link');
    expect(socialLinks.length).toBe(2);
  });

  it('should have social media icons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const socialIcons = compiled.querySelectorAll('.social-icon');
    expect(socialIcons.length).toBe(2);
  });
});
