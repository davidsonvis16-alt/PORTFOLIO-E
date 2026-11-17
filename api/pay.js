/* Payments through Paystack (https://paystack.com), at /api/pay on Vercel.

   POST { method: "mpesa", amount, phone, email, ref }
        → Paystack /charge with mobile_money, which sends an M-Pesa prompt
          (STK push) to the phone. Returns the reference to check.
   POST { method: "checkout", amount, email, ref }
        → Paystack /transaction/initialize. Returns the checkout URL, where
          the client can pay by card, M-Pesa or whatever the account offers.
   GET  ?reference=…
        → Paystack /transaction/verify. Returns "success", "failed" or
          "pending" — the page asks this until the prompt is answered.

   Needs PAYSTACK_SECRET_KEY in the Vercel project's environment variables
   (sk_test_… while testing, sk_live_… once Paystack approves the account).
   Amounts are whole shillings here and sent to Paystack in cents. */

const API = "https://api.paystack.co";
const MIN = 10;
const MAX = 1_000_000;

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
const clean = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/* 0712 345 678, 712345678, 254712345678 or +254712345678 → +254712345678 */
export function kenyanPhone(input) {
  const digits = String(input || "").replace(/\D/g, "");
  const local = digits.startsWith("254") ? digits.slice(3) : digits.startsWith("0") ? digits.slice(1) : digits;
  return /^[17]\d{8}$/.test(local) ? `+254${local}` : null;
}

async function paystack(path, key, body) {
  const r = await fetch(`${API}${path}`, {
    method: body ? "POST" : "GET",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const out = await r.json().catch(() => ({}));
  return { ok: r.ok && out.status !== false, out };
}

export default async function handler(req, res) {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) return res.status(503).json({ error: "Online payments are not switched on yet. Please pay by M-Pesa as agreed on WhatsApp." });

  if (req.method === "GET") {
    const reference = clean(req.query?.reference, 100);
    if (!/^[A-Za-z0-9_.=-]{6,100}$/.test(reference)) return res.status(400).json({ error: "Missing reference." });
    const { ok, out } = await paystack(`/transaction/verify/${encodeURIComponent(reference)}`, key);
    if (!ok) return res.status(200).json({ status: "pending" });
    const s = out.data?.status;
    return res.status(200).json({ status: s === "success" ? "success" : s === "failed" || s === "abandoned" || s === "reversed" ? "failed" : "pending", message: out.data?.gateway_response });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Use GET or POST." });
  }

  const b = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const amount = Math.round(Number(b.amount));
  const email = clean(b.email, 120);
  const ref = clean(b.ref, 60);

  if (!Number.isFinite(amount) || amount < MIN || amount > MAX) return res.status(400).json({ error: `Enter an amount between KSh ${MIN} and KSh ${MAX.toLocaleString("en-US")}.` });
  if (!isEmail(email)) return res.status(400).json({ error: "Add your email — Paystack sends the receipt there." });

  const metadata = { order_ref: ref || "—", custom_fields: [{ display_name: "For", variable_name: "for", value: ref || "—" }] };

  if (b.method === "mpesa") {
    const phone = kenyanPhone(b.phone);
    if (!phone) return res.status(400).json({ error: "Enter a Safaricom number, like 0712 345 678." });
    const { ok, out } = await paystack("/charge", key, {
      email,
      amount: amount * 100,
      currency: "KES",
      mobile_money: { phone, provider: "mpesa" },
      metadata,
    });
    if (!ok) return res.status(502).json({ error: out.message || "M-Pesa did not accept the request. Try again or use card." });
    return res.status(200).json({ reference: out.data?.reference, status: out.data?.status, message: out.data?.display_text || "Check your phone and enter your M-Pesa PIN." });
  }

  if (b.method === "checkout") {
    const origin = `https://${req.headers["x-forwarded-host"] || req.headers.host}`;
    const { ok, out } = await paystack("/transaction/initialize", key, {
      email,
      amount: amount * 100,
      currency: "KES",
      callback_url: `${origin}/pay?done=1`,
      metadata,
    });
    if (!ok) return res.status(502).json({ error: out.message || "Paystack is not available right now." });
    return res.status(200).json({ url: out.data?.authorization_url, reference: out.data?.reference });
  }

  return res.status(400).json({ error: "Choose M-Pesa or card." });
}
