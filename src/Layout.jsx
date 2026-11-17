import { Suspense, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useRevealAll } from "./tokens";
import { EMAIL, LINE, SITE_NAV, waLink } from "./data";
import { HashLink, Mark } from "./ui";

function Header() {
  /* The menu remembers where it was opened; navigating anywhere closes it. */
  const { pathname, hash } = useLocation();
  const here = pathname + hash;
  const [openAt, setOpenAt] = useState(null);
  const open = openAt === here;
  const close = () => setOpenAt(null);
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpenAt(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isOn = (to) => (to.startsWith("/#") ? pathname === "/" && hash === to.slice(1) : pathname === to);

  return (
    <header className="hdr">
      <div className="wrap hdr-row">
        <button
          className={`hdr-menu ${open ? "is-open" : ""}`}
          onClick={() => setOpenAt(open ? null : here)}
          aria-expanded={open}
          aria-controls="menu"
        >
          <span className="burger" aria-hidden="true">
            <i />
            <i />
          </span>
          {open ? "Close" : "Menu"}
        </button>
        <nav className="hdr-nav" aria-label="Main">
          {SITE_NAV.map((n) => (
            <HashLink key={n.to} to={n.to} className="pill-link" aria-current={isOn(n.to) ? "page" : undefined}>
              {n.label}
            </HashLink>
          ))}
        </nav>
        <Link to="/" className="hdr-logo" aria-label="Tess — home" onClick={close}>
          <Mark />
        </Link>
        <a href={waLink("Hi Tess, I'd like to start a project.")} target="_blank" rel="noopener noreferrer" className="talk">
          <span className="talk-long">Start a project</span>
          <span className="talk-short" aria-hidden="true">
            Chat
          </span>
          <span aria-hidden="true">↗</span>
          <span className="sr">on WhatsApp (opens in a new tab)</span>
        </a>
      </div>

      <div id="menu" className={`sheet ${open ? "is-open" : ""}`} hidden={!open}>
        <nav className="wrap sheet-nav" aria-label="Main">
          {SITE_NAV.map((n, i) => (
            <HashLink key={n.to} to={n.to} onClick={close} style={{ "--d": `${i * 45}ms` }}>
              {n.label}
              <span aria-hidden="true">→</span>
            </HashLink>
          ))}
          <a
            href={waLink("Hi Tess, I'd like to start a project.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="sheet-talk"
            style={{ "--d": `${SITE_NAV.length * 45}ms` }}
          >
            Start a project on WhatsApp
            <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-row">
        <Link to="/" aria-label="Tess — home">
          <Mark />
        </Link>
        <p className="foot-tag">{LINE}</p>
        <nav className="foot-links" aria-label="Contact">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="ulink">
            WhatsApp +254 142 614 743
          </a>
          <a href={`mailto:${EMAIL}`} className="ulink">
            {EMAIL}
          </a>
        </nav>
        <p className="foot-note">© {new Date().getFullYear()} Tess. Ad campaigns shown are concepts, not client work.</p>
      </div>
    </footer>
  );
}

/* The floating chat pill (phones) waits until the top of the page — which
   has its own WhatsApp buttons — has scrolled away. */
function useScrolledPast(px) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const check = () => setPast(window.scrollY > px);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [px]);
  return past;
}

export default function Layout() {
  const { pathname, hash } = useLocation();
  const showFab = useScrolledPast(700);
  useRevealAll();

  /* New page starts at the top; a #hash lands on its section, gliding
     there when it is on the page already open. */
  const lastPath = useRef(pathname);
  useEffect(() => {
    const samePage = lastPath.current === pathname;
    lastPath.current = pathname;
    const el = hash && document.getElementById(hash.slice(1));
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (el) el.scrollIntoView({ behavior: samePage && !calm ? "smooth" : "auto" });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="site">
      <a href="#main" className="skip">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<div className="page-wait" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <a href={waLink("Hi Tess, I'd like to start a project.")} target="_blank" rel="noopener noreferrer" className={`fab ${showFab ? "is-on" : ""}`} tabIndex={showFab ? undefined : -1}>
        Start a project on WhatsApp <span aria-hidden="true">↗</span>
        <span className="sr">(opens in a new tab)</span>
      </a>
    </div>
  );
}
