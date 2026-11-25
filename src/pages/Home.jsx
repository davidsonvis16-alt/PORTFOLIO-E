import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AD_CAMPAIGNS, AD_TIERS, CASE_META, CASE_STUDIES, FACTS, LOCATION, OFFER_ENDS, OTHER_BUILDS, OWNERSHIP, PLACEHOLDER, PRICING_TIERS, SITE_TYPES, adSrc, phone, mailLink } from "../data";
import { Contact, PriceRows, Steps } from "../blocks";
import { BandHead, Mounted, Placeholder } from "../ui";

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

/* The headline types itself out once like a typewriter: black up to "for",
   the coloured word in its own colour, then "all over Kenya." After the full
   stop the sentence stays, and only the coloured word changes — turning
   over to the next one every couple of seconds. */
const PRE = "Websites, apps, emails and ads for ";
const SUF = "all over Kenya.";
const LONGEST = WHO.reduce((a, [w]) => (w.length > a.length ? w : a), "");

function Typewriter() {
  const calm = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [i, setI] = useState(0);
  const [n, setN] = useState(calm ? Infinity : 0);
  const [phase, setPhase] = useState("type");
  const [flipped, setFlipped] = useState(false);
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
      if (n < end) t = setTimeout(() => setN(n + 1), 55);
      else t = setTimeout(() => setPhase("done"), 600);
    } else {
      // Typed once. From here only the coloured word changes, turning over.
      t = setTimeout(() => {
        setI((k) => (k + 1) % WHO.length);
        setFlipped(true);
      }, 2200);
    }
    return () => clearTimeout(t);
  }, [n, phase, end, i, calm, ready]);

  if (calm || phase === "done") {
    return (
      <>
        <span className="sr">Websites, apps, emails and ads for businesses, schools, restaurants, churches, clinics, NGOs, shops and trainers, all over Kenya.</span>
        <span aria-hidden="true">
          {PRE}
          <span className="turn">
            <span key={word} className={`turn-word ${flipped ? "is-turning" : ""} ${tone}`}>
              {word}
            </span>
          </span>
          <span className="hero-line2">{SUF}</span>
        </span>
      </>
    );
  }

  const a = Math.min(n, PRE.length);
  const b = Math.max(0, Math.min(n - PRE.length, word.length));
  const c = Math.max(0, n - PRE.length - word.length);
  const caret = !calm && <span className="tw-caret" />;

  return (
    <>
      <span className="sr">Websites, apps, emails and ads for businesses, schools, restaurants, churches, clinics, NGOs, shops and trainers, all over Kenya.</span>
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

/* Top of the page: a real photo of the work — someone designing, not a
   banner. Sharp edges, no box, nothing written on it. */
function Studio() {
  return (
    <section className="wrap studio" aria-label="Our studio">
      <img src="/work/m/studio.jpg" alt="A designer drawing on a tablet with her laptop beside her" width="2000" height="1333" fetchPriority="high" decoding="async" />
    </section>
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
          Fast sites, M-Pesa built in, fixed prices. We host.
        </p>
        <div className="hero-acts">
          <Link to="/work" className="act act-solid">
            See the work <span aria-hidden="true">→</span>
          </Link>
          <a href={mailLink("Hi Tessy, I'd like to start a project.")} target="_blank" rel="noopener noreferrer" className="act act-quiet">
            Email us <span aria-hidden="true">↗</span>
          </a>
        </div>
        <Mounted set="home" className="hero-art" />
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
      <BandHead n="01" title="Client work" id="work-title" note="Live and in use." />
      <ul className="cases">
        {CASE_STUDIES.map((s, i) => (
          <Case key={s.n} s={s} i={i} />
        ))}
      </ul>
      <LiveSites />
      <div className="band-end">
        <p>
          <span className="w-blue">{FACTS[0].value} client sites</span>, {FACTS[1].value} demos.
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
   the name — clients first, then our own builds. */
const host = (url) => new URL(url).hostname.replace(/^www\./, "");
/* Each site wears a painting as its cover instead of a screenshot — public-
   domain works from the Art Institute of Chicago, picked to suit the place. */
const COVERS = {
  "BakeMart Coffee House": ["bakemart", "Cézanne"],
  "Global Mogul": ["global-mogul", "Caillebotte"],
  "Fidel Castrol": ["fidel", "Renoir"],
  "Aspire Safety Academy": ["aspire", "Monet"],
  "Frame Zetu": ["framezetu", "Van Gogh"],
  "Cha Bao": ["chabao", "Hokusai"],
  "Kahawa & Crumb": ["kahawa", "Renoir"],
  "Maison Kiatu": ["kiatu", "Mucha"],
  Jave: ["jave", "Hiroshige"],
  Petal: ["petal", "Renoir"],
  Haven: ["haven", "Van Gogh"],
  "Kijani Kafe": ["kijani", "Monet"],
};
const cover = (name, img) => (COVERS[name] ? { art: `/work/art/${COVERS[name][0]}.jpg`, artist: COVERS[name][1] } : { art: phone(img), artist: "" });
const LIVE_SITES = [
  ...CASE_STUDIES.map((s) => ({ name: s.client, url: s.demo, sticker: null, ...cover(s.client, s.img) })),
  ...OTHER_BUILDS.filter((b) => b.demo?.startsWith("http"))
    .map((b) => ({ name: b.title, url: b.demo, sticker: "Demo", ...cover(b.title, b.img) })),
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
              {site.sticker && <span className="sticker">{site.sticker}</span>}
              <span className="badge-pic">
                <img src={site.art} alt="" width="700" height="700" loading="lazy" decoding="async" />
                <span className="badge-go" aria-hidden="true">
                  ↗
                </span>
              </span>
              <b title={site.name}>{site.name}</b>
              <span className="badge-domain" title={host(site.url)}>
                {host(site.url)}
              </span>
              {site.artist && <span className="badge-art">cover: {site.artist}</span>}

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
      <BandHead n="04" title="Ad campaigns" id="ads-title" note="Concept brands." />
      <AdBoard />
      <div className="band-end">
        <p>
          From <span className="w-tomato">KSh {AD_TIERS[0].price}</span> a poster.
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
      <BandHead n="02" title="What we build" id="build-title" note="Websites, apps and tools." />
      <ul className="types">
        {SITE_TYPES.map((t, i) => (
          <li key={t.name} className={`type ${t.size ?? ""} ${TYPE_TONES[i % TYPE_TONES.length]}`} data-reveal>
            <span className="type-n">{String(i + 1).padStart(2, "0")}</span>
            <h3>{t.name}</h3>
            <p>{t.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* Emails a business sends its own customers: the name in heavy black, then a
   small thin line on what it means. */
const EMAILS = [
  ["Order confirmations", "What they bought, the total, when it arrives."],
  ["Receipts & invoices", "With your logo, after every payment."],
  ["Booking reminders", "The day before, so fewer no-shows."],
  ["Offers & news", "Sales and new menus, to people who said yes."],
  ["Welcome emails", "A hello when someone signs up."],
  ["Your own address", "hello@yourbusiness.co.ke, not a Gmail."],
];

function Emails() {
  return (
    <section id="emails" className="wrap band" aria-labelledby="emails-title">
      <BandHead n="03" title="Emails to your customers" id="emails-title" note="Sent by your site, with your logo." />
      <ul className="mails">
        {EMAILS.map(([name, body]) => (
          <li key={name} className="mail" data-reveal>
            <h3>{name}</h3>
            <p>{body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Prices() {
  return (
    <section className="wrap band" aria-labelledby="prices-title">
      <BandHead n="05" title="Prices" id="prices-title" note={`Until ${OFFER_ENDS}.`} />
      <PriceRows />
      <p className="own">
        <span className="w-blue">{OWNERSHIP.ours}</span> {OWNERSHIP.theirs}
      </p>
      <div className="band-end">
        <p>Bigger project? Priced to the job.</p>
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
      <BandHead n="06" title="How it works" id="how-title" note="60% to start, 40% at launch." />
      <Steps />
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Studio />
      <Hero />
      <ClientWork />
      <WhatWeBuild />
      <Emails />
      <Ads />
      <Prices />
      <HowItWorks />
      <Contact n="07" />
    </>
  );
}
