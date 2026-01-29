import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactFormRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  recaptchaToken: string;
  locale?: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  errors?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ContactFormService {
  private readonly apiUrl = '/api/contactForm';

  constructor(private http: HttpClient) {}

  submitContactForm(data: ContactFormRequest): Observable<ContactFormResponse> {
    return this.http.post<ContactFormResponse>(this.apiUrl, data);
  }
}
