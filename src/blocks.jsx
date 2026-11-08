import { AD_TIERS, EMAIL, INSTAGRAM, LOCATION, PAY_STEPS, PRICING_TIERS, waLink } from "./data";
import { SecHead } from "./ui";

/* Sections shared by more than one page. */
export function PriceRows() {
  return (
    <ol className="prices">
      {PRICING_TIERS.map((t) => (
        <li key={t.key} className="price" data-reveal>
          <h3 className="price-name">{t.name}</h3>
          <p className="price-blurb">{t.blurb}</p>
          <ul className="price-feats">
            {t.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p className="price-cost">
            <span className="price-from">{t.from ? "from" : " "}</span>
            <b>KSh {t.price}</b>
            {t.was && <s>KSh {t.was}</s>}
            <span className="price-month">+ KSh {t.monthly} a month upkeep</span>
          </p>
        </li>
      ))}
    </ol>
  );
}

export function Steps() {
  return (
    <ol className="steps">
      {PAY_STEPS.map((s) => (
        <li key={s.n} data-reveal>
          <span className="idx">{s.n}</span>
          <h3>{s.title}</h3>
          <p>{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function Contact({ n = "05" }) {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="wrap sec">
        <SecHead n={n} title="Contact" />
        <div className="contact-main">
          <h2 id="contact-title" className="contact-title">
            Tell me what the business needs<span className="dot">.</span>
          </h2>
          <p className="contact-copy">WhatsApp is fastest, during working hours, Nairobi time. You get a fixed price before any work starts.</p>
          <a href={waLink("Hi Eden, I'd like to talk about a project.")} target="_blank" rel="noopener noreferrer" className="contact-big">
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

export function AdRows() {
  return (
    <ol className="prices">
      {AD_TIERS.map((t) => (
        <li key={t.key} className="price">
          <h3 className="price-name">{t.name}</h3>
          <p className="price-blurb">{t.blurb}</p>
          <ul className="price-feats">
            {t.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p className="price-cost">
            <b>KSh {t.price}</b>
            {t.was && <s>KSh {t.was}</s>}
            <span className="price-month">{t.unit}</span>
          </p>
        </li>
      ))}
    </ol>
  );
}
