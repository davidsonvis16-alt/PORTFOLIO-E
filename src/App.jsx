import { Suspense, lazy, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import PageTransition, { COVER_MS } from "./components/PageTransition";
import FinalCTA from "./sections/FinalCTA";
import Home from "./pages/Home";
import { useSeo } from "./lib/seo";

/* Secondary routes are split out — the home page is what most visitors load. */
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AboutPage = lazy(() => import("./pages/pages").then((m) => ({ default: m.AboutPage })));
const WhyPage = lazy(() => import("./pages/pages").then((m) => ({ default: m.WhyPage })));
const ProcessPage = lazy(() => import("./pages/pages").then((m) => ({ default: m.ProcessPage })));
const WorkPage = lazy(() => import("./pages/pages").then((m) => ({ default: m.WorkPage })));
const SkillsPage = lazy(() => import("./pages/pages").then((m) => ({ default: m.SkillsPage })));
const PricingPage = lazy(() => import("./pages/pages").then((m) => ({ default: m.PricingPage })));

/** /contact keeps working as a route: it lands on the closing CTA. */
function ContactPage() {
  useSeo({
    title: "Contact",
    description:
      "Start a project with Eden. WhatsApp, Instagram or email — you will hear back within a day.",
    path: "/contact",
  });

  useEffect(() => {
    const node = document.getElementById("contact");
    if (!node) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    node.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, []);

  return <div style={{ height: "1px" }} aria-hidden="true" />;
}

/**
 * Holds the rendered route one beat behind the URL, so the Eden mark can
 * cover the outgoing page before the new one is mounted underneath it.
 */
function useCoveredLocation() {
  const location = useLocation();
  const [shown, setShown] = useState(location);
  // Derived, not stored: the cover is up for exactly as long as the rendered
  // route lags the URL.
  const covering = location.pathname !== shown.pathname;

  useEffect(() => {
    if (!covering) return;
    const t = setTimeout(() => {
      setShown(location);
      if (!location.hash) window.scrollTo({ top: 0, behavior: "instant" });
    }, COVER_MS + 40);
    return () => clearTimeout(t);
  }, [covering, location]);

  return { shown, covering };
}

/** Honours /#section links on first load and on same-page hash changes. */
function useHashScroll(pathname, hash) {
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const node = document.getElementById(id);
    if (!node) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const top = node.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: Math.max(top, 0), behavior: reduce ? "auto" : "smooth" });
  }, [pathname, hash]);
}

export default function App() {
  const { shown, covering } = useCoveredLocation();
  useHashScroll(shown.pathname, shown.hash);

  return (
    // reducedMotion="user" makes every motion component drop its movement
    // when the visitor has asked for reduced motion; opacity still resolves,
    // so nothing stays hidden.
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">Skip to content</a>

      <ScrollProgress />
      <Cursor />
      <Nav />

      <AnimatePresence>{covering && <PageTransition key="transition" />}</AnimatePresence>

      <main id="main">
        <Suspense fallback={<div style={{ minHeight: "70vh" }} />}>
          <Routes location={shown} key={shown.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/why" element={<WhyPage />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/work/:slug" element={<ProjectPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* the old /projects URL still resolves */}
            <Route path="/projects" element={<Navigate to="/work" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <div className="close">
        <FinalCTA level={shown.pathname === "/contact" ? 1 : 2} />
        <Footer />
      </div>

      <BackToTop />
    </MotionConfig>
  );
}
