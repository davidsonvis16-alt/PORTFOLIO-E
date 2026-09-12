import { CAPABILITIES, STACK_ROW_ONE, STACK_ROW_TWO } from "../data/site";
import SectionHeader from "../components/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "../components/Reveal";
import { TechIcon } from "../components/icons";

/**
 * One marquee row. The list is repeated until a single half is wider than
 * any viewport, then the track translates by -50% — so the loop is seamless
 * and there is never a gap trailing the last chip.
 */
function StackRow({ items, speed, reverse = false }) {
  // ~140px per chip; each half must out-run even an ultra-wide viewport.
  const half = Math.max(2, Math.ceil(3000 / (items.length * 140)));
  const loop = Array.from({ length: half * 2 }, () => items).flat();
  return (
    <div
      className={`marquee${reverse ? " marquee--reverse" : ""}`}
      style={{ "--speed": speed }}
      aria-hidden="true"
    >
      <div className="marquee__track">
        {loop.map((name, i) => (
          <span className="chip" key={`${name}-${i}`}>
            <TechIcon name={name} />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Capabilities({ standalone = false }) {
  const all = [...STACK_ROW_ONE, ...STACK_ROW_TWO];

  return (
    <section
      id="skills"
      className={`section${standalone ? " section--top" : ""}`}
      aria-labelledby="skills-title"
    >
      <div className="container">
        <SectionHeader
          level={standalone ? 1 : 2}
          index="07"
          label="Capabilities"
          titleId="skills-title"
          title={["What I build,", "and what with."]}
          lede="A deliberately small stack, used well. Everything listed here is running in the work on this site."
        />

        <RevealGroup className="cap__grid" gap={0.07}>
          {CAPABILITIES.map((cap, i) => (
            <RevealItem className="cap__cell" key={cap.title} y={16}>
              <span className="index-tag">{String(i + 1).padStart(2, "0")}</span>
              <h3>{cap.title}</h3>
              <p>{cap.desc}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <Reveal style={{ marginTop: "clamp(40px, 5vw, 72px)", display: "grid", gap: 12 }}>
        <StackRow items={STACK_ROW_ONE} speed="52s" />
        <StackRow items={STACK_ROW_TWO} speed="38s" reverse />
        {/* Same list, readable by assistive tech and search engines. */}
        <ul className="sr-only">
          {all.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
