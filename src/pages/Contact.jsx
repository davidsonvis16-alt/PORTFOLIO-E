import { useState } from "react";
import { EMAIL, LOCATION, waLink } from "../data";

const WAYS = [
  { k: "Fastest — usually a reply within a couple of hours", name: "WhatsApp", value: "+254 142 614 743", href: waLink("Hi Tessy, I'd like to talk about a project."), tone: "t-green" },
  { k: "For quotes, documents and anything long", name: "Email", value: EMAIL, href: `mailto:${EMAIL}`, tone: "t-lilac" },
].filter((w) => w.value);

const NEEDS = ["Website", "App", "Tools & automation", "Ads", "Something else"];

/* The form posts to /api/contact, which emails it to us through Resend.
   If that fails for any reason, WhatsApp is offered instead. */
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
        <p>We'll reply within a working day. If it's urgent, WhatsApp is faster.</p>
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
            <a href={waLink("Hi Tessy, I tried the form on your site.")} target="_blank" rel="noopener noreferrer" className="ulink">
              Message us on WhatsApp ↗
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
        <p className="page-sub rise">Tell us what you need built. WhatsApp is fastest, during working hours, East Africa time — wherever you are in Kenya.</p>
      </section>

      <section className="wrap contact-page">
        <ul className="ways">
          {WAYS.map((w) => (
            <li key={w.name}>
              <a href={w.href} className={`way ${w.tone}`} {...(w.href.startsWith("mailto") ? {} : { target: "_blank", rel: "noopener noreferrer" })}>
                <span className="way-k">{w.k}</span>
                <b>{w.name}</b>
                <span className="way-v">{w.value} ↗</span>
              </a>
            </li>
          ))}
        </ul>
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
