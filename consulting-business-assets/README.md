# Consulting Business Assets

Starter assets for the AI adoption & governance consulting business.

- `site/` — the one-page website (`index.html` + `style.css`, no build step, no framework)
- `BUSINESS-NAME-OPTIONS.md` — name shortlist with domain/trademark notes
- `LINKEDIN-COPY.md` — headline + About section copy
- `SETUP-CHECKLIST.md` — ordered setup steps (ABN, business name, domain, email, site, LinkedIn)

See `SETUP-CHECKLIST.md` for what to do, and the "Preview locally" / "Deploy to your VPS"
notes below for running the site.

## Preview locally

```bash
cd site
python3 -m http.server 8000
# open http://localhost:8000
```

Any static file server works — this is plain HTML/CSS, no build step.

## Deploy to your own Ubuntu VPS

1. Copy the `site/` folder to the server, e.g.:
   ```bash
   scp -r site/* user@your-vps:/var/www/yourdomain/
   ```
2. Install nginx if it's not already running:
   ```bash
   sudo apt update && sudo apt install nginx
   ```
3. Add an nginx server block, e.g. `/etc/nginx/sites-available/yourdomain`:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com.au www.yourdomain.com.au;
       root /var/www/yourdomain;
       index index.html;
   }
   ```
4. Enable it and reload:
   ```bash
   sudo ln -s /etc/nginx/sites-available/yourdomain /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   ```
5. Point the domain's DNS A record at your VPS's public IP.
6. Add HTTPS with Let's Encrypt:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com.au -d www.yourdomain.com.au
   ```

Certbot auto-renews via a systemd timer it installs — no further action needed.
