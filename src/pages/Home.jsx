import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useInView, usePrefersReducedMotion } from "../tokens";
import { AD_CAMPAIGNS, AD_COUNT, AD_TIERS, CASE_STUDIES, PRICING_TIERS, PROOF, SERVICES, adSrc, phone, waLink } from "../data";
import { Arrow, Checker, Devices, SecHead } from "../ui";

/* The hero fan: ads either side of a live client site on a phone.
   Spreads out on hover. */
const FAN = [
  { kind: "ad", key: "lineup", file: "01-sharp-is-a-habit", alt: "The Lineup — Sharp is a habit" },
  { kind: "ad", key: "stage46", file: "13-your-fare-itemised", alt: "Stage 46 — Your fare, itemised" },
  { kind: "site", img: CASE_STUDIES[0].img, alt: `${CASE_STUDIES[0].client} on a phone` },
  { kind: "ad", key: "stage46", file: "01-get-off-here", alt: "Stage 46 — Get off here" },
  { kind: "ad", key: "latch", file: "04-the-home-that-says-yes", alt: "Latch Homes — The home that finally says yes" },
];

function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-in">
        <div className="hero-copy">
          <p className="mono hero-kick rise">
            <span className="dot" /> Web design · Ad campaigns · Nairobi / Nakuru
          </p>
          <h1 className="d-mega rise" style={{ animationDelay: "0.08s" }}>
            Built for
            <br />
            three <em>bars.</em>
          </h1>
          <p className="lede rise" style={{ animationDelay: "0.16s" }}>
            Fast websites and loud, good-looking ads for shops, cafés and restaurants — made for the connection your customers actually have.
          </p>
          <div className="cta-row rise" style={{ animationDelay: "0.24s" }}>
            <a href={waLink("Hi Eden, I'd like a website for my business.")} target="_blank" rel="noopener noreferrer" className="btn btn-blue">
              Start a project <Arrow />
            </a>
            <Link to="/ads" className="btn btn-ghost">
              See the ads
            </Link>
          </div>
          <div className="hero-fares rise" style={{ animationDelay: "0.32s" }}>
            <Link to="/rates" className="stub">
              <span className="mono">Websites from</span>
              <b>KSh {PRICING_TIERS[0].price}</b>
            </Link>
            <Link to="/rates#ads" className="stub stub-blue">
              <span className="mono">Ads from</span>
              <b>KSh {AD_TIERS[0].price}</b>
            </Link>
          </div>
        </div>

        <div className="fan rise-up" aria-label="Recent work">
          {FAN.map((f, i) =>
            f.kind === "ad" ? (
              <div key={f.file} className={`fan-card fan-${i}`}>
                <img src={adSrc(f.key, f.file, true)} alt={f.alt} width="640" height="800" />
              </div>
            ) : (
              <div key="site" className={`fan-card fan-${i} fan-phone`}>
                <img src={phone(f.img)} alt={f.alt} width="390" height="844" />
              </div>
            )
          )}
        </div>
      </div>
      <Checker />
    </section>
  );
}

function Services() {
  return (
    <section className="band band-blue">
      <div className="wrap">
        <SecHead kick="The route" title="Four stops." accent="One person." sub="You deal with the person who designs the ads and writes the code — from the first message to launch day." light />
        <ol className="stops">
          {SERVICES.map((s) => (
            <li key={s.n} data-reveal>
              <span className="mono">Stop {s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ClientPreview() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="row-head" data-reveal>
          <SecHead kick="Client work" title="Live and" accent="in use." />
          <Link to="/work" className="btn btn-ink btn-sm">
            All work <Arrow />
          </Link>
        </div>
        <div className="duo">
          {CASE_STUDIES.map((s, i) => (
            <a key={s.n} href={s.demo} target="_blank" rel="noopener noreferrer" className={`duo-card ${i ? "duo-paper" : "duo-ink"}`} data-reveal>
              <div className="duo-top">
                <span className="mono">Client {s.n} · {s.place}</span>
                <span className="mono">{s.domain}</span>
              </div>
              <h3 className="d-h3">{s.client}</h3>
              <p>{s.need}</p>
              <Devices img={s.img} url={s.domain} name={s.client} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function AdsPreview() {
  return (
    <section className="band band-ink">
      <div className="wrap">
        <div className="row-head" data-reveal>
          <SecHead kick={`New · ${AD_COUNT} pieces`} title="Ad" accent="campaigns." sub="Three concept campaigns — a chicken joint, a barber and a rental agency. Same eye, three different voices." light />
          <Link to="/ads" className="btn btn-blue btn-sm">
            See every ad <Arrow />
          </Link>
        </div>
        <div className="posters">
          {AD_CAMPAIGNS.map((c) => (
            <Link key={c.key} to={`/ads#${c.key}`} className="poster" data-reveal>
              <img src={adSrc(c.key, c.cover, true)} alt={`${c.name} campaign`} loading="lazy" width="640" height="800" />
              <span className="poster-tag">
                <span className="mono">{c.n} · {c.sector}</span>
                <b>{c.name}</b>
                <span className="mono">{c.pieces.length} pieces →</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function useCountUp(target, duration, start) {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start || reduced) return;
    let startTime = null;
    let raf;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setValue(Math.round((1 - Math.pow(1 - progress, 3)) * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration, reduced]);
  return reduced ? target : value;
}

function Stat({ item, start, note }) {
  const numeric = typeof item.value === "number";
  const counted = useCountUp(numeric ? item.value : 0, 1200, start);
  return (
    <div className="stat" data-reveal>
      <div className="stat-num">
        {numeric ? counted : item.text}
        {note && <sup>{note}</sup>}
      </div>
      <div className="stat-label">{item.label}</div>
      <div className="mono stat-note">{item.note}</div>
    </div>
  );
}

function ShortVersion() {
  const [ref, inView] = useInView(0.3);
  return (
    <section className="sec" ref={ref}>
      <div className="wrap">
        <SecHead kick="Itemised" title="The short" accent="version." />
        <div className="stats">
          {PROOF.map((item, i) => (
            <Stat key={item.label} item={item} start={inView} note={i >= 2 ? i - 1 : null} />
          ))}
          <div className="stat stat-blue" data-reveal>
            <div className="stat-num">{AD_COUNT}</div>
            <div className="stat-label">Ad pieces</div>
            <div className="mono stat-note">3 concept campaigns</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RatesPreview() {
  return (
    <section className="band band-paper">
      <div className="wrap">
        <SecHead kick={`End-of-year fares`} title="Your fare," accent="itemised." sub="Fixed prices agreed on WhatsApp before any work starts. Free hosting on every website." />
        <div className="receipts">
          <Link to="/rates" className="receipt" data-reveal>
            <p className="mono receipt-head">Eden · Websites</p>
            {PRICING_TIERS.map((t) => (
              <p key={t.key} className="receipt-row">
                <span>{t.name}</span>
                <span className="mono">{t.from ? "from " : ""}{t.price}</span>
              </p>
            ))}
            <p className="receipt-row receipt-total">
              <span>Hosting</span>
              <span className="mono">FREE</span>
            </p>
            <span className="receipt-go mono">Full rates →</span>
          </Link>
          <Link to="/rates#ads" className="receipt receipt-blue" data-reveal>
            <p className="mono receipt-head">Eden · Ads</p>
            {AD_TIERS.map((t) => (
              <p key={t.key} className="receipt-row">
                <span>{t.name}</span>
                <span className="mono">{t.price}{t.key === "monthly" ? "/mo" : ""}</span>
              </p>
            ))}
            <p className="receipt-row receipt-total">
              <span>Ad spend</span>
              <span className="mono">NOT INCL.</span>
            </p>
            <span className="receipt-go mono">Ad packages →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function StopCta() {
  return (
    <section className="cta-band">
      <div className="wrap">
        <p className="mono" data-reveal>
          Last stop ———— ✦
        </p>
        <h2 className="d-mega" data-reveal>
          This is your <em>stop.</em>
        </h2>
        <p className="lede" data-reveal>
          Tell me what the business needs. WhatsApp is fastest — usually a reply within a couple of hours in working hours.
        </p>
        <div className="cta-row" data-reveal>
          <a href={waLink("Hi Eden, I'd like to talk about a project.")} target="_blank" rel="noopener noreferrer" className="btn btn-light">
            Message on WhatsApp <Arrow />
          </a>
          <Link to="/contact" className="btn btn-ghost">
            Other ways to reach me
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <ClientPreview />
      <AdsPreview />
      <ShortVersion />
      <RatesPreview />
      <StopCta />
    </>
  );
}
