import { Suspense, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useImageFade, useRevealAll } from "./tokens";
import { CATEGORIES, EMAIL, INSTAGRAM, NAV, OFFER_ENDS, PRICING_TIERS, waLink } from "./data";
import { Icon, Mark, PageSkeleton } from "./ui";

/* Search lives in the header; it filters the Work page. */
function Search({ onDone }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [q, setQ] = useState(params.get("q") ?? "");
  const go = (value) => {
    const v = value.trim();
    navigate(v ? `/work?q=${encodeURIComponent(v)}` : "/work", { replace: pathname === "/work" });
  };
  return (
    <form
      className="search"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        go(q);
        onDone?.();
      }}
    >
      <Icon name="search" />
      <input
        type="search"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          if (pathname === "/work") go(e.target.value);
        }}
        placeholder="Search sites, ads, cafés, shops…"
        aria-label="Search the work"
      />
    </form>
  );
}

function Header() {
  /* The menu remembers where it was opened; navigating anywhere closes it. */
  const { pathname, hash } = useLocation();
  const here = pathname + hash;
  const [openAt, setOpenAt] = useState(null);
  const open = openAt === here;
  const setOpen = (fn) => setOpenAt((fn(open) ? here : null));
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
  }, [open]);

  return (
    <>
      <Link to="/rates" className="promo">
        End-of-year offer: websites from KSh {PRICING_TIERS[0].price}, free hosting — until {OFFER_ENDS}
      </Link>
      <header className="hdr">
        <div className="wrap hdr-row">
          <Link to="/" className="hdr-logo" aria-label="eden — home">
            <Mark />
            <span className="hdr-tag">Websites &amp; ads</span>
          </Link>
          <div className="hdr-search">
            <Search />
          </div>
          <div className="hdr-acts">
            <a href={waLink("Hi Eden, I'd like to ask about a project.")} target="_blank" rel="noopener noreferrer" className="pill pill-grey">
              WhatsApp
            </a>
            <a href={waLink("Hi Eden, I'd like to start a project.")} target="_blank" rel="noopener noreferrer" className="pill pill-lime">
              Start a project
            </a>
            <button className="hdr-menu" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="Menu">
              <Icon name={open ? "close" : "menu"} size={20} />
            </button>
          </div>
        </div>
        <nav className="wrap cats" aria-label="Categories">
          {CATEGORIES.map((c) => (
            <Link key={c.to} to={c.to} className={pathname + hash === c.to ? "is-on" : ""}>
              {c.icon && <Icon name={c.icon} size={15} />}
              {c.label}
            </Link>
          ))}
          <Link to="/about" className={pathname === "/about" ? "is-on" : ""}>
            About
          </Link>
        </nav>
      </header>

      <div className={`sheet ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <Search onDone={() => setOpenAt(null)} />
        <nav>
          {[{ to: "/", label: "Home" }, ...NAV].map((n) => (
            <NavLink key={n.to} to={n.to} end tabIndex={open ? 0 : -1} className={({ isActive }) => (isActive ? "is-on" : "")}>
              {n.label}
              <Icon name="chev" />
            </NavLink>
          ))}
        </nav>
        <a href={waLink("Hi Eden, I'd like to start a project.")} target="_blank" rel="noopener noreferrer" className="pill pill-lime pill-big" tabIndex={open ? 0 : -1}>
          Start a project on WhatsApp
        </a>
      </div>
    </>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-row">
        <span className="foot-left">
          <Mark /> © 2026 · Nairobi / Nakuru
        </span>
        <nav className="foot-links" aria-label="Contact">
          <a href={waLink()} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <a href={`mailto:${EMAIL}`}>Email</a>
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </nav>
      </div>
      <p className="wrap foot-note">Ad campaigns shown are concepts, not client work. Load times are targets, not lab measurements.</p>
    </footer>
  );
}

export default function Layout() {
  const { pathname, hash } = useLocation();
  useRevealAll();
  useImageFade();

  /* New page starts at the top; a #hash lands on its section. */
  useEffect(() => {
    const el = hash && document.getElementById(hash.slice(1));
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: "auto" });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <div className="site">
      <a href="#main" className="skip">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
