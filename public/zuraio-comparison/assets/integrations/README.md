# Integration logo assets

Official SVG logos for the scrolling integrations banner.

## Quick sync

From the repo root:

```bash
npm run sync:integration-logos
```

This script:
1. Uses any files you drop in `incoming/` (see below)
2. Falls back to logos already in this folder
3. Otherwise pulls from Roland's reference repo (`Cherrypicker77/zuraio-webseite`)

Then commit the SVG files and `js/integrations-manifest.js`.

## Add your own logos

Drop SVG files into:

`public/zuraio-comparison/assets/integrations/incoming/`

Use these filenames (or aliases listed in `scripts/sync-integration-logos.mjs`):

| File | Integration |
|------|-------------|
| `outlook.svg` | Outlook |
| `gmail.svg` | Gmail |
| `microsoft-365.svg` or `microsoft365.svg` | Microsoft 365 |
| `google-workspace.svg` or `googleworkspace.svg` | Google Workspace |
| `teams.svg` | Microsoft Teams |
| `slack.svg` | Slack |
| `notion.svg` | Notion |
| `sharepoint.svg` | SharePoint |
| `onedrive.svg` | OneDrive |
| `hubspot.svg` | HubSpot |
| `salesforce.svg` | Salesforce |
| `whatsapp.svg` | WhatsApp |
| `voice-notes.svg` | Voice notes |
| `abacus.svg` | Abacus |
| `bexio.svg` | bexio |
| `sap.svg` | SAP |
| `microsoft-dynamics.svg` | Dynamics 365 |
| `odoo.svg` | Odoo |
| `sage.svg` | Sage |
| `proffix.svg` | Proffix |
| `klara.svg` | Klara |
| `apis-mcp.png` | APIs & MCP (marquee — custom connector icon) |

Run `npm run sync:integration-logos` again after adding files.

**Owner:** Mickey / Roland — use approved official assets only.
