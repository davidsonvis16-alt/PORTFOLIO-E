import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { EASE, stagger } from "../lib/motion";
import {
  useActiveSection,
  useEscape,
  useScrollLock,
  useScrolled,
  useScrollToSection,
} from "../lib/hooks";
import { BRAND, CONTACT, MESSAGES, NAV_ITEMS, waLink } from "../data/site";
import { ArrowIcon, InstagramIcon, LogoMark, WhatsAppIcon } from "./icons";

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);

  const onHome = location.pathname === "/";
  const activeSection = useActiveSection(SECTION_IDS, onHome);
  const scrollToSection = useScrollToSection();

  useScrollLock(open);
  useEscape(() => setOpen(false), open);

  const isActive = (item) =>
    onHome ? activeSection === item.id : location.pathname === item.path;

  /* On the home page every section is already on screen, so scroll to it.
     Anywhere else, go to that section's own page. */
  const handleNav = (event, item) => {
    if (!onHome) return;
    event.preventDefault();
    setOpen(false);
    if (item.id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.replaceState(null, "", "/");
      return;
    }
    if (scrollToSection(item.id)) {
      window.history.replaceState(null, "", `/#${item.id}`);
    } else {
      navigate(item.path);
    }
  };

  return (
    <>
      <motion.header
        className={`nav${scrolled ? " nav--scrolled" : ""}`}
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
      >
        <div className="container nav__inner">
          <Link to="/" className="brand" aria-label={`${BRAND.name} — home`}>
            <LogoMark size={24} className="brand__mark" />
            <span>
              {BRAND.name}
              <span className="brand__dot">.</span>
            </span>
            <span className="brand__sub">{BRAND.label}</span>
          </Link>

          <nav className="nav__links" aria-label="Primary">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className="nav__link"
                  aria-current={active ? "true" : undefined}
                  onClick={(e) => handleNav(e, item)}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="nav__pill"
                      transition={{ duration: 0.4, ease: EASE }}
                    />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="nav__actions">
            <a
              className="btn btn--primary btn--sm"
              href={waLink(MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
            >
              Start a project <ArrowIcon size={13} />
            </a>

            <button
              type="button"
              className="nav__toggle"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="nav__toggle-bar" />
              <span className="nav__toggle-bar" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="sheet"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.34, ease: EASE }}
          >
            <motion.nav
              className="sheet__links"
              aria-label="Mobile"
              initial="hidden"
              animate="visible"
              variants={stagger(0.055, 0.08)}
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                  }}
                >
                  <Link
                    to={item.path}
                    className="sheet__link"
                    aria-current={isActive(item) ? "true" : undefined}
                    onClick={(e) => {
                      handleNav(e, item);
                      setOpen(false);
                    }}
                  >
                    <span className="index-tag">{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <div className="sheet__foot">
              <span className="status">
                <span className="status__dot" />
                {BRAND.availability}
              </span>
              <div className="sheet__social">
                <a
                  className="btn btn--primary btn--sm"
                  href={waLink(MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon size={15} /> WhatsApp
                </a>
                <a
                  className="btn btn--ghost btn--sm"
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon size={15} /> Instagram
                </a>
              </div>
              <span className="mono">{BRAND.location}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
