# Niyam Consulting — landing page

A single-page marketing site for **Niyam Consulting**, a firm that helps
organisations adopt AI safely, leading with data governance and risk so client
and company information stays controlled and compliant.

Built with **React + TypeScript + Vite**. The design is driven by CSS custom
properties (theme tokens), so the whole palette can be swapped.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build to dist/
npm run lint
```

## Theming

The palette and corner radius are CSS variables defined in `src/index.css`.
Three palettes ship; **Clay** is the default. To switch, set `data-theme` on the
`<html>` element:

```html
<html data-theme="sage">   <!-- or "indigo", or omit for Clay -->
```

Corner style is the `--radius` token (`16px` Soft default, `3px` Sharp).

## Contact form

The form (`src/App.tsx`) validates on the client and shows a success panel, but
the submit is **not wired to a backend** — it just flips to the success state.
To receive enquiries, POST the form payload to your inbox/CRM in `handleSubmit`.
Honour the "details stay with us" promise wherever it lands.

## Deployment (GitHub Pages)

`.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages
on every push to `main`. The Vite `base` is `./` (relative), so the build works
both at the project URL (`<user>.github.io/<repo>/`) and at the root of a custom
domain.

To go live on a custom domain (e.g. one bought from VentraIP):

1. **Settings → Pages**: set Source to **GitHub Actions**.
2. Under **Custom domain**, enter your domain and save (GitHub writes a `CNAME`).
3. At your registrar's DNS, point the domain at GitHub Pages:
   - apex (`example.com`): four `A` records → `185.199.108.153`,
     `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - or `www`: a `CNAME` → `<user>.github.io`
4. Wait for DNS to propagate, then tick **Enforce HTTPS**.
