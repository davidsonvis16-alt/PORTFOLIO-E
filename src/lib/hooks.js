import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

const NO_OP = () => () => {};

/** True once the element has scrolled into view. Fires once, then disconnects. */
export function useInView({ threshold = 0.25, rootMargin = "0px 0px -10% 0px" } = {}) {
  const ref = useRef(null);
  // If the browser has no IntersectionObserver, treat everything as visible.
  const [inView, setInView] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}

/** Counts 0 → target once `start` flips true. Uses rAF, cleans up after itself. */
export function useCountUp(target, { duration = 1400, start = false } = {}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf = 0;
    let t0 = 0;
    const tick = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      // ease-out, so the number settles rather than stopping dead
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return value;
}

/** True once the page has scrolled past `offset`. Passive, snapshot-based. */
export function useScrolled(offset = 32) {
  const subscribe = useCallback((onChange) => {
    window.addEventListener("scroll", onChange, { passive: true });
    return () => window.removeEventListener("scroll", onChange);
  }, []);
  const getSnapshot = useCallback(() => window.scrollY > offset, [offset]);
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** Matches a media query, and keeps matching as the viewport changes. */
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      if (typeof window === "undefined" || !window.matchMedia) return NO_OP();
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query]
  );
  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia(query).matches;
  }, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** A precise pointer (mouse/trackpad) that can hover — i.e. not a touch device. */
export function useFinePointer() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/**
 * Scroll-spy over section ids. Picks the last section whose top has passed a
 * line a third of the way down the viewport.
 *
 * Position-based rather than IntersectionObserver ratios on purpose: a
 * section taller than the viewport never reaches a meaningful ratio, so a
 * threshold-based spy silently skips the longest sections on the page.
 */
export function useActiveSection(ids, enabled = true) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;

    const pick = () => {
      frame = 0;
      const line = window.scrollY + window.innerHeight * 0.34;
      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;

      let best = ids[0];
      let bestTop = -Infinity;
      let last = null;

      for (const id of ids) {
        const node = document.getElementById(id);
        if (!node) continue;
        const top = node.getBoundingClientRect().top + window.scrollY;
        last = top > (last?.top ?? -Infinity) ? { id, top } : last;
        if (top <= line && top > bestTop) {
          best = id;
          bestTop = top;
        }
      }

      // at the very bottom the final section can never cross the line
      if (atBottom && last) best = last.id;
      setActive((current) => (current === best ? current : best));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(pick);
    };

    frame = requestAnimationFrame(pick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [ids, enabled]);

  return enabled ? active : null;
}

/** Locks body scroll while `locked` — used by the mobile menu. */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;
    const { body } = document;
    const previous = body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    body.classList.add("is-locked");
    return () => {
      body.classList.remove("is-locked");
      body.style.paddingRight = previous;
    };
  }, [locked]);
}

/** Calls `handler` on Escape. */
export function useEscape(handler, active = true) {
  const saved = useRef(handler);

  useEffect(() => {
    saved.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      if (e.key === "Escape") saved.current();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);
}

/** Smooth-scrolls to a section, allowing for the fixed header. */
export function useScrollToSection() {
  return useCallback((id) => {
    const node = document.getElementById(id);
    if (!node) return false;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const top = node.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: Math.max(top, 0), behavior: reduce ? "auto" : "smooth" });
    return true;
  }, []);
}
