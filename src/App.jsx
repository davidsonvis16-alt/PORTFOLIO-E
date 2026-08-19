import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/* ---------------------------------------------------------
   Design tokens — v4, black + blue, white as accent
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
    title: "Music App",
    desc: "A streaming interface built for indie artists and listeners — coming soon.",
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

function SkillIcon({ name }) {
  const config = {
    "HTML": { bg: "#E44D26", text: "H5" },
    "CSS": { bg: "#1572B6", text: "C3" },
    "JavaScript": { bg: "#F7DF1E", text: "JS", color: "#000" },
    "React": { bg: "#61DAFB", text: "⚛", color: "#000" },
    "Next.js": { bg: "#000000", text: "N" },
    "Tailwind CSS": { bg: "#06B6D4", text: "TW" },
    "Supabase": { bg: "#3FCF8E", text: "S", color: "#000" },
    "Vite": { bg: "#646CFF", text: "V" },
    "TypeScript": { bg: "#3178C6", text: "TS" },
    "Git": { bg: "#F05032", text: "G" },
    "Responsive Design": { bg: "#8391AD", text: "RD" },
  };
  const c = config[name] || { bg: "#8391AD", text: name.slice(0, 2).toUpperCase() };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: 5, background: c.bg, color: c.color || "#FFF", fontSize: 9, fontWeight: 800, flexShrink: 0, lineHeight: 1 }}>
      {c.text}
    </span>
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
      <rect x="27" y="8"    width="7"  height="7"  rx="1.4" fill="#2F8CFF"/>
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
      {!done && <span style={{ borderRight: "2px solid #2F8CFF", marginLeft: 2, animation: "blink 1s step-end infinite" }} />}
    </span>
  );
}

function Reveal({ children, direction = "left" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 50, stiffness: 80 });

  const rotateY = useTransform(
    smoothProgress,
    [0, 0.35, 0.65, 1],
    direction === "left" ? [-90, 0, 0, 90] : [90, 0, 0, -90]
  );
  const opacity = useTransform(smoothProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.35, 0.65, 1], [0.9, 1, 1, 0.9]);

  return (
    <motion.div
      ref={ref}
      style={{
        rotateY,
        opacity,
        scale,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        willChange: "transform, opacity",
      }}
    >
      {children}
    </motion.div>
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
      background: scrolled ? "rgba(5,7,12,0.88)" : "rgba(5,7,12,0.35)",
      backdropFilter: scrolled ? "blur(14px)" : "blur(6px)",
      WebkitBackdropFilter: scrolled ? "blur(14px)" : "blur(6px)",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0.04)",
      transition: "all .4s ease",
    }}>
      <a href="#home" style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 9, fontSize: 19, fontWeight: 700, letterSpacing: "-0.01em", color: "#F5F7FA", textDecoration: "none" }}>
        <LogoMark size={22} />
        Eden<span style={{ color: "#2F8CFF" }}>.</span>
      </a>

      <div style={{ display: "flex", gap: 30 }} className="edn-desktop-nav">
        {NAV_ITEMS.map((item) => (
          <a key={item.id} href={`#${item.id}`} style={{ color: "#8391AD", textDecoration: "none", fontSize: 14, fontWeight: 500, transition: "color .3s" }}>
            {item.label}
          </a>
        ))}
      </div>

      <button onClick={() => setOpen((v) => !v)} className="edn-mobile-toggle" style={{ display: "none", background: "none", border: "1px solid rgba(255,255,255,0.16)", borderRadius: 100, width: 38, height: 34, alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
        <div style={{ color: "#F5F7FA", fontSize: 12 }}>{open ? "✕" : "☰"}</div>
      </button>

      {open && (
        <div style={{
          position: "absolute", top: 64, right: "6vw",
          background: "rgba(5,7,12,0.95)", backdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "14px 18px",
          display: "flex", flexDirection: "column", gap: 14, animation: "fadeIn .3s ease",
        }}>
          {NAV_ITEMS.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)} style={{ color: "#F5F7FA", textDecoration: "none", fontSize: 15, padding: "4px 0" }}>
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 6vw 60px", position: "relative", perspective: 1200 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "center" }} className="edn-hero-grid">
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 28, color: "#8391AD", fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>
            <span style={{ width: 24, height: 1, background: "#2F8CFF", display: "inline-block" }} />
            Web Developer &amp; Designer
          </div>
          <h1 style={{ fontSize: "clamp(2.2rem, 5.6vw, 4.6rem)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.03em", margin: 0, maxWidth: 700, color: "#F5F7FA" }}>
            <Typewriter text="Building digital experiences with clarity and purpose." speed={55} initialDelay={600} />
          </h1>
          <p style={{ marginTop: 26, fontSize: 17, lineHeight: 1.7, color: "#8391AD", maxWidth: 480, fontWeight: 400 }}>
            Web developer and designer creating clean, modern websites and digital experiences.
          </p>
          <div className="edn-hero-buttons" style={{ display: "flex", gap: 16, marginTop: 42, flexWrap: "wrap" }}>
            <a href="#projects" className="edn-btn-primary" style={{ border: "none", padding: "15px 30px", fontSize: 14.5, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
              View Projects <ArrowIcon className="edn-arrow" />
            </a>
            <a href="#contact" className="edn-btn-ghost" style={{ padding: "15px 30px", fontSize: 14.5, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
              Contact Me <ArrowIcon className="edn-arrow" />
            </a>
          </div>
        </div>
        <div style={{ height: 480, display: "flex", alignItems: "center", justifyContent: "center" }} className="edn-hero-visual">
          <HeroMark />
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: "160px 6vw 120px", perspective: 1200 }}>
      <Reveal direction="left">
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "0.4fr 1fr", gap: 48 }} className="edn-about-grid">
          <div style={{ color: "#8391AD", fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>About</div>
          <div style={{ maxWidth: 700 }}>
            <p style={{ fontSize: "clamp(1.3rem, 2.3vw, 1.8rem)", lineHeight: 1.6, fontWeight: 500, color: "#F5F7FA", margin: "0 0 22px", letterSpacing: "-0.01em" }}>
              We build websites for small businesses — mostly restaurants, cafés,
              and shops around Nairobi.
            </p>
            <p style={{ fontSize: 16.5, lineHeight: 1.8, fontWeight: 400, color: "#8391AD", margin: "0 0 22px" }}>
              Self-taught, no agency, no team. We work mainly in{" "}
              <span style={{ color: "#99b2c2" }}>React</span>. If you want a
              sense of what we can actually build rather than what we say we can
              build, <a href="https://bakemart.co.ke/" target="_blank" rel="noopener noreferrer" style={{ color: "#F5F7FA", textDecoration: "underline", textDecorationColor: "rgba(255,255,255,0.3)", textUnderlineOffset: 3 }}>Bakemart Coffee House</a> is
              a good place to look — real listings, built to stay fast even on
              a slow connection. That's the standard we hold every project to.
            </p>
            <a href="https://bakemart.co.ke/" target="_blank" rel="noopener noreferrer" className="edn-btn-ghost"
              style={{ padding: "12px 24px", fontSize: 14, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
              View BakeMart Coffeee House <ArrowIcon className="edn-arrow" />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function WhyWebsite() {
  return (
    <section id="why" style={{ padding: "160px 6vw 120px", perspective: 1200 }}>
      <Reveal direction="right">
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ color: "#8391AD", fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'JetBrains Mono', monospace" }}>Why a Website</div>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)", fontWeight: 800, margin: 0, letterSpacing: "-0.02em", color: "#F5F7FA" }}>Why your business needs a website</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 28 }}>
            <div style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: 32, background: "#0D1220" }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px", color: "#F5F7FA" }}>Be found 24/7</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#8391AD", margin: 0 }}>
                Customers search online before they buy. A website puts your business in front of them anytime — even when your shop is closed.
              </p>
            </div>
            <div style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: 32, background: "#0D1220" }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px", color: "#F5F7FA" }}>Look legitimate</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#8391AD", margin: 0 }}>
                A clean, fast website builds trust instantly. People judge businesses before they walk through the door — make sure that first impression works for you.
              </p>
            </div>
            <div style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: 32, background: "#0D1220" }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px", color: "#F5F7FA" }}>Reach beyond your street</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#8391AD", margin: 0 }}>
                Social media is noisy and temporary. A website is yours — you control the message, the look, and the experience. It scales with your business.
              </p>
            </div>
            <div style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: 32, background: "#0D1220" }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px", color: "#F5F7FA" }}>Why build it with us</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#8391AD", margin: 0 }}>
                We build lightweight, fast websites that work on weak connections — because that is how most people browse here. No bloated agencies, no unnecessary overhead. Just a site that performs.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ padding: "160px 6vw 120px", perspective: 1200 }}>
      <Reveal direction="right">
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ color: "#8391AD", fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'JetBrains Mono', monospace" }}>Selected Work</div>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)", fontWeight: 800, margin: 0, letterSpacing: "-0.02em", color: "#F5F7FA" }}>Featured Projects</h2>
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
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8391AD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="7" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
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
                  className="edn-card" style={{ display: "block", cursor: "pointer", textDecoration: "none" }}>
                  <div className="edn-card-glow"></div>
                  <div style={{ position: "relative", zIndex: 2 }}>
                    <div style={{ height: 220, overflow: "hidden", position: "relative", background: "#0D1220" }}>
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
      </Reveal>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" style={{ padding: "160px 6vw 120px", perspective: 1200 }}>
      <Reveal direction="left">
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ color: "#8391AD", fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'JetBrains Mono', monospace" }}>Toolkit</div>
          <h2 style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)", fontWeight: 800, margin: "0 0 40px", letterSpacing: "-0.02em", color: "#F5F7FA" }}>Skills</h2>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {SKILLS.map((s) => (
              <span key={s} className="edn-pill" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, padding: "10px 18px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.14)", color: "#C7D0E0", fontWeight: 500, cursor: "default", background: "#0D1220" }}>
                <SkillIcon name={s} />
                {s}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" style={{ padding: "160px 6vw 120px", perspective: 1200 }}>
      <Reveal direction="right">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ color: "#8391AD", fontSize: 12.5, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'JetBrains Mono', monospace" }}>Pricing</div>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)", fontWeight: 800, margin: "0 0 14px", letterSpacing: "-0.02em", color: "#F5F7FA" }}>What it costs to work together</h2>
            <p style={{ fontSize: 15, color: "#8391AD", fontWeight: 400, maxWidth: 560, lineHeight: 1.7 }}>
              Rough starting points, not rigid packages. Every site gets scoped
              around what your business actually needs before we quote a final number.
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
                <a href="#contact" style={{
                  border: "none", padding: "12px 20px", borderRadius: 100,
                  fontSize: 13.5, fontWeight: 600, cursor: "pointer", display: "inline-flex",
                  alignItems: "center", justifyContent: "center", gap: 8, width: "100%",
                  background: tier.featured ? "#05070C" : "#F5F7FA",
                  color: tier.featured ? "#F5F7FA" : "#05070C",
                  textDecoration: "none",
                  transition: "opacity .3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.82")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
                  {tier.price === "Let's talk" ? "Start a conversation" : "Get Started"} <ArrowIcon className="edn-arrow" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{ padding: "160px 6vw 120px", minHeight: "100vh", display: "flex", alignItems: "center", perspective: 1200 }}>
      <Reveal direction="left">
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
      </Reveal>
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

export default function EdenPortfolio() {
  return (
    <div className="edn-app-shell" style={{ background: "#05070C", color: "#F5F7FA", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400&display=swap');
        * { box-sizing: border-box; }
        ::selection { background: #2F8CFF; color: #05070C; }
        @keyframes floatSlow { 0%,100% { transform: translateY(0px);} 50% { transform: translateY(-10px);} }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }

        .edn-app-shell { min-height: 100vh; }

        .edn-btn-primary { background:#F5F7FA; color:#05070C; transition:background .3s cubic-bezier(0.16,1,0.3,1); border-radius: 100px; text-decoration: none; }
        .edn-btn-primary:hover { background:#2F8CFF; }
        .edn-btn-primary:hover .edn-arrow { transform: translateX(4px); }

        .edn-btn-ghost { background:transparent; color:#F5F7FA; border:1px solid rgba(255,255,255,0.16); transition:border-color .3s, background .3s; border-radius: 100px; text-decoration: none; }
        .edn-btn-ghost:hover { border-color:#2F8CFF; background:rgba(47,140,255,0.1); color:#2F8CFF; }
        .edn-btn-ghost:hover .edn-arrow { transform: translateX(4px); }

        .edn-navlink { position:relative; color:#8391AD; transition:color .3s; text-decoration: none; }
        .edn-navlink:hover { color:#F5F7FA; }

        .edn-card { background:#FFFFFF; border:1px solid rgba(0,0,0,0.06); border-radius:18px; overflow:hidden; position:relative; transition:transform .45s cubic-bezier(0.16,1,0.3,1), box-shadow .45s cubic-bezier(0.16,1,0.3,1), background .4s cubic-bezier(0.16,1,0.3,1), border-color .4s; }
        .edn-card:hover,
        .edn-card:active { transform:translateY(-8px); box-shadow:0 24px 48px -20px rgba(47,140,255,0.3); background:#2F8CFF; border-color:rgba(47,140,255,0.45); }
        .edn-card:hover .edn-card-img,
        .edn-card:active .edn-card-img { transform:scale(1.05); }
        .edn-card-img { transition:transform .7s cubic-bezier(0.16,1,0.3,1); }
        .edn-card-title { color:#05070C; }
        .edn-card:hover .edn-card-title,
        .edn-card:active .edn-card-title { color:#F5F7FA; }
        .edn-card-desc { color:#5B6479; }
        .edn-card:hover .edn-card-desc,
        .edn-card:active .edn-card-desc { color:rgba(255,255,255,0.78); }
        .edn-card-tag { color:#2F8CFF; background:rgba(47,140,255,0.08); border:1px solid rgba(47,140,255,0.35); }
        .edn-card:hover .edn-card-tag,
        .edn-card:active .edn-card-tag { color:#F5F7FA; background:rgba(255,255,255,0.18); border-color:rgba(255,255,255,0.35); }
        .edn-card-btn { background:#05070C; color:#F5F7FA; border:none; border-radius:100px; transition:background .4s cubic-bezier(0.16,1,0.3,1), color .4s; }
        .edn-card:hover .edn-card-btn,
        .edn-card:active .edn-card-btn { background:#F5F7FA; color:#05070C; }
        .edn-card-btn .edn-arrow { transform:translateX(0); }
        .edn-card:hover .edn-card-btn .edn-arrow,
        .edn-card:active .edn-card-btn .edn-arrow { transform:translateX(4px); }
        .edn-card-glow { position:absolute; inset:0; background:radial-gradient(circle at center, #2F8CFF 0%, #2F8CFF 100%); transform:scale(0); opacity:0; border-radius:inherit; transition:transform .55s cubic-bezier(0.16,1,0.3,1), opacity .45s ease; z-index:1; pointer-events:none; }
        .edn-card:hover .edn-card-glow,
        .edn-card:active .edn-card-glow { transform:scale(2.2); opacity:1; }
        .edn-card-pending { background:#FFFFFF; border:1px solid rgba(0,0,0,0.06); border-radius:18px; overflow:hidden; position:relative; }
        .edn-card-pending:hover .edn-card-glow,
        .edn-card-pending:active .edn-card-glow { transform:scale(2.2); opacity:1; }
        .edn-card-pending:hover .edn-card-title,
        .edn-card-pending:active .edn-card-title { color:#F5F7FA; }
        .edn-card-pending:hover .edn-card-desc,
        .edn-card-pending:active .edn-card-desc { color:rgba(255,255,255,0.78); }
        .edn-card-pending:hover .edn-card-tag,
        .edn-card-pending:active .edn-card-tag { color:#F5F7FA; background:rgba(255,255,255,0.18); border-color:rgba(255,255,255,0.35); }
        .edn-card-pending:hover .edn-card-pending-label,
        .edn-card-pending:active .edn-card-pending-label { color:rgba(255,255,255,0.85); }
        .edn-card-placeholder { height:220px; overflow:hidden; position:relative; background:linear-gradient(135deg,#EDEDF2,#E8EBEF); display:flex; align-items:center; justify-content:center; }
        .edn-card-pending-badge { position:absolute; top:16px; right:16px; background:#2F8CFF; color:#F5F7FA; font-size:10.5px; font-weight:700; padding:5px 12px; border-radius:100px; letter-spacing:0.05em; }
        .edn-card-pending-label { color:#8391AD; font-size:13px; font-weight:500; }

        .edn-price-card { transition: transform .4s cubic-bezier(0.16,1,0.3,1), border-color .4s, box-shadow .4s; }
        .edn-price-card:hover { transform: translateY(-5px); box-shadow: 0 22px 44px -20px rgba(0,0,0,0.45); }

        .edn-pill { transition:border-color .3s, color .3s, background .3s; }
        .edn-pill:hover { border-color:#2F8CFF; color:#2F8CFF; background:rgba(47,140,255,0.1); }

        .edn-social { color:#8391AD; transition:color .3s; text-decoration: none; }
        .edn-social:hover { color:#2F8CFF; }

        .edn-cube-edge { height:1px; background:linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent); margin:0 6vw; }

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
        }
        @media (max-width: 420px) {
        }
      `}</style>

      <Nav />
      <Hero />
      <div className="edn-cube-edge" />
      <About />
      <div className="edn-cube-edge" />
      <WhyWebsite />
      <div className="edn-cube-edge" />
      <Projects />
      <div className="edn-cube-edge" />
      <Skills />
      <div className="edn-cube-edge" />
      <Pricing />
      <div className="edn-cube-edge" />
      <Contact />
      <div className="edn-cube-edge" />
      <Footer />
    </div>
  );
}
