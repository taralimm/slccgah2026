import { google } from 'googleapis';
import { Registration } from '../src/types.js';

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID || '1fGrtwY2SjWT43a6H0v4J4NzTC_BB6B7CHsvSoGDXzbI';

function getSheetsClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!email || !privateKey) {
    console.warn('⚠️ Google Sheets Credentials are missing. Sheet synchronization is paused.');
    return null;
  }

  // Handle newlines in private key
  privateKey = privateKey.replace(/\\n/g, '\n');

  try {
    const auth = new google.auth.JWT(
      email,
      undefined,
      privateKey,
      ['https://www.googleapis.com/auth/spreadsheets']
    );
    return google.sheets({ version: 'v4', auth });
  } catch (error) {
    console.error('❌ Error initializing Google Sheets client:', error);
    return null;
  }
}

/**
 * Push a new registration's registrants (Main +/- Companion) into Google Sheets.
 * Each registrant gets a separate row.
 */
export async function pushRegistrationToSheets(reg: Registration): Promise<boolean> {
  const sheets = getSheetsClient();
  if (!sheets) return false;

  try {
    const timestampStr = new Date(reg.timestamp).toLocaleString('en-US', { timeZone: 'Asia/Manila' });
    const approvalDateStr = reg.approvalDate 
      ? new Date(reg.approvalDate).toLocaleString('en-US', { timeZone: 'Asia/Manila' }) 
      : '';
    const proofUrl = reg.proofOfPaymentUrl || reg.proofOfPaymentName || 'Direct Upload';

    const rowsToAppend = [];

    // Row 1: Main Registrant
    rowsToAppend.push([
      timestampStr, // Submission Date
      1, // Registrant Number
      reg.referenceId, // Reference ID
      reg.registrant.firstName, // First Name
      reg.registrant.lastName, // Last Name
      reg.registrant.batchYear, // Batch Year
      reg.registrant.email, // Email
      reg.registrant.phone, // Phone
      reg.registrant.address, // Address
      reg.paymentStatus, // Payment Status
      approvalDateStr, // Payment Approval Date
      proofUrl, // Proof of Payment URL / Name
      reg.registrationStatus || 'Active', // Registration Status
      reg.adminNotes || '' // Admin Notes
    ]);

    // Row 2: Companion (if applicable)
    if (reg.hasCompanion && reg.companion) {
      rowsToAppend.push([
        timestampStr, // Submission Date
        2, // Registrant Number
        `${reg.referenceId}-COMP`, // Companion Reference ID
        reg.companion.firstName, // First Name
        reg.companion.lastName, // Last Name
        reg.companion.batchYear, // Batch Year
        reg.companion.email, // Email
        reg.companion.phone, // Phone
        reg.companion.address, // Address
        reg.paymentStatus, // Payment Status
        approvalDateStr, // Payment Approval Date
        proofUrl, // Proof of Payment URL / Name
        reg.registrationStatus || 'Active', // Registration Status
        reg.adminNotes || '' // Admin Notes
      ]);
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:N',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: rowsToAppend
      }
    });

    console.log(`✅ Successfully pushed registration and companion (if any) to Google Sheet.`);
    return true;
  } catch (error) {
    console.error('❌ Error appending to Google Sheets:', error);
    return false;
  }
}

/**
 * Update the corresponding rows in Google Sheets when status changes.
 * Searches rows by Reference ID (Column C / index 2) and updates matching columns.
 */
export async function updateRegistrationStatusInSheets(reg: Registration): Promise<boolean> {
  const sheets = getSheetsClient();
  if (!sheets) return false;

  try {
    // 1. Fetch existing values to find row index
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:N',
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      console.warn('⚠️ No data found in Google Sheet to update.');
      return false;
    }

    const updateDateStr = reg.approvalDate 
      ? new Date(reg.approvalDate).toLocaleString('en-US', { timeZone: 'Asia/Manila' }) 
      : '';
    const proofUrl = reg.proofOfPaymentUrl || reg.proofOfPaymentName || 'Direct Upload';

    // Find row indexes that match either reg.referenceId OR `${reg.referenceId}-COMP`
    const mainRefId = reg.referenceId;
    const compRefId = `${reg.referenceId}-COMP`;

    for (let i = 0; i < rows.length; i++) {
      const cellRefId = rows[i][2];
      if (cellRefId === mainRefId || cellRefId === compRefId) {
        const rowIndex = i + 1; // 1-indexed

        // Modify row values
        rows[i][9] = reg.paymentStatus; // Column J (Payment Status)
        rows[i][10] = updateDateStr; // Column K (Approval Date)
        rows[i][11] = proofUrl; // Column L (Proof of payment Link)
        rows[i][12] = reg.registrationStatus || 'Active'; // Column M (Registration Status)
        rows[i][13] = reg.adminNotes || ''; // Column N (Admin Notes)

        // Write this single row back to sheets
        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: `Sheet1!A${rowIndex}:N${rowIndex}`,
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [rows[i]]
          }
        });
        console.log(`✅ Updated Google Sheet row ${rowIndex} for ${cellRefId}`);
      }
    }

    return true;
  } catch (error) {
    console.error(`❌ Error updating Google Sheets status:`, error);
    return false;
  }
}
