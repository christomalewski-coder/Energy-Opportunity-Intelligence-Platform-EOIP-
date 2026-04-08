# Energy Opportunity Intelligence Platform (EOIP) — Full Reset Package

This is the updated hosted-ready package for rebuilding EOIP from scratch.

## What is included

### Dashboards / data sources
- **SAM.gov opportunities** for lighting-first federal opportunity targeting
- **Grants + revolving loans + tax incentives + ESCO-enabling products**
- **Utility rebates + state funding programs**
- **Unified funding view** for grants, utility programs, revolving loans, incentives, and financing

### Features
- Browser-native dashboard
- Serverless API endpoints for Vercel
- Secure environment variable support for `SAM_API_KEY`
- Lighting-first filtering for SAM.gov
- Grants / loans / utility / state funding tabs
- CSV export for CRM import
- Free email-alert starter using Google Apps Script
- Restart instructions for deleting the old EOIP deployment and redeploying clean

## File map

- `index.html` — main EOIP dashboard
- `api/search.js` — SAM.gov lighting-first opportunities
- `api/grants.js` — grants + revolving loans + tax incentives + ESCO / financing products
- `api/utilities.js` — utility rebates + state funding programs
- `api/funding.js` — unified funding endpoint (grants + utilities together)
- `docs/RESET_STEPS.md` — exact delete-and-restart instructions
- `google_apps_script/email_alerts.gs` — free Gmail-based daily digest starter
- `crm_templates/hubspot_import_template.csv` — simple CRM import starter
- `.env.example` — environment variable names
- `vercel.json`
- `package.json`

## Required environment variable

In Vercel add:

- `SAM_API_KEY=your_current_rotated_sam_api_key`

## Recommended reset path

1. Delete old Vercel EOIP project
2. Delete or archive old GitHub repo
3. Create a fresh GitHub repo
4. Upload everything from this package
5. Import that repo into Vercel
6. Add `SAM_API_KEY`
7. Deploy
8. Test all tabs:
   - SAM.gov
   - Grants / Loans / Incentives
   - Utility / State Funding
   - Unified Funding

## Important

This package avoids paid APIs and paid desktop software.
It is built to run on:
- GitHub
- Vercel
- Google Apps Script (optional for free email digest)
