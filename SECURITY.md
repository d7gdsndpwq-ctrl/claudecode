# Security Policy

This repository hosts the public marketing website for **Niyam Consulting**
(<https://niyamconsulting.com.au>). It is a static site — there is no backend,
no database, and no user data stored in this repository.

## Reporting a vulnerability

If you believe you have found a security issue with the website or this
repository, please report it privately. **Do not open a public GitHub issue**
for security problems.

- Email: **security@niyamconsulting.com.au**
- Please include: what you found, how to reproduce it, and the potential impact.

We aim to acknowledge reports within **two working days** and will keep you
updated as we investigate.

## Scope

In scope:

- This repository and the site it deploys (`niyamconsulting.com.au`).

Out of scope:

- Anything hosted elsewhere or operated by third parties (e.g. GitHub itself,
  the DNS registrar, font/CDN providers).
- The contact form does not currently submit to a backend; it validates input
  in the browser only. No submitted data leaves the visitor's browser.

## Good practice for contributors

- Never commit secrets (API keys, passwords, certificates, `.env` files). The
  `.gitignore` is configured to help prevent this, but treat it as a backstop,
  not a guarantee — review your diffs before committing.
- If a credential is ever committed by mistake, treat it as compromised:
  rotate/revoke it immediately, then remove it from history.

## A note on lookalike domains

Scams often rely on **lookalike domains** (for example, swapping `.com.au` for
`.com`, or adding hyphens). Niyam Consulting communicates only from
`@niyamconsulting.com.au`. We will never ask for passwords or payment details
by email.
