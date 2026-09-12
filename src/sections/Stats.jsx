import { STATS } from "../data/site";
import { SHIPPED } from "../data/projects";
import { useCountUp, useInView } from "../lib/hooks";
import { RevealGroup, RevealItem } from "../components/Reveal";

/**
 * Trust band. The one number here is counted from the project data, so it
 * can never drift out of step with the work actually on the site. Everything
 * else is qualitative on purpose — no invented metrics.
 */
function StatValue({ stat, start }) {
  const target = stat.kind === "count" ? SHIPPED.length : 0;
  const counted = useCountUp(target, { start, duration: 1200 });

  if (stat.kind === "count") {
    return (
      <span className="stat__value">
        {String(counted).padStart(2, "0")}
        {stat.suffix && <span className="unit">{stat.suffix}</span>}
      </span>
    );
  }
  return <span className="stat__value stat__value--text">{stat.value}</span>;
}

export default function Stats() {
  const [ref, inView] = useInView({ threshold: 0.3 });

  return (
    <section className="band" aria-label="Studio at a glance" ref={ref}>
      <div className="container">
        <RevealGroup className="band__inner" gap={0.09}>
          {STATS.map((stat) => (
            <RevealItem className="stat" key={stat.label} y={14}>
              <span className="mono stat__label">{stat.label}</span>
              <StatValue stat={stat} start={inView} />
              <span className="stat__note">{stat.note}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
