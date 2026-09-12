import { MaskedLines, Reveal } from "./Reveal";

/**
 * The one section header used across the site: a monospace index and label
 * in the left gutter, headline and optional lede on the right.
 *
 * `level` is 1 when the section is a page's main content (its stand-alone
 * route) and 2 when it is one section of the home page, so every route ends
 * up with exactly one h1.
 */
export default function SectionHeader({ index, label, title, lede, titleId, level = 2 }) {
  const lines = Array.isArray(title) ? title : [title];
  const Heading = level === 1 ? "h1" : "h2";

  return (
    <header className="s-head">
      <Reveal className="s-head__meta" y={10}>
        <span className="index-tag">EDEN / {index}</span>
        <span className="mono mono--ink">{label}</span>
      </Reveal>

      <div>
        <Heading className="s-head__title" id={titleId}>
          <MaskedLines lines={lines} />
        </Heading>
        {lede && (
          <Reveal as="p" className="s-head__lede" delay={0.12}>
            {lede}
          </Reveal>
        )}
      </div>
    </header>
  );
}
