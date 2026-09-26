import { useState, useRef, useEffect, lazy, Suspense } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { C, MONO, SERIF, SANS, useInView, usePrefersReducedMotion, useRevealAll } from "./tokens";
import { Mono, ArrowIcon, ArrowUpRight, CheckIcon, SectionTag, SectionHead, Page } from "./ui";

const PulsePage = lazy(() => import("./PulsePage"));

const WHATSAPP_NUMBER = "254142614743";
const INSTAGRAM = "https://www.instagram.com/vinn_y.codr/";
const EMAIL = "davidson.vis.16@gmail.com";
const GITHUB = "https://github.com/davidsonvis16-alt";

/* Real client work — the two paid builds. Numbers stay hedged
   until they are actually measured; no invented precision. */
const CASE_STUDIES = [
  {
    n: "01",
    client: "BakeMart Coffee House",
    place: "Nakuru",
    need: "The only open-kitchen coffee shop in Nakuru needed a menu customers could read before walking in, and orders they could take without a phone call.",
    constraint:
      "Menu, ordering and an admin dashboard all run off one Supabase backend — the storefront had to stay quick while staff were writing to the same database mid-service.",
    spec: [
      ["STACK", "React · Supabase · Tailwind"],
      ["SCOPE", "Menu · Ordering · Admin"],
      ["TARGET", "Usable on a 3-bar connection"],
      ["STATUS", "Live, in daily use"],
    ],
    img: "/bakemart%20image.png",
    demo: "https://bakemart.co.ke",
    domain: "bakemart.co.ke",
  },
  {
    n: "02",
    client: "Kijani Kafe",
    place: "Milimani, Nakuru",
    need: "A garden bar and restaurant that people choose for its atmosphere — the site had to carry that same slow, calm feel onto a screen.",
    constraint:
      "An atmosphere-led site wants big photography, and big photography is exactly what makes a page crawl on mobile data. Every image had to earn its weight.",
    spec: [
      ["STACK", "React · Next.js · Tailwind"],
      ["SCOPE", "Brand site · Menu · Location"],
      ["TARGET", "Photography-led, still light"],
      ["STATUS", "Live"],
    ],
    img: "/kijani%20image.jpeg",
    demo: "https://kijani-kafe.vercel.app/",
    domain: "kijani-kafe.vercel.app",
  },
];

/* Everything else — self-directed builds, not client engagements. Newest first. */
const OTHER_BUILDS = [
  {
    title: "Eden Phones",
    kind: "Phone shop · E-commerce",
    desc: "Genuine and certified-refurbished phones in Nairobi — same-day delivery, M-Pesa, and Lipa Mdogo Mdogo instalments.",
    stack: "Next.js · TypeScript · Tailwind",
    year: "2026",
    demo: "https://phoneske-gamma.vercel.app/",
    img: "/work/phones.jpg",
  },
  {
    title: "Petal",
    kind: "Florist · E-commerce",
    desc: "Same-day flower delivery across Nairobi — build-your-own bouquet, M-Pesa checkout, live delivery cutoff.",
    stack: "React · Vite",
    year: "2026",
    demo: "https://floristke.vercel.app/",
    img: "/work/petal.jpg",
  },
  {
    title: "Aldosi Merchants",
    kind: "Brand storefront",
    desc: "An editorial storefront for a Nairobi cooker brand — a lit-burner hero and a catalogue that reads like a magazine.",
    stack: "React · Tailwind · Framer Motion",
    year: "2026",
    demo: "https://aldosi-merchants.vercel.app/",
    img: "/work/aldosi.jpg",
  },
  {
    title: "Haven",
    kind: "Real estate",
    desc: "A cinematic property site — full-bleed residences, listings and viewing bookings, no UI framework underneath.",
    stack: "React · TypeScript · Framer Motion",
    year: "2026",
    demo: "https://homeskenya.vercel.app/",
    img: "/work/haven.jpg",
  },
  {
    title: "Global Mogul",
    kind: "Founder & author site",
    desc: "The home of an entrepreneurs lab and its founder — the book, a reading list, talks and a marketplace.",
    stack: "React · TypeScript · Tailwind",
    year: "2026",
    demo: "https://global-mogul.vercel.app/",
    img: "/work/fidel.jpg",
  },
  {
    title: "Gadellaa Arts",
    kind: "Tattoo studio · Nyeri",
    desc: "A dark, type-led site for a tattoo studio — portfolio, prices, the artist, and session booking.",
    stack: "React · TypeScript · CSS Modules",
    year: "2026",
    demo: "https://gadella.vercel.app/",
    img: "/work/gadella.jpg",
  },
  {
    title: "Bridges",
    kind: "Delivery platform",
    desc: "Food, groceries and pharmacy delivery across Kenyan cities — address-first search and category browsing.",
    stack: "React · TypeScript · Tailwind",
    year: "2026",
    demo: "https://bridges-theta.vercel.app/",
    img: "/work/bridges.jpg",
  },
  {
    title: "Arrow",
    kind: "Dating & discovery",
    desc: "Human-first discovery — a WhatsApp connection only unlocks after mutual interest, numbers never shown publicly.",
    stack: "React · TypeScript · Tailwind",
    year: "2026",
    demo: "https://arrow-puce.vercel.app/",
    img: "/work/arrow.jpg",
  },
  {
    title: "Beyond Fruits",
    kind: "Grocery · Delivery",
    desc: "Fresh produce with country-wide delivery — basket and checkout kept fast on mobile data.",
    stack: "React · Vite · Tailwind",
    year: "2026",
    demo: "https://beyond-taupe-one.vercel.app/",
    img: "/beyond%20image.jpeg",
  },
  {
    title: "Pulse",
    kind: "Music browser",
    desc: "A music browser built for indie listening — previews, categories, and direct links out.",
    stack: "React · TypeScript · Tailwind",
    year: "2026",
    demo: "/pulse",
    img: "/work/pulse.jpg",
  },
  {
    title: "Dating SaaS",
    kind: "Matchmaking platform",
    desc: "A matchmaking platform with real-time discovery and messaging.",
    stack: "React · TypeScript · Tailwind",
    year: "—",
    status: "pending",
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
    features: ["1 page, single layout", "WhatsApp button", "3-day turnaround"],
  },
  {
    key: "business",
    name: "Business Site",
    price: "30,000",
    note: "from KSh",
    featured: true,
    blurb: "The full shopfront — menu, story, location and payments.",
    features: ["Up to 5 pages, custom design", "WhatsApp + M-Pesa", "1 round of revisions", "7-day turnaround"],
  },
  {
    key: "custom",
    name: "Custom Build",
    price: "Scoped",
    note: "quoted per job",
    blurb: "Ordering, dashboards, bookings — whatever the business runs on.",
    features: ["Pages as required", "Custom design + backend", "Revisions scoped", "Ongoing support"],
  },
];

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Work" },
  { id: "process", label: "Process" },
  { id: "pricing", label: "Rates" },
  { id: "pulse", label: "Pulse" },
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
  { value: CASE_STUDIES.length, label: "Paying clients", note: "Nakuru" },
  { value: LIVE_COUNT, label: "Sites live", note: "client + self-directed" },
  { text: "< 2s", label: "Typical load, 3G", note: "target, not a lab figure" },
  { text: "< 2h", label: "Usual reply time", note: "WhatsApp, working hours" },
];

const waLink = (text) => `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

/* ---------- primitives ---------- */

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

function NairobiClock() {
  const fmt = () =>
    new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Africa/Nairobi" }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const t = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(t);
  }, []);
  return <span style={{ fontVariantNumeric: "tabular-nums" }}>{time}</span>;
}

function Marquee({ items, big = false, reverse = false }) {
  const row = (
    <div className="edn-marquee-row">
      {items.map((t, i) => (
        <span key={i} className={big ? "edn-marquee-big" : "edn-marquee-item"}>
          {t}
          <span className="edn-marquee-star" aria-hidden="true">✺</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`edn-marquee ${reverse ? "edn-marquee-rev" : ""}`}>
      <div className="edn-marquee-track">
        {row}
        <div className="edn-marquee-row" aria-hidden="true">
          {items.map((t, i) => (
            <span key={i} className={big ? "edn-marquee-big" : "edn-marquee-item"}>
              {t}
              <span className="edn-marquee-star">✺</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- hero ---------- */

function SignalBars() {
  return (
    <span className="edn-signal" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <i key={i} style={{ height: 4 + i * 3, animationDelay: `${i * 0.18}s` }} className={i === 3 ? "off" : ""} />
      ))}
    </span>
  );
}

function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    };
    el.addEventListener("pointermove", onMove);
    return () => {
      el.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const lines = [
    <>Websites that</>,
    <>
      <em className="edn-serif-em">work</em> on the
    </>,
    <>connection your</>,
    <>
      customers <em className="edn-serif-em edn-accent">actually</em> have.
    </>,
  ];

  return (
    <section id="home" ref={ref} className="edn-hero">
      <div className="edn-hero-glow" aria-hidden="true" />
      <div className="edn-hero-inner">
        <div className="edn-hero-meta">
          <span className="edn-rise" style={{ animationDelay: "0.05s" }}>
            <span className="edn-live-dot" /> Taking projects — Q4 2026
          </span>
          <span className="edn-rise edn-hide-sm" style={{ animationDelay: "0.12s" }}>
            Nairobi / Nakuru, KE
          </span>
          <span className="edn-rise edn-hide-sm" style={{ animationDelay: "0.19s" }}>
            <NairobiClock /> EAT
          </span>
        </div>

        <h1 className="edn-hero-title">
          {lines.map((l, i) => (
            <span className="edn-line" key={i}>
              <span className="edn-line-inner" style={{ animationDelay: `${0.25 + i * 0.09}s` }}>
                {l}
              </span>
            </span>
          ))}
        </h1>

        <div className="edn-hero-foot">
          <p className="edn-rise" style={{ animationDelay: "0.75s" }}>
            Lightweight, good-looking sites for shops, cafés and restaurants — built for patchy mobile
            data, not for a demo on office fibre. <span style={{ color: C.ink }}>Self-taught. No agency. Just Eden.</span>
          </p>
          <div className="edn-hero-cta edn-rise" style={{ animationDelay: "0.85s" }}>
            <Link to="/projects" className="edn-btn edn-btn-accent">
              See the work <ArrowIcon className="edn-arrow" />
            </Link>
            <a href={waLink("Hi Eden, I'd like a website for my business.")} target="_blank" rel="noopener noreferrer" className="edn-btn edn-btn-ghost">
              Start a project <ArrowUpRight className="edn-arrow-ur" />
            </a>
          </div>
          <div className="edn-hero-signal edn-rise edn-hide-sm" style={{ animationDelay: "0.95s" }}>
            <SignalBars />
            <Mono color={C.muted} size={11}>BUILT FOR 3 BARS</Mono>
          </div>
        </div>
      </div>

      <div className="edn-hero-marquee">
        <Marquee items={["BakeMart", "Kijani Kafe", "Eden Phones", "Petal", "Aldosi Merchants", "Haven", "Global Mogul", "Gadellaa Arts", "Bridges", "Arrow", "Beyond Fruits", "Pulse"]} />
      </div>
    </section>
  );
}

/* ---------- about: words light up as you scroll ---------- */

const ABOUT_TEXT =
  "I build websites for small businesses — restaurants, cafés, florists, shops — around Nairobi and Nakuru. Every one is held to the same standard: it has to look like it cost more than it did, and it has to load when the signal drops to three bars.";

function ScrollWords({ text }) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const words = text.split(" ");
  const [lit, setLit] = useState(reduced ? words.length : 0);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = Math.min(1, Math.max(0, (vh * 0.82 - r.top) / (r.height + vh * 0.3)));
        setLit(Math.round(p * words.length));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced, words.length]);

  return (
    <p ref={ref} className="edn-scrollwords">
      {words.map((w, i) => (
        <span key={i} className={i < lit ? "on" : ""}>
          {w}{" "}
        </span>
      ))}
    </p>
  );
}

function About() {
  return (
    <section id="about" className="edn-section">
      <div className="edn-wrap">
        <div data-reveal>
          <SectionTag n="01" label="ABOUT" />
        </div>
        <ScrollWords text={ABOUT_TEXT} />
        <div className="edn-about-foot" data-reveal>
          <p className="edn-lede" style={{ margin: 0 }}>
            No agency, no team — one person, mostly in <Mono size={14.5}>React</Mono>. If you want to see what
            I can actually build rather than what I say I can build, open{" "}
            <a href="https://bakemart.co.ke/" target="_blank" rel="noopener noreferrer" className="edn-inline-link">
              BakeMart
            </a>{" "}
            — real menu, real ordering, still usable on a weak connection.
          </p>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="edn-btn edn-btn-ghost">
            GitHub <ArrowUpRight className="edn-arrow-ur" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- proof ---------- */

function ProofItem({ item, start, i }) {
  const numeric = typeof item.value === "number";
  const counted = useCountUp(numeric ? item.value : 0, 1400, start);
  return (
    <div className="edn-proof-item" data-reveal style={{ transitionDelay: `${i * 0.08}s` }}>
      <div className="edn-proof-num">{numeric ? String(counted).padStart(2, "0") : item.text}</div>
      <div className="edn-proof-label">{item.label}</div>
      <Mono color={C.dim} size={11}>{item.note}</Mono>
    </div>
  );
}

function Proof() {
  const [ref, inView] = useInView(0.3);
  return (
    <section id="proof" className="edn-proof" ref={ref}>
      <div className="edn-wrap">
        <div className="edn-proof-grid">
          {PROOF.map((item, i) => (
            <ProofItem key={item.label} item={item} start={inView} i={i} />
          ))}
        </div>
        <p className="edn-proof-note" data-reveal>
          Two of these are counted off the work below. The other two are the targets every build is held
          to — not lab numbers, and they are not going to pretend to be.
        </p>
      </div>
    </section>
  );
}

/* ---------- work ---------- */

function CaseStudy({ study }) {
  return (
    <article className="edn-case" data-reveal>
      <a href={study.demo} target="_blank" rel="noopener noreferrer" className="edn-case-media">
        <img src={study.img} alt={`${study.client} website`} width="1152" height="720" loading="lazy" decoding="async" />
        <span className="edn-case-chip">
          <span className="edn-live-dot" /> {study.domain}
        </span>
        <span className="edn-case-view">
          Visit <ArrowUpRight size={18} />
        </span>
      </a>
      <div className="edn-case-body">
        <div className="edn-case-head">
          <Mono color={C.accent} size={12}>CLIENT {study.n}</Mono>
          <Mono color={C.muted} size={11.5} style={{ letterSpacing: "0.12em" }}>{study.place.toUpperCase()}</Mono>
        </div>
        <h3 className="edn-case-title">{study.client}</h3>
        <p className="edn-case-need">{study.need}</p>
        <div className="edn-case-constraint">
          <Mono color={C.ink} size={11} style={{ letterSpacing: "0.14em" }}>THE CONSTRAINT</Mono>
          <p>{study.constraint}</p>
        </div>
        <dl className="edn-spec">
          {study.spec.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}

function BuildIndex() {
  const [listRef, listInView] = useInView(0.05);
  const previewRef = useRef(null);
  const [active, setActive] = useState(-1);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: 0 });

  useEffect(() => {
    const p = pos.current;
    return () => cancelAnimationFrame(p.raf);
  }, []);

  const onMove = (e) => {
    const p = pos.current;
    p.tx = e.clientX;
    p.ty = e.clientY;
    if (p.raf) return;
    const tick = () => {
      p.x += (p.tx - p.x) * 0.16;
      p.y += (p.ty - p.y) * 0.16;
      if (previewRef.current) {
        const rot = Math.max(-8, Math.min(8, (p.tx - p.x) * 0.06));
        previewRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(28px, -50%) rotate(${rot}deg)`;
      }
      if (Math.abs(p.tx - p.x) > 0.3 || Math.abs(p.ty - p.y) > 0.3) p.raf = requestAnimationFrame(tick);
      else p.raf = 0;
    };
    p.raf = requestAnimationFrame(tick);
  };

  const onEnter = (i, e) => {
    const p = pos.current;
    if (active === -1) {
      p.x = e.clientX;
      p.y = e.clientY;
    }
    setActive(i);
  };

  return (
    <div className="edn-index" ref={listRef}>
      <div className="edn-index-head" data-reveal>
        <Mono color={C.ink} size={11.5} style={{ letterSpacing: "0.14em" }}>INDEX — OTHER BUILDS</Mono>
        <Mono color={C.muted} size={11.5}>self-directed · not client work</Mono>
      </div>

      <ul className="edn-index-list" onPointerMove={onMove} onPointerLeave={() => setActive(-1)}>
        {OTHER_BUILDS.map((b, i) => {
          const pending = b.status === "pending";
          const internal = b.demo && !b.demo.startsWith("http");
          const Wrapper = pending ? "div" : internal ? Link : "a";
          const props = pending ? {} : internal ? { to: b.demo } : { href: b.demo, target: "_blank", rel: "noopener noreferrer" };
          return (
            <li key={b.title} data-reveal onPointerEnter={(e) => onEnter(i, e)}>
              <Wrapper {...props} className={`edn-row ${pending ? "is-pending" : ""} ${active === i ? "is-active" : ""}`}>
                <span className="edn-row-n">{String(i + 1).padStart(2, "0")}</span>
                <span className="edn-row-main">
                  <span className="edn-row-title">{b.title}</span>
                  <span className="edn-row-desc">{b.desc}</span>
                </span>
                <span className="edn-row-kind">{b.kind}</span>
                <span className="edn-row-stack">{b.stack}</span>
                <span className="edn-row-go">
                  {pending ? <Mono color={C.muted} size={10.5} style={{ letterSpacing: "0.12em" }}>IN BUILD</Mono> : <ArrowUpRight size={20} />}
                </span>
                {b.img && listInView && (
                  <img className="edn-row-thumb" src={b.img} alt="" width="1152" height="720" loading="lazy" decoding="async" />
                )}
              </Wrapper>
            </li>
          );
        })}
      </ul>

      {listInView && (
        <div ref={previewRef} className={`edn-preview ${active >= 0 && OTHER_BUILDS[active].img ? "is-on" : ""}`} aria-hidden="true">
          {OTHER_BUILDS.map((b, i) =>
            b.img ? <img key={b.title} src={b.img} alt="" decoding="async" className={active === i ? "is-on" : ""} /> : null
          )}
        </div>
      )}
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" className="edn-section">
      <div className="edn-wrap">
        <SectionHead n="02" label="WORK" title="Two paying clients so far." em="Both still live.">
          Case files, not portfolio tiles — what the business needed, the constraint that shaped the
          build, and where you can go check it yourself.
        </SectionHead>
        <div style={{ display: "grid", gap: "clamp(40px, 6vw, 80px)" }}>
          {CASE_STUDIES.map((s) => (
            <CaseStudy key={s.n} study={s} />
          ))}
        </div>
        <BuildIndex />
      </div>
    </section>
  );
}

/* ---------- why / process / stack ---------- */

function WhyWebsite() {
  return (
    <section id="why" className="edn-section">
      <div className="edn-wrap">
        <SectionHead n="03" label="WHY" title="Why your business needs" em="a website." />
        <div className="edn-why">
          {WHY_POINTS.map((p, i) => (
            <div key={p.title} className="edn-why-item" data-reveal style={{ transitionDelay: `${(i % 2) * 0.08}s` }}>
              <span className="edn-why-n">{String(i + 1).padStart(2, "0")}</span>
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
    <section id="process" className="edn-section">
      <div className="edn-wrap">
        <SectionHead n="04" label="PROCESS" title="How a project" em="comes together." />
        <div className="edn-process">
          {PROCESS_STEPS.map((step, i) => (
            <div key={step.n} className="edn-step" data-reveal style={{ transitionDelay: `${i * 0.08}s` }}>
              <span className="edn-step-n">{step.n}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="edn-stack" aria-label="Stack">
      <div className="edn-wrap" style={{ marginBottom: 28 }}>
        <SectionTag n="05" label="STACK — WHAT THESE SITES ARE BUILT WITH" />
      </div>
      <Marquee items={SKILLS.slice(0, 7)} big />
      <Marquee items={SKILLS.slice(7)} big reverse />
    </section>
  );
}

/* ---------- rates ---------- */

function Pricing() {
  return (
    <section id="pricing" className="edn-section">
      <div className="edn-wrap">
        <SectionHead n="06" label="RATES" title="What it costs to" em="work together.">
          Starting points, not rigid packages. Every site gets scoped against what the business actually
          needs before a final number goes out.
        </SectionHead>
        <div className="edn-tiers">
          {PRICING_TIERS.map((t, i) => (
            <div key={t.key} className={`edn-tier ${t.featured ? "is-featured" : ""}`} data-reveal style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="edn-tier-top">
                <span className="edn-tier-name">{t.name}</span>
                {t.featured && <span className="edn-tier-badge">MOST BOOKED</span>}
              </div>
              <div className="edn-tier-price">
                <Mono color={C.muted} size={11} style={{ letterSpacing: "0.1em" }}>{t.note.toUpperCase()}</Mono>
                <span>{t.price}</span>
              </div>
              <p className="edn-tier-blurb">{t.blurb}</p>
              <ul>
                {t.features.map((f) => (
                  <li key={f}>
                    <CheckIcon /> {f}
                  </li>
                ))}
              </ul>
              <a
                href={waLink(`Hi Eden, I'm interested in the ${t.name} option. Can we discuss it?`)}
                target="_blank"
                rel="noopener noreferrer"
                className={`edn-btn ${t.featured ? "edn-btn-accent" : "edn-btn-ghost"}`}
                style={{ width: "100%", justifyContent: "center" }}
              >
                Ask about this <ArrowUpRight className="edn-arrow-ur" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- contact / footer ---------- */

function Contact() {
  return (
    <section id="contact" className="edn-contact">
      <div className="edn-wrap">
        <div data-reveal>
          <SectionTag n="07" label="CONTACT" />
        </div>
        <a href={waLink("Hi Eden, I'd like to talk about a website.")} target="_blank" rel="noopener noreferrer" className="edn-contact-big" data-reveal>
          <span>Tell me what</span>
          <span>
            the business <em className="edn-serif-em edn-accent">needs.</em>
          </span>
          <span className="edn-contact-arrow" aria-hidden="true">
            <ArrowUpRight size={56} />
          </span>
        </a>
        <div className="edn-contact-row" data-reveal>
          <p className="edn-lede" style={{ margin: 0, maxWidth: 420 }}>
            WhatsApp is fastest — usually a reply inside a couple of hours during working hours.
          </p>
          <div className="edn-contact-links">
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="edn-btn edn-btn-whatsapp">
              WhatsApp
            </a>
            <a href={`mailto:${EMAIL}`} className="edn-btn edn-btn-ghost">Email</a>
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="edn-btn edn-btn-ghost">Instagram</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="edn-footer">
      <div className="edn-wrap edn-footer-row">
        <Mono color={C.muted} size={11.5}>© 2026 Eden — Nairobi / Nakuru</Mono>
        <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="edn-social">GitHub</a>
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="edn-social">Instagram</a>
          <a href={`mailto:${EMAIL}`} className="edn-social">Email</a>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="edn-social">WhatsApp</a>
        </div>
      </div>
      <div className="edn-footer-word" aria-hidden="true">
        Eden<span style={{ color: C.accent }}>.</span>
      </div>
    </footer>
  );
}

/* ---------- chrome ---------- */

function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const height = h.scrollHeight - h.clientHeight;
        if (ref.current) ref.current.style.transform = `scaleX(${height > 0 ? h.scrollTop / height : 0})`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="edn-progress" aria-hidden="true">
      <div ref={ref} />
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav className={`edn-nav ${scrolled ? "is-scrolled" : ""}`}>
        <Link to="/" className="edn-logo" onClick={() => setOpen(false)}>
          Eden<span style={{ color: C.accent }}>.</span>
        </Link>

        <div className="edn-desktop-nav">
          {NAV_ITEMS.map((item) => (
            <Link key={item.id} to={`/${item.id}`} className={`edn-navlink ${location.pathname === `/${item.id}` ? "is-current" : ""}`}>
              {item.label}
            </Link>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <a href={waLink("Hi Eden, I'd like a website for my business.")} target="_blank" rel="noopener noreferrer" className="edn-nav-cta">
            <span className="edn-live-dot" /> Let's talk
          </a>
          <button onClick={() => setOpen((v) => !v)} className={`edn-burger ${open ? "is-open" : ""}`} aria-expanded={open} aria-label="Toggle navigation">
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`edn-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="edn-menu-links">
          {[{ id: "", label: "Home" }, ...NAV_ITEMS].map((item, i) => (
            <Link
              key={item.label}
              to={`/${item.id}`}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              style={{ transitionDelay: open ? `${0.08 + i * 0.05}s` : "0s" }}
            >
              <Mono color={C.dim} size={11}>{String(i).padStart(2, "0")}</Mono>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="edn-menu-foot">
          <Mono color={C.muted} size={11}>
            <NairobiClock /> EAT · NAIROBI
          </Mono>
          <a href={`mailto:${EMAIL}`} className="edn-social" tabIndex={open ? 0 : -1}>{EMAIL}</a>
        </div>
      </div>
    </>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={`edn-back-top ${show ? "is-on" : ""}`} aria-label="Back to top" tabIndex={show ? 0 : -1}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    </button>
  );
}

/* ---------- pages ---------- */

function PulseFallback() {
  return (
    <Page offset>
      <div className="edn-wrap" style={{ padding: "90px 0" }}>
        <Mono color={C.muted}>loading pulse...</Mono>
      </div>
    </Page>
  );
}

function PageHome() {
  return (
    <Page>
      <Hero />
      <About />
      <Proof />
      <Projects />
      <WhyWebsite />
      <Process />
      <Skills />
      <Pricing />
      <Contact />
    </Page>
  );
}

export default function EdenPortfolio() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useRevealAll();

  return (
    <div className="edn-root">
      <style>{CSS}</style>
      <div className="edn-grain" aria-hidden="true" />
      <ScrollProgress />
      <Nav />

      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageHome />} />
        <Route path="/about" element={<Page offset><About /></Page>} />
        <Route path="/why" element={<Page offset><WhyWebsite /></Page>} />
        <Route path="/process" element={<Page offset><Process /></Page>} />
        <Route path="/projects" element={<Page offset><Projects /></Page>} />
        <Route path="/skills" element={<Page offset><Skills /></Page>} />
        <Route path="/pricing" element={<Page offset><Pricing /></Page>} />
        <Route path="/pulse" element={<Suspense fallback={<PulseFallback />}><PulsePage /></Suspense>} />
        <Route path="/contact" element={<Page offset><Contact /></Page>} />
      </Routes>

      <Footer />
      <BackToTop />
    </div>
  );
}

/* ---------- styles ---------- */

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const CSS = `
  html { scroll-behavior: smooth; background: ${C.bg}; }
  ::selection { background: ${C.accent}; color: ${C.bg}; }
  .edn-root { background: ${C.bg}; color: ${C.ink}; font-family: ${SANS}; min-height: 100vh; position: relative; overflow-x: clip; }
  .edn-page { position: relative; z-index: 1; animation: ednFade .6s ${EASE} both; }
  .edn-wrap { max-width: 1320px; margin: 0 auto; padding: 0 clamp(16px, 4vw, 48px); }
  .edn-section { padding: clamp(80px, 12vw, 160px) 0; position: relative; }
  a { color: inherit; }

  @keyframes ednFade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes ednRise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
  @keyframes ednLine { from { transform: translateY(105%); } to { transform: none; } }
  @keyframes ednPulse { 0% { box-shadow: 0 0 0 0 rgba(255,90,31,.55); } 70% { box-shadow: 0 0 0 9px rgba(255,90,31,0); } 100% { box-shadow: 0 0 0 0 rgba(255,90,31,0); } }
  @keyframes ednMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  @keyframes ednBar { 0%, 100% { opacity: .35; } 50% { opacity: 1; } }
  @keyframes ednGrain { 0%,100% { transform: translate(0,0); } 20% { transform: translate(-3%,2%); } 40% { transform: translate(2%,-3%); } 60% { transform: translate(-2%,-1%); } 80% { transform: translate(3%,3%); } }

  /* film grain — one tiny SVG, no image request */
  .edn-grain { position: fixed; inset: -50%; z-index: 300; pointer-events: none; opacity: .07; mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
    animation: ednGrain 1.2s steps(4) infinite; }

  [data-reveal] { opacity: 0; transform: translateY(28px); transition: opacity .9s ${EASE}, transform .9s ${EASE}; }
  [data-reveal].is-in { opacity: 1; transform: none; }
  .edn-rise { opacity: 0; animation: ednRise .9s ${EASE} both; }

  .edn-live-dot { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: ${C.accent}; animation: ednPulse 2s infinite; vertical-align: middle; margin-right: 6px; }
  .edn-serif-em { font-family: ${SERIF}; font-style: italic; font-weight: 400; letter-spacing: -0.01em; }
  .edn-accent { color: ${C.accent}; }

  .edn-tag { display: inline-flex; align-items: center; gap: 8px; font-family: ${MONO}; font-size: 11.5px; letter-spacing: .14em; color: ${C.muted}; text-transform: uppercase; margin-bottom: 22px; }
  .edn-tag-dot { width: 6px; height: 6px; background: ${C.accent}; border-radius: 50%; }
  .edn-h2 { font-size: clamp(2.2rem, 6vw, 5.2rem); font-weight: 500; line-height: .98; letter-spacing: -0.045em; margin: 0; max-width: 1000px; }
  .edn-lede { font-size: clamp(15px, 1.2vw, 17px); line-height: 1.7; color: ${C.muted}; max-width: 560px; margin: 24px 0 0; }
  .edn-inline-link { color: ${C.ink}; text-decoration: underline; text-decoration-color: ${C.accent}; text-underline-offset: 4px; }
  .edn-inline-link:hover { color: ${C.accent}; }

  /* buttons */
  .edn-btn { display: inline-flex; align-items: center; gap: 10px; padding: 14px 22px; font-size: 14px; font-weight: 500; text-decoration: none; cursor: pointer; border-radius: 999px; font-family: inherit; transition: background .3s ${EASE}, color .3s ${EASE}, border-color .3s ${EASE}, transform .3s ${EASE}; white-space: nowrap; }
  .edn-btn:active { transform: scale(.97); }
  .edn-btn-accent { background: ${C.accent}; color: ${C.bg}; border: 1px solid ${C.accent}; }
  .edn-btn-accent:hover { background: ${C.ink}; border-color: ${C.ink}; }
  .edn-btn-ghost { background: transparent; color: ${C.ink}; border: 1px solid rgba(239,233,223,.22); }
  .edn-btn-ghost:hover { border-color: ${C.ink}; background: ${C.ink}; color: ${C.bg}; }
  .edn-btn-whatsapp { background: ${C.whatsapp}; color: #06280F; border: 1px solid ${C.whatsapp}; font-weight: 600; }
  .edn-btn-whatsapp:hover { filter: brightness(1.08); }
  .edn-arrow, .edn-arrow-ur { transition: transform .3s ${EASE}; }
  .edn-btn:hover .edn-arrow { transform: translateX(4px); }
  .edn-btn:hover .edn-arrow-ur { transform: translate(2px, -2px); }

  /* progress */
  .edn-progress { position: fixed; top: 0; left: 0; right: 0; height: 2px; z-index: 210; pointer-events: none; }
  .edn-progress div { height: 100%; background: ${C.accent}; transform-origin: 0 50%; transform: scaleX(0); }

  /* nav */
  .edn-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; padding: 18px clamp(16px, 4vw, 48px); display: flex; align-items: center; justify-content: space-between; transition: background .4s ${EASE}, padding .4s ${EASE}, border-color .4s; border-bottom: 1px solid transparent; }
  .edn-nav.is-scrolled { background: rgba(11,10,9,.72); backdrop-filter: blur(14px) saturate(1.4); -webkit-backdrop-filter: blur(14px) saturate(1.4); padding-top: 12px; padding-bottom: 12px; border-color: ${C.hairline}; }
  .edn-logo { font-size: 22px; font-weight: 600; letter-spacing: -0.04em; text-decoration: none; color: ${C.ink}; }
  .edn-desktop-nav { display: flex; gap: 4px; padding: 5px; border: 1px solid ${C.hairline}; border-radius: 999px; background: rgba(24,22,19,.55); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
  .edn-navlink { color: ${C.muted}; font-size: 13.5px; text-decoration: none; padding: 7px 14px; border-radius: 999px; transition: color .25s, background .25s; }
  .edn-navlink:hover, .edn-navlink.is-current { color: ${C.ink}; background: rgba(239,233,223,.08); }
  .edn-nav-cta { display: inline-flex; align-items: center; font-size: 13.5px; text-decoration: none; padding: 9px 16px; border-radius: 999px; background: ${C.ink}; color: ${C.bg}; font-weight: 500; transition: background .3s; }
  .edn-nav-cta:hover { background: ${C.accent}; }
  .edn-burger { display: none; width: 42px; height: 42px; border-radius: 50%; border: 1px solid rgba(239,233,223,.22); background: transparent; cursor: pointer; position: relative; }
  .edn-burger span { position: absolute; left: 12px; right: 12px; height: 1.5px; background: ${C.ink}; transition: transform .4s ${EASE}, top .4s ${EASE}; }
  .edn-burger span:first-child { top: 16px; }
  .edn-burger span:last-child { top: 24px; }
  .edn-burger.is-open span:first-child { top: 20px; transform: rotate(45deg); }
  .edn-burger.is-open span:last-child { top: 20px; transform: rotate(-45deg); }

  .edn-menu { position: fixed; inset: 0; z-index: 190; background: ${C.bg}; padding: 110px 20px 28px; display: flex; flex-direction: column; justify-content: space-between; clip-path: circle(0% at calc(100% - 40px) 40px); transition: clip-path .7s ${EASE}; pointer-events: none; }
  .edn-menu.is-open { clip-path: circle(150% at calc(100% - 40px) 40px); pointer-events: auto; }
  .edn-menu-links { display: flex; flex-direction: column; }
  .edn-menu-links a { display: flex; align-items: baseline; gap: 14px; font-size: clamp(2.4rem, 11vw, 4rem); letter-spacing: -0.04em; line-height: 1.12; text-decoration: none; color: ${C.ink}; opacity: 0; transform: translateY(24px); transition: opacity .6s ${EASE}, transform .6s ${EASE}, color .2s; }
  .edn-menu.is-open .edn-menu-links a { opacity: 1; transform: none; }
  .edn-menu-links a:hover { color: ${C.accent}; }
  .edn-menu-foot { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; border-top: 1px solid ${C.hairline}; padding-top: 18px; }

  /* hero */
  .edn-hero { position: relative; min-height: 100svh; display: flex; flex-direction: column; justify-content: flex-end; overflow: hidden; --mx: 70%; --my: 30%; }
  .edn-hero-glow { position: absolute; inset: 0; pointer-events: none;
    background:
      radial-gradient(600px circle at var(--mx) var(--my), rgba(255,90,31,.16), transparent 60%),
      radial-gradient(900px 500px at 85% 10%, rgba(255,90,31,.10), transparent 70%),
      radial-gradient(700px 400px at 0% 100%, rgba(239,233,223,.05), transparent 70%); }
  .edn-hero::before { content: ""; position: absolute; inset: 0; pointer-events: none; opacity: .5;
    background-image: linear-gradient(${C.hairline} 1px, transparent 1px), linear-gradient(90deg, ${C.hairline} 1px, transparent 1px);
    background-size: 88px 88px; mask-image: radial-gradient(ellipse at 70% 30%, #000 10%, transparent 65%); -webkit-mask-image: radial-gradient(ellipse at 70% 30%, #000 10%, transparent 65%); }
  .edn-hero-inner { position: relative; width: 100%; max-width: 1320px; margin: 0 auto; padding: 130px clamp(16px, 4vw, 48px) 48px; }
  .edn-hero-meta { display: flex; gap: clamp(16px, 4vw, 48px); font-family: ${MONO}; font-size: 11.5px; letter-spacing: .1em; text-transform: uppercase; color: ${C.muted}; margin-bottom: clamp(28px, 5vw, 56px); flex-wrap: wrap; }
  .edn-hero-title { font-size: clamp(2.7rem, 8.2vw, 8.4rem); font-weight: 500; line-height: .92; letter-spacing: -0.055em; margin: 0; }
  .edn-hero-title .edn-serif-em { letter-spacing: -0.02em; padding-right: .04em; }
  .edn-line { display: block; overflow: hidden; padding-bottom: .06em; margin-bottom: -.06em; }
  .edn-line-inner { display: inline-block; animation: ednLine 1.1s ${EASE} both; }
  .edn-hero-foot { display: grid; grid-template-columns: minmax(0, 1.1fr) auto auto; gap: clamp(20px, 4vw, 56px); align-items: end; margin-top: clamp(36px, 5vw, 64px); }
  .edn-hero-foot p { font-size: clamp(15px, 1.25vw, 17.5px); line-height: 1.65; color: ${C.muted}; margin: 0; max-width: 520px; }
  .edn-hero-cta { display: flex; gap: 10px; flex-wrap: wrap; }
  .edn-hero-signal { display: flex; align-items: center; gap: 10px; }
  .edn-signal { display: inline-flex; align-items: flex-end; gap: 3px; height: 14px; }
  .edn-signal i { width: 4px; background: ${C.accent}; border-radius: 1px; animation: ednBar 1.6s ease-in-out infinite; }
  .edn-signal i.off { background: ${C.dim}; animation: none; }
  .edn-hero-marquee { position: relative; border-top: 1px solid ${C.hairline}; padding: 16px 0; }

  /* marquee */
  .edn-marquee { overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
  .edn-marquee-track { display: flex; width: max-content; animation: ednMarquee 38s linear infinite; }
  .edn-marquee-rev .edn-marquee-track { animation-direction: reverse; }
  .edn-marquee:hover .edn-marquee-track { animation-play-state: paused; }
  .edn-marquee-row { display: flex; flex-shrink: 0; }
  .edn-marquee-item { font-family: ${MONO}; font-size: 12px; letter-spacing: .14em; text-transform: uppercase; color: ${C.muted}; padding: 0 20px; display: inline-flex; align-items: center; gap: 40px; white-space: nowrap; }
  .edn-marquee-big { font-size: clamp(2.6rem, 8vw, 7rem); font-weight: 500; letter-spacing: -0.05em; line-height: 1.1; color: rgba(239,233,223,.16); padding: 0 .3em; display: inline-flex; align-items: center; gap: .6em; white-space: nowrap; transition: color .4s; }
  .edn-marquee-big:hover { color: ${C.ink}; }
  .edn-marquee-star { color: ${C.accent}; font-size: .5em; }
  .edn-marquee-item .edn-marquee-star { font-size: 1em; }

  /* about */
  .edn-scrollwords { font-size: clamp(1.7rem, 4.3vw, 3.9rem); line-height: 1.12; letter-spacing: -0.035em; font-weight: 500; margin: 0; max-width: 1180px; }
  .edn-scrollwords span { color: rgba(239,233,223,.14); transition: color .35s ease; }
  .edn-scrollwords span.on { color: ${C.ink}; }
  .edn-about-foot { display: flex; justify-content: space-between; align-items: flex-end; gap: 32px; flex-wrap: wrap; margin-top: clamp(40px, 6vw, 72px); padding-top: 28px; border-top: 1px solid ${C.hairline}; }

  /* proof */
  .edn-proof { padding: clamp(56px, 8vw, 96px) 0; border-top: 1px solid ${C.hairline}; border-bottom: 1px solid ${C.hairline}; background: ${C.bgRaise}; }
  .edn-proof-grid { display: grid; grid-template-columns: repeat(4, 1fr); }
  .edn-proof-item { padding: 8px clamp(12px, 2vw, 28px); border-left: 1px solid ${C.hairline}; }
  .edn-proof-item:first-child { border-left: none; padding-left: 0; }
  .edn-proof-num { font-size: clamp(3rem, 7vw, 6.4rem); font-weight: 500; letter-spacing: -0.06em; line-height: 1; font-variant-numeric: tabular-nums; }
  .edn-proof-item:first-child .edn-proof-num { color: ${C.accent}; }
  .edn-proof-label { font-size: 14px; margin: 14px 0 4px; }
  .edn-proof-note { font-size: 13.5px; color: ${C.muted}; margin: 40px 0 0; max-width: 620px; line-height: 1.7; }

  /* case studies */
  .edn-case { display: grid; grid-template-columns: 1.35fr 1fr; gap: clamp(28px, 4vw, 64px); align-items: start; }
  .edn-case:nth-child(even) .edn-case-media { order: 2; }
  .edn-case-media { position: relative; display: block; overflow: hidden; border-radius: 14px; border: 1px solid ${C.hairline}; background: ${C.surface}; aspect-ratio: 16 / 10; }
  .edn-case-media img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; transition: transform 1.2s ${EASE}, filter .6s; filter: saturate(.9); }
  .edn-case-media:hover img { transform: scale(1.045); filter: saturate(1.05); }
  .edn-case-chip { position: absolute; left: 14px; top: 14px; font-family: ${MONO}; font-size: 11px; padding: 7px 12px; border-radius: 999px; background: rgba(11,10,9,.75); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); color: ${C.ink}; }
  .edn-case-view { position: absolute; right: 16px; bottom: 16px; width: 96px; height: 96px; border-radius: 50%; background: ${C.accent}; color: ${C.bg}; display: flex; align-items: center; justify-content: center; gap: 4px; font-size: 13px; font-weight: 600; transform: scale(0) rotate(-30deg); transition: transform .6s ${EASE}; }
  .edn-case-media:hover .edn-case-view, .edn-case-media:focus-visible .edn-case-view { transform: scale(1) rotate(0); }
  .edn-case-head { display: flex; justify-content: space-between; gap: 14px; margin-bottom: 16px; }
  .edn-case-title { font-size: clamp(2rem, 3.8vw, 3.4rem); font-weight: 500; letter-spacing: -0.045em; line-height: 1; margin: 0 0 20px; }
  .edn-case-need { font-size: 16px; line-height: 1.7; color: ${C.muted}; margin: 0 0 24px; }
  .edn-case-constraint { border-left: 2px solid ${C.accent}; padding: 2px 0 2px 16px; margin-bottom: 26px; }
  .edn-case-constraint p { font-size: 14.5px; line-height: 1.7; color: ${C.muted}; margin: 8px 0 0; }
  .edn-spec { margin: 0; border-top: 1px solid ${C.hairline}; }
  .edn-spec div { display: flex; justify-content: space-between; gap: 20px; padding: 11px 0; border-bottom: 1px solid ${C.hairline}; }
  .edn-spec dt { font-family: ${MONO}; font-size: 11px; color: ${C.dim}; letter-spacing: .12em; }
  .edn-spec dd { font-family: ${MONO}; font-size: 12px; color: ${C.ink}; margin: 0; text-align: right; }

  /* build index */
  .edn-index { margin-top: clamp(80px, 11vw, 150px); }
  .edn-index-head { display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; padding-bottom: 16px; }
  .edn-index-list { list-style: none; margin: 0; padding: 0; border-top: 1px solid ${C.hairline}; }
  .edn-index-list li { border-bottom: 1px solid ${C.hairline}; }
  .edn-row { position: relative; display: grid; grid-template-columns: 56px minmax(0, 1fr) 190px 250px 44px; gap: 20px; align-items: center; padding: clamp(20px, 2.4vw, 30px) 0; text-decoration: none; color: ${C.ink}; isolation: isolate; }
  .edn-row::before { content: ""; position: absolute; inset: 0 -16px; background: ${C.surface}; transform: scaleY(0); transform-origin: bottom; transition: transform .5s ${EASE}; z-index: -1; border-radius: 6px; }
  .edn-row.is-active::before, .edn-row:focus-visible::before { transform: scaleY(1); }
  .edn-row-n { font-family: ${MONO}; font-size: 12px; color: ${C.dim}; transition: color .3s; }
  .edn-row-main { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
  .edn-row-title { font-size: clamp(1.9rem, 4.4vw, 3.8rem); font-weight: 500; letter-spacing: -0.05em; line-height: 1; transition: transform .5s ${EASE}, color .3s; }
  .edn-row-desc { font-size: 14px; color: ${C.muted}; line-height: 1.55; max-width: 540px; max-height: 0; opacity: 0; overflow: hidden; transition: max-height .5s ${EASE}, opacity .4s; }
  .edn-row-kind, .edn-row-stack { font-family: ${MONO}; font-size: 11.5px; color: ${C.muted}; letter-spacing: .04em; }
  .edn-row-go { display: flex; justify-content: flex-end; color: ${C.muted}; transition: color .3s, transform .5s ${EASE}; }
  .edn-row.is-active .edn-row-n, .edn-row.is-active .edn-row-go { color: ${C.accent}; }
  .edn-row.is-active .edn-row-title { transform: translateX(10px); }
  .edn-row.is-active .edn-row-desc { max-height: 80px; opacity: 1; }
  .edn-row.is-active .edn-row-go { transform: rotate(45deg); }
  .edn-row.is-pending { opacity: .5; }
  .edn-row-thumb { display: none; }

  .edn-preview { position: fixed; left: 0; top: 0; width: 380px; aspect-ratio: 16 / 10; z-index: 150; pointer-events: none; border-radius: 12px; overflow: hidden; opacity: 0; scale: .6; transition: opacity .35s ${EASE}, scale .5s ${EASE}; box-shadow: 0 30px 80px rgba(0,0,0,.6); border: 1px solid rgba(239,233,223,.14); background: ${C.surface}; }
  .edn-preview.is-on { opacity: 1; scale: 1; }
  .edn-preview img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: top; opacity: 0; transform: scale(1.12); transition: opacity .4s, transform .8s ${EASE}; }
  .edn-preview img.is-on { opacity: 1; transform: none; }

  /* why */
  .edn-why { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: ${C.hairline}; border: 1px solid ${C.hairline}; border-radius: 14px; overflow: hidden; }
  .edn-why-item { background: ${C.bg}; padding: clamp(28px, 3.5vw, 48px); position: relative; transition: background .4s; }
  .edn-why-item:hover { background: ${C.bgRaise}; }
  .edn-why-n { font-family: ${MONO}; font-size: 12px; color: ${C.accent}; }
  .edn-why-item h3 { font-size: clamp(1.35rem, 2.2vw, 1.9rem); font-weight: 500; letter-spacing: -0.035em; margin: 18px 0 12px; line-height: 1.1; }
  .edn-why-item p { font-size: 15px; line-height: 1.7; color: ${C.muted}; margin: 0; max-width: 460px; }

  /* process */
  .edn-process { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; counter-reset: step; }
  .edn-step { border-top: 1px solid rgba(239,233,223,.22); padding-top: 22px; position: relative; }
  .edn-step::before { content: ""; position: absolute; top: -1px; left: 0; height: 1px; width: 0; background: ${C.accent}; transition: width .8s ${EASE}; }
  .edn-step:hover::before { width: 100%; }
  .edn-step-n { display: block; font-family: ${SERIF}; font-style: italic; font-size: clamp(3.4rem, 6vw, 5.5rem); line-height: 1; color: ${C.dim}; transition: color .4s; }
  .edn-step:hover .edn-step-n { color: ${C.accent}; }
  .edn-step h3 { font-size: 20px; font-weight: 500; letter-spacing: -0.02em; margin: 18px 0 10px; }
  .edn-step p { font-size: 14.5px; line-height: 1.7; color: ${C.muted}; margin: 0; }

  /* stack */
  .edn-stack { padding: clamp(40px, 6vw, 80px) 0 clamp(80px, 10vw, 140px); display: grid; gap: 4px; }
  .edn-stack > .edn-wrap { width: 100%; box-sizing: border-box; }

  /* rates */
  .edn-tiers { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; align-items: stretch; }
  .edn-tier { position: relative; border: 1px solid ${C.hairline}; border-radius: 18px; padding: clamp(24px, 2.6vw, 34px); background: ${C.bgRaise}; display: flex; flex-direction: column; gap: 20px; transition: border-color .4s, transform .6s ${EASE}; }
  .edn-tier:hover { border-color: rgba(239,233,223,.28); transform: translateY(-4px); }
  .edn-tier.is-featured { background: linear-gradient(180deg, rgba(255,90,31,.14), rgba(255,90,31,.02) 55%), ${C.bgRaise}; border-color: rgba(255,90,31,.45); }
  .edn-tier-top { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
  .edn-tier-name { font-size: 15px; font-weight: 500; }
  .edn-tier-badge { font-family: ${MONO}; font-size: 10px; letter-spacing: .12em; color: ${C.bg}; background: ${C.accent}; padding: 5px 9px; border-radius: 999px; }
  .edn-tier-price { display: flex; flex-direction: column; gap: 6px; }
  .edn-tier-price span:last-child { font-size: clamp(2.6rem, 4.4vw, 3.8rem); font-weight: 500; letter-spacing: -0.05em; line-height: 1; font-variant-numeric: tabular-nums; }
  .edn-tier-blurb { font-size: 14.5px; line-height: 1.6; color: ${C.muted}; margin: 0; }
  .edn-tier ul { list-style: none; margin: 0; padding: 18px 0 0; border-top: 1px solid ${C.hairline}; display: grid; gap: 11px; flex: 1; align-content: start; }
  .edn-tier li { display: flex; align-items: center; gap: 10px; font-size: 14px; }

  /* contact */
  .edn-contact { padding: clamp(90px, 13vw, 180px) 0 clamp(60px, 8vw, 100px); border-top: 1px solid ${C.hairline}; position: relative; overflow: hidden; }
  .edn-contact::before { content: ""; position: absolute; left: 50%; bottom: -40%; width: 120vw; height: 80%; transform: translateX(-50%); background: radial-gradient(ellipse at center, rgba(255,90,31,.16), transparent 62%); pointer-events: none; }
  .edn-contact-big { position: relative; display: flex; flex-direction: column; text-decoration: none; color: ${C.ink}; font-size: clamp(2.8rem, 9vw, 8.6rem); font-weight: 500; letter-spacing: -0.055em; line-height: .95; }
  .edn-contact-big > span:not(.edn-contact-arrow) { transition: transform .7s ${EASE}; }
  .edn-contact-big:hover > span:first-child { transform: translateX(-12px); }
  .edn-contact-big:hover > span:nth-child(2) { transform: translateX(12px); }
  .edn-contact-arrow { position: absolute; right: 0; top: 0; width: clamp(64px, 9vw, 130px); height: clamp(64px, 9vw, 130px); border-radius: 50%; border: 1px solid rgba(239,233,223,.25); display: flex; align-items: center; justify-content: center; transition: background .4s, color .4s, transform .6s ${EASE}, border-color .4s; }
  .edn-contact-big:hover .edn-contact-arrow { background: ${C.accent}; border-color: ${C.accent}; color: ${C.bg}; transform: rotate(45deg); }
  .edn-contact-row { display: flex; justify-content: space-between; align-items: flex-end; gap: 28px; flex-wrap: wrap; margin-top: clamp(40px, 6vw, 72px); position: relative; }
  .edn-contact-links { display: flex; gap: 10px; flex-wrap: wrap; }

  /* footer */
  .edn-footer { border-top: 1px solid ${C.hairline}; padding-top: 24px; overflow: hidden; position: relative; z-index: 1; }
  .edn-footer-row { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; }
  .edn-footer-word { font-size: clamp(7rem, 31vw, 30rem); font-weight: 600; letter-spacing: -0.07em; line-height: .72; text-align: center; margin-top: clamp(24px, 4vw, 48px); color: ${C.surface}; user-select: none; transform: translateY(8%); }
  .edn-social { color: ${C.muted}; font-size: 13px; text-decoration: none; transition: color .2s; }
  .edn-social:hover { color: ${C.accent}; }

  .edn-back-top { position: fixed; bottom: 22px; right: 22px; z-index: 90; width: 46px; height: 46px; background: ${C.ink}; color: ${C.bg}; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background .3s, opacity .4s, transform .4s ${EASE}; opacity: 0; transform: translateY(12px) scale(.8); pointer-events: none; }
  .edn-back-top.is-on { opacity: 1; transform: none; pointer-events: auto; }
  .edn-back-top:hover { background: ${C.accent}; }

  a:focus-visible, button:focus-visible { outline: 2px solid ${C.accent}; outline-offset: 3px; }

  /* pulse page */
  .edn-music-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 14px; }
  .pulse-card { background: ${C.bgRaise}; border: 1px solid ${C.hairline}; border-radius: 14px; overflow: hidden; display: flex; flex-direction: column; transition: border-color .3s, transform .5s ${EASE}; }
  .pulse-card:hover { border-color: ${C.accent}; transform: translateY(-3px); }
  .pulse-card-artwork { position: relative; width: 100%; overflow: hidden; background: ${C.surface}; }
  .pulse-card-artwork-img, .pulse-card-artwork-placeholder, .pulse-spotify-iframe { width: 100%; height: 152px; display: block; border: none; }
  .pulse-card-artwork-placeholder { display: flex; align-items: center; justify-content: center; }
  .pulse-card-info { padding: 13px; display: flex; flex-direction: column; gap: 4px; text-decoration: none; }
  .pulse-card-title { font-size: 14px; font-weight: 500; color: ${C.ink}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .pulse-card-artist { font-family: ${MONO}; font-size: 11.5px; color: ${C.muted}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  /* touch devices: no cursor preview, show thumbnails inline */
  @media (hover: none), (max-width: 900px) {
    .edn-preview { display: none; }
    .edn-row { grid-template-columns: 36px minmax(0, 1fr) 260px; column-gap: 24px; row-gap: 10px; align-items: start; }
    .edn-row-n { grid-column: 1; grid-row: 1; padding-top: 8px; }
    .edn-row-main { grid-column: 2; grid-row: 1; }
    .edn-row-kind { grid-column: 2; grid-row: 2; }
    .edn-row-stack, .edn-row-go { display: none; }
    .edn-row-desc { max-height: none; opacity: 1; }
    .edn-row-thumb { display: block; grid-column: 3; grid-row: 1 / span 2; width: 100%; height: auto; aspect-ratio: 16 / 10; object-fit: cover; object-position: top; border-radius: 10px; border: 1px solid ${C.hairline}; }
    .edn-row.is-active .edn-row-title { transform: none; }
    .edn-row.is-pending .edn-row-stack { display: block; grid-column: 3; grid-row: 1; }
  }
  @media (max-width: 640px) {
    .edn-row { grid-template-columns: 30px minmax(0, 1fr); }
    .edn-row-thumb { grid-column: 2; grid-row: 3; }
    .edn-row.is-pending .edn-row-stack { grid-column: 2; grid-row: 3; }
  }

  @media (max-width: 1080px) {
    .edn-hero-foot { grid-template-columns: 1fr auto; }
    .edn-hero-signal { display: none; }
    .edn-proof-grid { grid-template-columns: repeat(2, 1fr); row-gap: 40px; }
    .edn-proof-item:nth-child(3) { border-left: none; padding-left: 0; }
    .edn-case { grid-template-columns: 1fr; }
    .edn-case:nth-child(even) .edn-case-media { order: 0; }
    .edn-process { grid-template-columns: repeat(2, 1fr); row-gap: 44px; }
    .edn-tiers { grid-template-columns: 1fr; max-width: 560px; }
  }
  @media (max-width: 900px) {
    .edn-desktop-nav { display: none; }
    .edn-burger { display: block; }
    .edn-nav-cta { display: none; }
  }
  @media (max-width: 720px) {
    .edn-hide-sm { display: none !important; }
    .edn-hero-foot { grid-template-columns: 1fr; }
    .edn-why { grid-template-columns: 1fr; }
    .edn-process { grid-template-columns: 1fr; }
    .edn-case-view { width: 72px; height: 72px; transform: scale(1); }
    .edn-contact-arrow { position: static; margin-top: 24px; }
  }
  @media (max-width: 480px) {
    .edn-proof-grid { grid-template-columns: 1fr 1fr; }
    .edn-music-grid { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); }
    .edn-btn { padding: 13px 18px; }
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after { animation: none !important; transition: none !important; }
    [data-reveal], .edn-rise { opacity: 1 !important; transform: none !important; }
    .edn-grain { display: none; }
  }
`;
