# Luuv& waitlist

Single-page waitlist site. Next.js (App Router), TypeScript, Tailwind CSS, Open Sans via `next/font`.

```bash
npm install
npm run dev
```

## Connect the waitlist form to your Google Sheet

Submissions from the "JOIN THE WAITLIST" modal are appended to a Google Sheet as `timestamp, name, email, city`.

1. **Create a Google Cloud project and a service account.** In the [Google Cloud Console](https://console.cloud.google.com), create a project, then go to *IAM & Admin > Service Accounts* and create a service account.
2. **Enable the Google Sheets API** for that project (*APIs & Services > Library > Google Sheets API > Enable*).
3. **Generate a JSON key.** Open the service account, go to *Keys > Add key > Create new key > JSON*. A file downloads.
4. **Share your Google Sheet** with the service account's email address (the `client_email` in the JSON) and give it **Editor** access. Rows are added to the first tab.
5. **Copy the values into `.env.local`.** Duplicate `.env.local.example` and fill in:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`: `client_email` from the JSON
   - `GOOGLE_PRIVATE_KEY`: `private_key` from the JSON, in quotes, keeping the `\n` sequences
   - `GOOGLE_SHEET_ID`: the ID from your sheet URL

Restart `npm run dev` after editing `.env.local`. On Vercel, add the same three variables under *Project Settings > Environment Variables*.

You may want a header row in the sheet: `Timestamp | Name | Email | City`.
