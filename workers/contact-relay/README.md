# Zuraio contact form relay (Cloudflare Worker)

Server-side relay between the static site contact form and Microsoft Power Automate. Keeps `PA_WEBHOOK_URL` and `PA_API_KEY` off the website.

## Prerequisites

- Free [Cloudflare](https://dash.cloudflare.com) account
- Power Automate flow already tested (HTTP trigger, email + Teams)
- Node.js 20+

## One-time setup

```bash
cd workers/contact-relay
npm install
npx wrangler login
npx wrangler secret put PA_WEBHOOK_URL   # paste webhook URL when prompted
npx wrangler secret put PA_API_KEY       # paste shared apiKey when prompted
npm run deploy
```

Note the deployed URL, e.g. `https://zuraio-contact-relay.<account>.workers.dev/api/contact`.

Set that URL as GitHub repository variable or secret **`CONTACT_API_URL`** (used at site build time), or pass it when running `npm run build` locally.

### Local development

```bash
cp .dev.vars.example .dev.vars
# Edit .dev.vars with real PA_* values (never commit)
npm run dev
```

Set `ENVIRONMENT=dev` in `.dev.vars` (or `wrangler.toml` `[vars]`) to allow `http://localhost:*` CORS.

## Custom domain (optional)

If `zuraio.ch` DNS is on Cloudflare, add a route in `wrangler.toml`:

```toml
routes = [{ pattern = "api.zuraio.ch/api/contact", zone_name = "zuraio.ch" }]
```

Then use `https://api.zuraio.ch/api/contact` as `CONTACT_API_URL`.

## Rotate secrets

```bash
npx wrangler secret put PA_WEBHOOK_URL
npx wrangler secret put PA_API_KEY
```

No website redeploy required unless the public Worker URL changes.

## CI deploy (optional)

If `CLOUDFLARE_API_TOKEN` is set in GitHub (Workers Scripts: Edit scope), pushes to `main` that touch `workers/contact-relay/**` run `.github/workflows/deploy-contact-worker.yml`. `PA_*` secrets remain on Cloudflare only (`wrangler secret put`).

## Testing

Replace `WORKER_URL` with your `*.workers.dev` URL.

**Valid submission (expect `200` and email + Teams):**

```bash
curl -sS -X POST "$WORKER_URL/api/contact" \
  -H "Content-Type: application/json" \
  -H "Origin: https://zuraio.ch" \
  -d '{
    "name": "Test User",
    "company": "Test AG",
    "role": "CEO",
    "email": "test@example.com",
    "phone": "+41 79 000 00 00",
    "companySize": "20-50",
    "interest": "data-control",
    "interestLabel": "Data control",
    "message": "Worker relay test",
    "locale": "en",
    "source": "/contact.html",
    "website": "",
    "ts": '"$(($(date +%s%3N)-5000))"'
  }'
```

**Honeypot (expect `200 {"ok":true}`, flow should not run):**

```bash
curl -sS -X POST "$WORKER_URL/api/contact" \
  -H "Content-Type: application/json" \
  -H "Origin: https://zuraio.ch" \
  -d '{"name":"Bot","email":"a@b.com","message":"x","source":"/contact.html","locale":"en","website":"http://spam.example","ts":'"$(date +%s%3N)"'}'
```

**Bad origin (expect `403`):**

```bash
curl -sS -X POST "$WORKER_URL/api/contact" \
  -H "Content-Type: application/json" \
  -H "Origin: https://evil.example" \
  -d '{}'
```

**Missing email (expect `400`):**

```bash
curl -sS -X POST "$WORKER_URL/api/contact" \
  -H "Content-Type: application/json" \
  -H "Origin: https://zuraio.ch" \
  -d '{"name":"A","company":"B","interest":"data-control","source":"/contact.html","locale":"en","ts":'"$(date +%s%3N)"'}'
```

## Free plan limits

Cloudflare Workers free tier (100k requests/day, 10 ms CPU per request) is far above expected contact form volume.

## Privacy

Legal should document that enquiries pass through Cloudflare Workers and Microsoft Power Automate (M365) in the final privacy policy.
