# Setup Checklist

Do these roughly in order — later steps depend on earlier ones (you need an ABN before a
business name, a business name before most `.com.au` domains, and a domain before
Workspace email).

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

## 4. Set up Google Workspace email

- https://workspace.google.com — start with the Business Starter plan, one user.
- Use your new domain (e.g. `you@[yourdomain].com.au`) — don't launch on a free Gmail
  address, it undercuts the "I handle sensitive data professionally" pitch.
- Set up SPF/DKIM/DMARC records when prompted — Workspace walks you through this, and it
  matters for deliverability and for not looking like a phishing setup to the firms you're
  emailing.

## 5. Publish the site

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
| `[EMAIL]` | `site/index.html` contact section | Your Workspace email address |
| `[LINKEDIN URL]` | `site/index.html` contact section | Your full LinkedIn profile URL |
