const rows = [
  {
    "Program Name": "Duke Energy LED Rebate",
    "Funding Type": "Utility Rebate",
    "Source": "Utility",
    "State": "IN",
    "Funding Amount": 50000,
    "Deadline": "Rolling",
    "Priority Score": 77,
    "Priority Bucket": "Pursue",
    "Go/No-Go": "GO",
    "Next Action": "Check prescriptive vs custom lighting rebate path",
    "Category": "Utility",
    "Source URL": "https://www.duke-energy.com/business/products/smart-saver"
  },
  {
    "Program Name": "AES Indiana Energy Efficiency Rebate",
    "Funding Type": "Utility Rebate",
    "Source": "Utility",
    "State": "IN",
    "Funding Amount": 40000,
    "Deadline": "Rolling",
    "Priority Score": 74,
    "Priority Bucket": "Pursue",
    "Go/No-Go": "GO",
    "Next Action": "Confirm fixture types and measure list",
    "Category": "Utility",
    "Source URL": "https://aesindiana.com/business/ways-save/rebates"
  },
  {
    "Program Name": "State Energy Office Competitive Grant",
    "Funding Type": "State Funding",
    "Source": "State Energy Office",
    "State": "OH",
    "Funding Amount": 200000,
    "Deadline": "Varies",
    "Priority Score": 71,
    "Priority Bucket": "Pursue",
    "Go/No-Go": "GO",
    "Next Action": "Review eligible entities and project timing",
    "Category": "State Funding",
    "Source URL": "https://development.ohio.gov/community/energy"
  },
  {
    "Program Name": "Municipal Revolving Energy Loan",
    "Funding Type": "Revolving Loan",
    "Source": "State / Local",
    "State": "KY",
    "Funding Amount": 300000,
    "Deadline": "Rolling",
    "Priority Score": 69,
    "Priority Bucket": "Review",
    "Go/No-Go": "GO",
    "Next Action": "Validate municipal borrower eligibility",
    "Category": "Loan",
    "Source URL": "https://eec.ky.gov/Financial-Programs/Pages/default.aspx"
  },
  {
    "Program Name": "Street Lighting Modernization Incentive",
    "Funding Type": "Utility Rebate",
    "Source": "Utility / State",
    "State": "TX",
    "Funding Amount": 120000,
    "Deadline": "Rolling",
    "Priority Score": 78,
    "Priority Bucket": "Pursue",
    "Go/No-Go": "GO",
    "Next Action": "Prioritize municipal roadway / parking lot prospects",
    "Category": "Utility",
    "Source URL": "https://comptroller.texas.gov/programs/seco/funding/"
  },
  {
    "Program Name": "Public Building Lighting Upgrade Grant",
    "Funding Type": "State Funding",
    "Source": "State",
    "State": "PA",
    "Funding Amount": 150000,
    "Deadline": "Varies",
    "Priority Score": 73,
    "Priority Bucket": "Pursue",
    "Go/No-Go": "GO",
    "Next Action": "Match public building list to eligible applicants",
    "Category": "State Funding",
    "Source URL": "https://www.dep.pa.gov/Citizens/GrantsLoansRebates/Pages/default.aspx"
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
