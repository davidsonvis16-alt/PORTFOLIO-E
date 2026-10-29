import { AD_BUNDLE, AD_TERMS, AD_TIERS, OTHER_BUILDS, PAY_STEPS, PRICING_TIERS, waLink } from "./data";
import { Arrow, Check } from "./ui";

/* Every plan is a passenger ticket: fare band on top, a torn line, the details below. */
function Ticket({ n, name, featured, tag, children, foot }) {
  return (
    <article className={`ticket${featured ? " ticket-hot" : ""}`} data-reveal>
      <div className="ticket-band mono">
        <span>Fare {n}</span>
        <span>{tag}</span>
      </div>
      <div className="ticket-body">
        <h3 className="d-h3">{name}</h3>
        {children}
      </div>
      {foot && <div className="ticket-foot">{foot}</div>}
    </article>
  );
}

function Features({ items, missing = [] }) {
  return (
    <ul className="feats">
      {items.map((f) => (
        <li key={f}>
          <Check /> {f}
        </li>
      ))}
      {missing.map((f) => (
        <li key={f} className="is-missing">
          <span className="ic-dash" aria-hidden="true">–</span> {f}
        </li>
      ))}
    </ul>
  );
}

export function SitePlans() {
  return (
    <div className="tickets tickets-3">
      {PRICING_TIERS.map((t, i) => (
        <Ticket
          key={t.key}
          n={String(i + 1).padStart(2, "0")}
          name={t.name}
          featured={t.featured}
          tag={t.featured ? "Best fit for most shops" : t.tag}
          foot={
            OTHER_BUILDS.some((b) => b.tier === t.key) && (
              <>
                <span className="mono">Built at this level</span>
                {OTHER_BUILDS.filter((b) => b.tier === t.key).map((b) => b.title).join(", ")}
              </>
            )
          }
        >
          <p className="ticket-blurb">{t.blurb}</p>
          <div className="fare">
            {t.was && <s>KSh {t.was}</s>}
            <span className="fare-now">
              <small>{t.from ? "From KSh" : "KSh"}</small>
              {t.price}
            </span>
            <span className="fare-unit">+ KSh {t.monthly}/month maintenance</span>
          </div>
          <p className="perks mono">{t.perks.join(" · ")}</p>
          <a href={waLink(`Hi Eden, I'm interested in the ${t.name} at KSh ${t.price} (end-of-year offer). Can we discuss it?`)} target="_blank" rel="noopener noreferrer" className={`btn ${t.featured ? "btn-light" : "btn-blue"} btn-full`}>
            Ask about this <Arrow />
          </a>
          <dl className="split">
            <div>
              <dt>To start (60%)</dt>
              <dd>{t.from ? "from " : ""}KSh {t.split[0]}</dd>
            </div>
            <div>
              <dt>At launch (40%)</dt>
              <dd>{t.from ? "from " : ""}KSh {t.split[1]}</dd>
            </div>
            <div>
              <dt>Pay by</dt>
              <dd>{t.methods}</dd>
            </div>
          </dl>
          <p className="mono feats-kick">{t.plus.toLowerCase()}</p>
          <Features items={t.features} missing={t.missing} />
        </Ticket>
      ))}
    </div>
  );
}

export function AdPlans() {
  return (
    <>
      <div className="tickets tickets-4">
        {AD_TIERS.map((t, i) => (
          <Ticket
            key={t.key}
            n={`A${i + 1}`}
            name={t.name}
            featured={t.featured}
            tag={t.featured ? "Most booked" : t.unit.split(" · ")[0]}
            foot={
              t.eg && (
                <>
                  <span className="mono">Built at this level</span>
                  {t.eg.join(", ")}
                </>
              )
            }
          >
            <p className="ticket-blurb">{t.blurb}</p>
            <div className="fare">
              <span className="fare-now">
                <small>KSh</small>
                {t.price}
              </span>
              <span className="fare-unit">{t.unit}</span>
            </div>
            <a href={waLink(`Hi Eden, I'm interested in the ${t.name} ad package (KSh ${t.price}). Can we talk?`)} target="_blank" rel="noopener noreferrer" className={`btn ${t.featured ? "btn-light" : "btn-blue"} btn-full`}>
              Book this <Arrow />
            </a>
            <Features items={t.features} />
          </Ticket>
        ))}
      </div>
      <div className="notes" data-reveal>
        <p>
          <b>Bundle.</b> {AD_BUNDLE}
        </p>
        <p>
          <b>Ad spend.</b> {AD_TERMS}
        </p>
      </div>
    </>
  );
}

/* How paying works, as stops on a route line. */
export function PayRoute({ light }) {
  return (
    <ol className={`route${light ? " route-light" : ""}`}>
      {PAY_STEPS.map((s) => (
        <li key={s.n} data-reveal>
          <span className="route-dot" aria-hidden="true" />
          <span className="mono">Stop {s.n}</span>
          <h4>{s.title}</h4>
          <p>{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
