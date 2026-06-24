# Contact form backend — Google Apps Script

The website contact form sends each enquiry to a Google Apps Script web app,
which appends a row to a Google Sheet **you own**. No third-party form service,
no data held by the website — submissions land directly in your Drive.

## One-time setup (~5 minutes)

1. **Create the Sheet.** Go to <https://sheets.google.com> and create a new
   blank spreadsheet. Name it something like `Niyam — website enquiries`.
   (The script writes the header row automatically on the first submission.)

2. **Open the script editor.** In that sheet: **Extensions → Apps Script**.

3. **Paste the code.** Delete whatever is in `Code.gs`, then paste the entire
   contents of [`Code.gs`](./Code.gs) from this folder. Click **Save**.

4. **Deploy as a Web App.**
   - Click **Deploy → New deployment**.
   - Click the gear icon next to "Select type" → choose **Web app**.
   - Set:
     - **Description**: `Niyam contact form`
     - **Execute as**: **Me**
     - **Who has access**: **Anyone**  ← required so the website can post to it.
   - Click **Deploy**, then **Authorize access** and approve the permission
     prompt (it needs permission to write to your sheet).
   - Copy the **Web app URL**. It ends in `/exec`.

5. **Plug it into the site.** Open `src/App.tsx`, find:

   ```ts
   const FORM_ENDPOINT = "";
   ```

   and paste your URL between the quotes:

   ```ts
   const FORM_ENDPOINT = "https://script.google.com/macros/s/AKfy.../exec";
   ```

   Commit and push — the deploy workflow will publish it automatically.

6. **Test.** Open the live site, submit the form with test details, and confirm
   a new row appears in your Sheet.

## Updating the script later

If you change `Code.gs`, redeploy with **Deploy → Manage deployments →
(edit, the pencil) → Version: New version → Deploy**. The `/exec` URL stays the
same, so you don't need to touch the site.

## Notes

- **Validation** happens in the browser before anything is sent (name, company
  and a well-formed email are required).
- **Spam**: the form includes a hidden honeypot field. The script can't see it,
  but obvious bot submissions are dropped client-side before they're sent.
- **Privacy**: only the fields the visitor types are stored, plus a timestamp
  and the page URL. Treat the Sheet like any client data — limit who can see it.
- If the network request ever fails, the visitor is shown a fallback email
  address (`hello@niyamconsulting.com.au`) so an enquiry is never silently lost.
  Change that address via `FALLBACK_EMAIL` in `src/App.tsx`.
