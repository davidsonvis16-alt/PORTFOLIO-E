import { useState, useRef, useEffect } from "react";

/* Design tokens mirror the CSS variables in site.css. */
export const C = {
  ink: "#1D1D1F",
  sub: "#6E6E73",
  blue: "#0066CC",
};

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
   including ones mounted later (route changes, late lists). */
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

export function useLightbox(length) {
  const [index, setIndex] = useState(null);
  const close = () => setIndex(null);
  const step = (d) => setIndex((i) => (i == null ? i : (i + d + length) % length));
  return { index, open: setIndex, close, step };
}

/* Images start hidden over a skeleton and fade in once loaded.
   Covers images mounted later too (route changes, lightbox). */
export function useImageFade() {
  useEffect(() => {
    const done = (img) => img.classList.add("is-loaded");
    const scan = () =>
      document.querySelectorAll("main img:not(.is-loaded), .lb img:not(.is-loaded)").forEach((img) => {
        if (img.complete && img.naturalWidth) return done(img);
        if (img.dataset.watch) return;
        img.dataset.watch = "1";
        img.addEventListener("load", () => done(img), { once: true });
        img.addEventListener("error", () => done(img), { once: true });
      });
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);
}
