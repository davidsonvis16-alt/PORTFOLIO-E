import { C, MONO, SERIF } from "./tokens";

export function ArrowIcon({ className = "", size = 15 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUpRight({ className = "", size = 15 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function Mono({ children, color = C.ink, size = 12.5, style }) {
  return <span style={{ fontFamily: MONO, fontSize: size, color, letterSpacing: "0.02em", ...style }}>{children}</span>;
}

export function SectionTag({ n, label }) {
  return (
    <div className="edn-tag">
      <span className="edn-tag-dot" />
      <span style={{ color: C.ink }}>{n}</span>
      <span style={{ color: C.dim }}>/</span>
      {label}
    </div>
  );
}

/* Title accepts an `em` word rendered in italic serif for contrast. */
export function SectionHead({ n, label, title, em, children }) {
  return (
    <div style={{ marginBottom: "clamp(40px, 6vw, 72px)" }} data-reveal>
      <SectionTag n={n} label={label} />
      <h2 className="edn-h2">
        {title}
        {em && (
          <>
            {" "}
            <em style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, color: C.accent }}>{em}</em>
          </>
        )}
      </h2>
      {children && <p className="edn-lede">{children}</p>}
    </div>
  );
}

export function Page({ children, offset = false }) {
  return <div className="edn-page" style={offset ? { paddingTop: 96 } : undefined}>{children}</div>;
}
