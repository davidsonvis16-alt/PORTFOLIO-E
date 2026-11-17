import { Link } from "react-router-dom";
import { waLink } from "../data";

/* The client area: domain renewals, maintenance dates and invoices in one
   place. Sign-in is not switched on yet (it needs the accounts database), so
   the form is shown disabled and WhatsApp is offered meanwhile. */
export default function Login() {
  return (
    <>
      <section className="wrap page-top" aria-labelledby="login-title">
        <span className="idx rise">Client area</span>
        <h1 id="login-title" className="page-title rise">
          Log in<span className="dot">.</span>
        </h1>
        <p className="page-sub rise">See your sites, domain renewal and maintenance dates, and pay invoices — with reminders before anything is due.</p>
      </section>
      <section className="wrap pay">
        <form className="form login-form" onSubmit={(e) => e.preventDefault()} aria-describedby="login-soon">
          <label className="form-wide">
            <span>Your email</span>
            <input type="email" disabled placeholder="you@business.co.ke" />
          </label>
          <div className="form-end">
            <button type="submit" className="act act-solid" disabled>
              Send me a sign-in link <span aria-hidden="true">→</span>
            </button>
          </div>
          <p id="login-soon" className="login-soon form-wide">
            Client sign-in opens soon. Until then, ask us anything about your site on WhatsApp, or <Link to="/pay" className="ulink">pay an invoice</Link>.
          </p>
        </form>
        <aside className="pay-side">
          <p className="pay-side-k">For clients</p>
          <p className="cart-note">One sign-in shows every site we look after for you: when the domain renews, when maintenance is due, and what's been paid.</p>
          <a href={waLink("Hi Tessy, I'm a client and need help with my site.")} target="_blank" rel="noopener noreferrer" className="act act-solid">
            WhatsApp us <span aria-hidden="true">↗</span>
          </a>
        </aside>
      </section>
    </>
  );
}
