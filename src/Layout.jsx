import { Suspense, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useRevealAll } from "./tokens";
import { EMAIL, LINE, PACKAGES, SITE_NAV, waLink } from "./data";
import { HashLink, Icon, Mark } from "./ui";
import { useCart } from "./cart";
import { Search } from "./Search";

/* The Services dropdown, set out like a hosting company's menu: grouped
   links with an icon, a name and one line each, and a coloured card on the
   right that starts an order. Each link opens the order page with that
   package already in the cart. */
const MEGA_GROUPS = ["Websites", "Platforms & apps", "Ads"];

function ServicesMenu({ open, onClose }) {
  return (
    <div
      id="services"
      className={`mega ${open ? "is-open" : ""}`}
      hidden={!open}
    >
      <div className="mega-panel">
        {MEGA_GROUPS.map((g) => (
          <div key={g} className="mega-col">
            <p className="mega-title">{g}</p>
            <ul>
              {PACKAGES.filter((p) => p.group === g).map((p) => (
                <li key={p.key}>
                  <Link
                    to={`/order?p=${p.key}`}
                    className="mega-link"
                    onClick={onClose}
                  >
                    <span className="mega-ic">
                      <Icon name={p.icon} />
                    </span>
                    <span className="mega-text">
                      <b>{p.name}</b>
                      <span>{p.blurb}</span>
                    </span>
                    <span className="mega-go" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Link to="/order" className="mega-card t-ink" onClick={onClose}>
          <span className="mega-card-k">Build your order</span>
          <b>Pick a package, show us the look you like, send it.</b>
          <span>
            We reply with a fixed price — usually within a working day.
          </span>
          <span className="mega-card-go" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}

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

  const isOn = (to) =>
    to.startsWith("/#")
      ? pathname === "/" && hash === to.slice(1)
      : pathname === to;

  /* Services dropdown: opens on hover or click, closes on Escape, a click
     outside, or moving to another page. */
  const [mega, setMega] = useState(false);
  const megaWrap = useRef(null);
  const leaveTimer = useRef();
  useEffect(() => setMega(false), [pathname, hash]);
  useEffect(() => {
    if (!mega) return;
    const onKey = (e) => e.key === "Escape" && setMega(false);
    const onDown = (e) =>
      megaWrap.current &&
      !megaWrap.current.contains(e.target) &&
      setMega(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [mega]);
  const hoverOpen = () => {
    clearTimeout(leaveTimer.current);
    setMega(true);
  };
  const hoverClose = () => {
    leaveTimer.current = setTimeout(() => setMega(false), 180);
  };
  const cart = useCart();

  /* Search opens from the header button, Ctrl/⌘ K, or "/" when not typing. */
  const [searching, setSearching] = useState(false);
  useEffect(() => {
    const onKey = (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable;
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setSearching(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
        <div
          className="hdr-navwrap"
          ref={megaWrap}
          onMouseLeave={hoverClose}
          onMouseEnter={() => mega && clearTimeout(leaveTimer.current)}
        >
          <nav className="hdr-nav" aria-label="Main">
            <button
              type="button"
              className={`pill-link mega-btn ${mega ? "is-open" : ""}`}
              aria-expanded={mega}
              aria-controls="services"
              onClick={() => setMega((v) => !v)}
              onMouseEnter={hoverOpen}
            >
              Services
              <Icon name="chev" size={12} className="mega-chev" />
            </button>
            {SITE_NAV.map((n) => (
              <HashLink
                key={n.to}
                to={n.to}
                className="pill-link"
                aria-current={isOn(n.to) ? "page" : undefined}
              >
                {n.label}
              </HashLink>
            ))}
          </nav>
          <ServicesMenu open={mega} onClose={() => setMega(false)} />
        </div>
        <Link
          to="/"
          className="hdr-logo"
          aria-label="Tessy — home"
          onClick={close}
        >
          <Mark />
        </Link>
        <div className="hdr-end">
          <button type="button" className="cart-pill" onClick={() => setSearching(true)} aria-label="Search (Ctrl K)">
            <Icon name="search" size={17} />
          </button>
          <Link to="/login" className="cart-pill" aria-label="Client login">
            <Icon name="user" size={17} />
          </Link>
          <Link
            to="/order"
            className="cart-pill"
            aria-label={`Your order, ${cart.count} item${cart.count === 1 ? "" : "s"}`}
          >
            <Icon name="bag" size={17} />
            {cart.count > 0 && <span className="cart-count">{cart.count}</span>}
          </Link>
          <a
            href={waLink("Hi Tessy, I'd like to start a project.")}
            target="_blank"
            rel="noopener noreferrer"
            className="talk"
          >
            <span className="talk-long">Start a project</span>
            <span className="talk-short" aria-hidden="true">
              Chat
            </span>
            <span aria-hidden="true">↗</span>
            <span className="sr">on WhatsApp (opens in a new tab)</span>
          </a>
        </div>
      </div>

      <div
        id="menu"
        className={`sheet ${open ? "is-open" : ""}`}
        hidden={!open}
      >
        <nav className="wrap sheet-nav" aria-label="Main">
          {SITE_NAV.map((n, i) => (
            <HashLink
              key={n.to}
              to={n.to}
              onClick={close}
              style={{ "--d": `${i * 45}ms` }}
            >
              {n.label}
              <span aria-hidden="true">→</span>
            </HashLink>
          ))}
          <Link
            to="/order"
            onClick={close}
            className="sheet-order"
            style={{ "--d": `${(SITE_NAV.length - 0.5) * 45}ms` }}
          >
            Order a site, app or ads
            <span aria-hidden="true">
              {cart.count ? `${cart.count} in cart →` : "→"}
            </span>
          </Link>
          <a
            href={waLink("Hi Tessy, I'd like to start a project.")}
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
      <Search open={searching} onClose={() => setSearching(false)} />
    </header>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-row">
        <Link to="/" aria-label="Tessy — home">
          <Mark />
        </Link>
        <p className="foot-tag">{LINE}</p>
        <nav className="foot-links" aria-label="Contact">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="ulink"
          >
            WhatsApp +254 142 614 743
          </a>
          <Link to="/pay" className="ulink">
            Pay an invoice
          </Link>
          {EMAIL && (
            <a href={`mailto:${EMAIL}`} className="ulink">
              {EMAIL}
            </a>
          )}
        </nav>
        <p className="foot-note">
          © {new Date().getFullYear()} Tessy. Ad campaigns shown are concepts,
          not client work.
        </p>
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
    if (el)
      el.scrollIntoView({ behavior: samePage && !calm ? "smooth" : "auto" });
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
      <a
        href={waLink("Hi Tessy, I'd like to start a project.")}
        target="_blank"
        rel="noopener noreferrer"
        className={`fab ${showFab ? "is-on" : ""}`}
        tabIndex={showFab ? undefined : -1}
      >
        Start a project on WhatsApp <span aria-hidden="true">↗</span>
        <span className="sr">(opens in a new tab)</span>
      </a>
    </div>
  );
}
