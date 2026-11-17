import { AD_TIERS, EMAIL, INSTAGRAM, LOCATION, PAY_STEPS, PRICING_TIERS, waLink } from "./data";
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
            Tell us what you need built.
          </h2>
          <p className="contact-copy">WhatsApp is fastest, during working hours, East Africa time. Wherever you are in Kenya, you get a fixed price before any work starts.</p>
        </div>
        <div className="contact-side">
          <a href={waLink("Hi Tess, I'd like to talk about a project.")} target="_blank" rel="noopener noreferrer" className="contact-big">
            +254 142 614 743 <span aria-hidden="true">↗</span>
            <span className="sr">on WhatsApp (opens in a new tab)</span>
          </a>
          <dl className="contact-list">
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${EMAIL}`} className="ulink">
                  {EMAIL}
                </a>
              </dd>
            </div>
            <div>
              <dt>Instagram</dt>
              <dd>
                <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="ulink">
                  @vinn_y.codr <span aria-hidden="true">↗</span>
                </a>
              </dd>
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
