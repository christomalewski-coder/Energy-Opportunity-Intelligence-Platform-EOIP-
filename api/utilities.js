const rows = [
  {
    "Program Name": "Duke Energy LED Rebate",
    "Funding Type": "Utility Rebate",
    "Source": "Duke Energy",
    "State": "IN",
    "Funding Amount": 50000,
    "Deadline": "Rolling",
    "Priority Score": 77,
    "Priority Bucket": "Pursue",
    "Go/No-Go": "GO",
    "Next Action": "Check prescriptive vs custom lighting rebate path",
    "Category": "Utility",
    "Source URL": "https://www.duke-energy.com/business/products/smartsaver",
    "Application URL": "https://www.duke-energy.com/business/products/smartsaver",
    "Location Options": [
      { "label": "Smart $aver overview", "state": "IN", "url": "https://www.duke-energy.com/business/products/smartsaver" }
    ],
    "Last Verified": "2026-04-09"
  },
  {
    "Program Name": "AES Indiana Energy Efficiency Rebate",
    "Funding Type": "Utility Rebate",
    "Source": "AES Indiana",
    "State": "IN",
    "Funding Amount": 40000,
    "Deadline": "Rolling",
    "Priority Score": 74,
    "Priority Bucket": "Pursue",
    "Go/No-Go": "GO",
    "Next Action": "Confirm fixture types and measure list",
    "Category": "Utility",
    "Source URL": "https://www.aesindiana.com/r-i",
    "Application URL": "https://cr101.my.salesforce-sites.com/aesindianabusinessrebates/s/",
    "Location Options": [
      { "label": "AES rebates overview", "state": "IN", "url": "https://www.aesindiana.com/r-i" },
      { "label": "AES application portal", "state": "IN", "url": "https://cr101.my.salesforce-sites.com/aesindianabusinessrebates/s/" }
    ],
    "Last Verified": "2026-04-09"
  },
  {
    "Program Name": "Ohio Advanced Energy Fund Grant",
    "Funding Type": "State Funding",
    "Source": "Ohio Department of Development",
    "State": "OH",
    "Funding Amount": 200000,
    "Deadline": "Varies",
    "Priority Score": 71,
    "Priority Bucket": "Pursue",
    "Go/No-Go": "GO",
    "Next Action": "Review eligible entities and project timing",
    "Category": "State Funding",
    "Source URL": "https://development.ohio.gov/wps/portal/gov/development/community/redevelopment/advanced-energy-fund-grant",
    "Application URL": "https://development.ohio.gov/wps/portal/gov/development/community/redevelopment/advanced-energy-fund-grant",
    "Location Options": [
      { "label": "Advanced Energy Fund", "state": "OH", "url": "https://development.ohio.gov/wps/portal/gov/development/community/redevelopment/advanced-energy-fund-grant" },
      { "label": "Ohio energy redevelopment programs", "state": "OH", "url": "https://development.ohio.gov/business/redevelopment" }
    ],
    "Last Verified": "2026-04-09"
  },
  {
    "Program Name": "Municipal Revolving Energy Loan",
    "Funding Type": "Revolving Loan",
    "Source": "Kentucky Energy and Environment Cabinet",
    "State": "KY",
    "Funding Amount": 300000,
    "Deadline": "Rolling",
    "Priority Score": 69,
    "Priority Bucket": "Review",
    "Go/No-Go": "GO",
    "Next Action": "Validate municipal borrower eligibility",
    "Category": "Loan",
    "Source URL": "https://eec.ky.gov/Energy/Programs/Pages/default.aspx",
    "Application URL": "https://eec.ky.gov/Energy/Programs/Pages/default.aspx",
    "Location Options": [
      { "label": "Kentucky energy programs", "state": "KY", "url": "https://eec.ky.gov/Energy/Programs/Pages/default.aspx" }
    ],
    "Last Verified": "2026-04-09"
  },
  {
    "Program Name": "Street Lighting Modernization Incentive",
    "Funding Type": "Utility Rebate",
    "Source": "Texas SECO",
    "State": "TX",
    "Funding Amount": 120000,
    "Deadline": "Rolling",
    "Priority Score": 78,
    "Priority Bucket": "Pursue",
    "Go/No-Go": "GO",
    "Next Action": "Prioritize municipal roadway / parking lot prospects",
    "Category": "Utility",
    "Source URL": "https://comptroller.texas.gov/programs/seco/funding/",
    "Application URL": "https://comptroller.texas.gov/programs/seco/funding/",
    "Location Options": [
      { "label": "SECO funding overview", "state": "TX", "url": "https://comptroller.texas.gov/programs/seco/funding/" }
    ],
    "Last Verified": "2026-04-09"
  },
  {
    "Program Name": "Ohio Energy Efficiency Program",
    "Funding Type": "State Funding",
    "Source": "Ohio Department of Development",
    "State": "OH",
    "Funding Amount": 150000,
    "Deadline": "Varies",
    "Priority Score": 73,
    "Priority Bucket": "Pursue",
    "Go/No-Go": "GO",
    "Next Action": "Match public building list to eligible applicants",
    "Category": "State Funding",
    "Source URL": "https://development.ohio.gov/community/redevelopment/energy-efficiency-program",
    "Application URL": "https://development.ohio.gov/community/redevelopment/energy-efficiency-program",
    "Location Options": [
      { "label": "Ohio Energy Efficiency Program", "state": "OH", "url": "https://development.ohio.gov/community/redevelopment/energy-efficiency-program" }
    ],
    "Last Verified": "2026-04-09"
  }
];

export default async function handler(req, res) {
  try {
    const state = String(req.query.state || "").toUpperCase();
    const type = String(req.query.type || "").toUpperCase();
    let data = rows;

    if (state) {
      data = data.filter(r => ["ALL", "MULTI", state].includes(String(r.State).toUpperCase()));
    }

    if (type) {
      data = data.filter(
        r =>
          String(r["Funding Type"]).toUpperCase().includes(type) ||
          String(r.Category).toUpperCase().includes(type)
      );
    }

    data = [...data].sort((a, b) => Number(b["Priority Score"] || 0) - Number(a["Priority Score"] || 0));

    return res.status(200).json({ count: data.length, rows: data });
  } catch (err) {
    return res.status(500).json({ error: "Utility / state funding API error", detail: err.message });
  }
}
