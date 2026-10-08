import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { C, useInView, usePrefersReducedMotion, useRevealAll } from "./tokens";
import { STACK_ICONS } from "./stackIcons";
import "./site.css";

const WHATSAPP_NUMBER = "254142614743";
const INSTAGRAM = "https://www.instagram.com/vinn_y.codr/";
const EMAIL = "davidson.vis.16@gmail.com";

/* Real client work — the two paid builds. Numbers stay hedged
   until they are actually measured; no invented precision. */
const CASE_STUDIES = [
  {
    n: "01",
    client: "BakeMart Coffee House",
    place: "Nakuru",
    need: "The only open-kitchen coffee shop in Nakuru needed a menu customers could read before walking in, and orders they could take without a phone call.",
    constraint:
      "Menu and ordering run off one Supabase backend — the storefront had to stay quick while orders were landing in the same database mid-service.",
    spec: [
      ["STACK", "React · Supabase · Tailwind"],
      ["SCOPE", "Menu · Online ordering"],
      ["TARGET", "Usable on a 3-bar connection"],
      ["STATUS", "Live, in daily use"],
    ],
    img: "/work/bakemart.jpg",
    demo: "https://bakemart.co.ke",
    domain: "bakemart.co.ke",
  },
  {
    n: "02",
    client: "Global Mogul",
    place: "Founder & author site",
    need: "An entrepreneurs lab and its founder needed one home for everything they put out — the book, a reading list, talks, and a marketplace.",
    constraint:
      "Four very different jobs on one site. Each had to be easy to find from a phone without the whole thing turning into one long, heavy page on mobile data.",
    spec: [
      ["STACK", "React · TypeScript · Tailwind"],
      ["SCOPE", "Book · Reading list · Talks · Shop"],
      ["TARGET", "Usable on a 3-bar connection"],
      ["STATUS", "Live"],
    ],
    img: "/work/fidel.jpg",
    demo: "https://global-mogul.vercel.app/",
    domain: "global-mogul.vercel.app",
  },
];

/* Everything else — self-directed builds, not client engagements. Newest first. */
const OTHER_BUILDS = [
  {
    title: "Maison Kiatu",
    tier: "custom",
    tierWhy: "a stocked shop with a bag and WhatsApp ordering",
    kind: "Sneaker shop · E-commerce",
    desc: "Pre-owned sneakers in Kilimani — every pair cleaned and graded out of ten, ordered on WhatsApp and paid with M-Pesa.",
    stack: "React · Vite · React Router",
    year: "2026",
    demo: "https://shoeske.vercel.app/",
    img: "/work/kiatu.jpg",
  },
  {
    title: "Jave",
    tier: "custom",
    tierWhy: "online ordering and table bookings",
    kind: "Restaurant & grill",
    desc: "A fire-led grill in Nairobi — order online with M-Pesa or card, book a table, browse the menu.",
    stack: "React · Vite · Framer Motion",
    year: "2026",
    demo: "https://hotelke.vercel.app/",
    img: "/work/jave.jpg",
  },
  {
    title: "Eden Phones",
    tier: "custom",
    tierWhy: "M-Pesa checkout and instalment plans",
    kind: "Phone shop · E-commerce",
    desc: "Genuine and certified-refurbished phones in Nairobi — same-day delivery, M-Pesa, and Lipa Mdogo Mdogo instalments.",
    stack: "Next.js · TypeScript · Tailwind",
    year: "2026",
    demo: "https://phoneske-gamma.vercel.app/",
    img: "/work/phones.jpg",
  },
  {
    title: "Petal",
    tier: "custom",
    tierWhy: "bouquet builder, M-Pesa checkout, delivery cutoff",
    kind: "Florist · E-commerce",
    desc: "Same-day flower delivery across Nairobi — build-your-own bouquet, M-Pesa checkout, live delivery cutoff.",
    stack: "React · Vite",
    year: "2026",
    demo: "https://floristke.vercel.app/",
    img: "/work/petal.jpg",
  },
  {
    title: "Aldosi Merchants",
    tier: "business",
    tierWhy: "catalogue and brand pages, no checkout",
    kind: "Brand storefront",
    desc: "An editorial storefront for a Nairobi cooker brand — a lit-burner hero and a catalogue that reads like a magazine.",
    stack: "React · Tailwind · Framer Motion",
    year: "2026",
    demo: "https://aldosi-merchants.vercel.app/",
    img: "/work/aldosi.jpg",
  },
  {
    title: "Haven",
    tier: "custom",
    tierWhy: "property listings and viewing bookings",
    kind: "Real estate",
    desc: "A cinematic property site — full-bleed residences, listings and viewing bookings, no UI framework underneath.",
    stack: "React · TypeScript · Framer Motion",
    year: "2026",
    demo: "https://homeskenya.vercel.app/",
    img: "/work/haven.jpg",
  },
  {
    title: "Gadellaa Arts",
    tier: "custom",
    tierWhy: "session booking on top of the portfolio pages",
    kind: "Tattoo studio · Nyeri",
    desc: "A dark, type-led site for a tattoo studio — portfolio, prices, the artist, and session booking.",
    stack: "React · TypeScript · CSS Modules",
    year: "2026",
    demo: "https://gadella.vercel.app/",
    img: "/work/gadella.jpg",
  },
  {
    title: "Bridges",
    tier: "custom",
    tierWhy: "address search across cities and categories",
    kind: "Delivery platform",
    desc: "Food, groceries and pharmacy delivery across Kenyan cities — address-first search and category browsing.",
    stack: "React · TypeScript · Tailwind",
    year: "2026",
    demo: "https://bridges-theta.vercel.app/",
    img: "/work/bridges.jpg",
  },
  {
    title: "Arrow",
    tier: "custom",
    tierWhy: "mutual-interest matching and gated contact",
    kind: "Dating & discovery",
    desc: "Human-first discovery — a WhatsApp connection only unlocks after mutual interest, numbers never shown publicly.",
    stack: "React · TypeScript · Tailwind",
    year: "2026",
    demo: "https://arrow-puce.vercel.app/",
    img: "/work/arrow.jpg",
  },
  {
    title: "Kijani Kafe",
    tier: "business",
    tierWhy: "menu, story and location over a few pages",
    kind: "Garden bar · Restaurant",
    desc: "A garden bar and restaurant in Milimani, Nakuru — photography-led, but every image had to earn its weight on mobile data.",
    stack: "React · Next.js · Tailwind",
    year: "2026",
    demo: "https://kijani-kafe.vercel.app/",
    img: "/work/kijani.jpg",
  },
  {
    title: "Beyond Fruits",
    tier: "custom",
    tierWhy: "basket and checkout",
    kind: "Grocery · Delivery",
    desc: "Fresh produce with country-wide delivery — basket and checkout kept fast on mobile data.",
    stack: "React · Vite · Tailwind",
    year: "2026",
    demo: "https://beyond-taupe-one.vercel.app/",
    img: "/work/beyond.jpg",
  },
];

const SKILLS = ["HTML", "CSS", "JavaScript", "React", "Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Vite", "Framer Motion", "Git", "M-Pesa", "Responsive Design"];

const PRICING_TIERS = [
  {
    key: "landing",
    name: "Landing Page",
    price: "15,000",
    note: "from KSh",
    blurb: "One sharp page that gets you found and gets you messaged.",
    plus: "WHAT YOU GET",
    features: ["1 page, single layout", "WhatsApp button", "Mobile-first, built for 3 bars", "3-day turnaround"],
    missing: ["No payments", "No extra pages"],
  },
  {
    key: "business",
    name: "Business Site",
    price: "30,000",
    note: "from KSh",
    featured: true,
    blurb: "The full shopfront — menu, story, location and payments.",
    plus: "EVERYTHING IN LANDING, PLUS",
    features: ["Up to 5 pages", "Custom design, not a stock layout", "M-Pesa payments", "1 round of revisions", "7-day turnaround"],
    missing: ["No cart or checkout", "No bookings or accounts"],
  },
  {
    key: "custom",
    name: "Custom Build",
    price: "Let's talk",
    note: "quoted per job",
    blurb: "When the site has to run part of the business, not just describe it.",
    plus: "EVERYTHING IN BUSINESS, PLUS",
    features: ["Cart and M-Pesa checkout", "Bookings, search or listings", "Database behind the site", "Revisions scoped to the job", "Ongoing support"],
    missing: [],
  },
];

const TIER_NAME = { landing: "Landing Page", business: "Business Site", custom: "Custom Build" };

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Work" },
  { id: "process", label: "Process" },
  { id: "pricing", label: "Rates" },
  { id: "contact", label: "Contact" },
];

const PROCESS_STEPS = [
  { n: "01", title: "Discover", desc: "Understand the business, the customers, and what the site actually has to do." },
  { n: "02", title: "Design", desc: "A layout reviewed with you before a line of code gets written." },
  { n: "03", title: "Build", desc: "Responsive code, tested on the kind of connection your customers actually use." },
  { n: "04", title: "Launch", desc: "Live, monitored, and handed over with everything you need to keep running it." },
];

const WHY_POINTS = [
  {
    title: "Be found when you are closed",
    body: "Customers search before they buy. A site puts the menu, the hours and the location in front of them at 11pm, when nobody is answering the phone.",
  },
  {
    title: "Look like a real business",
    body: "A clean, quick site does the same job as a swept floor. People decide whether to trust you before they ever walk in.",
  },
  {
    title: "Own the channel",
    body: "Social feeds are rented and temporary. A site is yours — the message, the look, the customer list.",
  },
  {
    title: "Built for the connection here",
    body: "Most of your customers are on mobile data, often outside the good coverage. A heavy site loses them before it ever loads.",
  },
];

/* Only figures that can be pointed at. Two are counted from the work
   data; two are stated as targets because they have not been measured
   on a fixed rig yet. */
const LIVE_COUNT = CASE_STUDIES.length + OTHER_BUILDS.filter((b) => b.demo?.startsWith("http")).length;
const PROOF = [
  { value: CASE_STUDIES.length, label: "Paying clients", note: "BakeMart · Global Mogul" },
  { value: LIVE_COUNT, label: "Sites live", note: "client + self-directed" },
  { text: "< 2s", label: "Typical load, 3G", note: "target, not a lab figure" },
  { text: "< 2h", label: "Usual reply time", note: "WhatsApp, working hours" },
];

const waLink = (text) => `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

/* Phone-size screenshot of the same site. */
const phone = (img) => img.replace("/work/", "/work/m/");

/* Old routes still work: each one lands on its section of the single page. */
const ROUTE_SECTION = { about: "about", why: "why", process: "process", projects: "work", skills: "stack", pricing: "pricing", contact: "contact" };

/* Generic glyphs for entries with no public brand mark — never an imitation logo. */
const GLYPHS = {
  "M-Pesa": "M7 2h10a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Zm1 2v14h8V4H8Zm3 15.5a1 1 0 1 0 2 0 1 1 0 0 0-2 0ZM9.5 11h5v2h-5z",
  "Responsive Design": "M2 4h14a1 1 0 0 1 1 1v3h-2V6H3v9h9v2H9v1H6v-1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm14 6h5a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Zm1 2v6h3v-6h-3Z",
};

/* ---------- primitives ---------- */

function Chevron() {
  return (
    <svg className="chev" width="8" height="12" viewBox="0 0 8 12" aria-hidden="true">
      <path d="M1.5 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function More({ href, children, external = true }) {
  return (
    <a href={href} className="more" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
      <Chevron />
    </a>
  );
}

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="ic-check">
      <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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

/* A plain browser window around a desktop screenshot. */
function Browser({ src, url, alt, eager = false }) {
  return (
    <div className="browser">
      <div className="browser-bar" aria-hidden="true">
        <span className="dots">
          <i />
          <i />
          <i />
        </span>
        <span className="browser-url">{url}</span>
      </div>
      <img src={src} alt={alt} width="1152" height="720" loading={eager ? "eager" : "lazy"} decoding="async" />
    </div>
  );
}

/* A generic phone around a mobile screenshot. */
function Phone({ src, alt, eager = false, className = "" }) {
  return (
    <div className={`phone ${className}`}>
      <img src={src} alt={alt} width="390" height="844" loading={eager ? "eager" : "lazy"} decoding="async" />
    </div>
  );
}

function Devices({ img, url, name, eager }) {
  return (
    <div className="devices">
      <Browser src={img} url={url} alt={`${name} on desktop`} eager={eager} />
      <Phone src={phone(img)} alt={`${name} on a phone`} eager={eager} className="devices-phone" />
    </div>
  );
}

function StackMark({ name }) {
  const brand = STACK_ICONS[name];
  const path = brand?.path ?? GLYPHS[name];
  if (!path) return null;
  const fill = !brand || brand.hex === "#000000" ? C.ink : brand.hex;
  return (
    <svg className="stack-logo" viewBox="0 0 24 24" fill={fill} aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

/* ---------- nav ---------- */

function Nav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
  }, [open]);
  const close = () => setOpen(false);

  return (
    <>
      <header className={`gnav ${open ? "is-open" : ""}`}>
        <div className="gnav-in">
          <Link to="/" className="gnav-logo" onClick={close}>
            Eden
          </Link>
          <nav className="gnav-links" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <Link key={item.id} to={`/${item.id}`}>
                {item.label}
              </Link>
            ))}
          </nav>
          <a href={waLink("Hi Eden, I'd like a website for my business.")} target="_blank" rel="noopener noreferrer" className="btn btn-blue btn-sm gnav-cta">
            Start a project
          </a>
          <button className="gnav-burger" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="Menu">
            <span />
            <span />
          </button>
        </div>
      </header>
      <div className={`gmenu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav>
          {[{ id: "", label: "Home" }, ...NAV_ITEMS].map((item, i) => (
            <Link key={item.label} to={`/${item.id}`} onClick={close} tabIndex={open ? 0 : -1} style={{ transitionDelay: open ? `${0.04 * i}s` : "0s" }}>
              {item.label}
            </Link>
          ))}
        </nav>
        <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-blue" tabIndex={open ? 0 : -1}>
          Message on WhatsApp
        </a>
      </div>
    </>
  );
}

/* ---------- hero ---------- */

/* Five live sites side by side, the client builds in the middle. */
const LINEUP = ["Petal", "Global Mogul", "BakeMart Coffee House", "Maison Kiatu", "Jave"].map(
  (t) => [...CASE_STUDIES.map((c) => ({ title: c.client, img: c.img })), ...OTHER_BUILDS].find((w) => w.title === t)
);

function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow rise" style={{ animationDelay: "0.05s" }}>Web design &amp; development · Nairobi / Nakuru</p>
        <h1 className="t-hero rise" style={{ animationDelay: "0.12s" }}>Built for three bars.</h1>
        <p className="t-sub hero-sub rise" style={{ animationDelay: "0.2s" }}>
          Fast, good-looking websites for shops, cafés and restaurants — made to load on the connection your customers actually have.
        </p>
        <div className="cta-row rise" style={{ animationDelay: "0.28s" }}>
          <a href={waLink("Hi Eden, I'd like a website for my business.")} target="_blank" rel="noopener noreferrer" className="btn btn-blue">
            Start a project
          </a>
          <Link to="/projects" className="more">
            See the work
            <Chevron />
          </Link>
        </div>
      </div>
      <div className="hero-stage rise-up">
        <div className="lineup">
          {LINEUP.map((w) => (
            <Phone key={w.title} src={phone(w.img)} alt={`${w.title} on a phone`} eager />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- highlights ---------- */

function Highlight({ item, start, note }) {
  const numeric = typeof item.value === "number";
  const counted = useCountUp(numeric ? item.value : 0, 1200, start);
  return (
    <div className="hl" data-reveal>
      <div className="hl-num tnum">
        {numeric ? counted : item.text}
        {note && <sup>{note}</sup>}
      </div>
      <div className="hl-label">{item.label}</div>
      <div className="hl-note">{item.note}</div>
    </div>
  );
}

function Highlights() {
  const [ref, inView] = useInView(0.3);
  return (
    <section className="band band-grey" ref={ref}>
      <div className="wrap">
        <h2 className="t-h2 center" data-reveal>The short version.</h2>
        <div className="hls">
          {PROOF.map((item, i) => (
            <Highlight key={item.label} item={item} start={inView} note={i >= 2 ? i - 1 : null} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- client work ---------- */

function CaseTile({ s, tone }) {
  return (
    <article className={`tile tile-${tone}`} data-reveal>
      <div className="tile-copy">
        <p className="eyebrow">
          Client {s.n} · {s.place}
        </p>
        <h3 className="t-h2">{s.client}</h3>
        <p className="t-sub tile-sub">{s.need}</p>
        <div className="cta-row center">
          <a href={s.demo} target="_blank" rel="noopener noreferrer" className={`btn ${tone === "dark" ? "btn-light" : "btn-blue"}`}>
            Visit the site
          </a>
          <More href={waLink(`Hi Eden, I saw the ${s.client} site. Could you build something like it for me?`)}>Get one like it</More>
        </div>
      </div>
      <div className="tile-stage">
        <Devices img={s.img} url={s.domain} name={s.client} />
      </div>
      <div className="tile-facts">
        <div className="fact fact-wide">
          <span className="eyebrow">The constraint</span>
          <p>{s.constraint}</p>
        </div>
        {s.spec.map(([k, v]) => (
          <div className="fact" key={k}>
            <span className="eyebrow">{k}</span>
            <p>{v}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

function ClientWork() {
  return (
    <section id="work" className="sec">
      <div className="wrap">
        <div className="sec-head center" data-reveal>
          <h2 className="t-h2">Client work.</h2>
          <p className="t-sub">Two paying clients so far. Both sites are live and in use.</p>
        </div>
        <div className="tiles">
          {CASE_STUDIES.map((s, i) => (
            <CaseTile key={s.n} s={s} tone={i === 0 ? "dark" : "sand"} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- more work: card carousel ---------- */

function MoreWork() {
  const track = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    const el = track.current;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const page = (dir) => {
    const el = track.current;
    const card = el.querySelector(".pcard");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step * Math.max(1, Math.floor(el.clientWidth / step)), behavior: "smooth" });
  };

  return (
    <section id="more" className="sec sec-tight">
      <div className="wrap">
        <div className="row-head" data-reveal>
          <div>
            <h2 className="t-h2">More work.</h2>
            <p className="t-sub">Self-directed builds — each priced as if a client had asked for it.</p>
          </div>
          <div className="pager" aria-label="Scroll projects">
            <button onClick={() => page(-1)} disabled={edge.start} aria-label="Previous">
              <Chevron />
            </button>
            <button onClick={() => page(1)} disabled={edge.end} aria-label="Next">
              <Chevron />
            </button>
          </div>
        </div>
      </div>
      <div className="track" ref={track}>
        {OTHER_BUILDS.map((b) => (
          <a key={b.title} href={b.demo} target="_blank" rel="noopener noreferrer" className="pcard">
            <div className="pcard-copy">
              <span className="eyebrow">{b.kind}</span>
              <h3 className="t-h3">{b.title}</h3>
              <p>{b.desc}</p>
              <span className="pcard-tier">
                {TIER_NAME[b.tier]} — {b.tierWhy}
              </span>
            </div>
            <Phone src={phone(b.img)} alt={`${b.title} on a phone`} className="pcard-phone" />
          </a>
        ))}
        <span className="track-end" aria-hidden="true" />
      </div>
    </section>
  );
}

/* ---------- about / why / process / stack ---------- */

function About() {
  return (
    <section id="about" className="sec">
      <div className="wrap about">
        <p className="eyebrow" data-reveal>About</p>
        <h2 className="t-h2" data-reveal>
          One person.
          <br />
          Every line of code.
        </h2>
        <div className="about-cols">
          <p className="t-sub" data-reveal>
            I build websites for small businesses — restaurants, cafés, florists, shops — around Nairobi and Nakuru.
          </p>
          <p className="body" data-reveal>
            Every one is held to the same standard: it has to look like it cost more than it did, and it has to load when the signal drops to three bars. No agency, no team — you deal with the person who writes the code, mostly in React, from the first message to the day it goes live.
          </p>
        </div>
      </div>
    </section>
  );
}

const WHY_ICONS = [
  <path key="0" d="M12 3a9 9 0 1 0 9 9M12 7v5l3 2" />,
  <path key="1" d="M4 9h16l-1.5-5h-13L4 9Zm0 0v11h16V9M9 20v-6h6v6" />,
  <path key="2" d="M14 10a4 4 0 1 0-3.5 4L9 16v2H7v2H4v-3l6-6a4 4 0 0 0 4-1Z" />,
  <path key="3" d="M4 20v-3M9 20v-7M14 20v-11M19 20V4" />,
];

function WhyWebsite() {
  return (
    <section id="why" className="band band-grey">
      <div className="wrap">
        <div className="sec-head center" data-reveal>
          <h2 className="t-h2">Why a website.</h2>
          <p className="t-sub">Social pages are a start. A site is the shopfront you own.</p>
        </div>
        <div className="why">
          {WHY_POINTS.map((p, i) => (
            <div key={p.title} className="why-card" data-reveal>
              <svg className="why-ic" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {WHY_ICONS[i]}
              </svg>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="band band-black">
      <div className="wrap">
        <div className="sec-head center" data-reveal>
          <h2 className="t-h2">From first message to launch.</h2>
          <p className="t-sub">Four steps. You see the design before any code is written.</p>
        </div>
        <ol className="steps">
          {PROCESS_STEPS.map((step) => (
            <li key={step.n} className="step" data-reveal>
              <span className="step-n">{step.n}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section id="stack" className="sec sec-tight">
      <div className="wrap center">
        <h2 className="t-h3" data-reveal>Built with</h2>
        <ul className="stack" data-reveal>
          {SKILLS.map((s) => (
            <li key={s}>
              <StackMark name={s} />
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- rates: compare columns ---------- */

function Pricing() {
  return (
    <section id="pricing" className="sec">
      <div className="wrap">
        <div className="sec-head center" data-reveal>
          <h2 className="t-h2">Which site is right for you?</h2>
          <p className="t-sub">Starting points, not rigid packages. Every site is scoped against what the business needs before a final number goes out.</p>
        </div>
        <div className="compare">
          {PRICING_TIERS.map((t) => (
            <div key={t.key} className="plan" data-reveal>
              <span className="plan-flag">{t.featured ? "Best fit for most shops" : " "}</span>
              <h3 className="t-h3">{t.name}</h3>
              <p className="plan-blurb">{t.blurb}</p>
              <p className="plan-price">
                {t.price === "Let's talk" ? "Quoted per job" : `From KSh ${t.price}`}
              </p>
              <div className="cta-row center">
                <a href={waLink(`Hi Eden, I'm interested in the ${t.name} option. Can we discuss it?`)} target="_blank" rel="noopener noreferrer" className="btn btn-blue btn-sm">
                  Ask about this
                </a>
              </div>
              <div className="plan-list">
                <p className="eyebrow">{t.plus.toLowerCase()}</p>
                <ul>
                  {t.features.map((f) => (
                    <li key={f}>
                      <Check /> {f}
                    </li>
                  ))}
                  {t.missing.map((f) => (
                    <li key={f} className="is-missing">
                      <span className="ic-dash" aria-hidden="true">–</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
              {OTHER_BUILDS.some((b) => b.tier === t.key) && (
                <p className="plan-eg">
                  <span className="eyebrow">Built at this level</span>
                  {OTHER_BUILDS.filter((b) => b.tier === t.key).map((b) => b.title).join(", ")}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- contact + footer ---------- */

function Contact() {
  return (
    <section id="contact" className="band band-sand">
      <div className="wrap center contact">
        <h2 className="t-hero" data-reveal>Let's build yours.</h2>
        <p className="t-sub" data-reveal>Tell me what the business needs. WhatsApp is fastest — usually a reply within a couple of hours during working hours.</p>
        <div className="cta-row center" data-reveal>
          <a href={waLink("Hi Eden, I'd like to talk about a website.")} target="_blank" rel="noopener noreferrer" className="btn btn-blue">
            Message on WhatsApp
          </a>
          <More href={`mailto:${EMAIL}`} external={false}>Email</More>
          <More href={INSTAGRAM}>Instagram</More>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <ol className="foot-notes">
          <li>Load time is the target every build is held to on a 3G connection — not a lab measurement.</li>
          <li>Reply time applies to WhatsApp messages during working hours, Nairobi time.</li>
        </ol>
        <div className="foot-cols">
          <div>
            <h4>Client work</h4>
            {CASE_STUDIES.map((s) => (
              <a key={s.n} href={s.demo} target="_blank" rel="noopener noreferrer">{s.client}</a>
            ))}
          </div>
          <div>
            <h4>More work</h4>
            {OTHER_BUILDS.slice(0, 6).map((b) => (
              <a key={b.title} href={b.demo} target="_blank" rel="noopener noreferrer">{b.title}</a>
            ))}
          </div>
          <div>
            <h4>Rates</h4>
            {PRICING_TIERS.map((t) => (
              <Link key={t.key} to="/pricing">{t.name}</Link>
            ))}
          </div>
          <div>
            <h4>Contact</h4>
            <a href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href={`mailto:${EMAIL}`}>Email</a>
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
        <div className="foot-base">
          <span>© 2026 Eden. All rights reserved.</span>
          <span>Nairobi / Nakuru, Kenya</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- page ---------- */

export default function EdenPortfolio() {
  const location = useLocation();
  const first = useRef(true);
  useRevealAll();

  useEffect(() => {
    const id = ROUTE_SECTION[location.pathname.replace(/^\//, "")];
    const el = id && document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 52;
      window.scrollTo({ top, behavior: first.current ? "auto" : "smooth" });
    } else if (!first.current) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    first.current = false;
  }, [location.pathname]);

  return (
    <div className="site">
      <Nav />
      <main>
        <Hero />
        <Highlights />
        <ClientWork />
        <MoreWork />
        <About />
        <WhyWebsite />
        <Process />
        <Stack />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
