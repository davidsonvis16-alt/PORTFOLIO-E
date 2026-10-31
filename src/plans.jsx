import { AD_BUNDLE, AD_TERMS, AD_TIERS, OTHER_BUILDS, PAY_STEPS, PRICING_TIERS, waLink } from "./data";
import { Check } from "./ui";

/* Price cards: a colour block where a photo would be, carrying the price;
   the details sit underneath like a card body. */
const HEADS = ["#FFE6A8", "#D9EF42", "#D6E4FF", "#FFD6CC"];

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

function PriceCard({ head, tag, name, was, price, from, unit, blurb, cta, children, foot }) {
  return (
    <article className="price" data-reveal>
      <div className="price-head" style={{ background: head }}>
        {tag && <span className="price-tag">{tag}</span>}
        <p className="price-name">{name}</p>
        {was && <s className="price-was">KSh {was}</s>}
        <p className="price-now">
          <small>{from ? "From KSh" : "KSh"}</small> {price}
        </p>
        <p className="price-unit">{unit}</p>
      </div>
      <div className="price-body">
        <p className="price-blurb">{blurb}</p>
        <a href={cta.href} target="_blank" rel="noopener noreferrer" className="pill pill-ink pill-full">
          {cta.label}
        </a>
        {children}
      </div>
      {foot && <p className="price-foot">{foot}</p>}
    </article>
  );
}

export function SitePlans() {
  return (
    <div className="prices">
      {PRICING_TIERS.map((t, i) => (
        <PriceCard
          key={t.key}
          head={HEADS[i]}
          tag={t.featured ? "Best fit for most shops" : t.tag}
          name={t.name}
          was={t.was}
          price={t.price}
          from={t.from}
          unit={`+ KSh ${t.monthly}/month maintenance`}
          blurb={t.blurb}
          cta={{ href: waLink(`Hi Eden, I'm interested in the ${t.name} at KSh ${t.price} (end-of-year offer). Can we discuss it?`), label: "Ask about this" }}
          foot={
            OTHER_BUILDS.some((b) => b.tier === t.key) &&
            `Built at this level: ${OTHER_BUILDS.filter((b) => b.tier === t.key).map((b) => b.title).join(", ")}`
          }
        >
          <p className="chips-mini">
            {t.perks.map((p) => (
              <span key={p}>{p}</span>
            ))}
          </p>
          <dl className="split">
            <div>
              <dt>To start (60%)</dt>
              <dd>
                {t.from ? "from " : ""}KSh {t.split[0]}
              </dd>
            </div>
            <div>
              <dt>At launch (40%)</dt>
              <dd>
                {t.from ? "from " : ""}KSh {t.split[1]}
              </dd>
            </div>
            <div>
              <dt>Pay by</dt>
              <dd>{t.methods}</dd>
            </div>
          </dl>
          <p className="feats-kick">{t.plus.charAt(0) + t.plus.slice(1).toLowerCase()}</p>
          <Features items={t.features} missing={t.missing} />
        </PriceCard>
      ))}
    </div>
  );
}

export function AdPlans() {
  return (
    <>
      <div className="prices prices-4">
        {AD_TIERS.map((t, i) => (
          <PriceCard
            key={t.key}
            head={HEADS[(i + 2) % HEADS.length]}
            tag={t.featured ? "Most booked" : null}
            name={t.name}
            price={t.price}
            unit={t.unit}
            blurb={t.blurb}
            cta={{ href: waLink(`Hi Eden, I'm interested in the ${t.name} ad package (KSh ${t.price}). Can we talk?`), label: "Book this" }}
            foot={t.eg && `Built at this level: ${t.eg.join(", ")}`}
          >
            <Features items={t.features} />
          </PriceCard>
        ))}
      </div>
      <div className="notes">
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

export function PaySteps() {
  return (
    <ol className="steps">
      {PAY_STEPS.map((s) => (
        <li key={s.n} className="step" data-reveal>
          <span className="step-n">{s.n}</span>
          <h3>{s.title}</h3>
          <p>{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
