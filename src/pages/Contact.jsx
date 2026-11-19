import { useState } from "react";
import { EMAIL, LOCATION, mailLink } from "../data";

/* Email works with or without a mail app: the link opens one if there is
   one, and the copy button puts the address on the clipboard either way. */
function EmailCard() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className="way t-blue">
      <span className="way-k">The best way to reach us — a reply within a working day</span>
      <b>Email</b>
      <span className="way-v">
        <a href={mailLink("Hi Tessy, I'd like to talk about a project.")} className="ulink">
          {EMAIL}
        </a>
      </span>
      <button type="button" className="act act-quiet way-copy" onClick={copy}>
        {copied ? "Copied ✓" : "Copy address"}
      </button>
    </div>
  );
}

/* Request a call: the number goes to us through the same form handler as
   the contact form, so it works without a mail app. */
function CallForm() {
  const [f, setF] = useState({ name: "", phone: "", when: "", company: "" });
  const [state, setState] = useState({ status: "idle", error: "" });
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault();
    setState({ status: "sending", error: "" });
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.name,
          reach: f.phone,
          need: "Call request",
          message: `Please call me on ${f.phone}.${f.when ? ` A good time: ${f.when}.` : ""}`,
          company: f.company,
        }),
      });
      const out = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(out.error || "The request did not go through.");
      setState({ status: "sent", error: "" });
    } catch (err) {
      setState({ status: "error", error: err.message });
    }
  };
  if (state.status === "sent") {
    return (
      <div id="call" className="way t-green" role="status">
        <b>We'll call you.</b>
        <span className="way-k">Usually within a working day, at the time you gave.</span>
      </div>
    );
  }
  return (
    <form id="call" className="way t-green form call-form" onSubmit={submit}>
      <span className="way-k form-wide">Rather talk? Leave your number and we'll ring you.</span>
      <b className="form-wide">Request a call</b>
      <label>
        <span>Your name</span>
        <input value={f.name} onChange={set("name")} required maxLength={80} autoComplete="name" />
      </label>
      <label>
        <span>Phone</span>
        <input value={f.phone} onChange={set("phone")} required maxLength={20} inputMode="tel" autoComplete="tel" placeholder="07… or +254…" />
      </label>
      <label className="form-wide">
        <span>A good time to call (optional)</span>
        <input value={f.when} onChange={set("when")} maxLength={60} placeholder="e.g. weekdays after 5pm" />
      </label>
      <label className="form-trap" aria-hidden="true">
        Company
        <input value={f.company} onChange={set("company")} tabIndex={-1} autoComplete="off" />
      </label>
      <div className="form-end">
        <button type="submit" className="act act-solid" disabled={state.status === "sending"}>
          {state.status === "sending" ? "Sending…" : "Call me"} <span aria-hidden="true">→</span>
        </button>
        {state.error && (
          <p className="form-error" role="alert">
            {state.error} Email us at {EMAIL} instead.
          </p>
        )}
      </div>
    </form>
  );
}

const NEEDS = ["Website", "App", "Tools & automation", "Ads", "Something else"];

/* The form posts to /api/contact, which emails it to us through Resend.
   If that fails for any reason, email is offered instead. */
function ContactForm() {
  const [state, setState] = useState({ status: "idle", error: "" });
  const [need, setNeed] = useState(NEEDS[0]);

  const submit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setState({ status: "sending", error: "" });
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, need }),
      });
      const out = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(out.error || "The message did not go through.");
      setState({ status: "sent", error: "" });
    } catch (err) {
      setState({ status: "error", error: err.message });
    }
  };

  if (state.status === "sent") {
    return (
      <div className="form-done t-pink" role="status">
        <b>Thanks — it's with us.</b>
        <p>We'll reply within a working day.</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit}>
      <fieldset className="form-needs">
        <legend>What do you need?</legend>
        {NEEDS.map((n) => (
          <button key={n} type="button" className="pill-link" aria-pressed={need === n} onClick={() => setNeed(n)}>
            {n}
          </button>
        ))}
      </fieldset>
      <label>
        <span>Your name</span>
        <input name="name" required maxLength={80} autoComplete="name" />
      </label>
      <label>
        <span>Email or phone, so we can reply</span>
        <input name="reach" required maxLength={120} autoComplete="email" />
      </label>
      <label className="form-wide">
        <span>Tell us about it</span>
        <textarea name="message" required maxLength={3000} rows={5} placeholder="What the business does, what the site or app has to do, and when you need it." />
      </label>
      {/* Hidden from people; bots fill it in and get quietly ignored. */}
      <label className="form-trap" aria-hidden="true">
        Company
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="form-end">
        <button type="submit" className="act act-solid" disabled={state.status === "sending"}>
          {state.status === "sending" ? "Sending…" : "Send message"} <span aria-hidden="true">→</span>
        </button>
        {state.status === "error" && (
          <p className="form-error" role="alert">
            {state.error}{" "}
            <a href={mailLink("Hi Tessy, I tried the form on your site.")} target="_blank" rel="noopener noreferrer" className="ulink">
              Email us ↗
            </a>
          </p>
        )}
      </div>
    </form>
  );
}

export default function Contact() {
  return (
    <>
      <section className="wrap page-top" aria-labelledby="contact-page-title">
        <span className="idx rise">{LOCATION}</span>
        <h1 id="contact-page-title" className="page-title rise">
          Contact<span className="dot">.</span>
        </h1>
        <p className="page-sub rise">Email, form or call. Reply within a working day.</p>
      </section>

      <section className="wrap contact-page">
        <div className="ways">
          <EmailCard />
          <CallForm />
        </div>
        <div className="contact-form">
          <h2 className="band-title">
            Or write to us<span className="dot">.</span>
          </h2>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
