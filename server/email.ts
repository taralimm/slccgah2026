import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import { Registration, EmailLog } from '../src/types.js';
import { saveEmailLog } from './db.js';

// Initialize Resend Client if configured
function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
}

// Fallback SMTP Transporter if configured
function getSmtpTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });
}

/**
 * Send email utilizing Resend (primary) or NodeMailer (secondary), with Simulated local fallback.
 */
export async function sendEmail({
  to,
  subject,
  html,
  text,
  registrationId
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
  registrationId?: string;
}): Promise<boolean> {
  const timestamp = new Date().toISOString();
  const emailLogId = 'EML-' + Math.random().toString(36).substr(2, 9).toUpperCase();

  // Try Resend first
  const resend = getResendClient();
  if (resend) {
    try {
      await resend.emails.send({
        from: 'SLCC Alumni Team <onboarding@resend.dev>', // Resend verified domain or onboarding default
        to,
        subject,
        html,
        text
      });

      saveEmailLog({
        id: emailLogId,
        registrationId,
        to,
        subject,
        body: text,
        timestamp,
        status: 'Sent'
      });
      console.log(`✉️ [Resend] Email SENT to ${to}: ${subject}`);
      return true;
    } catch (error: any) {
      console.error(`❌ Resend API failed: ${error.message}. Attempting SMTP fallback...`);
    }
  }

  // Try Nodemailer SMTP second
  const smtp = getSmtpTransporter();
  if (smtp) {
    try {
      await smtp.sendMail({
        from: `"SLCC Alumni Team" <${process.env.SMTP_USER}>`,
        to,
        subject,
        text,
        html
      });

      saveEmailLog({
        id: emailLogId,
        registrationId,
        to,
        subject,
        body: text,
        timestamp,
        status: 'Sent'
      });
      console.log(`✉️ [SMTP] Email SENT to ${to}: ${subject}`);
      return true;
    } catch (error: any) {
      console.error(`❌ SMTP fallback failed: ${error.message}`);
      saveEmailLog({
        id: emailLogId,
        registrationId,
        to,
        subject,
        body: text,
        timestamp,
        status: 'Failed',
        error: error.message
      });
      return false;
    }
  }

  // Simulated Email Log
  saveEmailLog({
    id: emailLogId,
    registrationId,
    to,
    subject,
    body: text,
    timestamp,
    status: 'Simulated'
  });
  console.log(`✉️ [SIMULATED EMAIL] to ${to}\nSubject: ${subject}\n--------------------\n${text}\n--------------------`);
  return true;
}

/**
 * Email 1: Submission Received immediately after registration
 */
export async function sendSubmissionReceivedEmail(reg: Registration) {
  const name = `${reg.registrant.firstName} ${reg.registrant.lastName}`;
  const totalAmount = reg.hasCompanion ? '₱1,000.00 (2 persons)' : '₱500.00 (1 person)';

  const subject = 'SLCC GAH 2026 Registration Received';
  
  const text = `Hello ${reg.registrant.firstName},

Thank you for registering for the Saint Louis College-Cebu Grand Alumni Homecoming 2026.

Your registration has been received and is currently pending payment verification.
Reference ID: ${reg.referenceId}
Total Amount: ${totalAmount}

You will receive an email notification once your payment has been reviewed.

Thank you,
SLCC GAH 2026 Registration Team`;

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #0038a8; margin-bottom: 20px;">SLCC GAH 2026 Registration Received</h2>
      <p>Hello <strong>${reg.registrant.firstName}</strong>,</p>
      <p>Thank you for registering for the <strong>Saint Louis College-Cebu Grand Alumni Homecoming 2026</strong>!</p>
      
      <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #0ea5e9; margin: 20px 0; border-radius: 4px;">
        <p style="margin: 0 0 8px 0;"><strong>Reference ID:</strong> ${reg.referenceId}</p>
        <p style="margin: 0 0 8px 0;"><strong>Total Registered:</strong> ${reg.hasCompanion ? '2 (Primary + Companion)' : '1 (Primary)'}</p>
        <p style="margin: 0;"><strong>Status:</strong> Pending payment review</p>
      </div>

      <p>We are currently reviewing your uploaded payment proof. Once confirmed, you will receive another email with your official verification status.</p>
      
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="font-size: 0.875rem; color: #64748b;">This email was sent on behalf of Saint Louis College-Cebu GAH 2026 Committee.</p>
    </div>
  `;

  await sendEmail({ to: reg.registrant.email, subject, html, text, registrationId: reg.id });
}

/**
 * Email 2: Administrator Notification Email
 */
export async function sendAdminNotificationEmail(reg: Registration) {
  const adminEmail = process.env.ADMIN_EMAIL || 'charles8mendoza@gmail.com';
  const primaryName = `${reg.registrant.firstName} ${reg.registrant.lastName}`;
  const totalAmount = reg.hasCompanion ? '₱1,000.00' : '₱500.00';

  const subject = 'New Registration Requires Payment Verification';

  const text = `New GAH 2026 Registration Requires Review!

Submission Number: #${String(reg.submissionNumber).padStart(6, '0')}
Primary Registrant: ${primaryName} (${reg.registrant.email} / ${reg.registrant.phone})
Batch Year: ${reg.registrant.batchYear}

Companion Registered: ${reg.hasCompanion ? 'Yes' : 'No'}
${reg.hasCompanion && reg.companion ? `Companion Name: ${reg.companion.firstName} ${reg.companion.lastName} (Batch: ${reg.companion.batchYear})` : ''}

Reference ID: ${reg.referenceId}
Total Amount: ${totalAmount}

Review in the Admin Dashboard to Approve or Reject this payment.`;

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #e11d48; margin-bottom: 20px;">New Payment Verification Required</h2>
      <p>A new Saint Louis College-Cebu GAH 2026 registration has been recorded and requires verification.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background-color: #f8fafc;">
          <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Submission No:</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0;">#${String(reg.submissionNumber).padStart(6, '0')}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Primary Registrant:</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0;">${primaryName} (Batch ${reg.registrant.batchYear})</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Has Companion:</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0;">${reg.hasCompanion ? 'Yes' : 'No'}</td>
        </tr>
        ${reg.hasCompanion && reg.companion ? `
        <tr>
          <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Companion Name:</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0;">${reg.companion.firstName} ${reg.companion.lastName} (Batch ${reg.companion.batchYear})</td>
        </tr>
        ` : ''}
        <tr style="background-color: #f8fafc;">
          <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Reference ID:</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0;"><code>${reg.referenceId}</code></td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Amount Due:</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0; color: #15803d; font-weight: bold;">${totalAmount}</td>
        </tr>
      </table>

      <div style="text-align: center; margin-top: 30px;">
        <a href="${process.env.APP_URL || 'http://localhost:3000'}/admin" style="background-color: #0038a8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Go to Admin Portal</a>
      </div>
    </div>
  `;

  await sendEmail({ to: adminEmail, subject, html, text, registrationId: reg.id });
}

/**
 * APPROVED PAYMENT EMAIL
 */
export async function sendPaymentApprovedEmail(reg: Registration) {
  const primaryName = `${reg.registrant.firstName} ${reg.registrant.lastName}`;
  const subject = 'Payment Confirmed – Saint Louis College-Cebu Grand Alumni Homecoming 2026';

  const text = `Hello ${reg.registrant.firstName},

Your payment has been successfully verified.

Your registration is now confirmed. This serves as your confirmation for the Saint Louis College-Cebu Grand Alumni Homecoming 2026: 90's Throwback reunion.

Event Details:
Date: August 1, 2026
Theme: 90's Throwback Reunion
Venue: Saint Louis College-Cebu Campus Ground
Reference ID: ${reg.referenceId}

We appreciate your support and can't wait to see you throw it back to the dopest decade with us!

If you have any questions, please feel free to reply to this email or contact us at info@saintlouiscollegecebualumni.org.

Thank you,
SLCC GAH 2026 Committee`;

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 2px solid #0038a8; border-radius: 12px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #0038a8; margin: 0; font-size: 1.8rem;">🎉 Registration Confirmed! 🎉</h1>
        <p style="color: #64748b; margin-top: 5px;">Saint Louis College-Cebu Grand Alumni Homecoming 2026</p>
      </div>

      <p>Hello <strong>${reg.registrant.firstName}</strong>,</p>
      <p>Your payment has been successfully verified, and your registration is now <strong>CONFIRMED</strong>!</p>

      <div style="background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 20px; border-radius: 6px; margin: 25px 0;">
        <h3 style="color: #16a34a; margin: 0 0 10px 0;">EVENT TICKET DETAILS</h3>
        <p style="margin: 0 0 8px 0;"><strong>Main Event:</strong> Saint Louis College-Cebu Grand Alumni Homecoming 2026</p>
        <p style="margin: 0 0 8px 0;"><strong>Date & Time:</strong> August 1, 2026 (Registration starts at 5:00 PM)</p>
        <p style="margin: 0 0 8px 0;"><strong>Theme:</strong> 90's Throwback Reunion (Show off your best 90's outfit! 🎧🎸)</p>
        <p style="margin: 0 0 8px 0;"><strong>Reference ID:</strong> <code>${reg.referenceId}</code></p>
        <p style="margin: 0;"><strong>Attendees Registered:</strong> ${reg.hasCompanion ? `2 persons (Primary + Companion)` : `1 person`}</p>
      </div>

      <p>Get ready for a visual throwback and a legendary evening full of nostalgic hits, food, prizes, and SLCC pride. 💙</p>

      <div style="margin-top: 30px; font-size: 0.85rem; color: #64748b; line-height: 1.5;">
        <p>For inquiries, please email us at <a href="mailto:charles8mendoza@gmail.com">charles8mendoza@gmail.com</a>.</p>
        <p style="text-align: center; font-weight: bold; margin-top: 20px; color: #0038a8;">SLCC GAH 2026 Organizers</p>
      </div>
    </div>
  `;

  await sendEmail({ to: reg.registrant.email, subject, html, text, registrationId: reg.id });
}

/**
 * REJECTED PAYMENT EMAIL
 */
export async function sendPaymentRejectedEmail(reg: Registration) {
  const notes = reg.adminNotes || 'Image was illegible / transaction not found in records.';
  const subject = 'Payment Requires Review – Saint Louis College-Cebu Grand Alumni Homecoming 2026';

  const text = `Hello ${reg.registrant.firstName},

We were unable to verify your submitted payment for the Saint Louis College-Cebu Grand Alumni Homecoming 2026.

Review Team Remarks:
"${notes}"

To complete your registration, please resubmit your GCash / Bank Transfer details or send any additional supporting notes/screenshots by replying directly to this email or emailing us at charles8mendoza@gmail.com with your Reference ID: ${reg.referenceId}.

Thank you for your understanding.

SLCC GAH 2026 Committee`;

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 2px solid #e11d48; border-radius: 12px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #e11d48; margin: 0; font-size: 1.8rem;">⚠️ Payment Verification Review Required</h1>
        <p style="color: #64748b; margin-top: 5px;">Saint Louis College-Cebu Grand Alumni Homecoming 2026</p>
      </div>

      <p>Hello <strong>${reg.registrant.firstName}</strong>,</p>
      <p>We are writing to notify you that our registration team could not successfully verify your uploaded proof of payment.</p>

      <div style="background-color: #fff1f2; border-left: 4px solid #f43f5e; padding: 15px 20px; border-radius: 6px; margin: 25px 0;">
        <h3 style="color: #e11d48; margin: 0 0 8px 0;">REASON FOR REVIEW FLAG</h3>
        <p style="margin: 0; font-style: italic; color: #334155;">"${notes}"</p>
      </div>

      <p><strong>Instructions to Complete Registration:</strong></p>
      <ol style="line-height: 1.6;">
        <li>Double-check your bank transaction status or GCash reference history.</li>
        <li>Reply directly to this email with a clear attachment of your payment receipt.</li>
        <li>State your Reference ID: <strong><code>${reg.referenceId}</code></strong> in your reply.</li>
      </ol>

      <p>Once we receive the updated proof, our committee will re-verify and confirm your reunion registration immediately.</p>

      <div style="margin-top: 30px; font-size: 0.85rem; color: #64748b; line-height: 1.5; border-top: 1px solid #e2e8f0; padding-top: 20px;">
        <p>If you have any questions, you can contact the homecoming secretariat at <a href="mailto:charles8mendoza@gmail.com">charles8mendoza@gmail.com</a>.</p>
        <p style="text-align: center; font-weight: bold; color: #e11d48; margin-top: 15px;">SLCC Homecoming Support Team</p>
      </div>
    </div>
  `;

  await sendEmail({ to: reg.registrant.email, subject, html, text, registrationId: reg.id });
}
