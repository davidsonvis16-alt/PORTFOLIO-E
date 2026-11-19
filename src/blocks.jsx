import { AD_TIERS, EMAIL, LOCATION, PAY_STEPS, PRICING_TIERS, mailLink } from "./data";
import { Link } from "react-router-dom";
import { SecHead } from "./ui";

/* Sections shared by more than one page. */

/* Price cards: the price leads, then the name, the line, what's in it.
   Each tier is its own tone and height; the middle one is the biggest. */
const PRICE_TONES = ["t-lilac", "t-blue", "t-ink"];

export function PriceRows() {
  return (
    <ol className="prices">
      {PRICING_TIERS.map((t, i) => (
        <li key={t.key} className={`price ${PRICE_TONES[i % PRICE_TONES.length]}${t.featured ? " is-featured" : ""}`} data-reveal>
          <p className="price-cost">
            <span className="price-from">{t.from ? "from" : " "}</span>
            <b>KSh {t.price}</b>
            {t.was && <s>KSh {t.was}</s>}
          </p>
          <h3 className="price-name">
            {t.name}
            {t.tag && <span className="price-tag">{t.tag}</span>}
          </h3>
          <p className="price-blurb">{t.blurb}</p>
          <ul className="price-feats">
            {t.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p className="price-month">+ KSh {t.monthly} a month upkeep</p>
        </li>
      ))}
    </ol>
  );
}

/* The steps climb like a staircase, each card a step higher than the last. */
const STEP_TONES = ["t-pink", "t-lilac", "t-green", "t-tomato"];

export function Steps() {
  return (
    <ol className="steps">
      {PAY_STEPS.map((s, i) => (
        <li key={s.n} className={STEP_TONES[i % STEP_TONES.length]} data-reveal>
          <span className="step-n">{s.n}</span>
          <h3>{s.title}</h3>
          <p>{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

/* Contact as one big card: the ask on the left, the ways to reach us on the right. */
export function Contact({ n = "05" }) {
  return (
    <section id="contact" className="wrap contact" aria-labelledby="contact-title">
      <div className="contact-card t-blue">
        <SecHead n={n} title="Contact" />
        <div className="contact-main">
          <h2 id="contact-title" className="contact-title">
            Tell us what you need built<span className="dot">.</span>
          </h2>
          <p className="contact-copy">Reply within a working day.</p>
          <Link to="/contact" className="act contact-write">
            Or write to us <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="contact-side">
          <a href={mailLink("Hi Tessy, I'd like to talk about a project.")} className="contact-big">
            {EMAIL} <span aria-hidden="true">↗</span>
            <span className="sr">(opens your email)</span>
          </a>
          <dl className="contact-list">
            <div>
              <dt>Want a call?</dt>
              <dd>
                <Link to="/contact#call" className="ulink">
                  Request a call — leave your number
                </Link>
              </dd>
            </div>
            <div>
              <dt>Hours</dt>
              <dd>Working hours, East Africa time</dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>{LOCATION}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

const AD_TONES = ["t-pink", "t-tomato", "t-green", "t-lilac"];

export function AdRows() {
  return (
    <ol className="prices">
      {AD_TIERS.map((t, i) => (
        <li key={t.key} className={`price ${AD_TONES[i % AD_TONES.length]}`} data-reveal>
          <p className="price-cost">
            <span className="price-from">{" "}</span>
            <b>KSh {t.price}</b>
            {t.was && <s>KSh {t.was}</s>}
          </p>
          <h3 className="price-name">{t.name}</h3>
          <p className="price-blurb">{t.blurb}</p>
          <ul className="price-feats">
            {t.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p className="price-month">{t.unit}</p>
        </li>
      ))}
    </ol>
  );
}
