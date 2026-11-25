import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { mailLink } from "../data";
import { PayMethods, BlockText } from "../ui";

const POLL_MS = 4000;
const POLL_FOR_MS = 2.5 * 60 * 1000;

/* Paying a quote or invoice. M-Pesa sends a prompt straight to the phone
   (enter the PIN, done); "card or other" opens Paystack's own checkout. The
   page checks with Paystack until the payment succeeds or fails. */
export default function Pay() {
  const [params] = useSearchParams();
  const [method, setMethod] = useState("mpesa");
  const [f, setF] = useState({ amount: params.get("amount") || "", ref: params.get("ref") || "", phone: "", email: "" });
  const [state, setState] = useState(params.get("done") ? { status: "checking", reference: params.get("reference") || params.get("trxref") } : { status: "idle" });
  const started = useRef(0);
  const set = (k) => (e) => setF((prev) => ({ ...prev, [k]: e.target.value }));

  // Ask Paystack how the payment went, every few seconds, for a while.
  useEffect(() => {
    if (!["waiting", "checking"].includes(state.status) || !state.reference) return;
    if (!started.current) started.current = Date.now();
    const t = setTimeout(async () => {
      try {
        const r = await fetch(`/api/pay?reference=${encodeURIComponent(state.reference)}`);
        const out = await r.json();
        if (out.status === "success") return setState({ status: "paid", reference: state.reference });
        if (out.status === "failed") return setState({ status: "error", error: out.message || "The payment did not go through." });
        if (Date.now() - started.current > POLL_FOR_MS) return setState({ status: "error", error: "We didn't hear back from M-Pesa. If money left your account, email us the M-Pesa message at hello@tessy.co.ke." });
        setState((s) => ({ ...s }));
      } catch {
        setState((s) => ({ ...s }));
      }
    }, POLL_MS);
    return () => clearTimeout(t);
  }, [state]);

  const submit = async (e) => {
    e.preventDefault();
    started.current = 0;
    setState({ status: "sending" });
    try {
      const r = await fetch("/api/pay", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...f, method }) });
      const out = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(out.error || "Payment could not start.");
      if (method === "checkout") return window.location.assign(out.url);
      setState({ status: "waiting", reference: out.reference, message: out.message });
    } catch (err) {
      setState({ status: "error", error: err.message });
    }
  };

  return (
    <>
      <section className="wrap page-top has-art" aria-labelledby="pay-title">
        <span className="idx rise">Secured by Paystack</span>
        <h1 id="pay-title" className="page-title rise">
          <BlockText text="Pay" />
        </h1>
        <img className="page-art page-photo rise" src="/work/pages/pay.jpg" alt="A laptop on a desk lit by a warm strip light" width="900" height="900" decoding="async" />
        <p className="page-sub rise">Deposit or invoice. Enter your M-Pesa PIN, done.</p>
      </section>

      <section className="wrap pay">
        {state.status === "paid" ? (
          <div className="form-done t-green" role="status">
            <b>Paid — thank you.</b>
            <p>Your receipt is on its way to your email. We'll confirm by email and get started.</p>
          </div>
        ) : ["waiting", "checking"].includes(state.status) ? (
          <div className="form-done t-lilac" role="status" aria-live="polite">
            <b>{state.status === "waiting" ? "Check your phone." : "Checking your payment…"}</b>
            <p>{state.status === "waiting" ? state.message || "Enter your M-Pesa PIN on the prompt. This page updates by itself." : "One moment while Paystack confirms it."}</p>
            <span className="pay-spin" aria-hidden="true" />
          </div>
        ) : (
          <form className="form pay-form" onSubmit={submit}>
            <fieldset className="form-wide form-needs">
              <legend>How do you want to pay?</legend>
              <button type="button" className="pill-link" aria-pressed={method === "mpesa"} onClick={() => setMethod("mpesa")}>
                M-Pesa prompt
              </button>
              <button type="button" className="pill-link" aria-pressed={method === "checkout"} onClick={() => setMethod("checkout")}>
                Card or other
              </button>
            </fieldset>
            <label>
              <span>Amount (KSh)</span>
              <input value={f.amount} onChange={set("amount")} required inputMode="numeric" pattern="[0-9]*" placeholder="e.g. 20400" />
            </label>
            <label>
              <span>What it's for</span>
              <input value={f.ref} onChange={set("ref")} maxLength={60} placeholder="e.g. Deposit — Mama's Kitchen site" />
            </label>
            {method === "mpesa" && (
              <label>
                <span>M-Pesa number</span>
                <input value={f.phone} onChange={set("phone")} required inputMode="tel" autoComplete="tel" placeholder="0712 345 678" />
              </label>
            )}
            <label>
              <span>Email for the receipt</span>
              <input type="email" value={f.email} onChange={set("email")} required autoComplete="email" />
            </label>
            <div className="form-end">
              <button type="submit" className="act act-solid" disabled={state.status === "sending"}>
                {state.status === "sending" ? "Starting…" : method === "mpesa" ? "Send the M-Pesa prompt" : "Go to secure checkout"} <span aria-hidden="true">→</span>
              </button>
              {state.status === "error" && (
                <p className="form-error" role="alert">
                  {state.error}{" "}
                  <a href={mailLink("Hi Tessy, I tried to pay on the site.")} target="_blank" rel="noopener noreferrer" className="ulink">
                    Email us ↗
                  </a>
                </p>
              )}
            </div>
          </form>
        )}
        <aside className="pay-side">
          <p className="pay-side-k">We accept</p>
          <PayMethods />
          <p className="cart-note">Only amounts we agreed. Card details go to Paystack, not us.</p>
        </aside>
      </section>
    </>
  );
}
