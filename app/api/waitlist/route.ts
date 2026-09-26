import { google } from "googleapis";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const fail = (error: string, status: number) => Response.json({ ok: false, error }, { status });

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail("Invalid request.", 400);
  }

  // Honeypot: bots fill this in. Pretend it worked so they move on.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const name = str(body.name);
  const email = str(body.email).toLowerCase();
  const city = str(body.city);

  if (!name) return fail("Please enter your name.", 400);
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) return fail("Please enter a valid email address.", 400);
  if (name.length > 120 || city.length > 120) return fail("That entry is too long.", 400);

  const { GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID } = process.env;
  if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID) {
    console.error("Waitlist: missing Google Sheets environment variables");
    return fail("The waitlist is unavailable right now. Please try again later.", 500);
  }

  try {
    const auth = new google.auth.JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      // Env files store the key with literal \n sequences
      key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: "A:D",
      valueInputOption: "RAW", // RAW so entries can never be evaluated as formulas
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [[new Date().toISOString(), name, email, city]] },
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Waitlist: failed to append row", err);
    return fail("We couldn't save your spot. Please try again in a moment.", 500);
  }
}
