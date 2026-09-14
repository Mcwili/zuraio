# Contact form go-live (zuraio.ch → Teams)

The static site only talks to your **Cloudflare Worker** (`workers/contact-relay/`). The Worker forwards to **Power Automate** (HTTP trigger + `apiKey`). PA sends email and posts to the **Book a demo** Teams channel.

## Why submissions did not reach Teams

1. **`CONTACT_API_URL` was empty** on the Mcwili Pages build → browser showed mailto fallback, no HTTP POST.
2. **Worker must be deployed** with `PA_WEBHOOK_URL` and `PA_API_KEY` on Cloudflare (even if PA is already tested).

## One-time setup (≈10 minutes)

### 1. GitHub secrets (Yevucee/zuraio and/or Mcwili/zuraio)

| Secret | Value |
|--------|--------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with **Workers Scripts → Edit** |
| `PA_WEBHOOK_URL` | Power Automate HTTP trigger URL (full `logic.azure.com/.../invoke?...`) |
| `PA_API_KEY` | Same shared key your flow validates in the JSON body |

Optional variable: `CF_WORKER_DEPLOY=true` (auto-deploy Worker on pushes to `main`).

### 2. Deploy the Worker

**Actions → Deploy contact relay Worker → Run workflow**

Confirm the log line `Contact relay URL: https://zuraio-contact-relay.<subdomain>.workers.dev/api/contact`.

Test (replace URL):

```bash
curl -sS -X POST "https://zuraio-contact-relay.<subdomain>.workers.dev/api/contact" \
  -H "Content-Type: application/json" \
  -H "Origin: https://zuraio.ch" \
  -d '{"name":"Test","company":"Test AG","email":"test@example.com","message":"relay test","locale":"en","source":"/contact.html","ts":'$(($(date +%s)*1000-5000))'}'
```

Expect JSON `{"ok":true}` and a Teams message.

### 3. Production site URL

Production builds resolve the relay URL in this order:

1. GitHub variable `CONTACT_API_URL` (Mcwili deploy)
2. `workers/contact-relay/public-endpoint.txt` (committed default: `https://api.zuraio.ch/api/contact`)
3. `CANONICAL_BASE=https://zuraio.ch` fallback in `scripts/inject-contact-api-url.mjs`

**Mcwili/zuraio → Settings → Variables → `CONTACT_API_URL`**

Set to your `*.workers.dev` URL **until** `api.zuraio.ch` is routed to the Worker (see Worker README). Then you can use `https://api.zuraio.ch/api/contact`.

### 4. Redeploy Pages

**Mcwili/zuraio → Actions → Deploy to GitHub Pages** on `main`.

Verify:

```bash
curl -sS https://zuraio.ch/js/config.js | grep CONTACT_API_URL
```

Must be non-empty. Submit the form (wait **≥3 seconds** after load — anti-spam timing). Success copy: “Thank you. We received your enquiry…”

### 5. Optional custom domain `api.zuraio.ch`

1. Add `zuraio.ch` zone to Cloudflare.
2. Uncomment `routes` in `workers/contact-relay/wrangler.toml`.
3. `wrangler deploy` (or run the GitHub Worker deploy workflow).
4. Point `api.zuraio.ch` to Cloudflare (proxy on).

## Sync from Yevucee to Mcwili

After changing `public-endpoint.txt` or site code on Yevucee `main`, run **Sync to Mcwili production**, then **Deploy to GitHub Pages** on Mcwili.
