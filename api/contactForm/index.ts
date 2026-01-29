import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { EmailClient, EmailMessage } from '@azure/communication-email';

// Environment variables
const CONNECTION_STRING = process.env.AZURE_COMMUNICATION_CONNECTION_STRING || '';
const FROM_ADDRESS = process.env.EMAIL_FROM_ADDRESS || '';
const TO_ADDRESS = process.env.EMAIL_TO_ADDRESS || '';
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY || '';

// Request body interface
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  recaptchaToken: string;
  locale?: string;
}

// Validation helper
function validateContactForm(data: ContactFormData): string[] {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Valid email is required');
  }

  if (!data.subject || data.subject.trim().length === 0) {
    errors.push('Subject is required');
  }

  if (!data.message || data.message.trim().length === 0) {
    errors.push('Message is required');
  }

  if (!data.recaptchaToken) {
    errors.push('reCAPTCHA token is required');
  }

  return errors;
}

// reCAPTCHA verification
async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${RECAPTCHA_SECRET}&response=${token}`,
    });

    const data = await response.json();
    return data.success === true && data.score >= 0.5;
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error);
    return false;
  }
}

// Email template for business notification
function getBusinessEmailHtml(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #1976d2; color: white; padding: 20px; text-align: center; }
    .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #555; }
    .value { margin-top: 5px; padding: 10px; background-color: white; border-left: 3px solid #1976d2; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name:</div>
        <div class="value">${escapeHtml(data.name)}</div>
      </div>
      <div class="field">
        <div class="label">Email:</div>
        <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
      </div>
      <div class="field">
        <div class="label">Subject:</div>
        <div class="value">${escapeHtml(data.subject)}</div>
      </div>
      <div class="field">
        <div class="label">Message:</div>
        <div class="value">${escapeHtml(data.message).replace(/\n/g, '<br>')}</div>
      </div>
      <div class="field">
        <div class="label">Submitted At:</div>
        <div class="value">${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}</div>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

// Email template for customer confirmation (English)
function getCustomerConfirmationEmailHtmlEn(name: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #1976d2; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You for Contacting Us</h1>
    </div>
    <div class="content">
      <p>Dear ${escapeHtml(name)},</p>
      <p>Thank you for reaching out to Larios Income Tax and Immigration. We have received your message and will respond to you as soon as possible.</p>
      <p>Our typical response time is within 1-2 business days. If your inquiry is urgent, please feel free to call us directly:</p>
      <ul>
        <li><strong>San Diego Office:</strong> (619) 972-3350</li>
        <li><strong>Tijuana Office:</strong> (619) 949-8007</li>
      </ul>
      <p>We appreciate your interest in our services and look forward to assisting you.</p>
      <p>Best regards,<br>Larios Income Tax and Immigration Team</p>
    </div>
    <div class="footer">
      <p>© 2024-2026 BY LARIOS INCOME TAX AND IMMIGRATION.</p>
    </div>
  </div>
</body>
</html>
  `;
}

// Email template for customer confirmation (Spanish)
function getCustomerConfirmationEmailHtmlEs(name: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #1976d2; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Gracias por Contactarnos</h1>
    </div>
    <div class="content">
      <p>Estimado(a) ${escapeHtml(name)},</p>
      <p>Gracias por comunicarse con Larios Income Tax and Immigration. Hemos recibido su mensaje y le responderemos lo antes posible.</p>
      <p>Nuestro tiempo de respuesta habitual es de 1-2 días hábiles. Si su consulta es urgente, no dude en llamarnos directamente:</p>
      <ul>
        <li><strong>Oficina San Diego:</strong> (619) 972-3350</li>
        <li><strong>Oficina Tijuana:</strong> (619) 949-8007</li>
      </ul>
      <p>Agradecemos su interés en nuestros servicios y esperamos poder ayudarle.</p>
      <p>Saludos cordiales,<br>Equipo de Larios Income Tax and Immigration</p>
    </div>
    <div class="footer">
      <p>© 2024-2026 BY LARIOS INCOME TAX AND IMMIGRATION.</p>
    </div>
  </div>
</body>
</html>
  `;
}

// HTML escape utility
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Main function handler
export async function contactForm(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log('Contact form submission received');

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return { status: 204, headers: corsHeaders };
  }

  try {
    // Parse request body
    const body = (await request.json()) as ContactFormData;

    // Validate form data
    const validationErrors = validateContactForm(body);
    if (validationErrors.length > 0) {
      return {
        status: 400,
        headers: corsHeaders,
        jsonBody: {
          success: false,
          message: 'Validation failed',
          errors: validationErrors,
        },
      };
    }

    // Verify reCAPTCHA
    const isRecaptchaValid = await verifyRecaptcha(body.recaptchaToken);
    if (!isRecaptchaValid) {
      context.log('reCAPTCHA verification failed');
      return {
        status: 400,
        headers: corsHeaders,
        jsonBody: {
          success: false,
          message: 'reCAPTCHA verification failed. Please try again.',
        },
      };
    }

    // Initialize email client
    const emailClient = new EmailClient(CONNECTION_STRING);

    // Send business notification email
    const businessEmailMessage: EmailMessage = {
      senderAddress: FROM_ADDRESS,
      content: {
        subject: `Contact Form: ${body.subject}`,
        html: getBusinessEmailHtml(body),
      },
      recipients: {
        to: [{ address: TO_ADDRESS }],
      },
    };

    context.log('Sending business notification email');
    const businessPoller = await emailClient.beginSend(businessEmailMessage);
    await businessPoller.pollUntilDone();

    // Send customer confirmation email
    const isSpanish = body.locale === 'es-MX';
    const confirmationSubject = isSpanish
      ? 'Confirmación: Hemos Recibido Su Mensaje'
      : 'Confirmation: We Received Your Message';
    const confirmationHtml = isSpanish
      ? getCustomerConfirmationEmailHtmlEs(body.name)
      : getCustomerConfirmationEmailHtmlEn(body.name);

    const confirmationEmailMessage: EmailMessage = {
      senderAddress: FROM_ADDRESS,
      content: {
        subject: confirmationSubject,
        html: confirmationHtml,
      },
      recipients: {
        to: [{ address: body.email }],
      },
    };

    context.log('Sending customer confirmation email');
    const confirmationPoller = await emailClient.beginSend(confirmationEmailMessage);
    await confirmationPoller.pollUntilDone();

    context.log('Emails sent successfully');

    return {
      status: 200,
      headers: corsHeaders,
      jsonBody: {
        success: true,
        message: isSpanish
          ? 'Mensaje enviado exitosamente. Recibirá una confirmación por correo electrónico.'
          : 'Message sent successfully. You will receive a confirmation email.',
      },
    };
  } catch (error) {
    context.error('Error processing contact form:', error);
    return {
      status: 500,
      headers: corsHeaders,
      jsonBody: {
        success: false,
        message: 'An error occurred while processing your request. Please try again later.',
      },
    };
  }
}

app.http('contactForm', {
  methods: ['POST', 'OPTIONS'],
  authLevel: 'anonymous',
  handler: contactForm,
});
