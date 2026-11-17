import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AD_CAMPAIGNS, AD_TIERS, CASE_META, CASE_STUDIES, FACTS, LOCATION, OFFER_ENDS, OTHER_BUILDS, OWNERSHIP, PLACEHOLDER, PRICING_TIERS, SITE_TYPES, adSrc, phone, waLink } from "../data";
import { Contact, PriceRows, Steps } from "../blocks";
import { BandHead, Placeholder } from "../ui";

/* White page, black type. Colour lives in two places only: the cards, each
   in its own tone, and a few words. Cards change size and orientation as
   they go — a wide one, a tall one, one lying on its side — so the page
   reads like a pinboard rather than a list. */
/* The one moving part of the hero: who it's for, turning over like a card
   every couple of seconds, each in its own card colour. */
const WHO = [
  ["businesses", "w-blue"],
  ["schools", "w-green"],
  ["restaurants", "w-tomato"],
  ["churches", "w-pink"],
  ["clinics", "w-blue"],
  ["NGOs", "w-green"],
  ["shops", "w-tomato"],
  ["trainers", "w-pink"],
];

/* The headline types itself out like a typewriter: black up to "for",
   then the coloured word in its own colour, then "all over Kenya." Once it
   reaches the full stop it keeps going — it backs up to the coloured word
   and types the next one. */
const PRE = "Websites, apps and ads for ";
const SUF = "all over Kenya.";
const LONGEST = WHO.reduce((a, [w]) => (w.length > a.length ? w : a), "");

function Typewriter() {
  const calm = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [i, setI] = useState(0);
  const [n, setN] = useState(calm ? Infinity : 0);
  const [phase, setPhase] = useState("type");
  // Wait for the intro screen to lift, so the first line is typed in view.
  const [ready, setReady] = useState(() => typeof document === "undefined" || !document.documentElement.classList.contains("intro"));
  useEffect(() => {
    if (ready) return;
    const t = setInterval(() => !document.documentElement.classList.contains("intro") && setReady(true), 100);
    return () => clearInterval(t);
  }, [ready]);
  const [word, tone] = WHO[i];
  const end = PRE.length + word.length + SUF.length;

  useEffect(() => {
    if (calm || !ready) return;
    let t;
    if (phase === "type") {
      if (n < end) t = setTimeout(() => setN(n + 1), n < PRE.length && i > 0 ? 0 : 55);
      else t = setTimeout(() => setPhase("delete"), 1800);
    } else if (n > PRE.length) {
      t = setTimeout(() => setN(n - 1), 28);
    } else {
      t = setTimeout(() => {
        setI((k) => (k + 1) % WHO.length);
        setPhase("type");
      }, 250);
    }
    return () => clearTimeout(t);
  }, [n, phase, end, i, calm, ready]);

  const a = Math.min(n, PRE.length);
  const b = Math.max(0, Math.min(n - PRE.length, word.length));
  const c = Math.max(0, n - PRE.length - word.length);
  const caret = !calm && <span className="tw-caret" />;

  return (
    <>
      <span className="sr">Websites, apps and ads for businesses, schools, restaurants, churches, clinics, NGOs, shops and trainers, all over Kenya.</span>
      <span className="tw" aria-hidden="true">
        <span className="tw-ghost">
          {PRE}
          {LONGEST}
          <span className="hero-line2">{SUF}</span>
        </span>
        <span className="tw-live">
          {PRE.slice(0, a)}
          {n <= PRE.length && caret}
          {b > 0 && <span className={tone}>{word.slice(0, b)}</span>}
          {n > PRE.length && c === 0 && caret}
          {c > 0 && (
            <span className="hero-line2">
              {SUF.slice(0, c)}
              {caret}
            </span>
          )}
        </span>
      </span>
    </>
  );
}

function Hero() {
  return (
    <section className="wrap hero" aria-labelledby="hero-title">
      <p className="hero-meta rise" aria-label="At a glance">
        <span>Websites, apps &amp; ad campaigns</span>
        <span>{LOCATION}</span>
        <span>End-of-year prices until {OFFER_ENDS}</span>
      </p>
      <h1 id="hero-title" className="hero-title rise">
        <Typewriter />
      </h1>
      <div className="hero-foot rise">
        <p className="hero-copy">
          We design and build websites and apps that load on three bars of signal, and the posters and video ads that send people to them — for clients all over Kenya. Fixed prices in shillings, M-Pesa built in, and we host it for you.
        </p>
        <div className="hero-acts">
          <Link to="/work" className="act act-solid">
            See the work <span aria-hidden="true">→</span>
          </Link>
          <a href={waLink("Hi Tessy, I'd like to start a project.")} target="_blank" rel="noopener noreferrer" className="act act-quiet">
            Start on WhatsApp <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <dl className="facts rise">
        {FACTS.map((f, i) => (
          <div key={f.label} className={`fact ${["t-lilac", "t-pink", "t-ink"][i]}`}>
            <dd>{f.label}</dd>
            <dt>{f.value}</dt>
          </div>
        ))}
        <div className="fact t-blue">
          <dd>a landing page, until {OFFER_ENDS}</dd>
          <dt>KSh {PRICING_TIERS[0].price}</dt>
        </div>
      </dl>
    </section>
  );
}

/* Client work as small square cards: picture on top, name and address
   below. Four across on a computer, two by two on a phone. On a computer,
   hovering slides up what the client needed. */
const CASE_TONES = ["t-blue", "t-pink", "t-green", "t-lilac"];

function Case({ s, i }) {
  const meta = CASE_META[s.client] ?? {};
  const spec = Object.fromEntries(s.spec);
  return (
    <li data-reveal>
      <a href={s.demo} target="_blank" rel="noopener noreferrer" className={`case ${CASE_TONES[i % CASE_TONES.length]}`}>
        <span className="case-top">
          <span>{s.n}</span>
          <span className="case-status">{spec.STATUS.split(",")[0]}</span>
        </span>
        <span className="case-shot">
          <img src={phone(s.img)} alt="" width="390" height="844" loading="lazy" decoding="async" />
          <span className="case-need">{s.need}</span>
        </span>
        <span className="case-text">
          <b className="case-title">{s.client}</b>
          <span className="case-where">
            {meta.sector}
            {meta.location && meta.location !== PLACEHOLDER ? ` · ${meta.location}` : ""}
          </span>
          <span className="case-domain">
            {s.domain} <span aria-hidden="true">↗</span>
          </span>
        </span>
        <span className="sr">(opens the live site in a new tab)</span>
      </a>
    </li>
  );
}

function ClientWork() {
  return (
    <section id="work" className="wrap band" aria-labelledby="work-title">
      <BandHead n="01" title="Client work" id="work-title" note="Live, and used every day by the people they were built for." />
      <ul className="cases">
        {CASE_STUDIES.map((s, i) => (
          <Case key={s.n} s={s} i={i} />
        ))}
      </ul>
      <LiveSites />
      <div className="band-end">
        <p>
          <span className="w-blue">{FACTS[0].value} client sites</span> and {FACTS[1].value} of our own — restaurants, shops, a florist, a tattoo studio, a dating app.
        </p>
        <Link to="/work" className="act">
          All work <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

/* The campaigns on a sideways rail: big and small cards in turn, swipe or
   step through, with a bar that shows how far along you are. */
const COVER_TONES = ["t-tomato", "t-lilac", "t-ink", "t-green", "t-pink", "t-blue"];

/* A sideways scroller with arrow buttons and a bar that shows how far along
   you are. Swipe on a phone, click or use the keyboard on a computer. */
function Rail({ label, className = "", children }) {
  const rail = useRef(null);
  const [pos, setPos] = useState({ at: 0, start: true, end: false });

  useEffect(() => {
    const el = rail.current;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setPos({ at: max > 0 ? el.scrollLeft / max : 0, start: el.scrollLeft < 8, end: el.scrollLeft > max - 8 });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const step = (dir) => rail.current.scrollBy({ left: dir * rail.current.clientWidth * 0.7, behavior: "smooth" });

  return (
    <div className="rail-wrap">
      <ul className={`rail ${className}`} ref={rail} tabIndex={0} aria-label={label}>
        {children}
      </ul>
      <div className="rail-ctl">
        <button type="button" onClick={() => step(-1)} disabled={pos.start} aria-label="Scroll back">
          ←
        </button>
        <span className="rail-bar" aria-hidden="true">
          <span style={{ transform: `scaleX(${0.15 + pos.at * 0.85})` }} />
        </span>
        <button type="button" onClick={() => step(1)} disabled={pos.end} aria-label="Scroll on">
          →
        </button>
      </div>
    </div>
  );
}

/* The campaigns as a staggered board: three columns (two on a phone) of
   covers cut to different shapes, so no two neighbours line up. */
const COVER_SHAPES = ["is-tall", "is-square", "is-mid", "is-square", "is-tall", "is-mid"];

function AdBoard() {
  return (
    <ul className="covers">
      {AD_CAMPAIGNS.map((c, i) => (
        <li key={c.key} className="cover-slot" data-reveal>
          <Link to={`/ads#${c.key}`} className={`cover ${COVER_TONES[i % COVER_TONES.length]}`}>
            <span className={`cover-img ${COVER_SHAPES[i % COVER_SHAPES.length]}`}>
              <img src={adSrc(c.key, c.cover, true)} alt="" width="640" height="800" loading="lazy" decoding="async" />
            </span>
            <span className="cover-text">
              <b>{c.name}</b>
              <span>{c.sector.split(" · ")[0]}</span>
              <span className="cover-go" aria-hidden="true">
                →
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* Every site that is live right now, as round badges with the address under
   the name — clients first, then Finderr, then the rest of our own builds. */
const host = (url) => new URL(url).hostname.replace(/^www\./, "");
const LIVE_SITES = [
  ...CASE_STUDIES.map((s) => ({ name: s.client, url: s.demo, img: s.img, kind: "Client" })),
  ...OTHER_BUILDS.filter((b) => b.demo?.startsWith("http"))
    .sort((a, b) => (a.title === "Finderr" ? -1 : b.title === "Finderr" ? 1 : 0))
    .map((b) => ({ name: b.title, url: b.demo, img: b.img, kind: b.title === "Finderr" ? "Our app" : null })),
];

function LiveSites() {
  return (
    <div className="live">
      <div className="live-head">
        <h3>Live right now</h3>
        <p>{LIVE_SITES.length} sites — tap one to open it</p>
      </div>
      <Rail label="Live sites, scroll sideways" className="badges">
        {LIVE_SITES.map((site) => (
          <li key={site.url} className="badge-slot">
            <a href={site.url} target="_blank" rel="noopener noreferrer" className="badge">
              <span className="badge-pic">
                <img src={phone(site.img)} alt="" width="390" height="844" loading="lazy" decoding="async" />
                <span className="badge-go" aria-hidden="true">
                  ↗
                </span>
              </span>
              <b title={site.name}>{site.name}</b>
              <span className="badge-domain" title={host(site.url)}>
                {host(site.url)}
              </span>
              {site.kind && <span className="badge-kind">{site.kind}</span>}
              <span className="sr">(opens in a new tab)</span>
            </a>
          </li>
        ))}
      </Rail>
    </div>
  );
}

function Ads() {
  return (
    <section className="wrap band" aria-labelledby="ads-title">
      <BandHead n="03" title="Ad campaigns" id="ads-title" note="Six concept brands, not clients. Posters with a price and a number to call, and voiced video ads for Reels and TikTok." />
      <AdBoard />
      <div className="band-end">
        <p>
          Ad design from <span className="w-tomato">KSh {AD_TIERS[0].price}</span> a poster, or a whole campaign at once.
        </p>
        <Link to="/ads" className="act">
          All ads <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

/* Every kind of site we build, as a wall of cards in mixed sizes. */
const TYPE_TONES = ["t-blue", "t-pink", "t-lilac", "t-ink", "t-tomato", "t-green", "t-lilac", "t-pink", "t-tomato", "t-ink", "t-blue"];

function WhatWeBuild() {
  return (
    <section id="build" className="wrap band" aria-labelledby="build-title">
      <BandHead n="02" title="What we build" id="build-title" note="All kinds of websites, apps and tools. If people need to find it, read it, buy it or book it — or you are tired of doing it by hand — we build it." />
      <ul className="types">
        {SITE_TYPES.map((t, i) => (
          <li key={t.name} className={`type ${t.size ?? ""} ${TYPE_TONES[i % TYPE_TONES.length]}`} data-reveal>
            <span className="type-n">{String(i + 1).padStart(2, "0")}</span>
            <h3>{t.name}</h3>
            <p>{t.body}</p>
          </li>
        ))}
      </ul>
      <div className="band-end">
        <p>Something not on the list? Tell us what it has to do — we'll scope it and price it.</p>
        <a href={waLink("Hi Tessy, we need a website or app built. Can we talk it through?")} target="_blank" rel="noopener noreferrer" className="act">
          Ask on WhatsApp <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}

function Prices() {
  return (
    <section className="wrap band" aria-labelledby="prices-title">
      <BandHead n="04" title="Prices" id="prices-title" note={`End-of-year prices until ${OFFER_ENDS}. ${OWNERSHIP.ours}`} />
      <PriceRows />
      <p className="own">
        <span className="w-blue">{OWNERSHIP.ours}</span> {OWNERSHIP.theirs}
      </p>
      <div className="band-end">
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
    <section className="wrap band" aria-labelledby="how-title">
      <BandHead n="05" title="How it works" id="how-title" note="Two payments, no surprises." />
      <Steps />
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <ClientWork />
      <WhatWeBuild />
      <Ads />
      <Prices />
      <HowItWorks />
      <Contact n="06" />
    </>
  );
}
