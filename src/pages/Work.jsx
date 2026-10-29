import { useState } from "react";
import { CASE_STUDIES, OTHER_BUILDS, TIER_NAME, waLink } from "../data";
import { Arrow, Devices, PageHead, SecHead } from "../ui";
import { StopCta } from "./Home";

function CaseTile({ s, tone }) {
  return (
    <article className={`tile tile-${tone}`} data-reveal>
      <span className="tile-num" aria-hidden="true">{s.n}</span>
      <div className="tile-copy">
        <p className="mono">
          Client {s.n} · {s.place}
        </p>
        <h3 className="d-h2">{s.client}</h3>
        <p className="lede">{s.need}</p>
        <div className="cta-row">
          <a href={s.demo} target="_blank" rel="noopener noreferrer" className={`btn ${tone === "ink" ? "btn-blue" : "btn-ink"}`}>
            Visit the site <Arrow />
          </a>
          <a href={waLink(`Hi Eden, I saw the ${s.client} site. Could you build something like it for me?`)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            Get one like it
          </a>
        </div>
      </div>
      <div className="tile-stage">
        <Devices img={s.img} url={s.domain} name={s.client} />
      </div>
      <div className="tile-facts">
        <div className="fact fact-wide">
          <span className="mono">The constraint</span>
          <p>{s.constraint}</p>
        </div>
        {s.spec.map(([k, v]) => (
          <div className="fact" key={k}>
            <span className="mono">{k}</span>
            <p>{v}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

const CARD_TONES = ["blue", "ink", "paper", "yellow", "white", "ink"];

function Shot({ src, title }) {
  const [broken, setBroken] = useState(false);
  if (broken) {
    return (
      <div className="wcard-shot wcard-shot-empty" aria-hidden="true">
        <span>{title}</span>
      </div>
    );
  }
  return (
    <div className="wcard-shot">
      <img src={src} alt={`${title} on desktop`} width="1152" height="720" loading="lazy" decoding="async" onError={() => setBroken(true)} />
    </div>
  );
}

function WorkCard({ b, i }) {
  const n = String(i + 1).padStart(2, "0");
  const live = b.demo?.startsWith("http");
  const Tag = live ? "a" : "article";
  const linkProps = live ? { href: b.demo, target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Tag className={`wcard wcard-${CARD_TONES[i % CARD_TONES.length]}${i % 5 === 0 ? " wcard-big" : ""}`} data-reveal {...linkProps}>
      <div className="wcard-top">
        <span className="wcard-num">{n}</span>
        <span className="wcard-kind mono">{b.kind}</span>
      </div>
      <Shot src={b.img} title={b.title} />
      <div className="wcard-body">
        <h3 className="wcard-title">{b.title}</h3>
        <p className="wcard-desc">{b.desc}</p>
        <p className="wcard-tier">
          {TIER_NAME[b.tier]} — {b.tierWhy}
        </p>
        <div className="wcard-foot">
          <span className="wcard-stack mono">{b.stack}</span>
          <span className="wcard-go">
            {live ? "View site" : "Coming soon"}
            {live && <Arrow />}
          </span>
        </div>
      </div>
    </Tag>
  );
}

/* Cards run in this order of business type, numbered straight through. */
const WORK_GROUPS = ["coach", "restaurant", "cafe", "florist", "homes", "studio", "shop", "platform"];
const SORTED_BUILDS = [...OTHER_BUILDS].sort((a, b) => WORK_GROUPS.indexOf(a.group) - WORK_GROUPS.indexOf(b.group));

export default function Work() {
  return (
    <>
      <PageHead stop="01" kicker="· Websites" title="The" accent="work." sub={`${CASE_STUDIES.length} paying clients and ${OTHER_BUILDS.length} more builds — every one live and built to load on mobile data.`} />
      <section className="sec">
        <div className="wrap">
          <SecHead kick="Client work" title="Two clients." accent="Both live." />
          <div className="tiles">
            {CASE_STUDIES.map((s, i) => (
              <CaseTile key={s.n} s={s} tone={i === 0 ? "ink" : "paper"} />
            ))}
          </div>
        </div>
      </section>
      <section className="sec sec-top0">
        <div className="wrap">
          <div className="row-head" data-reveal>
            <SecHead kick="More builds" title="More" accent="work." sub="Sites built for people and for practice — each one priced as if a client had asked for it." />
            <span className="wcount mono">{String(OTHER_BUILDS.length).padStart(2, "0")} builds</span>
          </div>
          <div className="wgrid">
            {SORTED_BUILDS.map((b, i) => (
              <WorkCard key={b.title} b={b} i={i} />
            ))}
          </div>
        </div>
      </section>
      <StopCta />
    </>
  );
}
