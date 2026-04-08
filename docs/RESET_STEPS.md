# EOIP Full Reset — Exact Steps

## 1) Delete old Vercel project
- Open Vercel
- Open the old EOIP project
- Go to **Settings**
- Scroll to the bottom
- Click **Delete Project**
- Confirm deletion

## 2) Delete or archive old GitHub repo
### If you want to fully wipe it:
- Open GitHub repo
- Go to **Settings**
- Scroll to **Danger Zone**
- Click **Delete this repository**
- Confirm repository name exactly

### If you want to keep history but stop using it:
- Rename it to something like:
  - `EOIP-archive`
- Then create a new clean repo

## 3) Create a new GitHub repo
Suggested name:
- `Energy-Opportunity-Intelligence-Platform`

Suggested description:
- `Energy opportunity intelligence dashboard for SAM.gov, grants, utility rebates, state funding, and infrastructure project financing.`

## 4) Upload this package
Upload all files and folders from the package root:
- `api/`
- `docs/`
- `google_apps_script/`
- `crm_templates/`
- `index.html`
- `README.md`
- `package.json`
- `vercel.json`
- `.env.example`
- `.gitignore`

## 5) Deploy in Vercel
- Import the new GitHub repo
- Add environment variable:
  - `SAM_API_KEY = your live SAM.gov API key`
- Deploy

## 6) Test each tab
- Projects (SAM.gov)
- Grants / Loans / Incentives
- Utility / State Funding
- All Funding

## 7) Optional free email alerts
- Open `google_apps_script/email_alerts.gs`
- Paste into Google Apps Script
- Set your deployed dashboard URL
- Add a daily time trigger

## 8) CRM import
- Use **Export CSV**
- Import into HubSpot / GoHighLevel / Airtable using the template in `crm_templates/`
