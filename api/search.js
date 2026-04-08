const TARGET_NAICS = new Set(["238210", "335122", "335129"]);
const TARGET_PSC = new Set(["N046", "N059"]);
const TARGET_AGENCIES = [
  "VETERANS",
  "ARMY",
  "AIR FORCE",
  "NAVY",
  "USACE",
  "GSA",
  "ENERGY",
  "DHS",
  "POSTAL"
];

const STRONG_LIGHTING_PHRASES = [
  "LED LIGHTING",
  "LIGHTING RETROFIT",
  "LIGHTING UPGRADE",
  "LIGHTING REPLACEMENT",
  "FIXTURE REPLACEMENT",
  "RELIGHTING",
  "SPORTS LIGHTING",
  "FIELD LIGHTING",
  "STADIUM LIGHTING",
  "PARKING LOT LIGHTING",
  "SITE LIGHTING",
  "STREET LIGHTING",
  "ROADWAY LIGHTING",
  "EXTERIOR LIGHTING",
  "INTERIOR LIGHTING",
  "LIGHTING CONTROLS",
  "LED FIXTURE",
  "LIGHT POLE",
  "AREA LIGHTING"
];

const EXCLUDE_KEYWORDS = [
  "HVAC",
  "AIR HANDLER",
  "CHILLER",
  "BOILER",
  "GENERATOR",
  "UPS",
  "BATTERY SYSTEM",
  "INTRUSION",
  "ACCESS CONTROL",
  "SECURITY CAMERA",
  "VIDEO SURVEILLANCE",
  "STERILIZER",
  "STERILIZATION",
  "TELERADIOLOGY",
  "RADIOLOGY",
  "MEDICAL GAS",
  "LAUNDRY",
  "GROUNDS MAINTENANCE",
  "LANDSCAPING",
  "TREE TRIMMING",
  "JANITORIAL",
  "CUSTODIAL",
  "ROOFING",
  "PLUMBING",
  "DOOR HARDWARE",
  "FIRE ALARM",
  "SPRINKLER",
  "ELEVATOR",
  "PAVING",
  "CONCRETE",
  "PAINTING SERVICES",
  "INSTRUCTIONAL DESIGN",
  "TRAINING SUPPORT",
  "STAFFING",
  "TELCOM",
  "TELECOMMUNICATIONS",
  "NETWORKING",
  "SERVER ROOM"
];

function formatSamDate(d) {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function daysLeftFrom(dueDate) {
  if (!dueDate) return "";
  const now = new Date();
  const due = new Date(dueDate);
  if (Number.isNaN(due.getTime())) return "";
  return Math.ceil((due - now) / (1000 * 60 * 60 * 24));
}

function includesAny(text, phrases) {
  return phrases.some((p) => text.includes(p));
}

function hasStrongLightingSignal(title, description = "") {
  const text = `${title} ${description}`.toUpperCase();
  return includesAny(text, STRONG_LIGHTING_PHRASES);
}

function hasExclusion(title, description = "") {
  const text = `${title} ${description}`.toUpperCase();
  return includesAny(text, EXCLUDE_KEYWORDS);
}

function scoreOpportunity(o) {
  const title = String(o.title || "");
  const description = String(o.description || o.additionalInfoLinkDescription || "");
  const agency = String(o.fullParentPathName || "").toUpperCase();
  const setAside = String(o.typeOfSetAsideDescription || o.typeOfSetAside || "").toUpperCase();
  const naics = String(o.naicsCode || "");
  const psc = String(o.classificationCode || "");
  const awardCeiling = toNumber(o.awardCeiling);

  const place = o.placeOfPerformance || {};
  const state = String(place.state || o.placeOfPerformanceState || "").toUpperCase();
  const city = String(place.city || o.placeOfPerformanceCity || "");
  const dueDays = daysLeftFrom(o.responseDeadLine);

  const strongLighting = hasStrongLightingSignal(title, description);
  const codeMatch = TARGET_NAICS.has(naics) || TARGET_PSC.has(psc);
  const agencyTarget = TARGET_AGENCIES.some((k) => agency.includes(k)) ? "Yes" : "No";

  if (hasExclusion(title, description) && !strongLighting) return null;
  if (!strongLighting && !codeMatch) return null;

  const setAsideMatch =
    setAside.includes("SDVOSB") || setAside.includes("VOSB")
      ? "Yes"
      : setAside.includes("SMALL") || setAside.includes("8(A)") || setAside.includes("HUBZONE")
        ? "Partial"
        : "No";

  let score = 0;
  if (strongLighting) score += 35;
  if (agencyTarget === "Yes") score += 10;
  if (setAsideMatch === "Yes") score += 18;
  else if (setAsideMatch === "Partial") score += 8;
  if (TARGET_NAICS.has(naics)) score += 12;
  if (TARGET_PSC.has(psc)) score += 12;
  if (dueDays !== "" && dueDays >= 0 && dueDays <= 14) score += 8;
  if (awardCeiling >= 100000) score += 10;
  if (awardCeiling >= 500000) score += 5;

  let bucket = "Watch";
  if (dueDays !== "" && dueDays < 0) bucket = "Expired";
  else if (score >= 72) bucket = "Pursue";
  else if (score >= 50) bucket = "Review";

  return {
    type: "SAM.gov",
    "Notice ID": o.noticeId || "",
    "Title": o.title || "",
    "Agency": o.fullParentPathName || "",
    "Posted Date": o.postedDate || "",
    "Due Date": o.responseDeadLine || "",
    "Days Left": dueDays,
    "Set-Aside": o.typeOfSetAsideDescription || o.typeOfSetAside || "",
    "NAICS": naics,
    "PSC": psc,
    "Estimated Value ($)": awardCeiling,
    "State": state,
    "City": city,
    "Priority Score": score,
    "Priority Bucket": bucket,
    "Owner": "Chris",
    "Next Action":
      bucket === "Pursue"
        ? "Call and qualify immediately"
        : bucket === "Review"
          ? "Assess scope, pricing, and teaming fit"
          : "Monitor only if lighting scope becomes clearer",
    "Source URL": o.uiLink || ""
  };
}

export default async function handler(req, res) {
  try {
    const apiKey = process.env.SAM_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Missing SAM_API_KEY environment variable in Vercel."
      });
    }

    const postedFromDays = Number(req.query.postedFromDays || 14);
    const limit = Number(req.query.limit || 100);

    const q =
      req.query.q ||
      '(("LED lighting" OR "lighting retrofit" OR relighting OR "sports lighting" OR "street lighting" OR "parking lot lighting" OR "lighting controls" OR "interior lighting" OR "exterior lighting" OR "fixture replacement"))';

    const today = new Date();
    const postedFrom = new Date(today.getTime() - postedFromDays * 24 * 60 * 60 * 1000);

    const url = new URL("https://api.sam.gov/prod/opportunities/v2/search");
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("postedFrom", formatSamDate(postedFrom));
    url.searchParams.set("postedTo", formatSamDate(today));
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("offset", "0");
    url.searchParams.set("ptype", "o");
    url.searchParams.set("q", q);

    const response = await fetch(url.toString(), {
      headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" }
    });

    const text = await response.text();

    if (!response.ok) {
      return res.status(response.status).json({
        error: "SAM.gov request failed",
        detail: text
      });
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(500).json({
        error: "SAM.gov returned non-JSON or empty content",
        detail: text.slice(0, 500)
      });
    }

    const raw = Array.isArray(data.opportunitiesData) ? data.opportunitiesData : [];
    let rows = raw.map(scoreOpportunity).filter(Boolean);
    rows.sort((a, b) => Number(b["Priority Score"] || 0) - Number(a["Priority Score"] || 0));

    return res.status(200).json({
      count: rows.length,
      rows
    });
  } catch (err) {
    return res.status(500).json({
      error: "Unexpected server error",
      detail: err?.message || String(err)
    });
  }
}
