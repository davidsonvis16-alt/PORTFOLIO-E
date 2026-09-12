/* Every icon on the site. Inline SVG so nothing extra is fetched. */

export function ArrowIcon({ size = 15, className = "arrow" }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUpRight({ size = 14, className = "arrow" }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5 11 11 5m0 0H5.8M11 5v5.2" stroke="currentColor" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowLeft({ size = 15, className = "arrow" }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M13 8H3m0 0 4-4M3 8l4 4" stroke="currentColor" strokeWidth="1.4"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--accent)"
      strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"
      style={{ flex: "none", marginTop: 3 }} aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* --- brand ------------------------------------------------------------- */

/** The Eden mark. `tone="light"` inverts it for dark backgrounds. */
export function LogoMark({ size = 24, tone = "dark", className, style }) {
  const ink = tone === "light" ? "#F8F9FB" : "#0F172A";
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="0 0 40 40"
      fill="none" aria-hidden="true" focusable="false">
      <rect x="10" y="8" width="7" height="24" rx="1.4" fill={ink} />
      <rect x="10" y="8" width="21" height="7" rx="1.4" fill={ink} />
      <rect x="10" y="16.5" width="16" height="7" rx="1.4" fill={ink} />
      <rect x="10" y="25" width="21" height="7" rx="1.4" fill={ink} />
      <rect x="27" y="8" width="7" height="7" rx="1.4" fill="#2563EB" />
    </svg>
  );
}

/* --- social ------------------------------------------------------------ */

export function WhatsAppIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.273.297-1.045 1.02-1.045 2.488 0 1.468 1.065 2.887 1.213 3.083.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
    </svg>
  );
}

export function InstagramIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.6" />
      <circle cx="17.6" cy="6.4" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MailIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 6 9 7 9-7" />
    </svg>
  );
}

export function GitHubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.97 3.22 9.18 7.7 10.67.56.1.77-.25.77-.55v-1.9c-3.13.68-3.79-1.5-3.79-1.5-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.23 3.27.94.1-.73.39-1.23.71-1.51-2.5-.29-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .94-.3 3.1 1.15a10.7 10.7 0 0 1 5.64 0c2.15-1.45 3.1-1.15 3.1-1.15.61 1.55.22 2.7.11 2.98.72.79 1.15 1.79 1.15 3.02 0 4.32-2.63 5.27-5.14 5.55.4.35.76 1.04.76 2.1v3.11c0 .3.2.66.78.55a11.26 11.26 0 0 0 7.69-10.67C23.25 5.48 18.27.5 12 .5" />
    </svg>
  );
}

export function ArrowUpIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 19V5m-7 7 7-7 7 7" />
    </svg>
  );
}

/* --- technology marks --------------------------------------------------- */

const TECH_ICONS = {
  HTML: (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.3 2h17.4l-1.58 17.72L11.98 22l-7.1-2.28z" fill="#E44D26" />
      <path d="M12 3.9v16.4l5.72-1.84L19.05 3.9z" fill="#F16529" />
      <path d="M7.1 6.6h9.8l-.18 2h-7.4l.15 1.7h7.1l-.55 6.1-3.93 1.25-3.93-1.25-.25-2.7h1.93l.13 1.4 2.12.66 2.13-.66.23-2.5H6.9z" fill="#fff" />
    </svg>
  ),
  CSS: (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.3 2h17.4l-1.58 17.72L11.98 22l-7.1-2.28z" fill="#1572B6" />
      <path d="M12 3.9v16.4l5.72-1.84L19.05 3.9z" fill="#33A9DC" />
      <path d="M12 6.6h4.9l-.17 2H12zm0 3.72h4.56l-.55 6.08-4.01 1.28v-2.1l2.12-.66.23-2.5H12zm0 0v2.1H7.6l-.18-2.1zM12 6.6v2H7.1l-.17-2z" fill="#fff" />
    </svg>
  ),
  JavaScript: (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="3" fill="#F7DF1E" />
      <text x="12.6" y="17.4" textAnchor="middle" fontSize="10.5" fontWeight="700"
        fontFamily="Inter, sans-serif" fill="#0F172A">JS</text>
    </svg>
  ),
  TypeScript: (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="3" fill="#3178C6" />
      <text x="12.2" y="17.4" textAnchor="middle" fontSize="10.5" fontWeight="700"
        fontFamily="Inter, sans-serif" fill="#fff">TS</text>
    </svg>
  ),
  React: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="2.1" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1.1" fill="none">
        <ellipse cx="12" cy="12" rx="10" ry="3.9" />
        <ellipse cx="12" cy="12" rx="10" ry="3.9" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="3.9" transform="rotate(120 12 12)" />
      </g>
    </svg>
  ),
  "Next.js": (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#0F172A" />
      <path d="M8.2 16.8V7.2h1.5l6 8.1V7.2" stroke="#fff" strokeWidth="1.5" fill="none"
        strokeLinecap="square" />
    </svg>
  ),
  "Tailwind CSS": (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.91.23 1.57.89 2.29 1.62C13.67 10.62 15.03 12 18 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.91-.23-1.57-.89-2.29-1.62C16.33 6.18 14.97 4.8 12 4.8M6 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.91.23 1.57.89 2.29 1.62C7.67 17.82 9.03 19.2 12 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.91-.23-1.57-.89-2.29-1.62C10.33 13.38 8.97 12 6 12"
        fill="#06B6D4" />
    </svg>
  ),
  Supabase: (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M11.9 1.2 2.3 13.4c-.5.6-.1 1.5.7 1.5h8v7.9c0 .9 1.1 1.3 1.7.6l9.6-12.2c.5-.6.1-1.5-.7-1.5h-8V1.8c0-.9-1.1-1.3-1.7-.6"
        fill="#3ECF8E" />
    </svg>
  ),
  Vite: (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 1.6 22.6 5 13.3 22.5c-.5.9-1.8.9-2.3 0L1.4 5z" fill="#646CFF" />
      <path d="M13.4 4.4 7.6 5.6l.9 10.6 2.4-4.3-2.1-.5z" fill="#FFD62E" />
    </svg>
  ),
  Git: (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4.6" y="4.6" width="14.8" height="14.8" rx="2.4"
        transform="rotate(45 12 12)" fill="none" stroke="#F05032" strokeWidth="1.5" />
      <path d="M12 16.5V9.6m0 0 3.1 3.1" stroke="#F05032" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="17" r="1.5" fill="#F05032" />
      <circle cx="12" cy="8.6" r="1.5" fill="#F05032" />
      <circle cx="15.7" cy="12.3" r="1.5" fill="#F05032" />
    </svg>
  ),
  "Responsive Design": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1.5" y="4.5" width="14" height="10" rx="1.6" />
      <path d="M6 18h5" />
      <rect x="17.5" y="9.5" width="5" height="9" rx="1.4" />
    </svg>
  ),
};

export function TechIcon({ name }) {
  const icon = TECH_ICONS[name];
  if (!icon) return null;
  return <span className="chip__icon">{icon}</span>;
}
