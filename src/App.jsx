import React, { useState, useEffect, useRef, useCallback } from "react";

/* ---------------------------------------------------------
   Design tokens — v4, black + blue, white as accent
   bg        #05070C  near-black, slight blue tint
   surface   #0D1220  raised dark panel
   text      #F5F7FA  soft white — headings/emphasis
   muted     #8391AD  blue-gray, secondary text
   accent    #2F8CFF  bright blue — pulled from the Eden logo
--------------------------------------------------------- */

const PROJECTS = [
  {
    title: "BakeMart Coffee House",
    desc: "The only open-kitchen coffee shop in Nakuru — live site with full menu, ordering, and admin dashboard built on Supabase.",
    tags: ["React", "Supabase", "Tailwind"],
    demo: "https://bakemart.co.ke",
    img: "https://images.unsplash.com/photo-1524671710025-d79530c2f957?fm=jpg&q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Mvule Restaurants",
    desc: "Multi-restaurant ordering built for real Nairobi kitchens. Menu to order in a few taps, WhatsApp checkout included.",
    tags: ["React", "Next.js", "WhatsApp API"],
    demo: "https://restaurants-pied.vercel.app/",
    img: "https://images.unsplash.com/photo-1642339147375-c3e037498ab5?fm=jpg&q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Reality Homes",
    desc: "Property listings that load fast on a weak connection, because that's how most people actually browse here.",
    tags: ["React", "Next.js", "Tailwind"],
    demo: "https://rhomes.vercel.app/",
    img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?fm=jpg&q=80&w=1400&auto=format&fit=crop",
  },
];

const SKILLS = ["HTML", "CSS", "JavaScript", "React", "Vite", "Git", "Responsive Design"];

const PRICING = [
  {
    name: "Landing Page",
    price: "KSh 15,000",
    note: "starting at",
    desc: "One page. Right for a business that just needs to be found and trusted.",
    features: ["Single-page design", "Mobile responsive", "WhatsApp button built in", "3-day turnaround"],
    featured: false,
  },
  {
    name: "Business Site",
    price: "KSh 35,000",
    note: "starting at",
    desc: "For restaurants, spas, and shops that need more than one page.",
    features: ["Up to 5 pages", "Custom design", "WhatsApp / M-Pesa integration", "1 round of revisions", "7-day turnaround"],
    featured: true,
  },
  {
    name: "Custom Build",
    price: "Let's talk",
    note: "",
    desc: "Booking systems, e-commerce, dashboards. Scoped around what you actually need.",
    features: ["Full custom scope", "Ongoing support available", "Timeline set per project"],
    featured: false,
  },
];

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "pricing", label: "Pricing" },
  { id: "contact", label: "Contact" },
];

function ArrowIcon({ className = "" }) {
  return (
    <svg className={className} width="15" height="15" viewBox="0 0 16 16" fill="none"
      style={{ transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)" }}>
      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <path d="M2.5 7.2L5.3 10L11.5 3.5" stroke="#2F8CFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeroMark() {
  return (
    <svg
      width="320"
      height="320"
      viewBox="0 0 40 40"
      fill="none"
      style={{ animation: "floatSlow 7s ease-in-out infinite", filter: "drop-shadow(0 30px 50px rgba(255,255,255,0.16))" }}
    >
      <rect x="10" y="8"    width="7"  height="24" rx="1.4" fill="#F5F7FA"/>
      <rect x="10" y="8"    width="21" height="7"  rx="1.4" fill="#F5F7FA"/>
      <rect x="10" y="16.5" width="16" height="7"  rx="1.4" fill="#F5F7FA"/>
      <rect x="10" y="25"   width="21" height="7"  rx="1.4" fill="#F5F7FA"/>
      <rect x="27" y="8"    width="7"  height="7"  rx="1.4" fill="#F5F7FA"/>
    </svg>
  );
}

function LogoMark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={{ flexShrink: 0 }}>
      <rect x="10" y="8"    width="7"  height="24" rx="1.4" fill="#F5F7FA"/>
      <rect x="10" y="8"    width="21" height="7"  rx="1.4" fill="#F5F7FA"/>
      <rect x="10" y="16.5" width="16" height="7"  rx="1.4" fill="#F5F7FA"/>
      <rect x="10" y="25"   width="21" height="7"  rx="1.4" fill="#F5F7FA"/>
      <rect x="27" y="8"    width="7"  height="7"  rx="1.4" fill="#2F8CFF"/>
    </svg>
  );
}
/* A wireframe octagon rendered in true 3D and spun continuously via
   CSS perspective — the "lazy loading" spinner shown before the site reveals. */
function OctagonSpinner() {
  const outerPts = Array.from({ length: 8 }).map((_, i) => {
    const a = (Math.PI / 4) * i + Math.PI / 8;
    return [60 + 46 * Math.cos(a), 60 + 46 * Math.sin(a)];
  });
  const innerPts = Array.from({ length: 8 }).map((_, i) => {
    const a = (Math.PI / 4) * i + Math.PI / 8;
    return [60 + 25 * Math.cos(a), 60 + 25 * Math.sin(a)];
  });
  const toPath = (pts) => pts.map((p) => p.join(",")).join(" ");

  return (
    <div style={{ perspective: 700 }}>
      <div className="edn-octagon-spin" style={{ width: 120, height: 120 }}>
        <svg viewBox="0 0 120 120" width="120" height="120">
          <polygon points={toPath(innerPts)} fill="rgba(47,140,255,0.12)" stroke="none" />
          {outerPts.map((p, i) => (
            <line key={`spoke-${i}`} x1={innerPts[i][0]} y1={innerPts[i][1]} x2={p[0]} y2={p[1]}
              stroke="#F5F7FA" strokeOpacity="0.18" strokeWidth="1" />
          ))}
          <polygon points={toPath(innerPts)} fill="none" stroke="#F5F7FA" strokeOpacity="0.35" strokeWidth="1" />
          <polygon points={toPath(outerPts)} fill="none" stroke="#F5F7FA" strokeWidth="1.4" />
        </svg>
      </div>
    </div>
  );
}

function Preloader({ exiting }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200, background: "#05070C",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      opacity: exiting ? 0 : 1,
      transform: exiting ? "translateY(-16px)" : "translateY(0px)",
      transition: "opacity .6s cubic-bezier(0.16,1,0.3,1), transform .6s cubic-bezier(0.16,1,0.3,1)",
      pointerEvents: exiting ? "none" : "auto",
    }}>
      <div style={{ fontSize: 13, letterSpacing: "0.18em", color: "#8391AD", textTransform: "uppercase", marginBottom: 36, fontFamily: "'JetBrains Mono', monospace" }}>
        Eden
      </div>
      <OctagonSpinner />
    </div>
  );
}

export default function EdenPortfolio() {
  const [loading, setLoading] = useState(true);
  const [loaderExiting, setLoaderExiting] = useState(false);

  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [displayPage, setDisplayPage] = useState("home");
  const [transitioning, setTransitioning] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const holdTimer = setTimeout(() => {
      setLoaderExiting(true);
      setTimeout(() => setLoading(false), 650);
    }, 1900);
    return () => clearTimeout(holdTimer);
  }, []);

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    const onScroll = () => setNavScrolled(node.scrollTop > 40);
    node.addEventListener("scroll", onScroll);
    return () => node.removeEventListener("scroll", onScroll);
  }, [displayPage]);

  const goTo = useCallback((id) => {
    setMenuOpen(false);
    setDisplayPage((current) => {
      if (current === id) return current;
      setTransitioning(true);
      setTimeout(() => {
        setDisplayPage(id);
        setTransitioning(false);
        if (scrollRef.current) scrollRef.current.scrollTop = 0;
        setNavScrolled(false);
      }, 360);
      return current;
    });
  }, []);

  return (
    <div className="edn-app-shell" style={{
      background: "#05070C", color: "#F5F7FA",
      fontFamily: "'Inter', system-ui, sans-serif",
      overflow: "hidden", position: "relative",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400&display=swap');
        * { box-sizing: border-box; }
        ::selection { background: #2F8CFF; color: #05070C; }
        @keyframes floatSlow { 0%,100% { transform: translateY(0px);} 50% { transform: translateY(-10px);} }
        @keyframes octaSpin {
          0%   { transform: rotateX(22deg) rotateY(0deg); }
          100% { transform: rotateX(22deg) rotateY(360deg); }
        }
        .edn-octagon-spin { transform-style: preserve-3d; animation: octaSpin 2.6s linear infinite; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes riseIn { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }

        .edn-app-shell { height: 100vh; }
        @supports (height: 100dvh) { .edn-app-shell { height: 100dvh; } }


        .edn-btn-primary { background:#F5F7FA; color:#05070C; transition:background .3s cubic-bezier(0.16,1,0.3,1); border-radius: 100px; }
        .edn-btn-primary:hover { background:#2F8CFF; }
        .edn-btn-primary:hover .edn-arrow { transform: translateX(4px); }

        .edn-btn-ghost { background:#05070C; color:#F5F7FA; border:1px solid rgba(255,255,255,0.16); transition:border-color .3s, background .3s; border-radius: 100px; }
        .edn-btn-ghost:hover { border-color:#2F8CFF; background:rgba(47,140,255,0.1); color:#2F8CFF; }
        .edn-btn-ghost:hover .edn-arrow { transform: translateX(4px); }

        .edn-navlink { position:relative; color:#8391AD; transition:color .3s; }
        .edn-navlink:hover { color:#F5F7FA; }
        .edn-navlink::after { content:''; position:absolute; left:0; bottom:-6px; height:2px; width:0%; background:#2F8CFF; transition:width .35s cubic-bezier(0.16,1,0.3,1); border-radius: 2px; }
        .edn-navlink:hover::after { width:100%; }
        .edn-navlink.active { color:#F5F7FA; }
        .edn-navlink.active::after { width:100%; }

        .edn-card { transition: transform .45s cubic-bezier(0.16,1,0.3,1), box-shadow .45s cubic-bezier(0.16,1,0.3,1), border-color .45s; }
        .edn-card:hover { transform: translateY(-8px); box-shadow: 0 24px 48px -20px rgba(47,140,255,0.25); border-color: rgba(47,140,255,0.4); }
        .edn-card:hover .edn-card-img { transform: scale(1.05); }
        .edn-card-img { transition: transform .7s cubic-bezier(0.16,1,0.3,1); }

        .edn-price-card { transition: transform .4s cubic-bezier(0.16,1,0.3,1), border-color .4s, box-shadow .4s; }
        .edn-price-card:hover { transform: translateY(-5px); box-shadow: 0 22px 44px -20px rgba(0,0,0,0.45); }

        .edn-pill { transition:border-color .3s, color .3s, background .3s; }
        .edn-pill:hover { border-color:#2F8CFF; color:#2F8CFF; background:rgba(47,140,255,0.1); }

        .edn-social { color:#8391AD; transition:color .3s; }
        .edn-social:hover { color:#2F8CFF; }

        .edn-scroll::-webkit-scrollbar { width: 6px; }
        .edn-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.14); border-radius: 3px; }

        @media (prefers-reduced-motion: reduce) { * { animation:none !important; transition:none !important; } }

        @media (max-width: 1080px) {
          .edn-project-grid { grid-template-columns: repeat(2,1fr) !important; }
          .edn-pricing-grid { grid-template-columns: 1fr !important; max-width: 460px !important; }
        }
        @media (max-width: 860px) {
          .edn-desktop-nav { display:none !important; }
          .edn-mobile-toggle { display:flex !important; }
          .edn-hero-grid { grid-template-columns:1fr !important; }
          .edn-hero-visual { height:240px !important; order:-1; }
          .edn-about-grid { grid-template-columns:1fr !important; }
          .edn-project-grid { grid-template-columns:1fr !important; }
          .edn-hero-section { padding: 100px 6vw 40px !important; min-height: auto !important; }
          .edn-page-section { padding: 120px 6vw 80px !important; }
          .edn-hero-buttons { flex-direction: column !important; align-items: stretch !important; }
          .edn-hero-buttons button { width: 100% !important; justify-content: center !important; }
        }
        @media (max-width: 420px) {
          .edn-hero-section { padding-top: 88px !important; }
        }
      `}</style>

      {loading && <Preloader exiting={loaderExiting} />}

      {/* ---------- NAV ---------- */}
      <nav style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 50,
        padding: "20px 6vw", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: navScrolled ? "rgba(255,255,255,0.82)" : "transparent",
        backdropFilter: navScrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: navScrolled ? "blur(16px)" : "none",
        borderBottom: navScrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        transition: "background .5s ease, border-color .5s ease",
      }}>
        <button onClick={() => goTo("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 9, fontSize: 19, fontWeight: 700, letterSpacing: "-0.01em", color: "#F5F7FA" }}>
          <LogoMark size={22} />
          Eden<span style={{ color: "#2F8CFF" }}>.</span>
        </button>

        <div style={{ display: "flex", gap: 30 }} className="edn-desktop-nav">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => goTo(item.id)}
              className={`edn-navlink${displayPage === item.id ? " active" : ""}`}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500 }}>
              {item.label}
            </button>
          ))}
        </div>

        <button onClick={() => setMenuOpen((v) => !v)}
          style={{ background: "none", border: "1px solid rgba(255,255,255,0.16)", borderRadius: 100, width: 38, height: 34, display: "none", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          className="edn-mobile-toggle">
          <div style={{ color: "#F5F7FA", fontSize: 12 }}>{menuOpen ? "✕" : "☰"}</div>
        </button>
      </nav>

      {menuOpen && (
        <div style={{
          position: "absolute", top: 66, left: 0, right: 0, zIndex: 49,
          background: "rgba(255,255,255,0.98)", backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.09)", padding: "18px 6vw 28px",
          display: "flex", flexDirection: "column", gap: 18, animation: "fadeIn 0.3s ease",
        }}>
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => goTo(item.id)}
              style={{ background: "none", border: "none", color: displayPage === item.id ? "#2F8CFF" : "#F5F7FA", fontSize: 16, textAlign: "left", cursor: "pointer", padding: "6px 0" }}>
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* ---------- PAGE VIEWPORT ---------- */}
      <div ref={scrollRef} className="edn-scroll" style={{
        height: "100%", overflowY: "auto", overflowX: "hidden",
        opacity: transitioning ? 0 : 1,
        transform: transitioning ? "translateY(16px)" : "translateY(0px)",
        transition: "opacity .36s cubic-bezier(0.16,1,0.3,1), transform .36s cubic-bezier(0.16,1,0.3,1)",
      }}>
        {displayPage === "home" && <HomePage goTo={goTo} reveal={!loading} />}
        {displayPage === "about" && <AboutPage />}
        {displayPage === "projects" && <ProjectsPage />}
        {displayPage === "skills" && <SkillsPage />}
        {displayPage === "pricing" && <PricingPage goTo={goTo} />}
        {displayPage === "contact" && <ContactPage />}
        <Footer />
      </div>
    </div>
  );
}

function HomePage({ goTo, reveal }) {
  return (
    <section className="edn-hero-section" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 6vw 60px" }}>
      <div style={{
        display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, width: "100%", maxWidth: 1280, margin: "0 auto", alignItems: "center",
        opacity: reveal ? 1 : 0, animation: reveal ? "riseIn .8s cubic-bezier(0.16,1,0.3,1) both" : "none",
      }} className="edn-hero-grid">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 28, color: "#8391AD", fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>
            <span style={{ width: 24, height: 1, background: "#2F8CFF" }} />
            Web Developer &amp; Designer
          </div>
          <h1 style={{ fontSize: "clamp(2.2rem, 5.6vw, 4.6rem)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.03em", margin: 0, maxWidth: 700, color: "#F5F7FA" }}>
            Building digital experiences with clarity and purpose.
          </h1>
          <p style={{ marginTop: 26, fontSize: 17, lineHeight: 1.7, color: "#8391AD", maxWidth: 480, fontWeight: 400 }}>
            Web developer and designer creating clean, modern websites and digital experiences.
          </p>
          <div className="edn-hero-buttons" style={{ display: "flex", gap: 16, marginTop: 42, flexWrap: "wrap" }}>
            <button onClick={() => goTo("projects")} className="edn-btn-primary" style={{ border: "none", padding: "15px 30px", fontSize: 14.5, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
              View Projects <ArrowIcon className="edn-arrow" />
            </button>
            <button onClick={() => goTo("contact")} className="edn-btn-ghost" style={{ padding: "15px 30px", fontSize: 14.5, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
              Contact Me <ArrowIcon className="edn-arrow" />
            </button>
          </div>
        </div>
        <div style={{ height: 480, display: "flex", alignItems: "center", justifyContent: "center" }} className="edn-hero-visual">
          <HeroMark />
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <section className="edn-page-section" style={{ padding: "160px 6vw 120px", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "0.4fr 1fr", gap: 48 }} className="edn-about-grid">
        <div style={{ color: "#8391AD", fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>About</div>
        <div style={{ maxWidth: 700 }}>
          <p style={{ fontSize: "clamp(1.3rem, 2.3vw, 1.8rem)", lineHeight: 1.6, fontWeight: 500, color: "#F5F7FA", margin: "0 0 22px", letterSpacing: "-0.01em" }}>
            I build websites for small businesses — mostly restaurants, cafés,
            and shops around Nairobi.
          </p>
          <p style={{ fontSize: 16.5, lineHeight: 1.8, fontWeight: 400, color: "#8391AD", margin: "0 0 22px" }}>
            Self-taught, no agency, no team. I work mainly in{" "}
            <span style={{ color: "#2F8CFF" }}>React</span>. If you want a
            sense of what I can actually build rather than what I say I can
            build, <a href="https://rhomes.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: "#F5F7FA", textDecoration: "underline", textDecorationColor: "rgba(255,255,255,0.3)", textUnderlineOffset: 3 }}>Reality Homes</a> is
            a good place to look — real listings, built to stay fast even on
            a slow connection. That's the standard I hold every project to.
          </p>
          <a href="https://rhomes.vercel.app/" target="_blank" rel="noopener noreferrer" className="edn-btn-ghost"
            style={{ padding: "12px 24px", fontSize: 14, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            View Reality Homes <ArrowIcon className="edn-arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectsPage() {
  return (
    <section className="edn-page-section" style={{ padding: "160px 6vw 120px", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ color: "#8391AD", fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'JetBrains Mono', monospace" }}>Selected Work</div>
          <h2 style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)", fontWeight: 800, margin: 0, letterSpacing: "-0.02em", color: "#F5F7FA" }}>Featured Projects</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }} className="edn-project-grid">
          {PROJECTS.map((p) => (
            <div key={p.title} className="edn-card" style={{ border: "1px solid rgba(255,255,255,0.09)", borderRadius: 18, overflow: "hidden", background: "#05070C" }}>
              <div style={{ height: 220, overflow: "hidden", position: "relative", background: "#0D1220" }}>
                <img src={p.img} alt={p.title} className="edn-card-img"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ padding: 28 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 10px", letterSpacing: "-0.01em", color: "#F5F7FA" }}>{p.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: "#8391AD", margin: "0 0 18px", fontWeight: 400 }}>{p.desc}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 22 }}>
                  {p.tags.map((t) => (
                    <span key={t} style={{ fontSize: 11, padding: "5px 11px", borderRadius: 100, border: "1px solid rgba(47,140,255,0.35)", color: "#2F8CFF", letterSpacing: "0.02em", background: "rgba(47,140,255,0.08)" }}>{t}</span>
                  ))}
                </div>
                <a href={p.demo} target="_blank" rel="noopener noreferrer" className="edn-btn-primary"
                  style={{ border: "none", padding: "10px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none" }}>
                  Live Demo <ArrowIcon className="edn-arrow" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsPage() {
  return (
    <section className="edn-page-section" style={{ padding: "160px 6vw 120px", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ color: "#8391AD", fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'JetBrains Mono', monospace" }}>Toolkit</div>
        <h2 style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)", fontWeight: 800, margin: "0 0 40px", letterSpacing: "-0.02em", color: "#F5F7FA" }}>Skills</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {SKILLS.map((s) => (
            <span key={s} className="edn-pill" style={{ fontSize: 13.5, padding: "12px 22px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.14)", color: "#C7D0E0", fontWeight: 500, cursor: "default", background: "#0D1220" }}>{s}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingPage({ goTo }) {
  return (
    <section className="edn-page-section" style={{ padding: "160px 6vw 120px", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ color: "#8391AD", fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'JetBrains Mono', monospace" }}>Pricing</div>
          <h2 style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)", fontWeight: 800, margin: "0 0 14px", letterSpacing: "-0.02em", color: "#F5F7FA" }}>What it costs to work together</h2>
          <p style={{ fontSize: 15, color: "#8391AD", fontWeight: 400, maxWidth: 560, lineHeight: 1.7 }}>
            Rough starting points, not rigid packages. Every site gets scoped
            around what your business actually needs before I quote a final number.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 48 }} className="edn-pricing-grid">
          {PRICING.map((tier) => (
            <div key={tier.name} className="edn-price-card" style={{
              border: tier.featured ? "1.5px solid #F5F7FA" : "1px solid rgba(255,255,255,0.12)",
              borderRadius: 20, padding: 32, background: tier.featured ? "#F5F7FA" : "#05070C",
              color: tier.featured ? "#05070C" : "#F5F7FA",
              display: "flex", flexDirection: "column", position: "relative",
            }}>
              {tier.featured && (
                <span style={{ position: "absolute", top: -12, left: 32, background: "#2F8CFF", color: "#05070C", fontSize: 10.5, fontWeight: 700, padding: "5px 13px", borderRadius: 100, letterSpacing: "0.05em" }}>
                  MOST BOOKED
                </span>
              )}
              <h3 style={{ fontSize: 19, fontWeight: 700, margin: "6px 0 6px", color: "inherit" }}>{tier.name}</h3>
              <p style={{ fontSize: 13, color: tier.featured ? "rgba(5,7,12,0.62)" : "#8391AD", fontWeight: 400, lineHeight: 1.6, margin: "0 0 20px", minHeight: 54 }}>{tier.desc}</p>
              <div style={{ marginBottom: 24 }}>
                {tier.note && <div style={{ fontSize: 11, color: tier.featured ? "rgba(5,7,12,0.5)" : "#8391AD", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4, fontFamily: "'JetBrains Mono', monospace" }}>{tier.note}</div>}
                <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em" }}>{tier.price}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28, flexGrow: 1 }}>
                {tier.features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: tier.featured ? "rgba(5,7,12,0.8)" : "#C7D0E0" }}>
                    <CheckIcon /> {f}
                  </div>
                ))}
              </div>
              <button onClick={() => goTo("contact")}
                style={{
                  border: "none", padding: "12px 20px", borderRadius: 100,
                  fontSize: 13.5, fontWeight: 600, cursor: "pointer", display: "inline-flex",
                  alignItems: "center", justifyContent: "center", gap: 8, width: "100%",
                  background: tier.featured ? "#05070C" : "#F5F7FA",
                  color: tier.featured ? "#F5F7FA" : "#05070C",
                  transition: "opacity .3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.82")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
                {tier.price === "Let's talk" ? "Start a conversation" : "Get Started"} <ArrowIcon className="edn-arrow" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <section className="edn-page-section" style={{ padding: "160px 6vw 120px", minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center", width: "100%" }}>
        <div style={{ color: "#8391AD", fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 20, fontFamily: "'JetBrains Mono', monospace" }}>Contact</div>
        <h2 style={{ fontSize: "clamp(2.1rem, 5vw, 3.6rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 auto 44px", maxWidth: 720, color: "#F5F7FA" }}>
          Let&rsquo;s build something meaningful together.
        </h2>
        <div style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap", fontSize: 14.5 }}>
          <a href="mailto:davidson.vis.16@gmail.com" className="edn-social" style={{ textDecoration: "none" }}>Email</a>
          <a href="https://www.instagram.com/vinn_y.codr/" target="_blank" rel="noopener noreferrer" className="edn-social" style={{ textDecoration: "none" }}>Instagram</a>
          <a href="https://wa.me/254142614743" target="_blank" rel="noopener noreferrer" className="edn-social" style={{ textDecoration: "none" }}>WhatsApp</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ padding: "32px 6vw", borderTop: "1px solid rgba(255,255,255,0.09)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
      <span style={{ fontSize: 12.5, color: "#5B6479" }}>© 2026 Eden. All rights reserved.</span>
      <div style={{ display: "flex", gap: 22 }}>
        <a href="https://www.instagram.com/vinn_y.codr/" target="_blank" rel="noopener noreferrer" className="edn-social" style={{ fontSize: 12.5, textDecoration: "none" }}>Instagram</a>
        <a href="mailto:davidson.vis.16@gmail.com" className="edn-social" style={{ fontSize: 12.5, textDecoration: "none" }}>Email</a>
      </div>
    </footer>
  );
}
