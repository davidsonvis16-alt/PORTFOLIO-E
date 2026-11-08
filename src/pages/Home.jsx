import { Link } from "react-router-dom";
import { AD_CAMPAIGNS, AD_TIERS, CASE_META, CASE_STUDIES, FACTS, LOCATION, OFFER_ENDS, PLACEHOLDER, PRICING_TIERS, adSrc, waLink } from "../data";
import { Contact, PriceRows, Steps } from "../blocks";
import { Placeholder, SecHead } from "../ui";

/* One 12-column grid throughout. Each section sets its content at a
   different width and offset; the screenshots and posters are the only
   colour besides the blue. */
function Hero() {
  return (
    <section className="wrap hero" aria-labelledby="hero-title">
      <p className="hero-meta rise">
        <span>Websites &amp; ad campaigns</span>
        <span>{LOCATION}</span>
        <span>End-of-year prices until {OFFER_ENDS}</span>
      </p>
      <h1 id="hero-title" className="hero-title rise">
        Websites and ads for shops, cafés and restaurants<span className="dot">.</span>
      </h1>
      <div className="hero-foot rise">
        <p className="hero-copy">
          I design and build websites that load on three bars of signal, and the posters and video ads that send customers to them. Fixed prices in shillings, M-Pesa built in, hosting free. One person from the first message to launch.
        </p>
        <div className="hero-acts">
          <Link to="/work" className="act">
            See the work <span aria-hidden="true">→</span>
          </Link>
          <a href={waLink("Hi Eden, I'd like to start a project.")} target="_blank" rel="noopener noreferrer" className="act act-quiet">
            Start on WhatsApp <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <dl className="facts rise">
        {FACTS.map((f) => (
          <div key={f.label}>
            <dt>{f.value}</dt>
            <dd>{f.label}</dd>
          </div>
        ))}
        <div>
          <dt>KSh {PRICING_TIERS[0].price}</dt>
          <dd>for a landing page, until {OFFER_ENDS}</dd>
        </div>
      </dl>
    </section>
  );
}

function Case({ s, flip }) {
  const meta = CASE_META[s.client] ?? {};
  const spec = Object.fromEntries(s.spec);
  return (
    <article className={`case ${flip ? "is-flip" : ""}`} aria-labelledby={`case-${s.n}`} data-reveal>
      <a href={s.demo} target="_blank" rel="noopener noreferrer" className="case-shot" tabIndex={-1} aria-hidden="true">
        <img src={s.img} alt="" width="1152" height="720" loading="lazy" decoding="async" />
      </a>
      <div className="case-text">
        <span className="idx">
          {s.n} — {meta.sector}, {meta.location === PLACEHOLDER ? <Placeholder what="location" /> : meta.location}
        </span>
        <h3 id={`case-${s.n}`} className="case-title">
          {s.client}
        </h3>
        <p>{s.need}</p>
        <dl className="case-meta">
          <div>
            <dt>Scope</dt>
            <dd>{spec.SCOPE}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>{spec.STACK}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{spec.STATUS}</dd>
          </div>
          <div>
            <dt>Results</dt>
            <dd>
              <Placeholder what="not measured yet" />
            </dd>
          </div>
        </dl>
        <a href={s.demo} target="_blank" rel="noopener noreferrer" className="act">
          {s.domain} <span aria-hidden="true">↗</span>
          <span className="sr">(opens in a new tab)</span>
        </a>
      </div>
    </article>
  );
}

function ClientWork() {
  return (
    <section id="work" className="wrap sec" aria-labelledby="work-title">
      <SecHead n="01" title="Client work" id="work-title" note="Live, and used every day by the people they were built for." />
      <div className="cases">
        {CASE_STUDIES.map((s, i) => (
          <Case key={s.n} s={s} flip={i % 2 === 1} />
        ))}
      </div>
      <div className="sec-end">
        <p>Plus {FACTS[1].value} sites I built on my own — restaurants, shops, a florist, a tattoo studio.</p>
        <Link to="/work" className="act">
          All work <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

function Ads() {
  return (
    <section className="wrap sec" aria-labelledby="ads-title">
      <SecHead n="02" title="Ad campaigns" id="ads-title" note="Six concept brands, not clients. Posters with a price and a number to call, and voiced video ads for Reels and TikTok." />
      <ul className="covers">
        {AD_CAMPAIGNS.map((c) => (
          <li key={c.key} data-reveal>
            <Link to={`/ads#${c.key}`} className="cover">
              <span className="cover-img">
                <img src={adSrc(c.key, c.cover, true)} alt="" width="640" height="800" loading="lazy" decoding="async" />
              </span>
              <b>{c.name}</b>
              <span>{c.sector.split(" · ")[0]}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="sec-end">
        <p>Ad design from KSh {AD_TIERS[0].price} a poster, or a whole campaign at once.</p>
        <Link to="/ads" className="act">
          All ads <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

function Prices() {
  return (
    <section className="wrap sec" aria-labelledby="prices-title">
      <SecHead n="03" title="Prices" id="prices-title" note={`End-of-year prices until ${OFFER_ENDS}. Hosting is free on every plan.`} />
      <PriceRows />
      <div className="sec-end">
        <p>Bigger project? Marketplaces, accounts, bookings — scoped together and priced to the job.</p>
        <Link to="/rates" className="act">
          All prices <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="wrap sec" aria-labelledby="how-title">
      <SecHead n="04" title="How it works" id="how-title" note="Two payments, no surprises." />
      <Steps />
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <ClientWork />
      <Ads />
      <Prices />
      <HowItWorks />
      <Contact />
    </>
  );
}
