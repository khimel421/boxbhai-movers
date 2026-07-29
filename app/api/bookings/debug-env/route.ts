import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasSheetId: !!process.env.GOOGLE_SHEET_ID,
    hasClientEmail: !!process.env.GOOGLE_CLIENT_EMAIL,
    hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY,
    sheetIdPreview: process.env.GOOGLE_SHEET_ID?.slice(0, 10) + '...',
    emailPreview: process.env.GOOGLE_CLIENT_EMAIL?.slice(0, 20) + '...',
    keyStart: process.env.GOOGLE_PRIVATE_KEY?.slice(0, 30),
    keyEnd: process.env.GOOGLE_PRIVATE_KEY?.slice(-20),
  });
}