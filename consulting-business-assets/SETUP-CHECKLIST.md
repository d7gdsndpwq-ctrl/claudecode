# Setup Checklist

Do these roughly in order — later steps depend on earlier ones (you need an ABN before a
business name, a business name before most `.com.au` domains, and a domain before
custom-domain email).

## 1. Register an ABN

- Apply via the Australian Business Register: https://www.abr.gov.au/business-super-funds-charities/applying-abn
- Free, usually instant if your details check out. Choose sole trader unless you already
  have a reason to set up a company.
- You'll need this number for the business name registration, the domain purchase, and your
  invoices.

## 2. Register your business name

- Register via ASIC, through the Business Registration Service: https://register.business.gov.au/ (this is the current front door — it lands you in ASIC Connect)
- Direct ASIC info page: https://asic.gov.au/for-business/registering-a-business-name/
- Cost: $44 for 1 year or $102 for 3 years **at time of writing** — ASIC fees are indexed
  each financial year (1 July), so check the current fee schedule before paying:
  https://asic.gov.au/for-business/payments-fees-and-invoices/asic-fees/business-names-fees/
- Use one of the names from `BUSINESS-NAME-OPTIONS.md`, after checking it isn't already
  registered and doesn't clash with an existing trademark (links in that file).

## 3. Buy the domain

- `.com.au` registration requires an active ABN or registered business name — you'll have
  both by this point, which keeps you eligible and also makes the domain harder for someone
  else to squat.
- Registrars: VentraIP, Crazy Domains, or GoDaddy.com.au are all standard `.com.au`-accredited
  options.
- Buy the matching `.com` too if it's available and cheap, even if you only use the `.com.au`
  — stops someone else parking it.

## 4. Set up email on your domain (Cloudflare Email Routing + Gmail — free)

Free option: mail to `you@yourdomain.com.au` forwards into your existing Gmail, and you send
replies *as* that address — no new inbox to check, no monthly cost. (Google Workspace is the
paid alternative if you'd rather have a fully separate mailbox — see note at the end of this
section.)

1. Create a free account at https://dash.cloudflare.com and add your domain.
2. Cloudflare gives you two nameservers. In your VentraIP account, go to the domain →
   **DNS / Nameservers**, and switch from VentraIP's default nameservers to the Cloudflare
   ones. (This moves DNS management to Cloudflare — VentraIP stays the registrar of record,
   nothing else changes.) Propagation is usually under an hour, can take up to 24h.
3. In the Cloudflare dashboard, open your domain → **Email** → **Email Routing** → enable it.
4. Add a routing rule: `you@yourdomain.com.au` → forward to your personal Gmail address.
   Cloudflare auto-creates the required MX and TXT (SPF) records for you.
5. In Gmail → ⚙️ **Settings** → **Accounts and Import** → **Send mail as** → **Add another
   email address** → enter `you@yourdomain.com.au`.
6. Gmail will ask for SMTP server details to verify and send as that address. Use Cloudflare's
   free **Email Routing → Destination addresses → SMTP** details (Cloudflare provides an SMTP
   relay you can use for this; follow the "Send mail as" prompts in Gmail through to
   verification).
7. Once verified, set `you@yourdomain.com.au` as your **default "from" address** in Gmail's
   Send mail as settings, so outgoing mail and replies show the business address by default.
8. Send yourself a test email from another account to confirm forwarding and SPF pass (check
   "Show original" in Gmail).

**If you'd rather have a real separate mailbox instead of forwarding** (e.g. you want a
dedicated business login, not mixed into your personal Gmail): use Google Workspace
(https://workspace.google.com, Business Starter plan, ~AUD $8–9/user/month) and point your
domain's MX records at Google instead of Cloudflare. Either works with the site's `[EMAIL]`
placeholder — just use whichever address you end up with.

## 5. Publish the site

- Since your domain's DNS is now on Cloudflare (from step 4), **Cloudflare Pages** is the
  path of least resistance for hosting — same dashboard, no extra DNS juggling.
- The site lives in `site/index.html` and `site/style.css` in this folder.
- Fastest path: static hosting (Netlify, Vercel, GitHub Pages, or Cloudflare Pages) — drag
  the `site/` folder in, point your domain's DNS at it.
- If you'd rather self-host on your own Ubuntu VPS, see the deployment notes below.
- Before publishing, replace every placeholder in `site/index.html`:
  - `[BUSINESS NAME]` — appears in the `<title>`, meta description, hero eyebrow/heading
    area, and footer.
  - `[EMAIL]` — appears twice in the contact section (`mailto:[EMAIL]` href and the visible
    link text).
  - `[LINKEDIN URL]` — appears once, as the `href` of the LinkedIn contact link.

## 6. Finalise LinkedIn

- Update your personal profile headline and About section using `LINKEDIN-COPY.md`.
- Add the business as your current position/experience entry once the business name and ABN
  are settled, linking to the live site.
- Turn on "Open to" / featured links pointing at the site once it's published.

## Placeholder reference

| Placeholder | Used in | Replace with |
|---|---|---|
| `[BUSINESS NAME]` | `site/index.html`, `LINKEDIN-COPY.md` (brand-led headline variant) | Your registered business name |
| `[EMAIL]` | `site/index.html` contact section | Your `you@yourdomain.com.au` address (Cloudflare-routed Gmail, or Workspace if you went that way) |
| `[LINKEDIN URL]` | `site/index.html` contact section | Your full LinkedIn profile URL |
