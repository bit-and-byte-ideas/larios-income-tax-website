import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactSection } from './contact-section';
import { SOCIAL_MEDIA_LINKS } from '../../../../shared/constants/social-media.constants';

describe('ContactSection', () => {
  let component: ContactSection;
  let fixture: ComponentFixture<ContactSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactSection],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactSection);
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

  it('should display contact heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('.contact-heading');
    expect(heading?.textContent).toContain('CONTACT US');
  });

  it('should have two location blocks', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const locations = compiled.querySelectorAll('.contact-location');
    expect(locations.length).toBe(2);
  });

  it('should have contact form with all required fields', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const nameInput = compiled.querySelector('input[name="name"]');
    const emailInput = compiled.querySelector('input[name="email"]');
    const phoneInput = compiled.querySelector('input[name="phone"]');
    const addressInput = compiled.querySelector('input[name="address"]');
    const subjectInput = compiled.querySelector('input[name="subject"]');
    const messageTextarea = compiled.querySelector('textarea[name="message"]');
    const submitButton = compiled.querySelector('.submit-button');

    expect(nameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(phoneInput).toBeTruthy();
    expect(addressInput).toBeTruthy();
    expect(subjectInput).toBeTruthy();
    expect(messageTextarea).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });

  it('should have social media icons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const socialLinks = compiled.querySelectorAll('.contact-social a');
    expect(socialLinks.length).toBe(2);
  });
});
