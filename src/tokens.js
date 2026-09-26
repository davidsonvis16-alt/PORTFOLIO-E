import { useState, useRef, useEffect } from "react";

/* Design tokens. Night-studio palette: warm black, bone text, one ember accent.
   Ember is scarce — one emphasis per view. WhatsApp green is reserved for the WhatsApp CTA. */
export const C = {
  bg: "#0B0A09",
  bgRaise: "#141210",
  surface: "#181613",
  ink: "#EFE9DF",
  muted: "#8F877C",
  dim: "#5A544C",
  accent: "#FF5A1F",
  accentSoft: "rgba(255,90,31,0.10)",
  hairline: "rgba(239,233,223,0.10)",
  whatsapp: "#25D366",
};

export const SERIF = "'Instrument Serif', 'Times New Roman', serif";
export const SANS = "'Inter Tight', 'Inter', system-ui, -apple-system, sans-serif";
/* Mono means "this is measured": prices, dates, tags, stack names. */
export const MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function useInView(threshold = 0.35) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* Adds .is-in to every [data-reveal] element as it scrolls into view,
   including ones mounted later (lazy routes, late lists). */
export function useRevealAll() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    const scan = () => document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((n) => io.observe(n));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
