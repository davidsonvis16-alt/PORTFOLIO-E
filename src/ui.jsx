import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { STACK_ICONS } from "./stackIcons";

/* Generic glyphs for entries with no public brand mark — never an imitation logo. */
const GLYPHS = {
  "M-Pesa": "M7 2h10a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Zm1 2v14h8V4H8Zm3 15.5a1 1 0 1 0 2 0 1 1 0 0 0-2 0ZM9.5 11h5v2h-5z",
  "Responsive Design": "M2 4h14a1 1 0 0 1 1 1v3h-2V6H3v9h9v2H9v1H6v-1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm14 6h5a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Zm1 2v6h3v-6h-3Z",
};

/* Small line icons, drawn at 16px. */
const PATHS = {
  out: "M6 3h7v7M13 3 4 12",
  play: "M5 3.5v9l7.5-4.5z",
  expand: "M9.5 2.5h4v4M6.5 13.5h-4v-4M13.5 2.5 9 7M2.5 13.5 7 9",
  clock: "M8 1.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 8 1.8ZM8 4.5V8l2.3 1.5",
  code: "M5.5 4.5 2 8l3.5 3.5M10.5 4.5 14 8l-3.5 3.5",
  live: "M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z",
  image: "M2.5 3h11v10h-11zM2.5 10.5l3-3 3 3 2-2 3 3",
  sound: "M2.5 6v4h2.5L8.5 13V3L5 6zM11 5.5a3.5 3.5 0 0 1 0 5M12.8 3.6a6 6 0 0 1 0 8.8",
  search: "M7 2.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9ZM10.3 10.3 13.5 13.5",
  check: "M3 8.5l3 3 7-7.5",
  chev: "M6 3l5 5-5 5",
  close: "M3.5 3.5l9 9M12.5 3.5l-9 9",
  menu: "M2.5 5h11M2.5 11h11",
  // what each business is
  cup: "M3 5.5h8v4.5a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zM11 7h1.2a1.8 1.8 0 0 1 0 3.6H11M5.5 2v1.6M8 2v1.6",
  utensils: "M4.5 2v12M3 2v3.5a1.5 1.5 0 0 0 3 0V2M11.5 14V2C9.8 3 9 5 9 7.5h2.5",
  bowl: "M2 8h12a6 6 0 0 1-12 0ZM5 5.5c0-1 1-1 1-2M8 5.5c0-1 1-1 1-2M11 5.5c0-1 1-1 1-2",
  flower: "M6.6 3.9a1.4 1.4 0 1 0 2.8 0a1.4 1.4 0 1 0-2.8 0M9 6.3a1.4 1.4 0 1 0 2.8 0a1.4 1.4 0 1 0-2.8 0M6.6 8.7a1.4 1.4 0 1 0 2.8 0a1.4 1.4 0 1 0-2.8 0M4.2 6.3a1.4 1.4 0 1 0 2.8 0a1.4 1.4 0 1 0-2.8 0M8 10.1V14M8 12c1.2-1.4 2.6-1.6 3.6-1.2-.6 1.2-2 1.6-3.6 1.2Z",
  bag: "M3 5.5h10l-.8 8.5H3.8zM5.8 5.5V4.3a2.2 2.2 0 0 1 4.4 0v1.2",
  home: "M2.5 7.5 8 3l5.5 4.5M4 6.5V13h8V6.5M6.8 13V9.8h2.4V13",
  device: "M5 1.8h6a1 1 0 0 1 1 1v10.4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2.8a1 1 0 0 1 1-1ZM7.2 12h1.6",
  shoe: "M2 11.5V6.2l2.6.6 1.6 2.1 3 1 3.9.9a1.6 1.6 0 0 1 1.1 1.5V12H2zM2 12h12.2",
  pen: "M10.5 2.5l3 3-7.5 7.5-3.5.5.5-3.5z",
  truck: "M1.8 4.5h7.7v6.5H1.8zM9.5 7h2.8l1.9 2.2V11H9.5M3.3 12.3a1.1 1.1 0 1 0 2.2 0a1.1 1.1 0 1 0-2.2 0M10.6 12.3a1.1 1.1 0 1 0 2.2 0a1.1 1.1 0 1 0-2.2 0",
  heart: "M8 13.5S2.5 10.2 2.5 6.2A2.7 2.7 0 0 1 8 4.8a2.7 2.7 0 0 1 5.5 1.4C13.5 10.2 8 13.5 8 13.5Z",
  book: "M8 4.2C6.5 3 4.5 2.8 2.5 3v9.5c2-.2 4 0 5.5 1.2 1.5-1.2 3.5-1.4 5.5-1.2V3c-2-.2-4 0-5.5 1.2ZM8 4.2v9.5",
  cap: "M1.8 6 8 3l6.2 3L8 9zM4.5 7.4v3.1c1 1 2.2 1.5 3.5 1.5s2.5-.5 3.5-1.5V7.4M14.2 6v3.5",
  leaf: "M3 13c0-6 4-9.5 10-10 .3 6-3 10-9 10ZM3 13l5.5-5.5",
  apple: "M8 5c-1.2-.8-4.5-1-4.5 3 0 3 2 5.5 3.3 5.5.6 0 .8-.3 1.2-.3s.6.3 1.2.3c1.3 0 3.3-2.5 3.3-5.5 0-4-3.3-3.8-4.5-3ZM8 5c0-1.3.7-2.4 2-2.8",
  flame: "M8 14c-2.5 0-4.2-1.7-4.2-4 0-2.6 2.2-3.6 2.7-6.3 1.6 1 2.5 2.5 2.4 4 .7-.4 1.2-1.1 1.3-2 1.4 1.2 2 2.6 2 4.3 0 2.3-1.7 4-4.2 4Z",
  burger: "M2.8 7.2C3 4.6 5.3 3 8 3s5 1.6 5.2 4.2zM2.5 9.4h11M3.5 11.4h9a1 1 0 0 1-1 1.6h-7a1 1 0 0 1-1-1.6Z",
  scissors: "M2.8 4.5a1.7 1.7 0 1 0 3.4 0a1.7 1.7 0 1 0-3.4 0M2.8 11.5a1.7 1.7 0 1 0 3.4 0a1.7 1.7 0 1 0-3.4 0M6 5.5 13.5 12M6 10.5 13.5 4",
  key: "M2.5 8a2.8 2.8 0 1 0 5.6 0a2.8 2.8 0 1 0-5.6 0M8.1 8h5.9M12 8v2.2M10 8v1.6",
  star: "M8 2.2l1.8 3.7 4 .6-2.9 2.8.7 4L8 11.4l-3.6 1.9.7-4L2.2 6.5l4-.6z",
  tag: "M2.5 2.5h5l6 6-5 5-6-6zM5.3 5.3h.01",
};

export function Icon({ name, size = 16, className = "" }) {
  const filled = name === "play" || name === "live";
  return (
    <svg className={`ic ${className}`} width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
      <path d={PATHS[name]} fill={filled ? "currentColor" : "none"} stroke={filled ? "none" : "currentColor"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* The eden. signature: lowercase, heavy, black dot. */
export function Mark({ className = "" }) {
  return (
    <span className={`mark ${className}`} aria-label="eden">
      eden<i>.</i>
    </span>
  );
}

/* One card, recipe-site style: square picture with a round action button,
   title, one line of detail, then who / tag under a hairline. */
export function Card({ to, href, onClick, img, alt = "", tall, poster, whole, title, meta, metaIcon = "clock", price, who, avatar, tag, tagTone, action = "out", video, extra }) {
  const body = (
    <>
      <div className={`card-img${tall ? " card-img-tall" : ""}${poster ? " card-img-poster" : ""}${whole ? " card-img-whole" : ""}`}>
        {video ? <CardVideo src={video} poster={img} title={title} /> : <img src={img} alt={alt} loading="lazy" decoding="async" width="400" height="400" />}
        <span className="card-act" aria-hidden="true">
          <Icon name={action} />
        </span>
      </div>
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        {price ? (
          <p className="card-price">
            <s>{price.was}</s> <b>{price.now}</b>
          </p>
        ) : (
          meta && (
            <p className="card-meta">
              <Icon name={metaIcon} size={13} /> {meta}
            </p>
          )
        )}
        <div className="card-foot">
          <span className="card-who">
            <span className="ava" style={avatar ? { background: avatar.bg, color: avatar.fg } : undefined}>
              {avatar?.icon ? <Icon name={avatar.icon} size={12} /> : avatar?.letter ?? "e"}
            </span>
            <span className="card-who-name">{who}</span>
          </span>
          {tag && <span className={`card-tag${tagTone ? ` tag-${tagTone}` : ""}`}>{tag}</span>}
        </div>
      </div>
    </>
  );
  /* With extra content (a price breakdown) the card is a box holding a link,
     so the drop-down can sit inside it without nesting links. */
  if (extra)
    return (
      <div className="card">
        <a className="card-link" href={href} target="_blank" rel="noopener noreferrer">
          {body}
        </a>
        {extra}
      </div>
    );
  if (onClick)
    return (
      <button type="button" className="card" onClick={onClick}>
        {body}
      </button>
    );
  if (to)
    return (
      <Link className="card" to={to}>
        {body}
      </Link>
    );
  return (
    <a className="card" href={href} target="_blank" rel="noopener noreferrer">
      {body}
    </a>
  );
}

/* Muted loop that only plays while on screen, and never for people
   who have asked for less motion — the poster frame stands in. */
function CardVideo({ src, poster, title }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.5 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none" aria-label={title} />;
}

/* A titled row of cards that scrolls sideways; arrows on wide screens. */
export function Shelf({ id, title, icon, sub, more, grid, children }) {
  const track = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: true });
  useEffect(() => {
    const el = track.current;
    const update = () => setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  const page = (dir) => track.current.scrollBy({ left: dir * track.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <section id={id} className="shelf">
      <div className="wrap shelf-head">
        <div>
          <h2 className="h2">
            {icon && (
              <span className="h2-ic">
                <Icon name={icon} size={18} />
              </span>
            )}
            {title}
          </h2>
          {sub && <p className="shelf-sub">{sub}</p>}
        </div>
        <div className="shelf-tools">
          {more}
          {!grid && (
            <>
              <button className="pager" onClick={() => page(-1)} disabled={edge.start} aria-label="Scroll back">
                <Icon name="chev" className="flip" />
              </button>
              <button className="pager" onClick={() => page(1)} disabled={edge.end} aria-label="Scroll on">
                <Icon name="chev" />
              </button>
            </>
          )}
        </div>
      </div>
      <div className={grid ? "wrap card-grid" : "shelf-track"} ref={track}>
        {children}
      </div>
    </section>
  );
}

/* Page title row: heading, one line, optional chips underneath. */
export function PageTop({ title, sub, children }) {
  return (
    <section className="ptop wrap">
      <h1 className="h1 rise">{title}</h1>
      {sub && (
        <p className="ptop-sub rise" style={{ animationDelay: "0.06s" }}>
          {sub}
        </p>
      )}
      {children}
    </section>
  );
}

export function Check() {
  return <Icon name="check" className="ic-check" />;
}

export function StackMark({ name }) {
  const brand = STACK_ICONS[name];
  const path = brand?.path ?? GLYPHS[name];
  if (!path) return null;
  const fill = !brand || brand.hex === "#000000" ? "#121212" : brand.hex;
  return (
    <svg className="stack-logo" viewBox="0 0 24 24" fill={fill} aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

/* Full-screen viewer. Video ads fill the screen top to bottom like a reel;
   posters fit inside it. Arrow keys step, Escape closes. */
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
    <div className={`lb${item.video ? " lb-video" : ""}`} role="dialog" aria-modal="true" aria-label={item.title} onClick={onClose}>
      <figure className="lb-fig" onClick={(e) => e.stopPropagation()}>
        {item.video ? (
          <video key={item.src} src={item.src} poster={item.poster} controls autoPlay loop playsInline aria-label={item.title} />
        ) : (
          <img key={item.src} src={item.src} alt={item.title} />
        )}
      </figure>
      <div className="lb-top" onClick={(e) => e.stopPropagation()}>
        <span>
          <b>{item.title}</b> · {index + 1}/{items.length}
        </span>
        <button onClick={onClose} className="lb-x" aria-label="Close">
          <Icon name="close" size={18} />
        </button>
      </div>
      {items.length > 1 && (
        <>
          <button className="lb-nav lb-prev" onClick={(e) => (e.stopPropagation(), onStep(-1))} aria-label="Previous">
            <Icon name="chev" className="flip" size={20} />
          </button>
          <button className="lb-nav lb-next" onClick={(e) => (e.stopPropagation(), onStep(1))} aria-label="Next">
            <Icon name="chev" size={20} />
          </button>
        </>
      )}
    </div>
  );
}

/* Shown while a page's code is still downloading. */
export function PageSkeleton() {
  return (
    <div className="wrap pskel" aria-busy="true" aria-label="Loading">
      <span className="skel skel-title" />
      <div className="pskel-row">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="skel skel-card" />
        ))}
      </div>
    </div>
  );
}
