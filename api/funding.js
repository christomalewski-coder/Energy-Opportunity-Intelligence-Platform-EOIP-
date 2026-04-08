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

export default async function handler(req, res) {
  try {
    const grants = await callHandler(grantsHandler, req);
    const utilities = await callHandler(utilitiesHandler, req);

    const rows = [
      ...(grants.payload?.rows || []),
      ...(utilities.payload?.rows || [])
    ].sort((a, b) => Number(b["Priority Score"] || 0) - Number(a["Priority Score"] || 0));

    return res.status(200).json({
      count: rows.length,
      rows
    });
  } catch (err) {
    return res.status(500).json({
      error: "Unified funding API error",
      detail: err.message
    });
  }
}
