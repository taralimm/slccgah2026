import fs from 'fs';
import path from 'path';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Registration, EmailLog, SystemStatus } from '../src/types.js';

const DATA_DIR = path.join(process.cwd(), 'data');
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');
const REGISTRATIONS_FILE = path.join(DATA_DIR, 'registrations.json');
const EMAILS_FILE = path.join(DATA_DIR, 'emails.json');
const META_FILE = path.join(DATA_DIR, 'meta.json');

// Initialize local JSON DB structure
export function initDb() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
  if (!fs.existsSync(REGISTRATIONS_FILE)) {
    fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify([], null, 2), 'utf8');
  }
  if (!fs.existsSync(EMAILS_FILE)) {
    fs.writeFileSync(EMAILS_FILE, JSON.stringify([], null, 2), 'utf8');
  }
  if (!fs.existsSync(META_FILE)) {
    const defaultMeta = {
      globalSubmissionCounter: 0,
    };
    fs.writeFileSync(META_FILE, JSON.stringify(defaultMeta, null, 2), 'utf8');
  }
}

// Global Supabase client
let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(url, key, {
        auth: {
          persistSession: false
        }
      });
      console.log('🔌 Supabase Client initialized successfully.');
    } catch (err) {
      console.error('❌ Error initializing Supabase client:', err);
    }
  }

  return supabaseInstance;
}

// Upload payment proof (either to Supabase Storage or fallback local public storage)
export async function uploadPaymentProof(
  regId: string,
  fileName: string,
  base64Data: string,
  mimeType: string
): Promise<string> {
  initDb();
  const cleanBase64 = base64Data.replace(/^data:image\/\w+;base64,/, "").replace(/^data:application\/pdf;base64,/, "");
  const buffer = Buffer.from(cleanBase64, 'base64');

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      // 1. Create storage bucket 'payment-proofs' if it doesn't exist
      // In Supabase client library, bucket creation is usually done in console or admin.
      // We will attempt to upload.
      const storagePath = `${regId}_${Date.now()}_${fileName}`;
      const { data, error } = await supabase.storage
        .from('payment-proofs')
        .upload(storagePath, buffer, {
          contentType: mimeType,
          upsert: true
        });

      if (error) {
        throw error;
      }

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('payment-proofs')
        .getPublicUrl(storagePath);

      console.log(`☁️ Uploaded payment proof to Supabase Storage: ${publicUrl}`);
      return publicUrl;
    } catch (err) {
      console.error('⚠️ Supabase Storage Upload failed, falling back to local storage:', err);
    }
  }

  // Fallback to local on-disk storage
  const localFileName = `${regId}_${fileName}`;
  const localFilePath = path.join(UPLOADS_DIR, localFileName);
  fs.writeFileSync(localFilePath, buffer);
  
  // Public URL is server-served static path
  const localPublicUrl = `/uploads/${localFileName}`;
  console.log(`📁 Saved payment proof locally on disk: ${localPublicUrl}`);
  return localPublicUrl;
}

// Get and increment global submission counter
export function incrementSubmissionCounter(): number {
  initDb();
  const meta = JSON.parse(fs.readFileSync(META_FILE, 'utf8'));
  meta.globalSubmissionCounter = (meta.globalSubmissionCounter || 0) + 1;
  fs.writeFileSync(META_FILE, JSON.stringify(meta, null, 2), 'utf8');
  return meta.globalSubmissionCounter;
}

// Get all registrations
export function getRegistrations(): Registration[] {
  initDb();
  try {
    const data = fs.readFileSync(REGISTRATIONS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading registrations DB:", error);
    return [];
  }
}

// Save or Update a registration
export function saveRegistration(reg: Registration) {
  initDb();
  const regs = getRegistrations();
  const index = regs.findIndex(r => r.id === reg.id);
  if (index >= 0) {
    regs[index] = reg;
  } else {
    regs.push(reg);
  }
  fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify(regs, null, 2), 'utf8');

  // Supabase Backup Sync if configured
  const supabase = getSupabaseClient();
  if (supabase) {
    supabase.from('registrations')
      .upsert({
        id: reg.id,
        submission_number: reg.submissionNumber,
        timestamp: reg.timestamp,
        primary_first_name: reg.registrant.firstName,
        primary_last_name: reg.registrant.lastName,
        primary_email: reg.registrant.email,
        primary_phone: reg.registrant.phone,
        primary_address: reg.registrant.address,
        primary_batch_year: reg.registrant.batchYear,
        has_companion: reg.hasCompanion,
        companion_first_name: reg.companion?.firstName || null,
        companion_last_name: reg.companion?.lastName || null,
        companion_email: reg.companion?.email || null,
        companion_phone: reg.companion?.phone || null,
        companion_address: reg.companion?.address || null,
        companion_batch_year: reg.companion?.batchYear || null,
        reference_id: reg.referenceId,
        proof_of_payment_url: reg.proofOfPaymentUrl,
        payment_status: reg.paymentStatus,
        remarks: reg.remarks || null,
        approval_date: reg.approvalDate || null,
        admin_notes: reg.adminNotes || null,
        registration_status: reg.registrationStatus
      })
      .then(({ error }) => {
        if (error) console.error('⚠️ Failed to sync record to Supabase DB:', error.message);
        else console.log('☁️ Synced registration record to Supabase database.');
      });
  }
}

// Get registration by ID
export function getRegistrationById(id: string): Registration | undefined {
  const regs = getRegistrations();
  return regs.find(r => r.id === id);
}

// Save direct Email Log
export function saveEmailLog(log: EmailLog) {
  initDb();
  try {
    const logsData = fs.readFileSync(EMAILS_FILE, 'utf8');
    const logs: EmailLog[] = JSON.parse(logsData);
    logs.push(log);
    fs.writeFileSync(EMAILS_FILE, JSON.stringify(logs, null, 2), 'utf8');
  } catch (error) {
    console.error("Error writing email logs:", error);
  }
}

// Get all Email Logs
export function getEmailLogs(): EmailLog[] {
  initDb();
  try {
    const data = fs.readFileSync(EMAILS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Helper to calculate statistics
export function getSystemStats(): SystemStatus {
  const regs = getRegistrations();
  let totalAttendees = 0;
  let approvedAttendees = 0;
  let pendingReviewAttendees = 0;

  regs.forEach(r => {
    const attendees = 1 + (r.hasCompanion ? 1 : 0);
    totalAttendees += attendees;
    if (r.paymentStatus === 'Approved') {
      approvedAttendees += attendees;
    } else if (r.paymentStatus === 'Pending Review') {
      pendingReviewAttendees += attendees;
    }
  });

  return {
    supabaseConfigured: !!process.env.SUPABASE_URL,
    resendConfigured: !!process.env.RESEND_API_KEY,
    sheetsConfigured: !!(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY),
    smtpConfigured: !!(process.env.SMTP_USER && process.env.SMTP_PASS),
    totalSubmissions: regs.length,
    totalAttendees,
    approvedAttendees,
    pendingReviewAttendees,
  };
}
