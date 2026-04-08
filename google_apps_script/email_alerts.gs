/*
Free email-alert starter using Gmail + Apps Script

How to use:
1. Open script.google.com
2. Create a new Apps Script project
3. Paste this file
4. Update DASHBOARD_API_URL and RECIPIENT
5. Save
6. Run sendDigest() once to authorize
7. Add a time trigger for daily delivery
*/

const DASHBOARD_API_URL = 'https://your-vercel-domain.vercel.app/api/funding';
const RECIPIENT = 'you@example.com';

function sendDigest() {
  const response = UrlFetchApp.fetch(DASHBOARD_API_URL);
  const data = JSON.parse(response.getContentText());
  const rows = (data.rows || []).slice(0, 10);

  let body = 'Top EOIP funding items\n\n';
  rows.forEach((r, i) => {
    body += `${i + 1}. ${r["Program Name"] || r["Title"]}\n`;
    body += `Type: ${r["Funding Type"] || r.type || ""}\n`;
    body += `State: ${r["State"] || ""}\n`;
    body += `Score: ${r["Priority Score"] || ""}\n`;
    body += `Bucket: ${r["Priority Bucket"] || ""}\n`;
    body += `Next: ${r["Next Action"] || ""}\n\n`;
  });

  GmailApp.sendEmail(
    RECIPIENT,
    'EOIP Daily Digest',
    body
  );
}
