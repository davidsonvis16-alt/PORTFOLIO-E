import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useRevealAll } from "./tokens";
import { AD_CAMPAIGNS, CASE_STUDIES, EMAIL, INSTAGRAM, NAV, PRICING_TIERS, waLink } from "./data";
import { Arrow, Checker } from "./ui";

const stop = (i) => String(i + 1).padStart(2, "0");

/* The eden. signature, written the way it sits in the corner of every ad. */
function Mark({ className = "" }) {
  return (
    <span className={`mark ${className}`} aria-label="eden">
      eden<i>.</i>
    </span>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
  }, [open]);
  const close = () => setOpen(false);

  return (
    <>
      <header className={`hdr ${open ? "is-open" : ""}`}>
        <div className="hdr-in">
          <Link to="/" className="hdr-logo" onClick={close}>
            <Mark />
          </Link>
          <nav className="hdr-nav" aria-label="Primary">
            {NAV.map((n, i) => (
              <NavLink key={n.to} to={n.to} className={({ isActive }) => (isActive ? "is-on" : "")}>
                <i>{stop(i)}</i>
                {n.label}
              </NavLink>
            ))}
          </nav>
          <a href={waLink("Hi Eden, I'd like to start a project.")} target="_blank" rel="noopener noreferrer" className="btn btn-ink btn-sm hdr-cta">
            Start a project <Arrow />
          </a>
          <button className="hdr-burger" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="Menu">
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Phone menu: the pages as stops on one route line. */}
      <div className={`route-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <p className="mono route-menu-kick">Route · Eden — every stop</p>
        <nav>
          {[{ to: "/", label: "Home" }, ...NAV].map((n, i) => (
            <NavLink
              key={n.to}
              to={n.to}
              end
              onClick={close}
              tabIndex={open ? 0 : -1}
              className={({ isActive }) => (isActive ? "is-on" : "")}
              style={{ transitionDelay: open ? `${0.05 * i}s` : "0s" }}
            >
              <i>{String(i).padStart(2, "0")}</i>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-blue" tabIndex={open ? 0 : -1}>
          Message on WhatsApp <Arrow />
        </a>
      </div>
    </>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <Checker />
      <div className="wrap">
        <div className="foot-top">
          <div>
            <p className="foot-word" aria-hidden="true">
              <Mark />
            </p>
            <p className="foot-line">Websites and ad campaigns for Nairobi and Nakuru businesses.</p>
          </div>
          <a href={waLink("Hi Eden, I'd like to talk about a project.")} target="_blank" rel="noopener noreferrer" className="btn btn-blue">
            This is your stop <Arrow />
          </a>
        </div>
        <div className="foot-cols">
          <div>
            <h4 className="mono">Pages</h4>
            {NAV.map((n) => (
              <Link key={n.to} to={n.to}>
                {n.label}
              </Link>
            ))}
          </div>
          <div>
            <h4 className="mono">Client work</h4>
            {CASE_STUDIES.map((s) => (
              <a key={s.n} href={s.demo} target="_blank" rel="noopener noreferrer">
                {s.client}
              </a>
            ))}
          </div>
          <div>
            <h4 className="mono">Ads</h4>
            {AD_CAMPAIGNS.map((c) => (
              <Link key={c.key} to={`/ads#${c.key}`}>
                {c.name}
              </Link>
            ))}
          </div>
          <div>
            <h4 className="mono">Contact</h4>
            <a href={waLink()} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a href={`mailto:${EMAIL}`}>Email</a>
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </div>
        </div>
        <ol className="foot-notes">
          <li>Load time is the target every build is held to on a 3G connection — not a lab measurement.</li>
          <li>Reply time applies to WhatsApp messages during working hours, Nairobi time.</li>
          <li>Stage 46, The Lineup and Latch Homes are concept campaigns, not client work.</li>
        </ol>
        <div className="foot-base mono">
          <span>© 2026 Eden</span>
          <span>{PRICING_TIERS.length} site plans · 4 ad packages</span>
          <span>Nairobi / Nakuru, Kenya</span>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  const { pathname, hash } = useLocation();
  useRevealAll();

  /* New page starts at the top; a #hash lands on its section. */
  useEffect(() => {
    const el = hash && document.getElementById(hash.slice(1));
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 70;
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
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
