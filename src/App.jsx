import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Routes, Route, Link, useLocation } from "react-router-dom";

/* ---------------------------------------------------------
   Design tokens — light mode
   bg        #F8F9FB  off-white
   surface   #FFFFFF  white panels
   text      #0F172A  near-black
   muted     #64748B  slate gray
   accent    #2563EB  bright blue
--------------------------------------------------------- */

const PROJECTS = [
  {
    title: "BakeMart Coffee House",
    desc: "The only open-kitchen coffee shop in Nakuru — live site with full menu, ordering, and admin dashboard built on Supabase.",
    tags: ["React", "Supabase", "Tailwind"],
    demo: "https://bakemart.co.ke",
    img: "/bakemart%20image.png",
  },
  {
    title: "Kijani Kafe",
    desc: "A garden bar & restaurant in Milimani, Nakuru — built to carry the calm, slow-down feel of the place itself onto the screen.",
    tags: ["React", "Next.js", "Tailwind"],
    demo: "https://kijani-kafe.vercel.app/",
    img: "/kijani%20image.jpeg",
  },
  {
    title: "Reality Homes",
    desc: "Property listings that load fast on a weak connection, because that's how most people actually browse here.",
    tags: ["React", "Next.js", "Tailwind"],
    demo: "https://rhomes.vercel.app/",
    img: "/real%20homes%20image.jpeg",
  },
  {
    title: "Beyond Fruits",
    desc: "A fresh fruits & groceries shop in Nairobi — built to showcase produce that travels from farm to door with country-wide home delivery, keeping the basket and the checkout fast even on a slow connection.",
    tags: ["React", "Vite", "Tailwind"],
    demo: "https://beyond-taupe-one.vercel.app/",
    img: "/beyond%20image.jpeg",
  },
  {
    title: "Dating SaaS",
    desc: "A matchmaking platform with real-time discovery and messaging — coming soon.",
    tags: ["React", "TypeScript", "Tailwind"],
    status: "pending",
  },
  {
    title: "Pulse",
    desc: "A music streaming app built for indie artists and listeners — coming soon.",
    tags: ["React", "TypeScript", "Tailwind"],
    status: "pending",
  },
];

const SKILLS = ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "Supabase", "Vite", "TypeScript", "Git", "Responsive Design"];

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
    price: "KSh 30,000",
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
  { id: "why", label: "Why" },
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
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function LogoMark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={{ flexShrink: 0 }}>
      <rect x="10" y="8"    width="7"  height="24" rx="1.4" fill="#0F172A"/>
      <rect x="10" y="8"    width="21" height="7"  rx="1.4" fill="#0F172A"/>
      <rect x="10" y="16.5" width="16" height="7"  rx="1.4" fill="#0F172A"/>
      <rect x="10" y="25"   width="21" height="7"  rx="1.4" fill="#0F172A"/>
      <rect x="27" y="8"    width="7"  height="7"  rx="1.4" fill="#2563EB"/>
    </svg>
  );
}

function HeroMark() {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className="edn-hero-mark-svg"
      style={{ animation: "floatSlow 7s ease-in-out infinite", filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.08))" }}
    >
      <rect x="10" y="8"    width="7"  height="24" rx="1.4" fill="#0F172A"/>
      <rect x="10" y="8"    width="21" height="7"  rx="1.4" fill="#0F172A"/>
      <rect x="10" y="16.5" width="16" height="7"  rx="1.4" fill="#0F172A"/>
      <rect x="10" y="25"   width="21" height="7"  rx="1.4" fill="#0F172A"/>
      <rect x="27" y="8"    width="7"  height="7"  rx="1.4" fill="#2563EB"/>
    </svg>
  );
}

function Typewriter({ text, speed = 55, initialDelay = 0 }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    setDisplayed("");
    setDone(false);
    const startTimer = setTimeout(() => {
      const timer = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(timer);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(timer);
    }, initialDelay);
    return () => clearTimeout(startTimer);
  }, [text, speed, initialDelay]);
  return (
    <span>
      {displayed}
      {!done && <span style={{ borderRight: "2px solid #2563EB", marginLeft: 2, animation: "blink 1s step-end infinite" }} />}
    </span>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "18px 6vw", display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(255,255,255,0.88)" : "rgba(248,249,251,0.6)",
      backdropFilter: scrolled ? "blur(14px)" : "blur(6px)",
      WebkitBackdropFilter: scrolled ? "blur(14px)" : "blur(6px)",
      borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(0,0,0,0.04)",
      transition: "all .4s ease",
    }}>
        <Link to="/" style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 9, fontSize: 19, fontWeight: 700, letterSpacing: "-0.01em", color: "#0F172A", textDecoration: "none" }}>
          <LogoMark size={22} />
          Eden<span style={{ color: "#2563EB" }}>.</span>
        </Link>

      <div style={{ display: "flex", gap: 30 }} className="edn-desktop-nav">
        {NAV_ITEMS.map((item) => (
          <Link key={item.id} to={`/${item.id === 'home' ? '' : item.id}`} style={{ color: "#64748B", textDecoration: "none", fontSize: 14, fontWeight: 500, transition: "color .3s" }}>
            {item.label}
          </Link>
        ))}
      </div>

      <button onClick={() => setOpen((v) => !v)} className="edn-mobile-toggle" style={{ display: "none", background: "none", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 100, width: 38, height: 34, alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
        <div style={{ color: "#0F172A", fontSize: 12 }}>{open ? "✕" : "☰"}</div>
      </button>

      {open && (
        <div style={{
          position: "absolute", top: 64, right: "6vw",
          background: "rgba(255,255,255,0.98)", backdropFilter: "blur(14px)",
          border: "1px solid rgba(0,0,0,0.06)", borderRadius: 16, padding: "14px 18px",
          display: "flex", flexDirection: "column", gap: 14, animation: "fadeIn .3s ease",
        }}>
          {NAV_ITEMS.map((item) => (
            <Link key={item.id} to={`/${item.id === 'home' ? '' : item.id}`} onClick={() => setOpen(false)} style={{ color: "#0F172A", textDecoration: "none", fontSize: 15, padding: "4px 0" }}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const [eFlipping, setEFlipping] = useState(true);
  const [denText, setDenText] = useState("");
  const [denVisible, setDenVisible] = useState(false);

  useEffect(() => {
    const flipTimer = setTimeout(() => {
      setEFlipping(false);
      setDenVisible(true);

      const full = "den.";
      let i = 0;
      setDenText("");
      const typeInterval = setInterval(() => {
        i++;
        setDenText(full.slice(0, i));
        if (i >= full.length) {
          clearInterval(typeInterval);
          const fadeTimer = setTimeout(() => {
            setDenVisible(false);
          }, 1500);
          return () => clearTimeout(fadeTimer);
        }
      }, 180);
      return () => clearInterval(typeInterval);
    }, 2400);
    return () => clearTimeout(flipTimer);
  }, []);

  return (
    <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 6vw 60px", position: "relative", perspective: 1200 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "center" }} className="edn-hero-grid">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 28, color: "#64748B", fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>
            <span style={{ width: 24, height: 1, background: "#2563EB", display: "inline-block" }} />
            Web Developer &amp; Designer
          </div>
          <h1 style={{ fontSize: "clamp(2.2rem, 5.6vw, 4.6rem)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.03em", margin: 0, maxWidth: 700, color: "#0F172A" }}>
            <Typewriter text="Building digital experiences with clarity and purpose." speed={55} initialDelay={600} />
          </h1>
          <p style={{ marginTop: 26, fontSize: 17, lineHeight: 1.7, color: "#64748B", maxWidth: 480, fontWeight: 400 }}>
            Web developer and designer creating clean, modern websites and digital experiences.
          </p>
          <div className="edn-hero-buttons" style={{ display: "flex", gap: 16, marginTop: 42, flexWrap: "wrap" }}>
            <Link to="/projects" className="edn-btn-primary" style={{ border: "none", padding: "15px 30px", fontSize: 14.5, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
              View Projects <ArrowIcon className="edn-arrow" />
            </Link>
            <Link to="/contact" className="edn-btn-ghost" style={{ padding: "15px 30px", fontSize: 14.5, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
              Contact Me <ArrowIcon className="edn-arrow" />
            </Link>
          </div>
        </div>
        <div style={{ height: 480, display: "flex", alignItems: "center", justifyContent: "center" }} className="edn-hero-visual">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div className={eFlipping ? "edn-hero-mark-wrap" : ""} style={{ flexShrink: 0 }}>
              <HeroMark />
            </div>
            {denVisible && (
              <span className="edn-hero-den" style={{
                opacity: denVisible ? 1 : 0,
                transition: "opacity 0.6s ease",
                fontSize: "clamp(4rem, 10vw, 8rem)",
                fontWeight: 800,
                color: "#0F172A",
                letterSpacing: "-0.04em",
                lineHeight: 1
              }}>
                {denText.replace(/\.$/, "")}
                {denText.endsWith(".") && <span style={{ color: "#2563EB" }}>.</span>}
                {denText.length < 4 && <span style={{ animation: "blink 1s step-end infinite", borderRight: "3px solid #0F172A", marginLeft: 4 }} />}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: "160px 6vw 120px", perspective: 1200 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "0.4fr 1fr", gap: 48 }} className="edn-about-grid">
        <div style={{ color: "#64748B", fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>About</div>
        <div style={{ maxWidth: 700 }}>
          <p style={{ fontSize: "clamp(1.3rem, 2.3vw, 1.8rem)", lineHeight: 1.6, fontWeight: 500, color: "#0F172A", margin: "0 0 22px", letterSpacing: "-0.01em" }}>
            We build websites for small businesses — mostly restaurants, cafés,
            and shops around Nairobi.
          </p>
          <p style={{ fontSize: 16.5, lineHeight: 1.8, fontWeight: 400, color: "#64748B", margin: "0 0 22px" }}>
            Self-taught, no agency, no team. We work mainly in{" "}
            <span style={{ color: "#475569" }}>React</span>. If you want a
            sense of what we can actually build rather than what we say we can
            build, <a href="https://bakemart.co.ke/" target="_blank" rel="noopener noreferrer" style={{ color: "#0F172A", textDecoration: "underline", textDecorationColor: "rgba(0,0,0,0.2)", textUnderlineOffset: 3 }}>Bakemart Coffee House</a> is
            a good place to look — real listings, built to stay fast even on
            a slow connection. That's the standard we hold every project to.
          </p>
          <a href="https://bakemart.co.ke/" target="_blank" rel="noopener noreferrer" className="edn-btn-ghost"
            style={{ padding: "12px 24px", fontSize: 14, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            View BakeMart Coffeee House <ArrowIcon className="edn-arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}

function WhyWebsite() {
  return (
    <section id="why" style={{ padding: "160px 6vw 120px", perspective: 1200 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ color: "#64748B", fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'JetBrains Mono', monospace" }}>Why a Website</div>
          <h2 style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)", fontWeight: 800, margin: 0, letterSpacing: "-0.02em", color: "#0F172A" }}>Why your business needs a website</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 28 }}>
          <div style={{ border: "1px solid rgba(0,0,0,0.06)", borderRadius: 18, padding: 32, background: "#FFFFFF" }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px", color: "#0F172A" }}>Be found 24/7</h3>
            <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#64748B", margin: 0 }}>
              Customers search online before they buy. A website puts your business in front of them anytime — even when your shop is closed.
            </p>
          </div>
          <div style={{ border: "1px solid rgba(0,0,0,0.06)", borderRadius: 18, padding: 32, background: "#FFFFFF" }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px", color: "#0F172A" }}>Look legitimate</h3>
            <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#64748B", margin: 0 }}>
              A clean, fast website builds trust instantly. People judge businesses before they walk through the door — make sure that first impression works for you.
            </p>
          </div>
          <div style={{ border: "1px solid rgba(0,0,0,0.06)", borderRadius: 18, padding: 32, background: "#FFFFFF" }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px", color: "#0F172A" }}>Reach beyond your street</h3>
            <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#64748B", margin: 0 }}>
              Social media is noisy and temporary. A website is yours — you control the message, the look, and the experience. It scales with your business.
            </p>
          </div>
          <div style={{ border: "1px solid rgba(0,0,0,0.06)", borderRadius: 18, padding: 32, background: "#FFFFFF" }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px", color: "#0F172A" }}>Why build it with us</h3>
            <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#64748B", margin: 0 }}>
              We build lightweight, fast websites that work on weak connections — because that is how most people browse here. No bloated agencies, no unnecessary overhead. Just a site that performs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ padding: "160px 6vw 120px", perspective: 1200 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ color: "#64748B", fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'JetBrains Mono', monospace" }}>Selected Work</div>
          <h2 style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)", fontWeight: 800, margin: 0, letterSpacing: "-0.02em", color: "#0F172A" }}>Featured Projects</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }} className="edn-project-grid">
          {PROJECTS.map((p) => {
            const pending = p.status === "pending";
            return pending ? (
              <div key={p.title} className="edn-card-pending">
                <div className="edn-card-glow"></div>
                <div style={{ position: "relative", zIndex: 2 }}>
                  <div className="edn-card-placeholder">
                    <span style={{ opacity: 0.45 }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="7" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    </span>
                    <span className="edn-card-pending-badge">Coming Soon</span>
                  </div>
                  <div style={{ padding: 28 }}>
                    <h3 className="edn-card-title" style={{ fontSize: 20, fontWeight: 700, margin: "0 0 10px", letterSpacing: "-0.01em" }}>{p.title}</h3>
                    <p className="edn-card-desc" style={{ fontSize: 14, lineHeight: 1.65, margin: "0 0 18px", fontWeight: 400 }}>{p.desc}</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 22 }}>
                      {p.tags.map((t) => (
                        <span key={t} className="edn-card-tag" style={{ fontSize: 11, padding: "5px 11px", borderRadius: 100, letterSpacing: "0.02em" }}>{t}</span>
                      ))}
                    </div>
                    <span className="edn-card-pending-label">In Development</span>
                  </div>
                </div>
              </div>
            ) : (
              <a key={p.title} href={p.demo} target="_blank" rel="noopener noreferrer"
                className="edn-card" style={{ display: "block", textDecoration: "none", cursor: "pointer" }}>
                <div className="edn-card-glow"></div>
                <div style={{ position: "relative", zIndex: 2 }}>
                  <div style={{ height: 220, overflow: "hidden", position: "relative", background: "#F1F5F9" }}>
                    <img src={p.img} alt={p.title} className="edn-card-img"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <div style={{ padding: 28 }}>
                    <h3 className="edn-card-title" style={{ fontSize: 20, fontWeight: 700, margin: "0 0 10px", letterSpacing: "-0.01em" }}>{p.title}</h3>
                    <p className="edn-card-desc" style={{ fontSize: 14, lineHeight: 1.65, margin: "0 0 18px", fontWeight: 400 }}>{p.desc}</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 22 }}>
                      {p.tags.map((t) => (
                        <span key={t} className="edn-card-tag" style={{ fontSize: 11, padding: "5px 11px", borderRadius: 100, letterSpacing: "0.02em" }}>{t}</span>
                      ))}
                    </div>
                    <span className="edn-card-btn"
                      style={{ padding: "10px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
                      Live Demo <ArrowIcon className="edn-arrow" />
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" style={{ padding: "160px 6vw 120px", perspective: 1200 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ color: "#64748B", fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'JetBrains Mono', monospace" }}>Toolkit</div>
        <h2 style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)", fontWeight: 800, margin: "0 0 40px", letterSpacing: "-0.02em", color: "#0F172A" }}>Skills</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {SKILLS.map((s) => (
            <span key={s} className="edn-pill" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, padding: "10px 18px", borderRadius: 100, border: "1px solid rgba(0,0,0,0.08)", color: "#475569", fontWeight: 500, cursor: "default", background: "#F1F5F9" }}>
              <SkillIcon name={s} />
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" style={{ padding: "160px 6vw 120px", perspective: 1200 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ color: "#64748B", fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'JetBrains Mono', monospace" }}>Pricing</div>
          <h2 style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)", fontWeight: 800, margin: "0 0 14px", letterSpacing: "-0.02em", color: "#0F172A" }}>What it costs to work together</h2>
          <p style={{ fontSize: 15, color: "#64748B", fontWeight: 400, maxWidth: 560, lineHeight: 1.7 }}>
            Rough starting points, not rigid packages. Every site gets scoped
            around what your business actually needs before we quote a final number.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 48 }} className="edn-pricing-grid">
          {PRICING.map((tier) => (
            <div key={tier.name} className="edn-price-card" style={{
              border: tier.featured ? "1.5px solid #0F172A" : "1px solid rgba(0,0,0,0.08)",
              borderRadius: 20, padding: 32, background: tier.featured ? "#EFF6FF" : "#FFFFFF",
              color: tier.featured ? "#0F172A" : "#0F172A",
              display: "flex", flexDirection: "column", position: "relative",
            }}>
              {tier.featured && (
                <span style={{ position: "absolute", top: -12, left: 32, background: "#2563EB", color: "#FFFFFF", fontSize: 10.5, fontWeight: 700, padding: "5px 13px", borderRadius: 100, letterSpacing: "0.05em" }}>
                  MOST BOOKED
                </span>
              )}
              <h3 style={{ fontSize: 19, fontWeight: 700, margin: "6px 0 6px", color: "inherit" }}>{tier.name}</h3>
              <p style={{ fontSize: 13, color: tier.featured ? "rgba(15,23,42,0.62)" : "#64748B", fontWeight: 400, lineHeight: 1.6, margin: "0 0 20px", minHeight: 54 }}>{tier.desc}</p>
              <div style={{ marginBottom: 24 }}>
                {tier.note && <div style={{ fontSize: 11, color: tier.featured ? "rgba(15,23,42,0.5)" : "#64748B", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4, fontFamily: "'JetBrains Mono', monospace" }}>{tier.note}</div>}
                <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em" }}>{tier.price}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28, flexGrow: 1 }}>
                {tier.features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: tier.featured ? "rgba(15,23,42,0.8)" : "#475569" }}>
                    <CheckIcon /> {f}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a href={`https://wa.me/254142614743?text=${encodeURIComponent(`Hi Eden, I'm interested in the ${tier.name} plan (${tier.price}). Can we discuss it?`)}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ flex: 1, minWidth: 120, border: "none", padding: "12px 16px", borderRadius: 100, fontSize: 13.5, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, textDecoration: "none", background: "#25D366", color: "#FFF" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.273.297-1.045 1.02-1.045 2.488 0 1.468 1.065 2.887 1.213 3.083.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
                <a href="https://www.instagram.com/vinn_y.codr/" target="_blank" rel="noopener noreferrer"
                  style={{ flex: 1, minWidth: 120, border: "none", padding: "12px 16px", borderRadius: 100, fontSize: 13.5, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, textDecoration: "none", background: tier.featured ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.06)", color: tier.featured ? "#0F172A" : "#0F172A" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>
                  Instagram
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{ padding: "160px 6vw 120px", minHeight: "100vh", display: "flex", alignItems: "center", perspective: 1200 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center", width: "100%" }}>
        <div style={{ color: "#64748B", fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 20, fontFamily: "'JetBrains Mono', monospace" }}>Contact</div>
        <h2 style={{ fontSize: "clamp(2.1rem, 5vw, 3.6rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 auto 44px", maxWidth: 720, color: "#0F172A" }}>
          Let&rsquo;s build something meaningful together.
        </h2>
        <div style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap", fontSize: 14.5 }}>
          <a href="mailto:davidson.vis.16@gmail.com" className="edn-social" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>
            Email
          </a>
          <a href="https://www.instagram.com/vinn_y.codr/" target="_blank" rel="noopener noreferrer" className="edn-social" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>
            Instagram
          </a>
          <a href="https://wa.me/254142614743" target="_blank" rel="noopener noreferrer" className="edn-social" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ padding: "32px 6vw", borderTop: "1px solid rgba(0,0,0,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
      <span style={{ fontSize: 12.5, color: "#64748B" }}>© 2026 Eden. All rights reserved.</span>
      <div style={{ display: "flex", gap: 22 }}>
        <a href="https://www.instagram.com/vinn_y.codr/" target="_blank" rel="noopener noreferrer" className="edn-social" style={{ fontSize: 12.5, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>
          Instagram
        </a>
        <a href="mailto:davidson.vis.16@gmail.com" className="edn-social" style={{ fontSize: 12.5, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>
          Email
        </a>
      </div>
    </footer>
  );
}

function SkillIcon({ name }) {
  const icons = {
    "HTML": (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 18h20L12 2z" fill="#E44D26"/><path d="M12 4.5L4.5 17h15L12 4.5z" fill="#F16529"/><path d="M12 8.5l-3.5 7.5h7L12 8.5z" fill="#EBEBEB"/><path d="M12 13l-1.5 3h3L12 13z" fill="#FFF"/></svg>
    ),
    "CSS": (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 18h20L12 2z" fill="#1572B6"/><path d="M12 4.5L4.5 17h15L12 4.5z" fill="#33A9DC"/><path d="M12 9l-2 5.5h4L12 9z" fill="#FFF"/></svg>
    ),
    "JavaScript": (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="2" fill="#F7DF1E"/><path d="M17 15.5c0 1.5-1 2.5-3 2.5s-2.5-.8-2.5-1.5c0-1 1-1.5 2.5-1.8.5-.2 1.5-.3 2.8-.5v-1.2c-.2-.2-.5-.3-1.2-.5-.7-.2-1.3-.3-1.8-.5-.8-.2-1.5-.5-2-1-.5-.5-1-1.2-1-2.5 0-1.8 1.2-2.8 2.5-3 1-.2 1.8-.2 2.8-.2 1 0 2 .2 2.5.5.8.3 1.2.8 1.5 1.2.3.5.5 1 .5 1.8h-1.2c0-.5-.2-1.2-.5-1.5-.5-.5-1-.5-2-.5s-1.5.2-2 .5c-.5.2-1 .5-1.2.8-.2.5-.2 1 .2 1.5.3.3.8.5 1.2.5.5 0 1-.2 1.2-.3l.5 1c-.5.2-1 .3-1.8.3-2 0-3.2-1-3.2-2.8 0-1.5 1-2.5 2.5-2.8.8-.2 1.5-.2 2.5-.2 1 0 1.8 0 2.5.2 1 .2 1.5.5 2 1 .5.5.5 1.2.5 2h1.2c0-1.5-1-2.5-2.5-3-1.2-.5-2.5-.2-3.2.2-.8.5-1.2 1.5-1.2 2.8z" fill="#000"/></svg>
    ),
    "React": (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2.5" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/></svg>
    ),
    "Next.js": (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="2" fill="#000"/><path d="M12 4.5c-1 .5-1.8 1.2-2.5 2.1l4.2 7.3 4.3-7.3c-.7-.9-1.5-1.6-2.5-2.1h.5z" fill="#FFF"/><path d="M9.5 7.5l-5.2 9.2c.7.9 1.5 1.6 2.5 2.1h.5l5.7-9.8-2.5-1.5z" fill="#FFF" fillOpacity="0.6"/></svg>
    ),
    "Tailwind CSS": (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 4c-2 0-3.5 1.5-3.5 3s1.5 2 2.5 2.5c-2 1-3.5 2.5-3.5 4.5 0 3 2.5 4.5 5.5 4.5h1c3 0 5.5-2 5.5-4.5 0-1.5-.8-2.5-1.5-3.5-.8 1-2 2-3.5 2.5 1.5-.5 2.5-1.8 2.5-3.5C17 5.5 15 4 12 4z" fill="#06B6D4"/></svg>
    ),
    "Supabase": (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 9l10 13 10-13-10-7z" fill="#3FCF8E"/><path d="M12 2v17" stroke="#3ECF8E" strokeWidth="0.5"/><path d="M7 9l5 13 5-13" stroke="#FFF" strokeWidth="0.8" fill="none"/></svg>
    ),
    "Vite": (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><polygon points="12,2 22,22 12,18 2,22" fill="#646CFF"/><polygon points="12,2 12,18 2,22" fill="#747DE8"/></svg>
    ),
    "TypeScript": (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="2" fill="#3178C6"/><path d="M15 10.5v-1h5v1h-5zm0 3.5v-1h5v1h-5zM9.5 17c0 .5.2 1 .5 1.3.4.3.8.5 1.3.5.5 0 1-.2 1.3-.5.3-.3.5-.8.5-1.3V8.5h-5v8.5h2.7z" fill="#FFF"/></svg>
    ),
    "Git": (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2" fill="#F05032"/><line x1="12" y1="2" x2="12" y2="10" stroke="#F05032" strokeWidth="2.5" strokeLinecap="round"/><line x1="12" y1="14" x2="12" y2="22" stroke="#F05032" strokeWidth="2.5" strokeLinecap="round"/><line x1="5" y1="8" x2="19" y2="8" stroke="#F05032" strokeWidth="2" strokeLinecap="round"/><line x1="5" y1="16" x2="19" y2="16" stroke="#F05032" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
    "Responsive Design": (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="14" rx="2" stroke="#64748B" strokeWidth="1.8"/><line x1="8" y1="18" x2="16" y2="18" stroke="#64748B" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
  };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 20, height: 20, flexShrink: 0 }}>
      {icons[name] || null}
    </span>
  );
}

function PageHome() {
  return (
    <PageWrapper direction="left">
      <>
        <Hero />
        <About />
        <WhyWebsite />
        <Projects />
        <Skills />
        <Pricing />
        <Contact />
      </>
    </PageWrapper>
  );
}

function PageAbout() {
  return (
    <PageWrapper direction="right">
      <section id="about" style={{ padding: "160px 6vw 120px", perspective: 1200, minHeight: "100vh" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "0.4fr 1fr", gap: 48 }} className="edn-about-grid">
          <div style={{ color: "#64748B", fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>About</div>
          <div style={{ maxWidth: 700 }}>
            <p style={{ fontSize: "clamp(1.3rem, 2.3vw, 1.8rem)", lineHeight: 1.6, fontWeight: 500, color: "#0F172A", margin: "0 0 22px", letterSpacing: "-0.01em" }}>
              We build websites for small businesses — mostly restaurants, cafés,
              and shops around Nairobi.
            </p>
            <p style={{ fontSize: 16.5, lineHeight: 1.8, fontWeight: 400, color: "#64748B", margin: "0 0 22px" }}>
              Self-taught, no agency, no team. We work mainly in{" "}
              <span style={{ color: "#475569" }}>React</span>. If you want a
              sense of what we can actually build rather than what we say we can
              build, <a href="https://bakemart.co.ke/" target="_blank" rel="noopener noreferrer" style={{ color: "#0F172A", textDecoration: "underline", textDecorationColor: "rgba(0,0,0,0.2)", textUnderlineOffset: 3 }}>Bakemart Coffee House</a> is
              a good place to look — real listings, built to stay fast even on
              a slow connection. That's the standard we hold every project to.
            </p>
            <a href="https://bakemart.co.ke/" target="_blank" rel="noopener noreferrer" className="edn-btn-ghost"
              style={{ padding: "12px 24px", fontSize: 14, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
              View BakeMart Coffeee House <ArrowIcon className="edn-arrow" />
            </a>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

function PageWhy() {
  return (
    <PageWrapper direction="left">
      <section id="why" style={{ padding: "160px 6vw 120px", perspective: 1200, minHeight: "100vh" }}>

        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ color: "#64748B", fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'JetBrains Mono', monospace" }}>Why a Website</div>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)", fontWeight: 800, margin: 0, letterSpacing: "-0.02em", color: "#0F172A" }}>Why your business needs a website</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 28 }}>
            <div style={{ border: "1px solid rgba(0,0,0,0.06)", borderRadius: 18, padding: 32, background: "#FFFFFF" }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px", color: "#0F172A" }}>Be found 24/7</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#64748B", margin: 0 }}>
                Customers search online before they buy. A website puts your business in front of them anytime — even when your shop is closed.
              </p>
            </div>
            <div style={{ border: "1px solid rgba(0,0,0,0.06)", borderRadius: 18, padding: 32, background: "#FFFFFF" }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px", color: "#0F172A" }}>Look legitimate</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#64748B", margin: 0 }}>
                A clean, fast website builds trust instantly. People judge businesses before they walk through the door — make sure that first impression works for you.
              </p>
            </div>
            <div style={{ border: "1px solid rgba(0,0,0,0.06)", borderRadius: 18, padding: 32, background: "#FFFFFF" }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px", color: "#0F172A" }}>Reach beyond your street</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#64748B", margin: 0 }}>
                Social media is noisy and temporary. A website is yours — you control the message, the look, and the experience. It scales with your business.
              </p>
            </div>
            <div style={{ border: "1px solid rgba(0,0,0,0.06)", borderRadius: 18, padding: 32, background: "#FFFFFF" }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px", color: "#0F172A" }}>Why build it with us</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#64748B", margin: 0 }}>
                We build lightweight, fast websites that work on weak connections — because that is how most people browse here. No bloated agencies, no unnecessary overhead. Just a site that performs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

function PageProjects() {
  return (
    <PageWrapper direction="right">
      <section id="projects" style={{ padding: "160px 6vw 120px", perspective: 1200, minHeight: "100vh" }}>

        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ color: "#64748B", fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'JetBrains Mono', monospace" }}>Selected Work</div>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)", fontWeight: 800, margin: 0, letterSpacing: "-0.02em", color: "#0F172A" }}>Featured Projects</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }} className="edn-project-grid">
            {PROJECTS.map((p) => {
              const pending = p.status === "pending";
              return pending ? (
                <div key={p.title} className="edn-card-pending">
                  <div className="edn-card-glow"></div>
                  <div style={{ position: "relative", zIndex: 2 }}>
                    <div className="edn-card-placeholder">
                      <span style={{ opacity: 0.45 }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="7" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      </span>
                      <span className="edn-card-pending-badge">Coming Soon</span>
                    </div>
                    <div style={{ padding: 28 }}>
                      <h3 className="edn-card-title" style={{ fontSize: 20, fontWeight: 700, margin: "0 0 10px", letterSpacing: "-0.01em" }}>{p.title}</h3>
                      <p className="edn-card-desc" style={{ fontSize: 14, lineHeight: 1.65, margin: "0 0 18px", fontWeight: 400 }}>{p.desc}</p>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 22 }}>
                        {p.tags.map((t) => (
                          <span key={t} className="edn-card-tag" style={{ fontSize: 11, padding: "5px 11px", borderRadius: 100, letterSpacing: "0.02em" }}>{t}</span>
                        ))}
                      </div>
                      <span className="edn-card-pending-label">In Development</span>
                    </div>
                  </div>
                </div>
              ) : (
                <a key={p.title} href={p.demo} target="_blank" rel="noopener noreferrer"
                  className="edn-card" style={{ display: "block", textDecoration: "none", cursor: "pointer" }}>
                  <div className="edn-card-glow"></div>
                  <div style={{ position: "relative", zIndex: 2 }}>
                    <div style={{ height: 220, overflow: "hidden", position: "relative", background: "#F1F5F9" }}>
                      <img src={p.img} alt={p.title} className="edn-card-img"
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </div>
                    <div style={{ padding: 28 }}>
                      <h3 className="edn-card-title" style={{ fontSize: 20, fontWeight: 700, margin: "0 0 10px", letterSpacing: "-0.01em" }}>{p.title}</h3>
                      <p className="edn-card-desc" style={{ fontSize: 14, lineHeight: 1.65, margin: "0 0 18px", fontWeight: 400 }}>{p.desc}</p>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 22 }}>
                        {p.tags.map((t) => (
                          <span key={t} className="edn-card-tag" style={{ fontSize: 11, padding: "5px 11px", borderRadius: 100, letterSpacing: "0.02em" }}>{t}</span>
                        ))}
                      </div>
                      <span className="edn-card-btn"
                        style={{ padding: "10px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
                        Live Demo <ArrowIcon className="edn-arrow" />
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

      </section>
    </PageWrapper>
  );
}

function PageSkills() {
  return (
    <PageWrapper direction="left">
      <section id="skills" style={{ padding: "160px 6vw 120px", perspective: 1200, minHeight: "100vh" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ color: "#64748B", fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'JetBrains Mono', monospace" }}>Toolkit</div>
          <h2 style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)", fontWeight: 800, margin: "0 0 40px", letterSpacing: "-0.02em", color: "#0F172A" }}>Skills</h2>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {SKILLS.map((s) => (
              <span key={s} className="edn-pill" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, padding: "10px 18px", borderRadius: 100, border: "1px solid rgba(0,0,0,0.08)", color: "#475569", fontWeight: 500, cursor: "default", background: "#F1F5F9" }}>
                <SkillIcon name={s} />
                {s}
              </span>
            ))}
          </div>
        </div>

      </section>
    </PageWrapper>
  );
}

function PagePricing() {
  return (
    <PageWrapper direction="right">
      <section id="pricing" style={{ padding: "160px 6vw 120px", perspective: 1200, minHeight: "100vh" }}>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ color: "#64748B", fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'JetBrains Mono', monospace" }}>Pricing</div>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)", fontWeight: 800, margin: "0 0 14px", letterSpacing: "-0.02em", color: "#0F172A" }}>What it costs to work together</h2>
            <p style={{ fontSize: 15, color: "#64748B", fontWeight: 400, maxWidth: 560, lineHeight: 1.7 }}>
              Rough starting points, not rigid packages. Every site gets scoped
              around what your business actually needs before we quote a final number.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 48 }} className="edn-pricing-grid">
            {PRICING.map((tier) => (
              <div key={tier.name} className="edn-price-card" style={{
                border: tier.featured ? "1.5px solid #0F172A" : "1px solid rgba(0,0,0,0.08)",
                borderRadius: 20, padding: 32, background: tier.featured ? "#EFF6FF" : "#FFFFFF",
                color: tier.featured ? "#0F172A" : "#0F172A",
                display: "flex", flexDirection: "column", position: "relative",
              }}>
                {tier.featured && (
                  <span style={{ position: "absolute", top: -12, left: 32, background: "#2563EB", color: "#FFFFFF", fontSize: 10.5, fontWeight: 700, padding: "5px 13px", borderRadius: 100, letterSpacing: "0.05em" }}>
                    MOST BOOKED
                  </span>
                )}
                <h3 style={{ fontSize: 19, fontWeight: 700, margin: "6px 0 6px", color: "inherit" }}>{tier.name}</h3>
                <p style={{ fontSize: 13, color: tier.featured ? "rgba(15,23,42,0.62)" : "#64748B", fontWeight: 400, lineHeight: 1.6, margin: "0 0 20px", minHeight: 54 }}>{tier.desc}</p>
                <div style={{ marginBottom: 24 }}>
                  {tier.note && <div style={{ fontSize: 11, color: tier.featured ? "rgba(15,23,42,0.5)" : "#64748B", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4, fontFamily: "'JetBrains Mono', monospace" }}>{tier.note}</div>}
                  <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em" }}>{tier.price}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28, flexGrow: 1 }}>
                  {tier.features.map((f) => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: tier.featured ? "rgba(15,23,42,0.8)" : "#475569" }}>
                      <CheckIcon /> {f}
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <a href={`https://wa.me/254142614743?text=${encodeURIComponent(`Hi Eden, I'm interested in the ${tier.name} plan (${tier.price}). Can we discuss it?`)}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{ flex: 1, minWidth: 120, border: "none", padding: "12px 16px", borderRadius: 100, fontSize: 13.5, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, textDecoration: "none", background: "#25D366", color: "#FFF" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.273.297-1.045 1.02-1.045 2.488 0 1.468 1.065 2.887 1.213 3.083.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </a>
                  <a href="https://www.instagram.com/vinn_y.codr/" target="_blank" rel="noopener noreferrer"
                    style={{ flex: 1, minWidth: 120, border: "none", padding: "12px 16px", borderRadius: 100, fontSize: 13.5, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, textDecoration: "none", background: tier.featured ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.06)", color: tier.featured ? "#0F172A" : "#0F172A" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>
                    Instagram
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

function PageContact() {
  return (
    <PageWrapper direction="left">
      <section id="contact" style={{ padding: "160px 6vw 120px", minHeight: "100vh", display: "flex", alignItems: "center", perspective: 1200 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center", width: "100%" }}>
          <div style={{ color: "#64748B", fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 20, fontFamily: "'JetBrains Mono', monospace" }}>Contact</div>
          <h2 style={{ fontSize: "clamp(2.1rem, 5vw, 3.6rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 auto 44px", maxWidth: 720, color: "#0F172A" }}>
            Let&rsquo;s build something meaningful together.
          </h2>
          <div style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap", fontSize: 14.5 }}>
            <a href="mailto:davidson.vis.16@gmail.com" className="edn-social" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>
              Email
            </a>
            <a href="https://www.instagram.com/vinn_y.codr/" target="_blank" rel="noopener noreferrer" className="edn-social" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>
              Instagram
            </a>
            <a href="https://wa.me/254142614743" target="_blank" rel="noopener noreferrer" className="edn-social" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>

      </section>
    </PageWrapper>
  );
}

function PageTransition() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const prev = useRef(location.pathname);

  useEffect(() => {
    if (prev.current !== location.pathname) {
      prev.current = location.pathname;
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 2400);
      return () => clearTimeout(t);
    }
  }, [location]);

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#F8F9FB", display: "flex",
      alignItems: "center", justifyContent: "center"
    }}>
      <div style={{ animation: "heroFlip 2.2s ease-in-out both" }}>
        <HeroMark />
      </div>
    </div>
  );
}

function PageWrapper({ children, direction }) {
  return (
    <div className={`edn-page-${direction}`} style={{ width: "100%" }}>
      {children}
    </div>
  );
}

export default function EdenPortfolio() {
  const location = useLocation();
  const pageOrder = ["/", "/about", "/why", "/projects", "/skills", "/pricing", "/contact"];
  const pageIndex = pageOrder.indexOf(location.pathname);
  const direction = pageIndex % 2 === 0 ? "left" : "right";

  return (
    <div className="edn-app-shell" style={{ background: "#F8F9FB", color: "#0F172A", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400&display=swap');
        * { box-sizing: border-box; }
        ::selection { background: #2563EB; color: #FFFFFF; }
        @keyframes floatSlow { 0%,100% { transform: translateY(0px);} 50% { transform: translateY(-10px);} }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes heroFlip {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        .edn-hero-mark-wrap { animation: heroFlip 2.2s ease-in-out both; transform-style: preserve-3d; }
        .edn-hero-mark-svg { width: clamp(180px, 25vw, 320px); height: clamp(180px, 25vw, 320px); }

        @keyframes slideInLeft {
          from { transform: translateX(-120px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(120px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .edn-page-left { animation: slideInLeft 0.6s cubic-bezier(0.16,1,0.3,1) both; }
        .edn-page-right { animation: slideInRight 0.6s cubic-bezier(0.16,1,0.3,1) both; }

        .edn-app-shell { min-height: 100vh; }

        .edn-btn-primary { background:#0F172A; color:#FFFFFF; transition:background .3s cubic-bezier(0.16,1,0.3,1); border-radius: 100px; text-decoration: none; }
        .edn-btn-primary:hover { background:#2563EB; }
        .edn-btn-primary:hover .edn-arrow { transform: translateX(4px); }

        .edn-btn-ghost { background:transparent; color:#0F172A; border:1px solid rgba(0,0,0,0.12); transition:border-color .3s, background .3s; border-radius: 100px; text-decoration: none; }
        .edn-btn-ghost:hover { border-color:#2563EB; background:rgba(37,99,235,0.1); color:#2563EB; }
        .edn-btn-ghost:hover .edn-arrow { transform: translateX(4px); }

        .edn-navlink { position:relative; color:#64748B; transition:color .3s; text-decoration: none; }
        .edn-navlink:hover { color:#0F172A; }

        .edn-card { background:#FFFFFF; border:1px solid rgba(0,0,0,0.06); border-radius:18px; overflow:hidden; position:relative; transition:transform .45s cubic-bezier(0.16,1,0.3,1), box-shadow .45s cubic-bezier(0.16,1,0.3,1), background .4s cubic-bezier(0.16,1,0.3,1), border-color .4s; }
        .edn-card:hover,
        .edn-card:active { transform:translateY(-8px); box-shadow:0 24px 48px -20px rgba(37,99,235,0.2); background:#2563EB; border-color:rgba(37,99,235,0.4); }
        .edn-card:hover .edn-card-img,
        .edn-card:active .edn-card-img { transform:scale(1.05); }
        .edn-card-img { transition:transform .7s cubic-bezier(0.16,1,0.3,1); }
        .edn-card-title { color:#0F172A; }
        .edn-card:hover .edn-card-title,
        .edn-card:active .edn-card-title { color:#FFFFFF; }
        .edn-card-desc { color:#64748B; }
        .edn-card:hover .edn-card-desc,
        .edn-card:active .edn-card-desc { color:rgba(255,255,255,0.9); }
        .edn-card-tag { color:#2563EB; background:rgba(37,99,235,0.08); border:1px solid rgba(37,99,235,0.35); }
        .edn-card:hover .edn-card-tag,
        .edn-card:active .edn-card-tag { color:#FFFFFF; background:rgba(255,255,255,0.2); border-color:rgba(255,255,255,0.35); }
        .edn-card-btn { background:#0F172A; color:#FFFFFF; border:none; border-radius:100px; transition:background .4s cubic-bezier(0.16,1,0.3,1), color .4s; }
        .edn-card:hover .edn-card-btn,
        .edn-card:active .edn-card-btn { background:#FFFFFF; color:#0F172A; }
        .edn-card-btn .edn-arrow { transform:translateX(0); }
        .edn-card:hover .edn-card-btn .edn-arrow,
        .edn-card:active .edn-card-btn .edn-arrow { transform:translateX(4px); }
        .edn-card-glow { position:absolute; inset:0; background:radial-gradient(circle at center, #2563EB 0%, #2563EB 100%); transform:scale(0); opacity:0; border-radius:inherit; transition:transform .55s cubic-bezier(0.16,1,0.3,1), opacity .45s ease; z-index:1; pointer-events:none; }
        .edn-card:hover .edn-card-glow,
        .edn-card:active .edn-card-glow { transform:scale(2.2); opacity:1; }
        .edn-card-pending { background:#FFFFFF; border:1px solid rgba(0,0,0,0.06); border-radius:18px; overflow:hidden; position:relative; }
        .edn-card-pending:hover .edn-card-glow,
        .edn-card-pending:active .edn-card-glow { transform:scale(2.2); opacity:1; }
        .edn-card-pending:hover .edn-card-title,
        .edn-card-pending:active .edn-card-title { color:#FFFFFF; }
        .edn-card-pending:hover .edn-card-desc,
        .edn-card-pending:active .edn-card-desc { color:rgba(255,255,255,0.9); }
        .edn-card-pending:hover .edn-card-tag,
        .edn-card-pending:active .edn-card-tag { color:#FFFFFF; background:rgba(255,255,255,0.2); border-color:rgba(255,255,255,0.35); }
        .edn-card-pending:hover .edn-card-pending-label,
        .edn-card-pending:active .edn-card-pending-label { color:rgba(255,255,255,0.85); }
        .edn-card-placeholder { height:220px; overflow:hidden; position:relative; background:linear-gradient(135deg,#F1F5F9,#E8EBEF); display:flex; align-items:center; justify-content:center; }
        .edn-card-pending-badge { position:absolute; top:16px; right:16px; background:#2563EB; color:#FFFFFF; font-size:10.5px; font-weight:700; padding:5px 12px; border-radius:100px; letter-spacing:0.05em; }
        .edn-card-pending-label { color:#64748B; font-size:13px; font-weight:500; }

        .edn-price-card { transition: transform .4s cubic-bezier(0.16,1,0.3,1), border-color .4s, box-shadow .4s; }
        .edn-price-card:hover { transform: translateY(-5px); box-shadow: 0 22px 44px -20px rgba(0,0,0,0.1); }

        .edn-pill { transition:border-color .3s, color .3s, background .3s; }
        .edn-pill:hover { border-color:#2563EB; color:#2563EB; background:rgba(37,99,235,0.1); }

        .edn-social { color:#64748B; transition:color .3s; text-decoration: none; }
        .edn-social:hover { color:#2563EB; }

        @media (prefers-reduced-motion: reduce) { * { animation:none !important; transition:none !important; } }

        @media (max-width: 1080px) {
          .edn-project-grid { grid-template-columns: repeat(2,1fr) !important; }
          .edn-pricing-grid { grid-template-columns: 1fr !important; max-width: 460px !important; }
        }
        @media (max-width: 860px) {
          .edn-desktop-nav { display:none !important; }
          .edn-mobile-toggle { display:flex !important; }
          .edn-hero-grid { grid-template-columns:1fr !important; }
          .edn-hero-visual { height:320px !important; order:0 !important; }
          .edn-about-grid { grid-template-columns:1fr !important; }
          .edn-project-grid { grid-template-columns:repeat(2, 1fr) !important; }
        }
        @media (max-width: 520px) {
          .edn-project-grid { grid-template-columns:1fr !important; }
          .edn-hero-visual { height:280px !important; }
        }
        @media (max-width: 420px) {
        }
      `}</style>

      <PageTransition />
      <Nav />

      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageHome />} />
        <Route path="/about" element={<PageAbout />} />
        <Route path="/why" element={<PageWhy />} />
        <Route path="/projects" element={<PageProjects />} />
        <Route path="/skills" element={<PageSkills />} />
        <Route path="/pricing" element={<PagePricing />} />
        <Route path="/contact" element={<PageContact />} />
      </Routes>

      <Footer />
    </div>
  );
}