export type PaymentStatus = 'Pending Review' | 'Approved' | 'Rejected';

export interface Companion {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  batchYear: string;
}

export interface MainRegistrant {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  batchYear: string;
}

export interface Registration {
  id: string; // submission uuid (e.g. REG-XXXX)
  submissionNumber: number; // global auto-increment block
  timestamp: string; // ISO Datetime
  registrant: MainRegistrant;
  hasCompanion: boolean;
  companion?: Companion;
  referenceId: string; // unique reference generated format SLSGAH-2026-REG-XXXXXX
  proofOfPaymentName: string;
  proofOfPaymentType: string;
  proofOfPaymentData: string; // base64 or URL
  proofOfPaymentUrl?: string; // storage URL (Supabase storage or server static link)
  paymentStatus: PaymentStatus;
  remarks?: string;
  approvalDate?: string;
  adminNotes?: string;
  registrationStatus: string; // e.g. "Active", "Cancelled"
}

export interface EmailLog {
  id: string;
  registrationId?: string;
  to: string;
  subject: string;
  body: string;
  timestamp: string;
  status: 'Sent' | 'Failed' | 'Simulated';
  error?: string;
}

export interface SystemStatus {
  supabaseConfigured: boolean;
  resendConfigured: boolean;
  sheetsConfigured: boolean;
  smtpConfigured: boolean;
  totalSubmissions: number;
  totalAttendees: number;
  approvedAttendees: number;
  pendingReviewAttendees: number;
}
