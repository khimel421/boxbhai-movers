import { NextResponse } from 'next/server';

export async function GET() {
  const serviceJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  
  let parsedEmail = null;
  let parsedKeyStart = null;

  try {
    const parsed = JSON.parse(serviceJson || '{}');
    parsedEmail = parsed.client_email;
    parsedKeyStart = parsed.private_key?.slice(0, 30);
  } catch (e) {
    parsedEmail = 'JSON PARSE FAILED';
  }

  return NextResponse.json({
    hasSheetId: !!process.env.GOOGLE_SHEET_ID,
    sheetIdValue: process.env.GOOGLE_SHEET_ID, // show full value
    hasServiceJson: !!serviceJson,
    parsedEmail,
    parsedKeyStart,
  });
}