import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { 
  initDb, 
  getRegistrations, 
  getRegistrationById, 
  saveRegistration, 
  incrementSubmissionCounter, 
  getSystemStats, 
  getEmailLogs,
  uploadPaymentProof
} from './server/db.js';
import { pushRegistrationToSheets, updateRegistrationStatusInSheets } from './server/sheets.js';
import { 
  sendSubmissionReceivedEmail, 
  sendAdminNotificationEmail, 
  sendPaymentApprovedEmail, 
  sendPaymentRejectedEmail 
} from './server/email.js';
import { Registration } from './src/types.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Increase payload bounds for Base64 proof-of-payment image uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Initialize SQLite/JSON folder structure
initDb();

// Expose static locally-saved payment receipt uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'data', 'uploads')));

// ------------------- API ENDPOINTS -------------------

// 1. Get stats for dashboard
app.get('/api/stats', (req, res) => {
  try {
    const stats = getSystemStats();
    res.json(stats);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Get all registrations (Dashboard Table)
app.get('/api/registrations', (req, res) => {
  try {
    const regs = getRegistrations();
    // Sort youngest submission first
    regs.sort((a, b) => b.submissionNumber - a.submissionNumber);
    res.json(regs);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Get all email outbound logs
app.get('/api/email-logs', (req, res) => {
  try {
    const logs = getEmailLogs();
    // Sort latest first
    logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    res.json(logs);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Create new registration submission
app.post('/api/registrations', async (req, res) => {
  try {
    const { 
      registrant, 
      hasCompanion, 
      companion, 
      referenceId,
      proofOfPaymentName, 
      proofOfPaymentType, 
      proofOfPaymentData,
      remarks
    } = req.body;

    if (!registrant || !registrant.firstName || !registrant.lastName || !registrant.email) {
      return res.status(400).json({ error: 'Primary registrant details (First Name, Last Name, Email) are required.' });
    }

    if (!referenceId) {
      return res.status(400).json({ error: 'Reference ID is required in the Payment section.' });
    }

    if (!proofOfPaymentName || !proofOfPaymentData) {
      return res.status(400).json({ error: 'Proof of payment file is required.' });
    }

    // 1. Increment and get the global submission Counter
    const submissionNum = incrementSubmissionCounter();

    // Generate unique tracker registration ID
    const regId = 'REG-' + Math.random().toString(36).substr(2, 6).toUpperCase();

    // 2. Upload payment proof to storage (Supabase or public fallback local folder)
    const proofUrl = await uploadPaymentProof(
      regId,
      proofOfPaymentName,
      proofOfPaymentData,
      proofOfPaymentType
    );

    const pricePerHead = 500;
    const finalAmount = (1 + (hasCompanion ? 1 : 0)) * pricePerHead;

    const newRegistration: Registration = {
      id: regId,
      submissionNumber: submissionNum,
      timestamp: new Date().toISOString(),
      registrant: {
        firstName: registrant.firstName.trim(),
        lastName: registrant.lastName.trim(),
        email: registrant.email.trim(),
        phone: registrant.phone.trim(),
        address: registrant.address?.trim() || '',
        batchYear: registrant.batchYear,
      },
      hasCompanion: !!hasCompanion,
      companion: hasCompanion && companion ? {
        firstName: companion.firstName.trim(),
        lastName: companion.lastName.trim(),
        email: companion.email?.trim() || '',
        phone: companion.phone?.trim() || '',
        address: companion.address?.trim() || '',
        batchYear: companion.batchYear,
      } : undefined,
      referenceId: referenceId.trim(),
      proofOfPaymentName,
      proofOfPaymentType,
      proofOfPaymentData: '[Stored In Storage/Memory]', // Do not bloat DB file with massive base64 logs
      proofOfPaymentUrl: proofUrl,
      paymentStatus: 'Pending Review',
      remarks: remarks?.trim() || '',
      registrationStatus: 'Active'
    };

    // Save registration
    saveRegistration(newRegistration);

    // Trigger Email Automations asynchronously (non-blocking)
    sendSubmissionReceivedEmail(newRegistration).catch(console.error);
    sendAdminNotificationEmail(newRegistration).catch(console.error);

    // Sync to Google Sheets
    pushRegistrationToSheets(newRegistration).catch(error => {
      console.error('Failed to append registration records to Google Sheets:', error);
    });

    res.status(201).json({
      success: true,
      registration: newRegistration
    });
  } catch (error: any) {
    console.error('Registration submission error:', error);
    res.status(500).json({ error: error.message || 'An internal server error occurred.' });
  }
});

// 5. Admin Approve payment workflow
app.post('/api/registrations/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    const reg = getRegistrationById(id);
    if (!reg) {
      return res.status(404).json({ error: 'Registration record not found.' });
    }

    reg.paymentStatus = 'Approved';
    reg.approvalDate = new Date().toISOString();
    reg.adminNotes = notes || '';
    
    // Save updated state
    saveRegistration(reg);

    // Background notifications
    sendPaymentApprovedEmail(reg).catch(console.error);

    // Sync status to corresponding rows in Google Sheets
    updateRegistrationStatusInSheets(reg).catch(console.error);

    res.json({ success: true, registration: reg });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 6. Admin Reject/Deny payment workflow
app.post('/api/registrations/:id/reject', async (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body; // denial notes / rejection reason

    const reg = getRegistrationById(id);
    if (!reg) {
      return res.status(404).json({ error: 'Registration record not found.' });
    }

    reg.paymentStatus = 'Rejected';
    reg.adminNotes = notes || '';
    
    // Save updated state
    saveRegistration(reg);

    // Background notifications
    sendPaymentRejectedEmail(reg).catch(console.error);

    // Sync status back to Google Sheets
    updateRegistrationStatusInSheets(reg).catch(console.error);

    res.json({ success: true, registration: reg });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


// ------------------- VITE SETUP AND SERVER START -------------------

async function start() {
  const isProductionMode = process.env.NODE_ENV === 'production' || 
                           (typeof __filename !== 'undefined' && __filename.includes('dist')) || 
                           !fs.existsSync(path.resolve(process.cwd(), 'server.ts'));

  if (!isProductionMode) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });

    // SPA Routing Fallback Middleware before Vite middleware
    app.use((req, res, next) => {
      const isGet = req.method === 'GET';
      const isApi = req.originalUrl.startsWith('/api');
      const isUpload = req.originalUrl.startsWith('/uploads');
      const hasDot = req.originalUrl.includes('.') || req.path.includes('.');
      
      if (isGet && !isApi && !isUpload && !hasDot) {
        req.url = '/index.html';
      }
      next();
    });

    app.use(vite.middlewares);
  } else {
    console.log('📦 Running in Production Mode');
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 SLCC GAH 2026 Admin and Registration Server running at http://0.0.0.0:${PORT}`);
  });
}

start();
