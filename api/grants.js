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
    "Category": "Grant"
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
    "Category": "Grant"
  },
  {
    "Program Name": "Revolving Loan Fund - Energy Efficiency",
    "Funding Type": "Revolving Loan",
    "Source": "State",
    "State": "MULTI",
    "Funding Amount": 500000,
    "Deadline": "Rolling",
    "Priority Score": 76,
    "Priority Bucket": "Pursue",
    "Go/No-Go": "GO",
    "Next Action": "Verify borrower type and repayment terms",
    "Category": "Loan"
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
    "Category": "Tax Incentive"
  },
  {
    "Program Name": "ESCO / Performance Contracting Pathway",
    "Funding Type": "Product / Delivery Model",
    "Source": "ESCO",
    "State": "ALL",
    "Funding Amount": 0,
    "Deadline": "Ongoing",
    "Priority Score": 68,
    "Priority Bucket": "Review",
    "Go/No-Go": "GO",
    "Next Action": "Assess whether project should be packaged as ESCO / EPC",
    "Category": "Product"
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
    "Category": "Loan"
  },
  {
    "Program Name": "IRA-Linked Lighting Upgrade Incentive Stack",
    "Funding Type": "Incentive Stack",
    "Source": "Federal / Utility / Tax",
    "State": "ALL",
    "Funding Amount": 150000,
    "Deadline": "Varies",
    "Priority Score": 70,
    "Priority Bucket": "Review",
    "Go/No-Go": "GO",
    "Next Action": "Model stacked incentive package for LED / controls scope",
    "Category": "Incentive"
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
      data = data.filter(r => String(r["Funding Type"]).toUpperCase().includes(type) || String(r.Category).toUpperCase().includes(type));
    }

    data = [...data].sort((a,b) => Number(b["Priority Score"] || 0) - Number(a["Priority Score"] || 0));

    return res.status(200).json({ count: data.length, rows: data });
  } catch (err) {
    return res.status(500).json({ error: "Grant API error", detail: err.message });
  }
}
