import { useCallback, useEffect, useState } from "react";
import { PACKAGES } from "./data";

/* The order cart: package keys and quantities, kept in this browser so it
   survives a reload and moving between pages. Every useCart() stays in step
   through one window event. */
const KEY = "tessy-cart";
const EVENT = "tessy:cart";

function read() {
  try {
    const items = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(items) ? items.filter((it) => PACKAGES.some((p) => p.key === it.key)) : [];
  } catch {
    return [];
  }
}

function write(items) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // Private mode or storage full: the cart still works for this visit.
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: items }));
}

export function useCart() {
  const [items, setItems] = useState(read);

  useEffect(() => {
    const sync = (e) => setItems(e.detail ?? read());
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, []);

  const update = useCallback((fn) => {
    const next = fn(read());
    setItems(next);
    write(next);
  }, []);

  const add = useCallback((key) => update((list) => (list.some((it) => it.key === key) ? list : [...list, { key, qty: 1 }])), [update]);
  const remove = useCallback((key) => update((list) => list.filter((it) => it.key !== key)), [update]);
  const setQty = useCallback((key, qty) => update((list) => list.map((it) => (it.key === key ? { ...it, qty: Math.max(1, Math.min(20, qty)) } : it))), [update]);
  const clear = useCallback(() => update(() => []), [update]);

  const lines = items.map((it) => ({ ...it, pkg: PACKAGES.find((p) => p.key === it.key) }));
  const priced = lines.filter((l) => l.pkg.from != null);
  const total = priced.reduce((sum, l) => sum + l.pkg.from * l.qty, 0);
  const count = items.reduce((n, it) => n + it.qty, 0);

  return { lines, count, total, hasQuoted: lines.some((l) => l.pkg.from == null), add, remove, setQty, clear, has: (key) => items.some((it) => it.key === key) };
}
