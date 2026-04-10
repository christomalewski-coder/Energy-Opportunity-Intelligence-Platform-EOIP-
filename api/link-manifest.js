import grantsHandler from "./grants.js";
import utilitiesHandler from "./utilities.js";

function callHandler(handler, req) {
  return new Promise((resolve) => {
    const res = {
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(payload) {
        resolve({ statusCode: this.statusCode || 200, payload });
      }
    };
    handler(req, res);
  });
}

function normalizeRow(row, category) {
  return {
    category,
    name: row["Program Name"] || row["Title"] || row["Notice ID"] || "",
    type: row["Funding Type"] || row.type || "",
    state: row["State"] || "",
    source: row["Source"] || row["Agency"] || "",
    sourceUrl: row["Source URL"] || "",
    applicationUrl: row["Application URL"] || "",
    locationOptions: Array.isArray(row["Location Options"]) ? row["Location Options"] : [],
    lastVerified: row["Last Verified"] || ""
  };
}

export default async function handler(req, res) {
  try {
    const grants = await callHandler(grantsHandler, req);
    const utilities = await callHandler(utilitiesHandler, req);

    const rows = [
      ...(grants.payload?.rows || []).map(r => normalizeRow(r, "grants")),
      ...(utilities.payload?.rows || []).map(r => normalizeRow(r, "utilities"))
    ];

    return res.status(200).json({
      count: rows.length,
      rows
    });
  } catch (err) {
    return res.status(500).json({
      error: "Link manifest error",
      detail: err.message
    });
  }
}
