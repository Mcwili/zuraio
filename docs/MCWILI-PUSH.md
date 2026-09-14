# Push production site to Mcwili/zuraio

Run these on your machine (logged in as a **collaborator** on `Mcwili/zuraio`). The cloud agent cannot push there.

## 1. Backup old site (once)

```bash
git clone https://github.com/Mcwili/zuraio.git mcwili-backup
cd mcwili-backup
git checkout -b legacy/mcwili-old-site
git push origin legacy/mcwili-old-site
```

Or from this repo after fetching Mcwili:

```bash
git fetch https://github.com/Mcwili/zuraio.git main:mcwili-main
git push https://github.com/Mcwili/zuraio.git mcwili-main:legacy/mcwili-old-site
```

## 2. Push new codebase to Mcwili main

From **Yevucee/zuraio** `main` (includes empty `SITE_BASE_PATH` deploy):

```bash
git remote add mcwili https://github.com/Mcwili/zuraio.git   # if missing
git fetch mcwili
git push mcwili main:main --force-with-lease
```

## 3. GitHub settings (Mcwili repo)

1. **Settings → Pages → Build and deployment → GitHub Actions**
2. **Settings → Actions → General → Workflow permissions → Read and write**
3. **Actions → Deploy to GitHub Pages** — run workflow on `main`
4. **Settings → Variables → `CONTACT_API_URL`** when Worker is deployed
5. **Pages → Enforce HTTPS** (recommended)

## 4. Verify

- https://zuraio.ch/
- https://zuraio.ch/contact.html
- Old site: branch `legacy/mcwili-old-site` on GitHub only
