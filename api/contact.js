/* Contact form → email, sent through Resend (https://resend.com).
   Runs as a Vercel serverless function at /api/contact. Needs, in the
   Vercel project's environment variables:
     RESEND_API_KEY  — from resend.com → API Keys (never commit it)
     CONTACT_TO      — the inbox messages land in (required)
     CONTACT_FROM    — a sender on the domain verified in Resend; until a
                       domain is verified, Resend's own test sender works
                       (it only delivers to the Resend account's email) */

const LIMITS = { name: 80, reach: 120, need: 60, message: 3000 };
const NEEDS = ["Website", "App", "Tools & automation", "Ads", "Something else"];

const clean = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const escape = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
const isPhone = (s) => /^\+?[0-9 ()-]{7,20}$/.test(s);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Use POST." });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key || !process.env.CONTACT_TO) return res.status(503).json({ error: "The form is not switched on yet. Please use WhatsApp." });

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

  // Bots fill every field; people never see this one.
  if (clean(body.company, 100)) return res.status(200).json({ ok: true });

  const name = clean(body.name, LIMITS.name);
  const reach = clean(body.reach, LIMITS.reach);
  const need = NEEDS.includes(body.need) ? body.need : "Something else";
  const message = clean(body.message, LIMITS.message);

  if (!name || !message) return res.status(400).json({ error: "Add your name and a short message." });
  if (!isEmail(reach) && !isPhone(reach)) return res.status(400).json({ error: "Add an email or phone number we can reply to." });

  const html = `
    <p><b>${escape(name)}</b> — ${escape(reach)}</p>
    <p><b>Needs:</b> ${escape(need)}</p>
    <p style="white-space:pre-wrap">${escape(message)}</p>`;

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || "Tessy <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO],
      subject: `New enquiry: ${need} — ${name}`,
      html,
      text: `${name} — ${reach}\nNeeds: ${need}\n\n${message}`,
      ...(isEmail(reach) ? { reply_to: reach } : {}),
    }),
  });

  if (!r.ok) {
    console.error("[contact] Resend refused the message", r.status, await r.text());
    return res.status(502).json({ error: "The message did not go through. Please use WhatsApp." });
  }
  return res.status(200).json({ ok: true });
}
