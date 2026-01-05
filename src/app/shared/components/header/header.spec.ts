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
});
