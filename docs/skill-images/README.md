# Skills sector document images (Run 15)

Place **24 PNG sources** here (unchanged in git after upload). The build runs `scripts/prepare-skill-images.mjs` to trim mobile bottoms and emit WebP under `public/zuraio/assets/skills/`.

## Filenames

For each sector (`architecture`, `fiduciary`, `property`) and locale (`en`, `de`, `fr`, `it`):

- Desktop: `zuraio-skill-{sector}-{locale}.png` — **1536×1024**
- Mobile: `zuraio-skill-{sector}-{locale}-mobile.png` — **1080×1440** (extra bottom background is trimmed to 48px below the white card)

## Replace fixtures

If the repo still contains generated layout fixtures, replace each file with the final artwork (same names and dimensions) and redeploy. No code changes required.
