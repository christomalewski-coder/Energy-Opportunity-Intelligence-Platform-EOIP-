const rows = [
  {
    "Program Name": "EECBG Formula Program",
    "Funding Type": "Grant",
    "Source": "DOE",
    "State": "ALL",
    "Funding Amount": 100000,
    "Deadline": "Rolling",
    "Priority Score": 88,
    "Priority Bucket": "Pursue",
    "Go/No-Go": "GO",
    "Next Action": "Engage municipality and confirm eligible scope",
    "Category": "Grant",
    "Source URL": "https://www.energy.gov/cmei/scep/frequently-asked-questions-energy-efficiency-and-conservation-block-grant-financing",
    "Application URL": "https://www.energy.gov/cmei/scep/frequently-asked-questions-energy-efficiency-and-conservation-block-grant-financing",
    "Location Options": [
      { "label": "National / Formula Program", "state": "ALL", "url": "https://www.energy.gov/cmei/scep/frequently-asked-questions-energy-efficiency-and-conservation-block-grant-financing" }
    ],
    "Last Verified": "2026-04-09"
  },
  {
    "Program Name": "DOE State Energy Program (SEP)",
    "Funding Type": "Grant",
    "Source": "DOE / State Energy Office",
    "State": "ALL",
    "Funding Amount": 250000,
    "Deadline": "Varies by state",
    "Priority Score": 82,
    "Priority Bucket": "Pursue",
    "Go/No-Go": "GO",
    "Next Action": "Review state energy office release and project fit",
    "Category": "Grant",
    "Source URL": "https://afdc.energy.gov/laws/317",
    "Application URL": "https://afdc.energy.gov/laws/317",
    "Location Options": [
      { "label": "National SEP overview", "state": "ALL", "url": "https://afdc.energy.gov/laws/317" },
      { "label": "Ohio Energy Efficiency Program", "state": "OH", "url": "https://development.ohio.gov/community/redevelopment/energy-efficiency-program" },
      { "label": "Kentucky Energy Programs", "state": "KY", "url": "https://eec.ky.gov/Energy/Programs/Pages/default.aspx" },
      { "label": "Texas SECO Funding", "state": "TX", "url": "https://comptroller.texas.gov/programs/seco/funding/" }
    ],
    "Last Verified": "2026-04-09"
  },
  {
    "Program Name": "Revolving Loan Fund - Energy Efficiency",
    "Funding Type": "Revolving Loan",
    "Source": "DOE / State",
    "State": "MULTI",
    "Funding Amount": 500000,
    "Deadline": "Rolling",
    "Priority Score": 76,
    "Priority Bucket": "Pursue",
    "Go/No-Go": "GO",
    "Next Action": "Verify borrower type and repayment terms",
    "Category": "Loan",
    "Source URL": "https://www.energy.gov/sites/default/files/2025-01/rlf-grants-guide_011525.pdf",
    "Application URL": "https://www.energy.gov/sites/default/files/2025-01/rlf-grants-guide_011525.pdf",
    "Location Options": [
      { "label": "DOE RLF Grants Guide", "state": "ALL", "url": "https://www.energy.gov/sites/default/files/2025-01/rlf-grants-guide_011525.pdf" },
      { "label": "Ohio Energy Loan Fund", "state": "OH", "url": "https://development.ohio.gov/community/redevelopment/energy-loan-fund" },
      { "label": "Kentucky Energy Programs", "state": "KY", "url": "https://eec.ky.gov/Energy/Programs/Pages/default.aspx" }
    ],
    "Last Verified": "2026-04-09"
  },
  {
    "Program Name": "179D Energy Efficient Commercial Buildings Deduction",
    "Funding Type": "Tax Incentive",
    "Source": "IRS",
    "State": "ALL",
    "Funding Amount": 50000,
    "Deadline": "Ongoing",
    "Priority Score": 74,
    "Priority Bucket": "Pursue",
    "Go/No-Go": "GO",
    "Next Action": "Confirm lighting / controls scope meets deduction criteria",
    "Category": "Tax Incentive",
    "Source URL": "https://www.irs.gov/credits-deductions/energy-efficient-commercial-buildings-deduction",
    "Application URL": "https://www.irs.gov/credits-deductions/energy-efficient-commercial-buildings-deduction",
    "Location Options": [
      { "label": "IRS 179D page", "state": "ALL", "url": "https://www.irs.gov/credits-deductions/energy-efficient-commercial-buildings-deduction" }
    ],
    "Last Verified": "2026-04-09"
  },
  {
    "Program Name": "ESCO / Performance Contracting Pathway",
    "Funding Type": "Product / Delivery Model",
    "Source": "DOE FEMP",
    "State": "ALL",
    "Funding Amount": 0,
    "Deadline": "Ongoing",
    "Priority Score": 68,
    "Priority Bucket": "Review",
    "Go/No-Go": "GO",
    "Next Action": "Assess whether project should be packaged as ESCO / EPC",
    "Category": "Product",
    "Source URL": "https://www.energy.gov/cmei/femp/energy-savings-performance-contracts-federal-agencies",
    "Application URL": "https://www.energy.gov/cmei/femp/resources-implementing-federal-energy-savings-performance-contracts",
    "Location Options": [
      { "label": "DOE ESPC overview", "state": "ALL", "url": "https://www.energy.gov/cmei/femp/energy-savings-performance-contracts-federal-agencies" },
      { "label": "DOE ESPC resources", "state": "ALL", "url": "https://www.energy.gov/cmei/femp/resources-implementing-federal-energy-savings-performance-contracts" },
      { "label": "GSA eBuy ESPC notices", "state": "ALL", "url": "https://www.energy.gov/femp/energy-savings-performance-contract-enable-notices-opportunity-released-general-services" }
    ],
    "Last Verified": "2026-04-09"
  },
  {
    "Program Name": "Green Bank Project Financing",
    "Funding Type": "Loan",
    "Source": "Green Bank",
    "State": "MULTI",
    "Funding Amount": 1000000,
    "Deadline": "Rolling",
    "Priority Score": 72,
    "Priority Bucket": "Pursue",
    "Go/No-Go": "GO",
    "Next Action": "Review financing eligibility and minimum project size",
    "Category": "Loan",
    "Source URL": "https://www.coalitionforgreencapital.com/green-banks",
    "Application URL": "https://www.coalitionforgreencapital.com/green-banks",
    "Location Options": [
      { "label": "Green bank overview", "state": "MULTI", "url": "https://www.coalitionforgreencapital.com/green-banks" }
    ],
    "Last Verified": "2026-04-09"
  },
  {
    "Program Name": "IRA-Linked Lighting Upgrade Incentive Stack",
    "Funding Type": "Incentive Stack",
    "Source": "DOE / IRS",
    "State": "ALL",
    "Funding Amount": 150000,
    "Deadline": "Varies",
    "Priority Score": 70,
    "Priority Bucket": "Review",
    "Go/No-Go": "GO",
    "Next Action": "Model stacked incentive package for LED / controls scope",
    "Category": "Incentive",
    "Source URL": "https://www.energy.gov/tax-credits-rebates-savings-0",
    "Application URL": "https://www.irs.gov/credits-deductions/energy-efficient-commercial-buildings-deduction",
    "Location Options": [
      { "label": "DOE incentives overview", "state": "ALL", "url": "https://www.energy.gov/tax-credits-rebates-savings-0" },
      { "label": "IRS 179D deduction", "state": "ALL", "url": "https://www.irs.gov/credits-deductions/energy-efficient-commercial-buildings-deduction" }
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
    return res.status(500).json({ error: "Grant API error", detail: err.message });
  }
}
