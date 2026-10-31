import { useEffect } from "react";
import { STACK_ICONS } from "./stackIcons";
import { phone } from "./data";

/* Generic glyphs for entries with no public brand mark — never an imitation logo. */
const GLYPHS = {
  "M-Pesa": "M7 2h10a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Zm1 2v14h8V4H8Zm3 15.5a1 1 0 1 0 2 0 1 1 0 0 0-2 0ZM9.5 11h5v2h-5z",
  "Responsive Design": "M2 4h14a1 1 0 0 1 1 1v3h-2V6H3v9h9v2H9v1H6v-1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm14 6h5a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Zm1 2v6h3v-6h-3Z",
};

export function Arrow() {
  return (
    <svg className="arr" width="16" height="12" viewBox="0 0 16 12" aria-hidden="true">
      <path d="M1 6h13M9 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}

export function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="ic-check">
      <path d="M3 8.5l3 3 7-7.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" />
    </svg>
  );
}

/* Black-and-white checker flag strip, as on the Stage 46 posters. */
export function Checker({ className = "" }) {
  return <div className={`checker ${className}`} aria-hidden="true" />;
}

/* Poster-style page header: stop number, huge condensed title, one line under it. */
export function PageHead({ stop, kicker, title, accent, sub, children }) {
  return (
    <section className="phead">
      <div className="wrap">
        <p className="mono phead-kick rise">
          <span className="phead-stop">Stop {stop}</span> {kicker}
        </p>
        <h1 className="d-hero rise" style={{ animationDelay: "0.08s" }}>
          {title} {accent && <em>{accent}</em>}
        </h1>
        {sub && (
          <p className="lede rise" style={{ animationDelay: "0.16s" }}>
            {sub}
          </p>
        )}
        {children}
      </div>
      <Checker />
    </section>
  );
}

export function SecHead({ kick, title, accent, sub, light }) {
  return (
    <div className={`sechead${light ? " sechead-light" : ""}`} data-reveal>
      {kick && <p className="mono">{kick}</p>}
      <h2 className="d-h2">
        {title} {accent && <em>{accent}</em>}
      </h2>
      {sub && <p className="lede">{sub}</p>}
    </div>
  );
}

/* A plain browser window around a desktop screenshot. */
export function Browser({ src, url, alt, eager = false }) {
  return (
    <div className="browser">
      <div className="browser-bar" aria-hidden="true">
        <span className="dots">
          <i />
          <i />
          <i />
        </span>
        <span className="browser-url">{url}</span>
      </div>
      <img src={src} alt={alt} width="1152" height="720" loading={eager ? "eager" : "lazy"} decoding="async" />
    </div>
  );
}

/* A generic phone around a mobile screenshot. */
export function Phone({ src, alt, eager = false, className = "" }) {
  return (
    <div className={`phone ${className}`}>
      <img src={src} alt={alt} width="390" height="844" loading={eager ? "eager" : "lazy"} decoding="async" />
    </div>
  );
}

export function Devices({ img, url, name, eager }) {
  return (
    <div className="devices">
      <Browser src={img} url={url} alt={`${name} on desktop`} eager={eager} />
      <Phone src={phone(img)} alt={`${name} on a phone`} eager={eager} className="devices-phone" />
    </div>
  );
}

export function StackMark({ name }) {
  const brand = STACK_ICONS[name];
  const path = brand?.path ?? GLYPHS[name];
  if (!path) return null;
  const fill = !brand || brand.hex === "#000000" ? "#0b0b0c" : brand.hex;
  return (
    <svg className="stack-logo" viewBox="0 0 24 24" fill={fill} aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

/* Full-size viewer for a list of images; arrow keys step, Escape closes. */
export function Lightbox({ items, index, onClose, onStep }) {
  const item = index == null ? null : items[index];
  useEffect(() => {
    if (!item) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    document.documentElement.classList.add("menu-open");
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [item, onClose, onStep]);
  if (!item) return null;
  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label={item.title} onClick={onClose}>
      <div className="lb-top mono" onClick={(e) => e.stopPropagation()}>
        <span>
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")} · {item.format}
        </span>
        <button onClick={onClose} className="lb-x">
          Close ✕
        </button>
      </div>
      <figure className="lb-fig" onClick={(e) => e.stopPropagation()}>
        {item.video ? (
          <video key={item.src} src={item.src} poster={item.poster} controls autoPlay loop playsInline aria-label={item.title} />
        ) : (
          <img key={item.src} src={item.src} alt={item.title} />
        )}
        <figcaption className="d-h3">{item.title}</figcaption>
      </figure>
      <button className="lb-nav lb-prev" onClick={(e) => (e.stopPropagation(), onStep(-1))} aria-label="Previous">
        ←
      </button>
      <button className="lb-nav lb-next" onClick={(e) => (e.stopPropagation(), onStep(1))} aria-label="Next">
        →
      </button>
    </div>
  );
}

/* Shown while a page's code is still downloading. */
export function PageSkeleton() {
  return (
    <div className="pskel" aria-busy="true" aria-label="Loading">
      <div className="pskel-head">
        <div className="wrap">
          <span className="skel skel-kick" />
          <span className="skel skel-title" />
          <span className="skel skel-title skel-short" />
          <span className="skel skel-line" />
        </div>
      </div>
      <div className="wrap pskel-grid">
        {[0, 1, 2].map((i) => (
          <span key={i} className="skel skel-card" />
        ))}
      </div>
    </div>
  );
}
