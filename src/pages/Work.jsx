import { useSearchParams } from "react-router-dom";
import { CASE_STUDIES, OTHER_BUILDS, WORK_SHELVES, avatarFor, phone, waLink } from "../data";
import { BuildCard, ClientCard } from "../cards";
import { Icon, PageTop, Shelf } from "../ui";

/* A client site, laid out like a featured recipe: picture, the brief, the facts. */
function ClientFeature({ s }) {
  const a = avatarFor(s.client, s.icon);
  return (
    <article className="feature" data-reveal>
      <a href={s.demo} target="_blank" rel="noopener noreferrer" className="feature-img">
        <img src={phone(s.img)} alt={`${s.client} on a phone`} loading="lazy" width="390" height="844" />
      </a>
      <div className="feature-body">
        <p className="feature-who">
          <span className="ava" style={{ background: a.bg, color: a.fg }}>
            <Icon name={a.icon} size={12} />
          </span>
          {s.place} <span className="card-tag tag-lime">Client</span>
        </p>
        <h3 className="h3">{s.client}</h3>
        <p className="feature-need">{s.need}</p>
        <p className="feature-con">
          <b>The constraint.</b> {s.constraint}
        </p>
        <dl className="facts">
          {s.spec.map(([k, v]) => (
            <div key={k}>
              <dt>{k.charAt(0) + k.slice(1).toLowerCase()}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <div className="feature-acts">
          <a href={s.demo} target="_blank" rel="noopener noreferrer" className="pill pill-ink">
            Visit {s.domain} <Icon name="out" size={14} />
          </a>
          <a href={waLink(`Hi Eden, I saw the ${s.client} site. Could you build something like it for me?`)} target="_blank" rel="noopener noreferrer" className="pill pill-grey">
            Get one like it
          </a>
        </div>
      </div>
    </article>
  );
}

const hay = (...parts) => parts.join(" ").toLowerCase();

export default function Work() {
  const [params] = useSearchParams();
  const q = (params.get("q") ?? "").trim().toLowerCase();

  if (q) {
    const words = q.split(/\s+/);
    const hit = (text) => words.every((w) => text.includes(w));
    const clients = CASE_STUDIES.filter((s) => hit(hay(s.client, s.place, s.need, ...s.spec.flat())));
    const builds = OTHER_BUILDS.filter((b) => hit(hay(b.title, b.kind, b.desc, b.stack, b.group)));
    const n = clients.length + builds.length;
    return (
      <>
        <PageTop title={`“${params.get("q")}”`} sub={n ? `${n} ${n === 1 ? "site" : "sites"} found` : "Nothing matches that yet — try café, shop, M-Pesa or React."} />
        {n > 0 && (
          <div className="wrap card-grid card-grid-top">
            {clients.map((s) => (
              <ClientCard key={s.n} s={s} />
            ))}
            {builds.map((b) => (
              <BuildCard key={b.title} b={b} />
            ))}
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <PageTop title="All work" sub={`${CASE_STUDIES.length} client sites and ${OTHER_BUILDS.length} more builds — every one live, and built to load on mobile data.`}>
        <nav className="chips rise" style={{ animationDelay: "0.12s" }} aria-label="Jump to">
          <a href="#clients">
            <Icon name="star" size={14} /> Client sites
          </a>
          {WORK_SHELVES.map((s) => (
            <a key={s.id} href={`#${s.id}`}>
              <Icon name={s.icon} size={14} /> {s.title}
            </a>
          ))}
        </nav>
      </PageTop>

      <section id="clients" className="shelf">
        <div className="wrap shelf-head">
          <div>
            <h2 className="h2">
              <span className="h2-ic">
                <Icon name="star" size={18} />
              </span>
              Client sites
            </h2>
            <p className="shelf-sub">Live and in daily use</p>
          </div>
        </div>
        <div className="wrap features">
          {CASE_STUDIES.map((s) => (
            <ClientFeature key={s.n} s={s} />
          ))}
        </div>
      </section>

      {WORK_SHELVES.map((s) => (
        <Shelf key={s.id} id={s.id} title={s.title} icon={s.icon} sub="Self-directed builds, each priced as if a client had asked" grid>
          {OTHER_BUILDS.filter((b) => s.groups.includes(b.group)).map((b) => (
            <BuildCard key={b.title} b={b} />
          ))}
        </Shelf>
      ))}
    </>
  );
}
