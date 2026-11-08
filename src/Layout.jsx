import { Suspense, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useRevealAll } from "./tokens";
import { EMAIL, INSTAGRAM, LINE, SITE_NAV, waLink } from "./data";
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
        <Link to="/" className="hdr-logo" aria-label="eden. — home" onClick={close}>
          <Mark />
        </Link>
        <nav className="hdr-nav" aria-label="Main">
          {SITE_NAV.map((n) => (
            <HashLink key={n.to} to={n.to} className="ulink" aria-current={isOn(n.to) ? "page" : undefined}>
              {n.label}
            </HashLink>
          ))}
        </nav>
        <a href={waLink("Hi Eden, I'd like to start a project.")} target="_blank" rel="noopener noreferrer" className="talk">
          Start a project <span aria-hidden="true">↗</span>
          <span className="sr">on WhatsApp (opens in a new tab)</span>
        </a>
        <button
          className="hdr-menu"
          onClick={() => setOpenAt(open ? null : here)}
          aria-expanded={open}
          aria-controls="menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div id="menu" className={`sheet ${open ? "is-open" : ""}`} hidden={!open}>
        <nav className="wrap sheet-nav" aria-label="Main">
          {SITE_NAV.map((n, i) => (
            <HashLink key={n.to} to={n.to} onClick={close}>
              <span className="idx">{String(i + 1).padStart(2, "0")}</span>
              {n.label}
            </HashLink>
          ))}
          <a href={waLink("Hi Eden, I'd like to start a project.")} target="_blank" rel="noopener noreferrer" onClick={close} className="sheet-talk">
            <span className="idx">↗</span>
            Start a project
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
        <Link to="/" aria-label="eden. — home">
          <Mark />
        </Link>
        <p className="foot-tag">{LINE}</p>
        <nav className="foot-links" aria-label="Contact">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="ulink">
            WhatsApp
          </a>
          <a href={`mailto:${EMAIL}`} className="ulink">
            Email
          </a>
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="ulink">
            Instagram
          </a>
        </nav>
        <p className="foot-note">© {new Date().getFullYear()} eden. Ad campaigns shown are concepts, not client work.</p>
      </div>
    </footer>
  );
}

export default function Layout() {
  const { pathname, hash } = useLocation();
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
    </div>
  );
}
