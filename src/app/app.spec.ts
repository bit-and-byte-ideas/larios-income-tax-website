import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render header with logo', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const logoImg = compiled.querySelector('.header-logo-icon') as HTMLImageElement;
    expect(logoImg).toBeTruthy();
    expect(logoImg.src).toContain('larios_header_logo_transparent.avif');
    expect(logoImg.alt).toBe('Larios Income Tax Logo');
  });
});
