const pptxgen = require("pptxgenjs");
const path = require("path");
const SHOTS = path.join(__dirname, "assets");
const OUT = process.argv[2] || path.join(__dirname, "Headroom_IES_Deck.pptx");

const PROTO = "https://claude.ai/artifact/C5W1hkVgR4J96ZY9ZMKkUX";
const RESEARCH = "https://claude.ai/artifact/XuQpPr5kZVv5EZi6Yi8Miy";

const C = {
  navy: "0D1B3E", blue: "236CFF", blueDk: "1650C7", tint: "EEF3FF", tint2: "F5F7FB",
  ink: "1F2433", grey: "5A6275", grey2: "8A91A3", line: "DCE1EB", white: "FFFFFF",
  green: "108043", greenT: "E6F4EC", amber: "B25E00", amberT: "FFF3E0", red: "C62828", redT: "FDECEC",
  violet: "5B3FD6", violetT: "F0ECFF",
};
const F = "Arial";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.title = "Headroom for Intuit Enterprise Suite";

const W = 13.333, M = 0.6, CW = W - 2 * M;
let pageNo = 0;

function base(title, lead) {
  const s = pres.addSlide();
  s.background = { color: C.white };
  pageNo++;
  s.addText(title, { x: M, y: 0.38, w: CW, h: 0.62, fontFace: F, fontSize: 26, bold: true, color: C.navy, margin: 0, valign: "top", isTextBox: true });
  if (lead) s.addText(lead, { x: M, y: 1.02, w: CW, h: 0.42, fontFace: F, fontSize: 13, color: C.grey, margin: 0, valign: "top", isTextBox: true });
  s.addText("Headroom  |  Intuit Enterprise Suite", { x: M, y: 7.05, w: 5, h: 0.25, fontFace: F, fontSize: 9, color: C.grey2, margin: 0, isTextBox: true });
  s.addText(String(pageNo), { x: W - M - 0.5, y: 7.05, w: 0.5, h: 0.25, fontFace: F, fontSize: 9, color: C.grey2, align: "right", margin: 0, isTextBox: true });
  return s;
}
function box(s, x, y, w, h, fill, line) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.08, fill: { color: fill || C.tint2 }, line: { color: line || fill || C.tint2, width: 0.75 } });
}
function txt(s, text, x, y, w, h, o = {}) {
  s.addText(text, Object.assign({ x, y, w, h, fontFace: F, fontSize: 12, color: C.ink, margin: 0, valign: "top", isTextBox: true }, o));
}
function label(s, text, x, y, w, color) {
  txt(s, text.toUpperCase(), x, y, w, 0.25, { fontSize: 9.5, bold: true, color: color || C.grey, charSpacing: 1.5 });
}
function bullets(items, size, color) {
  return items.map((t, i) => {
    const runs = [];
    if (Array.isArray(t)) {
      runs.push({ text: t[0], options: { bold: true, bullet: i === 0 ? undefined : undefined } });
    }
    return { text: Array.isArray(t) ? t[0] + " " + t[1] : t, options: { bullet: { indent: 12 }, breakLine: i < items.length - 1, paraSpaceAfter: 4, fontSize: size || 12, color: color || C.ink } };
  });
}
function richBullets(items, size) {
  // items: [boldPart, rest]
  const out = [];
  items.forEach((t, i) => {
    out.push({ text: t[0], options: { bold: true, bullet: { indent: 12 }, fontSize: size || 12, color: C.navy } });
    out.push({ text: " " + t[1], options: { fontSize: size || 12, color: C.ink, breakLine: i < items.length - 1, paraSpaceAfter: 5 } });
  });
  return out;
}
function circle(s, x, y, d, fill, text, fs) {
  s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill } });
  if (text) txt(s, text, x, y, d, d, { align: "center", valign: "middle", bold: true, color: C.white, fontSize: fs || 12 });
}
function table(s, rows, x, y, w, colW, o = {}) {
  const fs = o.fontSize || 10.5;
  const data = rows.map((r, ri) => r.map((cell, ci) => {
    const isHead = ri === 0;
    const opts = {
      fontFace: F, fontSize: isHead ? fs - 1.5 : fs, bold: isHead || (o.boldFirst && ci === 0), color: isHead ? C.grey : (o.boldFirst && ci === 0 ? C.navy : C.ink),
      fill: { color: isHead ? C.tint : C.white }, valign: "middle",
      border: [{ type: "none" }, { type: "none" }, { pt: 0.75, color: C.line }, { type: "none" }],
      margin: [0.05, 0.08, 0.05, 0.08],
    };
    if (typeof cell === "object" && cell !== null && cell.text !== undefined) return { text: cell.text, options: Object.assign(opts, cell.options) };
    return { text: String(cell), options: opts };
  }));
  const rh = o.rowH ? rows.map((_, i) => i === 0 ? (o.headH || 0.34) : o.rowH) : undefined;
  s.addTable(data, { x, y, w, colW, rowH: rh, autoPage: false });
}

/* ---------------- 1. Cover ---------------- */
{
  const s = pres.addSlide(); pageNo++;
  s.background = { color: C.white };
  txt(s, "INTUIT ENTERPRISE SUITE  |  PM CASE STUDY", M, 0.55, 6.2, 0.3, { fontSize: 10, bold: true, color: C.blue, charSpacing: 2 });
  txt(s, "Headroom", M, 0.95, 6.2, 1.0, { fontSize: 54, bold: true, color: C.navy });
  txt(s, "Grow as big as you want. Stay on IES.", M, 1.95, 6.2, 0.5, { fontSize: 20, color: C.blue, bold: true });
  txt(s, "Headroom spots when a mid-market company is about to outgrow its setup, then fixes it inside IES with verified AI agents, partner apps and Intuit experts.", M, 2.55, 5.9, 0.9, { fontSize: 13.5, color: C.ink });

  box(s, M, 3.65, 5.9, 1.05, C.tint);
  label(s, "Vision", M + 0.25, 3.8, 3, C.blueDk);
  txt(s, "IES becomes the last finance platform a growing company needs. Doubling in size should never mean changing systems.", M + 0.25, 4.08, 5.4, 0.55, { fontSize: 12, color: C.navy });

  label(s, "About me", M, 4.95, 3);
  txt(s, "Udbhav Choudhary. [Add 2 to 3 lines here: your degree and school, work experience, and one thing you enjoy outside work.]", M, 5.22, 5.9, 0.7, { fontSize: 11.5, color: C.ink });

  s.addText([
    { text: "Try the prototype", options: { hyperlink: { url: PROTO }, bold: true, color: C.blue } },
    { text: "   |   ", options: { color: C.grey2 } },
    { text: "Research and AI process", options: { hyperlink: { url: RESEARCH }, bold: true, color: C.blue } },
  ], { x: M, y: 6.2, w: 5.9, h: 0.35, fontFace: F, fontSize: 12.5, margin: 0, isTextBox: true });

  s.addImage({ path: path.join(SHOTS, "c_home.png"), x: 7.05, y: 1.1, w: 5.7, h: 3.5625, shadow: { type: "outer", blur: 8, offset: 2, angle: 90, color: "0D1B3E", opacity: 0.18 } });
  txt(s, "Growth Radar in the prototype: three things this company is about to outgrow, with a fix for each.", 7.05, 4.8, 5.7, 0.5, { fontSize: 10.5, color: C.grey });
}

/* ---------------- 2. Problem ---------------- */
{
  const s = base("IES loses customers at the moment they become most valuable",
    "Companies join IES while they are simple. They leave when growth adds entities, currencies and new ways of charging.");
  // Left: problem statement
  label(s, "The problem in one line", M, 1.65, 6, C.blueDk);
  box(s, M, 1.95, 6.0, 1.05, C.tint);
  txt(s, "A growing finance team hits a new kind of complexity, handles it in spreadsheets for a few months, and then decides the only way out is a bigger ERP. IES finds out when the cancellation arrives.", M + 0.22, 2.1, 5.6, 1.2, { fontSize: 13, color: C.navy });

  label(s, "How it feels for the CFO", M, 3.45, 6);
  s.addText(richBullets([
    ["Anxious at month-end.", "Close takes 9 days and half of it is spreadsheet work."],
    ["Exposed in front of the auditor.", "Revenue booked the old way gets flagged."],
    ["Stuck.", "The choices look like more spreadsheets or a 6 to 9 month ERP project."],
  ], 12), { x: M, y: 3.75, w: 6.0, h: 1.3, fontFace: F, margin: 0, valign: "top", isTextBox: true });

  label(s, "Where complexity arrives (typical path)", M, 5.4, 6);
  const stages = [["$5M", "2nd entity"], ["$15M", "Subscriptions"], ["$30M", "Foreign currency"], ["$50M", "Audit, ASC 606"]];
  stages.forEach((st, i) => {
    const x = M + i * 1.5;
    circle(s, x, 5.72, 0.22, i === 3 ? C.red : C.blue);
    if (i < 3) s.addShape(pres.shapes.LINE, { x: x + 0.22, y: 5.83, w: 1.28, h: 0, line: { color: C.line, width: 1.5 } });
    txt(s, st[0], x, 6.02, 1.4, 0.25, { fontSize: 12, bold: true, color: C.navy });
    txt(s, st[1], x, 6.27, 1.45, 0.3, { fontSize: 10.5, color: C.grey });
  });
  txt(s, "Revenue bands are assumptions based on migration guides.", M, 6.62, 6, 0.25, { fontSize: 9, color: C.grey2, italic: true });

  // Right: evidence stats
  const ex = 7.1, ew = 5.63;
  label(s, "What the research shows", ex, 1.65, ew, C.blueDk);
  const stats = [
    ["$10M to $50M", "Revenue band where companies usually leave QuickBooks-class tools for NetSuite.", "DualEntry, Epiq migration guides"],
    ["#1 reason", "Multi-entity consolidation is the most cited reason to switch. ASC 606 revenue rules come next.", "Epiq, Zone & Co"],
    ["6+ days", "Half of finance teams still need six or more business days to close. Only 18% close in three.", "Ledge, 2025 close benchmarks"],
    ["43,000+", "NetSuite customers. NetSuite launched an AI app marketplace in 2025 to capture them.", "Oracle NetSuite, SuiteWorld 2025"],
  ];
  stats.forEach((st, i) => {
    const y = 1.95 + i * 1.18;
    box(s, ex, y, ew, 1.05, C.white, C.line);
    txt(s, st[0], ex + 0.22, y + 0.14, 1.85, 0.5, { fontSize: 18, bold: true, color: C.blue, valign: "middle" });
    txt(s, st[1], ex + 2.15, y + 0.12, ew - 2.35, 0.6, { fontSize: 11.5, color: C.ink });
    txt(s, st[2], ex + 2.15, y + 0.72, ew - 2.35, 0.25, { fontSize: 9, color: C.grey2 });
  });
  s.addText([{ text: "All sources and links", options: { hyperlink: { url: RESEARCH }, color: C.blue, bold: true } }],
    { x: ex, y: 6.62, w: 3, h: 0.25, fontFace: F, fontSize: 10, margin: 0, isTextBox: true });
}

/* ---------------- 3. Personas ---------------- */
{
  const s = base("Two customers who need each other",
    "Built on the two personas in Intuit's brief. An Intuit expert connects them.");
  const colW = 5.9;
  const P = [
    { x: M, init: "MC", color: C.violet, name: "Maya Chen, CFO", role: "Harbor & Pine Outdoor. $64M revenue, 380 staff, US and Canada, UK entity opening next quarter. On IES for 3 years.",
      rows: [["Trying to", "Close in 4 days, open the UK entity, pass the audit with no surprises."],
             ["Blocked by", "Subscription revenue tracked in a spreadsheet. Nobody on staff knows UK VAT. Does not trust AI to post entries unchecked."],
             ["Feels", "\"I am one audit note away from a nine-month ERP project.\""],
             ["Ideal state", "\"Tell me what is coming, fix it inside the tool I know, and let me check the work.\""]] },
    { x: M + colW + 0.33, init: "AM", color: C.amber, name: "Arjun Mehta, founder", role: "Ledgerline, a 12-person ISV that builds revenue recognition software for mid-market finance teams.",
      rows: [["Trying to", "Find mid-market customers who will pay for a revenue agent."],
             ["Blocked by", "Report-style APIs, no view of who needs his product, a new security review for every customer, unclear pricing."],
             ["Feels", "\"We build good features that nobody finds.\""],
             ["Ideal state", "\"Show me real demand, give me the tools Intuit's own agents use, and bill customers for me.\""]] },
  ];
  P.forEach(p => {
    box(s, p.x, 1.65, colW, 4.55, C.white, C.line);
    circle(s, p.x + 0.25, 1.85, 0.6, p.color, p.init, 14);
    txt(s, p.name, p.x + 1.0, 1.85, colW - 1.2, 0.3, { fontSize: 15, bold: true, color: C.navy });
    txt(s, p.role, p.x + 1.0, 2.17, colW - 1.2, 0.6, { fontSize: 10.5, color: C.grey });
    p.rows.forEach((r, i) => {
      const y = 2.95 + i * 0.8;
      label(s, r[0], p.x + 0.25, y, 1.3, C.blueDk);
      txt(s, r[1], p.x + 1.55, y - 0.02, colW - 1.8, 0.75, { fontSize: 11.5, color: r[0] === "Feels" || r[0] === "Ideal state" ? C.navy : C.ink, italic: r[0] === "Feels" || r[0] === "Ideal state" });
    });
  });
  box(s, M, 6.35, CW, 0.55, C.greenT);
  circle(s, M + 0.18, 6.46, 0.33, C.green, "DO", 9);
  txt(s, [{ text: "Dana Ortiz, CPA, Intuit expert. ", options: { bold: true, color: C.green } },
          { text: "Wants steady, well-paid review work. Her judgement is what lets Maya trust Arjun's agent.", options: { color: C.ink } }],
    M + 0.65, 6.46, CW - 0.8, 0.35, { fontSize: 11.5, valign: "middle" });
}

/* ---------------- 4. Ideation and prioritization ---------------- */
{
  const s = base("Eight ideas, narrowed to two",
    "I spread 100 points across the ideas, checked them with RICE, and plotted them by impact and effort.");
  const rows = [
    ["Idea", "100 pts", "Reach", "Impact", "Conf.", "Effort", "RICE"],
    ["A. Growth Radar: warn before they outgrow", "30", "6,000", "3", "70%", "8", "1,575"],
    ["B. Verified agent and app store", "25", "4,000", "2", "60%", "10", "480"],
    ["C. Intuit expert review of agent work", "20", "3,000", "2", "80%", "5", "960"],
    ["D. Developer demand board and studio", "15", "2,500", "2", "50%", "9", "278"],
    ["E. NetSuite migration concierge", "5", "400", "3", "50%", "4", "150"],
    ["F. More industry editions", "5", "1,500", "1", "60%", "12", "75"],
    ["G. Usage-based API pricing", "0", "800", "0.5", "80%", "2", "160"],
    ["H. AI CFO chat", "0", "", "", "", "", "Shipped"],
  ].map((r, i) => i === 0 ? r : r.map((c, j) => (i <= 2 && j === 0) ? { text: c, options: { bold: true, color: C.blue } } : c));
  table(s, rows, M, 1.65, 7.5, [3.3, 0.7, 0.75, 0.65, 0.65, 0.65, 0.8], { fontSize: 10.5, rowH: 0.36 });
  txt(s, "Reach = companies or developers affected per quarter. Impact 0.25 to 3. Effort in person-months. Reach assumes about 20,000 IES companies. H was dropped because Intuit launched Intelligence Chat in August 2026.", M, 5.05, 7.5, 0.6, { fontSize: 9.5, color: C.grey2 });

  box(s, M, 5.75, 7.5, 1.15, C.tint);
  label(s, "What I picked", M + 0.22, 5.88, 4, C.blueDk);
  txt(s, "Growth Radar (A) and the Verified Agent Store (B) are the product. Expert review (C) makes the agents safe to trust. The developer studio (D) fills the store with what Radar finds customers need.", M + 0.22, 6.14, 7.05, 0.7, { fontSize: 11.5, color: C.navy });

  // 2x2
  const gx = 8.55, gy = 1.65, gs = 4.18;
  txt(s, "Impact vs effort", gx, gy, gs, 0.25, { fontSize: 11, bold: true, color: C.navy });
  const qy = gy + 0.35, q = (gs - 0.3) / 2;
  const quads = [["Quick wins", C.greenT], ["Big bets", C.tint], ["Fill-ins", C.tint2], ["Skip", C.redT]];
  quads.forEach((qq, i) => {
    const x = gx + 0.3 + (i % 2) * q, y = qy + Math.floor(i / 2) * q;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: q, h: q, fill: { color: qq[1] }, line: { color: C.white, width: 2 } });
    txt(s, qq[0], x + 0.1, y + 0.08, q - 0.2, 0.25, { fontSize: 9.5, bold: true, color: C.grey });
  });
  txt(s, "Impact", gx - 0.15, qy + q - 0.15, 0.4, 0.3, { fontSize: 9, color: C.grey, rotate: 270, align: "center" });
  txt(s, "Low effort                          High effort", gx + 0.3, qy + 2 * q + 0.05, 2 * q, 0.25, { fontSize: 9, color: C.grey, align: "center" });
  // points: [letter, effort 0..1 (x), impact 0..1 (y up)]
  const pts = [["A", 0.32, 0.9, C.blue], ["C", 0.2, 0.68, C.blue], ["B", 0.72, 0.82, C.blue], ["D", 0.64, 0.62, C.blue], ["E", 0.18, 0.3, C.grey2], ["G", 0.08, 0.14, C.grey2], ["F", 0.85, 0.22, C.grey2]];
  pts.forEach(p => {
    const d = 0.36, x = gx + 0.3 + p[1] * 2 * q - d / 2, y = qy + (1 - p[2]) * 2 * q - d / 2;
    circle(s, x, y, d, p[3], p[0], 11);
  });
}

/* ---------------- 5. Solution ---------------- */
{
  const s = base("Headroom: see it coming, fix it inside IES",
    "One loop that keeps growing companies on IES and gives developers and experts a reason to build for them.");
  const steps = [
    ["1", "Radar warns", "Reads the books nightly. Flags 40 growth triggers with evidence."],
    ["2", "Store matches", "Suggests the lightest fix: a setting, an Intuit agent, a partner agent, or an expert."],
    ["3", "Agent works", "Runs in shadow mode first, then proposes entries with sources attached."],
    ["4", "Expert checks", "Anything unsure, new or high-stakes goes to an Intuit CPA."],
    ["5", "Developers build", "Unmet needs show up on a demand board, so the store fills with what is missing."],
  ];
  const sw = (CW - 4 * 0.2) / 5;
  steps.forEach((st, i) => {
    const x = M + i * (sw + 0.2);
    box(s, x, 1.65, sw, 1.5, i === 0 || i === 1 ? C.tint : C.tint2);
    circle(s, x + 0.2, 1.82, 0.4, C.blue, st[0], 12);
    txt(s, st[1], x + 0.7, 1.87, sw - 0.8, 0.3, { fontSize: 13, bold: true, color: C.navy });
    txt(s, st[2], x + 0.2, 2.35, sw - 0.4, 1.0, { fontSize: 10.5, color: C.ink });
  });
  txt(s, "Expert corrections become new test cases for the agent, so every review makes the next answer better.", M, 3.3, CW, 0.3, { fontSize: 11, italic: true, color: C.grey });

  // Operating model table
  label(s, "Who does what: the human and AI operating model", M, 3.95, 7, C.blueDk);
  table(s, [
    ["Mode", "When it applies", "Example"],
    [{ text: "Acts on its own", options: { color: C.green, bold: true } }, "Rule-based, reversible work with a 99%+ record", "Bank reconciliation"],
    [{ text: "Acts with approval", options: { color: C.blue, bold: true } }, "Any ledger posting over the company's threshold, and every new agent's first 14 days", "Revenue deferral entry"],
    [{ text: "Expert sign-off", options: { color: C.violet, bold: true } }, "Confidence under 80%, tax in a new country, loan covenants, new rules", "UK legal fee accrual"],
  ], M, 4.25, 7.4, [1.7, 3.8, 1.9], { fontSize: 10.5, rowH: 0.5 });

  // Pillars
  const px = 8.4, pw = W - M - px;
  label(s, "Principles", px, 3.95, pw, C.blueDk);
  const pil = [["Catch it early.", "Act on signals in the books, months before the customer starts shopping."],
               ["Earn autonomy.", "Each agent starts at approval-only and must prove accuracy to do more."],
               ["Build to demand.", "Developers see what customers need before they write a line of code."]];
  pil.forEach((p, i) => {
    const y = 4.25 + i * 0.85;
    box(s, px, y, pw, 0.75, C.white, C.line);
    txt(s, [{ text: p[0] + " ", options: { bold: true, color: C.navy } }, { text: p[1], options: { color: C.ink } }], px + 0.18, y + 0.1, pw - 0.36, 0.6, { fontSize: 11 });
  });
}

/* ---------------- 6. Prototype ---------------- */
{
  const s = base("What it looks like",
    "The clickable prototype has three views and a 12-step guided tour. It takes about 12 minutes.");
  const shots = [
    ["e_fix.png", "Radar offers fixes", "Subscription revenue was booked up front. Radar suggests three fixes, lightest first.", 858, 898],
    ["e_trust.png", "Trust before install", "Every agent shows its test results, live accuracy and price for this company's volume.", 858, 912],
    ["e_task.png", "Approve with sources", "The agent explains its entry, links 1,284 invoices, and matched the team's estimate in shadow mode.", 1040, 1280],
    ["e_cert.png", "Developer certification", "Accuracy, citations, safety and a CPA panel. Autonomy drops automatically if accuracy falls.", 1416, 854],
  ];
  const cw = (CW - 3 * 0.25) / 4, ih = 2.55;
  shots.forEach((sh, i) => {
    const x = M + i * (cw + 0.25);
    box(s, x, 1.65, cw, ih + 0.1, C.tint2, C.line);
    // fit image inside
    const ar = sh[3] / sh[4];
    let w = cw - 0.1, h = w / ar;
    if (h > ih - 0.0) { h = ih - 0.0; w = h * ar; }
    s.addImage({ path: path.join(SHOTS, sh[0]), x: x + (cw - w) / 2, y: 1.7 + (ih - h) / 2, w, h });
    circle(s, x, 4.5, 0.34, C.blue, String(i + 1), 11);
    txt(s, sh[1], x + 0.45, 4.52, cw - 0.45, 0.3, { fontSize: 12.5, bold: true, color: C.navy });
    txt(s, sh[2], x, 4.95, cw, 0.9, { fontSize: 10.5, color: C.ink });
  });
  box(s, M, 6.0, CW, 0.75, C.tint);
  s.addText([
    { text: "Also in the prototype: ", options: { bold: true, color: C.navy } },
    { text: "an AI advisor that hands a loan-covenant question to a CPA, the expert's review queue, the developer demand board, a sandbox test run, and payouts.  ", options: { color: C.ink } },
    { text: "Open the prototype", options: { bold: true, color: C.blue, hyperlink: { url: PROTO } } },
  ], { x: M + 0.22, y: 6.08, w: CW - 0.44, h: 0.6, fontFace: F, fontSize: 11.5, margin: 0, valign: "middle", isTextBox: true });
}

/* ---------------- 7. Business model and moat ---------------- */
{
  const s = base("How it makes money, and why it is hard to copy",
    "Radar is free because it protects IES revenue. The store and expert services earn on top.");
  const streams = [
    ["Kept revenue", "$12M", "a year", "Churn among companies hitting a trigger falls from 20% to 12%. 6,000 companies x 8 pts x $25k."],
    ["Store revenue share", "$14M", "a year by year 3", "Intuit keeps 15% on a developer's first $1M a year, 20% after. About $81M of agent sales."],
    ["Expert services", "$6M", "margin by year 3", "Reviews and set-up beyond the included hours, at $190 an hour with a 40% margin."],
  ];
  const sw2 = 3.95;
  streams.forEach((st, i) => {
    const x = M, y = 1.65 + i * 1.18;
    box(s, x, y, 7.1, 1.05, i === 0 ? C.tint : C.white, C.line);
    txt(s, st[1], x + 0.22, y + 0.12, 1.4, 0.5, { fontSize: 24, bold: true, color: C.blue });
    txt(s, st[2], x + 0.22, y + 0.62, 1.5, 0.3, { fontSize: 9.5, color: C.grey });
    txt(s, st[0], x + 1.85, y + 0.13, 5.0, 0.3, { fontSize: 13, bold: true, color: C.navy });
    txt(s, st[3], x + 1.85, y + 0.45, 5.05, 0.55, { fontSize: 10.5, color: C.ink });
  });
  txt(s, "All figures are estimates from the assumptions on slide 10 and the research page. API calls stay free to build, with metered pricing only above 1M calls a month.", M, 5.25, 7.1, 0.45, { fontSize: 9.5, color: C.grey2 });

  box(s, M, 5.8, 7.1, 1.1, C.greenT);
  label(s, "Is Intuit's expert network the moat? Yes.", M + 0.22, 5.92, 6.6, C.green);
  txt(s, "Agents can be copied. Thousands of CPAs already inside customers' books cannot. Every expert correction becomes a test case, so agents on IES get more accurate with each review.", M + 0.22, 6.2, 6.66, 0.65, { fontSize: 11, color: C.navy });

  const tx = 8.0, tw = W - M - tx;
  label(s, "Against the competition", tx, 1.65, tw, C.blueDk);
  table(s, [
    ["", "Today", "Headroom's edge"],
    ["NetSuite", "AI marketplace launched 2025. Long partner-led rollouts.", "Acts before the customer starts shopping"],
    ["SAP ByDesign", "Full ERP, heavy for under $100M.", "Set up in days, inside a tool they know"],
    ["Workday", "Strong for large firms. High cost.", "Priced for the mid-market"],
    ["AI-native ledgers", "Fast close. Thin ecosystem, no experts.", "Verified partners plus human CPAs"],
  ], tx, 1.95, tw, [1.15, 1.95, 1.63], { fontSize: 10, rowH: 0.78, boldFirst: true });
}

/* ---------------- 8. Metrics ---------------- */
{
  const s = base("How we will know it works",
    "Each metric has an exact definition and three bands. Green means scale up, amber means investigate, red means stop and fix.");
  const g = (t) => ({ text: t, options: { color: C.green, bold: true } });
  const a = (t) => ({ text: t, options: { color: C.amber, bold: true } });
  const r = (t) => ({ text: t, options: { color: C.red, bold: true } });
  const sec = (t) => ({ text: t, options: { color: C.blueDk, bold: true } });
  table(s, [
    ["Question", "Metric and exact definition", "Green", "Amber", "Red"],
    [sec("North Star"), "Triggered-company retention: share of IES companies with an urgent Radar signal that are still paying 12 months later", g("92%+"), a("85 to 92%"), r("Under 85%")],
    [sec("Do they act?"), "Signal resolution: share of urgent signals fixed (setting on or agent installed) within 30 days", g("50%+"), a("30 to 50%"), r("Under 30%")],
    [sec("Is it faster?"), "Median business days to close for companies running 2+ agents, over the last 3 closes", g("4 or less"), a("5 to 6"), r("Over 6")],
    [sec("Do they trust it?"), "Approval rate: share of agent entries approved without edits, per agent, rolling 30 days", g("95%+"), a("90 to 95%"), r("Under 90%, back to L1")],
    [sec("Are experts fast?"), "Median time from escalation to expert answer, business hours", g("2h or less"), a("2 to 6h"), r("Over 6h")],
    [sec("Do developers ship?"), "Share of new developers who pass certification within 90 days of sign-up", g("25%+"), a("10 to 25%"), r("Under 10%")],
    [sec("Do agents sell?"), "Paying companies per verified agent in its first 90 days", g("40+"), a("15 to 40"), r("Under 15")],
    [sec("Is the loop closing?"), "Share of new agent installs that started from a Radar signal", g("40%+"), a("20 to 40%"), r("Under 20%")],
  ], M, 1.65, CW, [1.8, 6.13, 1.2, 1.3, 1.7], { fontSize: 10.5, rowH: 0.52 });
}

/* ---------------- 9. Roadmap ---------------- */
{
  const s = base("Roadmap: prove it keeps customers, then open it up",
    "Each phase has a gate. We move on only when the success criteria are met.");
  const ph = [
    ["Now to 6 months", "Prove Radar keeps customers", ["Radar with 10 triggers", "Fixes use IES settings and Intuit agents only", "Expert review for Intuit agents", "Pilot with 300 IES companies"],
     "40%+ of urgent signals fixed in 30 days. Churn 25% lower than a matched control group."],
    ["6 to 18 months", "Open the verified store", ["Verified levels L1 and L2", "Agent Studio, sandbox and demand board", "25 launch partners picked from top demand", "15% revenue share, billed by Intuit"],
     "60 verified agents. 95%+ approval rate. 20%+ of Radar fixes come from partners."],
    ["18 to 36 months", "Scale the ecosystem", ["L3 autonomy for proven agents", "Experts from accounting firms join the network", "UK, Canada and Australia", "Industry packs and metered API"],
     "Triggered-company retention at 92%+. $20M+ a year from the store and expert services."],
  ];
  const pw = (CW - 2 * 0.25) / 3;
  ph.forEach((p, i) => {
    const x = M + i * (pw + 0.25);
    box(s, x, 1.65, pw, 2.95, i === 0 ? C.tint : C.tint2);
    label(s, p[0], x + 0.22, 1.8, pw - 0.4, C.blueDk);
    txt(s, p[1], x + 0.22, 2.08, pw - 0.4, 0.35, { fontSize: 14, bold: true, color: C.navy });
    s.addText(p[2].map((t, j) => ({ text: t, options: { bullet: { indent: 12 }, breakLine: j < p[2].length - 1, paraSpaceAfter: 3 } })),
      { x: x + 0.22, y: 2.48, w: pw - 0.4, h: 1.2, fontFace: F, fontSize: 10.5, color: C.ink, margin: 0, valign: "top", isTextBox: true });
    box(s, x + 0.15, 3.72, pw - 0.3, 0.78, C.white, C.line);
    txt(s, [{ text: "Gate: ", options: { bold: true, color: C.green } }, { text: p[3], options: { color: C.ink } }], x + 0.28, 3.79, pw - 0.56, 0.66, { fontSize: 10 });
  });

  label(s, "Riskiest assumptions and the fastest way to test them", M, 4.8, CW, C.blueDk);
  table(s, [
    ["If this is wrong, Headroom fails", "Test", "Pass mark"],
    ["CFOs will act on a warning from Radar", "Analysts send hand-built Radar reports to 50 companies that just hit a trigger", "30% book a fix in 2 weeks"],
    ["CFOs will let a partner agent propose ledger entries", "Fake-door Install button in the store, then 20 companies in shadow mode", "10% click, 70% keep it"],
    ["Developers will build for IES demand", "Share 5 real demand cards with 100 App Partner Program developers", "15 start building in 30 days"],
  ], M, 5.08, CW, [3.7, 5.83, 2.6], { fontSize: 10.5, rowH: 0.43 });
}

/* ---------------- 10. Risks, edge cases, trade-offs ---------------- */
{
  const s = base("Risks, edge cases and trade-offs",
    "What could go wrong, what the product has to handle, and what I gave up on purpose.");
  const cw3 = 3.95;
  // Risks table
  label(s, "Risks and how we reduce them", M, 1.6, 7.9, C.blueDk);
  table(s, [
    ["Risk", "How we reduce it"],
    ["AI gets a number wrong", "Every figure must cite a source record. Writes are propose-only. Live accuracy under 98% drops the agent to read-only."],
    ["Liability and compliance", "A person approves every posting. Tax, covenant and audit items need expert sign-off. Full log for auditors. Partners at L2+ carry insurance."],
    ["Data privacy", "Agents run inside Intuit with scoped access and no export. Demand board shows groups of 50+ companies only."],
    ["Accounting firms see a threat", "Firms can join as experts or publish their own agents and earn from both."],
    ["Empty store at launch", "Intuit builds the first 10 agents from top demand. Launch partners get grants and early placement."],
  ], M, 1.9, 7.9, [2.1, 5.8], { fontSize: 10, rowH: 0.56, boldFirst: true });

  const rx = 8.8, rw = W - M - rx;
  label(s, "Edge cases", rx, 1.6, rw, C.blueDk);
  s.addText([
    "Two agents try to post the same entry: one owner per account, the store blocks overlaps.",
    "A partner shuts down: schedules and history stay in IES and Radar suggests a replacement.",
    "The company shrinks or sells an entity: Radar handles it and pauses billing.",
    "The client's own accountant disagrees with the Intuit expert: the client's firm decides and the note is logged.",
  ].map((t, j, arr) => ({ text: t, options: { bullet: { indent: 12 }, breakLine: j < arr.length - 1, paraSpaceAfter: 5 } })),
    { x: rx, y: 1.9, w: rw, h: 2.4, fontFace: F, fontSize: 10.5, color: C.ink, margin: 0, valign: "top", isTextBox: true });

  label(s, "Trade-offs I chose", rx, 4.4, rw, C.blueDk);
  s.addText([
    ["Safety over speed. ", "Agents start at approval-only, so the first wow moment is slower."],
    ["Curated over open. ", "Verification limits early supply but protects trust."],
    ["Free Radar. ", "Less direct revenue, more retention."],
    ["15% share. ", "Lower take rate to pull developers from NetSuite."],
  ].flatMap((t, j, arr) => [
    { text: t[0], options: { bold: true, color: C.navy, bullet: { indent: 12 } } },
    { text: t[1], options: { color: C.ink, breakLine: j < arr.length - 1, paraSpaceAfter: 4 } }]),
    { x: rx, y: 4.7, w: rw, h: 2.2, fontFace: F, fontSize: 10.5, margin: 0, valign: "top", isTextBox: true });

  box(s, M, 5.45, 7.9, 1.15, C.amberT);
  label(s, "Key assumptions (Intuit does not publish these)", M + 0.22, 5.57, 7.4, C.amber);
  txt(s, "About 20,000 IES companies by 2027 at about $25k a year each. 30% hit a major trigger each year and churn at 20% today. 30% install a paid agent by year 3, at 1.5 agents and $9k a year each. An expert review takes about 15 minutes.", M + 0.22, 5.85, 7.46, 1.0, { fontSize: 10.5, color: C.navy });
}

pres.writeFile({ fileName: OUT }).then(f => console.log("wrote", f));
