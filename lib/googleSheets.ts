import { google } from "googleapis";

export async function appendToSheet(values: string[]) {
  // ✅ Fix: handle all possible ways the key might be stored
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || '')
    .replace(/\\n/g, '\n')   // convert literal \n to real newlines
    .replace(/"/g, '');       // strip any surrounding quotes

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Sheet1!A:Z",
    valueInputOption: "RAW",
    requestBody: {
      values: [values],
    },
  });
}