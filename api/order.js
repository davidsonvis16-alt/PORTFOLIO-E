/* Order form → email, through Resend. Runs at /api/order on Vercel.
   Same environment variables as api/contact.js: RESEND_API_KEY, CONTACT_TO
   and optionally CONTACT_FROM. Package names and prices are looked up here
   from the site's own data, never trusted from the browser. */
import { PACKAGES, STYLES } from "../src/data.js";

const clean = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const escape = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
const isPhone = (s) => /^\+?[0-9 ()-]{7,20}$/.test(s);
const isHex = (s) => /^#[0-9a-f]{6}$/i.test(s);
const ksh = (n) => `KSh ${n.toLocaleString("en-US")}`;

const MAX_FILES = 3;
const MAX_FILE_B64 = 2.1 * 1024 * 1024; // ≈1.5 MB of image once encoded

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Use POST." });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key || !process.env.CONTACT_TO) return res.status(503).json({ error: "Email orders are not switched on yet." });

  const b = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  if (clean(b.company, 100)) return res.status(200).json({ ok: true });

  const items = (Array.isArray(b.items) ? b.items : [])
    .map((it) => ({ pkg: PACKAGES.find((p) => p.key === it?.key), qty: Math.max(1, Math.min(20, Number(it?.qty) || 1)) }))
    .filter((it) => it.pkg)
    .slice(0, 20);

  const name = clean(b.name, 80);
  const phone = clean(b.phone, 20);
  const email = clean(b.email, 120);
  const business = clean(b.business, 80);

  if (!items.length) return res.status(400).json({ error: "Pick at least one package." });
  if (!name || !business) return res.status(400).json({ error: "Add your name and the business name." });
  if (!isPhone(phone)) return res.status(400).json({ error: "Add a phone number we can reach on WhatsApp." });
  if (email && !isEmail(email)) return res.status(400).json({ error: "That email does not look right." });

  const style = STYLES.find((s) => s.key === b.style)?.name || "Not chosen";
  const colours = b.logoColours ? "Use the logo's colours" : (Array.isArray(b.colours) ? b.colours : []).filter(isHex).slice(0, 3).join(", ") || "Not given";
  const startFrom = clean(b.startFrom, 80);
  const references = clean(b.references, 1500);
  const details = clean(b.details, 3000);
  const deadline = clean(b.deadline, 40);

  const files = (Array.isArray(b.files) ? b.files : [])
    .filter((x) => x && typeof x.data === "string" && /^image\//.test(x.type || "") && x.data.length <= MAX_FILE_B64)
    .slice(0, MAX_FILES)
    .map((x) => ({ filename: clean(x.name, 100) || "image", content: x.data }));

  const priced = items.filter((it) => it.pkg.from != null);
  const total = priced.reduce((n, it) => n + it.pkg.from * it.qty, 0);
  const price = (p) => (p.from == null ? "Quoted" : `from ${ksh(p.from)}${p.unit ? ` ${p.unit}` : ""}`);

  const rows = [
    ["Business", business],
    ["Name", name],
    ["Phone", phone],
    ["Email", email || "—"],
    ["Look", style],
    ["Start from", startFrom || "Fresh"],
    ["Colours", colours],
    ["Deadline", deadline || "—"],
    ["References", references || "—"],
    ["What it must do", details || "—"],
  ];

  const html = `
    <h2 style="margin:0 0 12px">New order — ${escape(business)}</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      ${items.map((it) => `<tr><td>${escape(it.pkg.name)}${it.qty > 1 ? ` × ${it.qty}` : ""}</td><td>${escape(price(it.pkg))}</td></tr>`).join("")}
      <tr><td><b>Starting from</b></td><td><b>${escape(ksh(total))}</b>${items.some((it) => it.pkg.from == null) ? " + quoted items" : ""}</td></tr>
    </table>
    <table cellpadding="6" style="border-collapse:collapse;margin-top:16px">
      ${rows.map(([k, v]) => `<tr><td style="color:#5c5c5c;vertical-align:top">${k}</td><td style="white-space:pre-wrap">${escape(v)}</td></tr>`).join("")}
    </table>
    ${files.length ? `<p>${files.length} image${files.length > 1 ? "s" : ""} attached.</p>` : ""}`;

  const text = [
    `New order — ${business}`,
    ...items.map((it) => `• ${it.pkg.name}${it.qty > 1 ? ` × ${it.qty}` : ""} — ${price(it.pkg)}`),
    `Starting from ${ksh(total)}`,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
  ].join("\n");

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || "Tessy <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO],
      subject: `New order: ${items.map((it) => it.pkg.name).join(", ")} — ${business}`.slice(0, 180),
      html,
      text,
      ...(email ? { reply_to: email } : {}),
      ...(files.length ? { attachments: files } : {}),
    }),
  });

  if (!r.ok) {
    console.error("[order] Resend refused the message", r.status, await r.text());
    return res.status(502).json({ error: "The order did not go through by email." });
  }
  return res.status(200).json({ ok: true });
}
