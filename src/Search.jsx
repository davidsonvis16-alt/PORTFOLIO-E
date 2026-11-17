import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AD_CAMPAIGNS, CASE_STUDIES, OTHER_BUILDS, PACKAGES, SITE_NAV } from "./data";
import { Icon } from "./ui";

/* Everything the search box can find: pages, packages to order, live sites
   and ad campaigns. Built once from the site's own data. */
const INDEX = [
  ...SITE_NAV.map((n) => ({ kind: "Page", title: n.label, to: n.to })),
  { kind: "Page", title: "Order", to: "/order", words: "cart buy package quote" },
  { kind: "Page", title: "Pay an invoice", to: "/pay", words: "mpesa m-pesa card paystack deposit" },
  ...PACKAGES.map((p) => ({ kind: "Order", title: p.name, to: `/order?p=${p.key}`, words: `${p.group} ${p.blurb}` })),
  ...CASE_STUDIES.map((s) => ({ kind: "Client site", title: s.client, href: s.demo, words: `${s.place} ${s.need}` })),
  ...OTHER_BUILDS.filter((b) => b.demo?.startsWith("http")).map((b) => ({ kind: "Our build", title: b.title, href: b.demo, words: `${b.kind} ${b.desc}` })),
  ...AD_CAMPAIGNS.map((c) => ({ kind: "Ad campaign", title: c.name, to: `/ads#${c.key}`, words: c.sector })),
];

function find(q) {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return INDEX.filter((it) => it.kind === "Page").slice(0, 6);
  return INDEX.map((it) => {
    const title = it.title.toLowerCase();
    const all = `${title} ${it.kind} ${it.words || ""}`.toLowerCase();
    if (!terms.every((t) => all.includes(t))) return null;
    const score = terms.reduce((n, t) => n + (title.startsWith(t) ? 3 : title.includes(t) ? 2 : 1), 0);
    return { it, score };
  })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((r) => r.it);
}

/* A search box over the page. Opens from the header button, Ctrl/⌘ K or "/". */
export function Search({ open, onClose }) {
  const [q, setQ] = useState("");
  const [at, setAt] = useState(0);
  const input = useRef(null);
  const results = useMemo(() => find(q), [q]);

  useEffect(() => {
    if (!open) return;
    setQ("");
    setAt(0);
    requestAnimationFrame(() => input.current?.focus());
    document.documentElement.classList.add("menu-open");
    return () => document.documentElement.classList.remove("menu-open");
  }, [open]);

  useEffect(() => setAt(0), [q]);

  if (!open) return null;

  const onKey = (e) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowDown") (e.preventDefault(), setAt((n) => Math.min(n + 1, results.length - 1)));
    if (e.key === "ArrowUp") (e.preventDefault(), setAt((n) => Math.max(n - 1, 0)));
    if (e.key === "Enter" && results[at]) {
      e.preventDefault();
      document.getElementById(`sr-${at}`)?.click();
    }
  };

  return (
    <div className="search" role="dialog" aria-modal="true" aria-label="Search the site" onClick={onClose}>
      <div className="search-box" onClick={(e) => e.stopPropagation()}>
        <label className="search-field">
          <Icon name="search" size={18} />
          <span className="sr">Search</span>
          <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKey} placeholder="Search sites, packages, ads…" autoComplete="off" />
          <button type="button" className="search-x" onClick={onClose} aria-label="Close search">
            Esc
          </button>
        </label>
        <ul className="search-list" role="listbox">
          {results.length === 0 && <li className="search-none">Nothing for “{q}”. Try “shop”, “M-Pesa” or “restaurant”.</li>}
          {results.map((it, i) => {
            const body = (
              <>
                <span className="search-kind">{it.kind}</span>
                <b>{it.title}</b>
                <span aria-hidden="true">{it.href ? "↗" : "→"}</span>
              </>
            );
            const cls = `search-hit ${i === at ? "is-at" : ""}`;
            return (
              <li key={`${it.kind}-${it.title}`} role="option" aria-selected={i === at} onMouseEnter={() => setAt(i)}>
                {it.href ? (
                  <a id={`sr-${i}`} href={it.href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClose}>
                    {body}
                  </a>
                ) : (
                  <Link id={`sr-${i}`} to={it.to} className={cls} onClick={onClose}>
                    {body}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
