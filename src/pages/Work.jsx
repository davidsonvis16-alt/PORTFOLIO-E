import { CASE_META, CASE_STUDIES, OTHER_BUILDS } from "../data";
import LIVE from "../live.json";
import { Mounted, BlockText } from "../ui";

/* Every site we've built, as one list. Each row shows what it is, its
   address, and whether it answered when we last checked
   (tools/check-live.mjs). Every row opens the site. */
const host = (url) => new URL(url).hostname.replace(/^www\./, "");

const ROWS = [
  ...CASE_STUDIES.map((s) => ({ title: s.client, kind: CASE_META[s.client]?.sector ?? "", demo: s.demo, sticker: null })),
  ...OTHER_BUILDS.filter((b) => b.demo?.startsWith("http")).map((b) => ({ title: b.title, kind: b.kind, demo: b.demo, sticker: "Demo" })),
].map((r) => ({ ...r, live: LIVE.sites[r.demo] !== false }));

export default function Work() {
  const liveCount = ROWS.filter((r) => r.live).length;
  return (
    <>
      <section className="wrap page-top has-art" aria-labelledby="work-title">
        <span className="idx rise">
          {liveCount} of {ROWS.length} live
        </span>
        <h1 id="work-title" className="page-title rise">
          <BlockText text="Work" />
        </h1>
        <Mounted set="work" className="page-art rise" />
        <p className="page-sub rise">Every site we've built.</p>
      </section>

      <section className="wrap index" aria-label="All projects">
        <ul className="index-list">
          {ROWS.map((r) => (
            <li key={r.title}>
              <a href={r.demo} target="_blank" rel="noopener noreferrer" className="index-row">
                <span className="index-bullet" aria-hidden="true" />
                <span className="index-title">
                  <span className="index-name">
                    {r.title}
                    {r.sticker && <span className="sticker">{r.sticker}</span>}
                  </span>
                  <small>{r.kind}</small>
                </span>
                <span className="index-site">
                  <span className="index-domain">{host(r.demo)}</span>
                  {!r.live && <span className="index-live is-off">Not live</span>}
                </span>
                <span className="index-go" aria-hidden="true">
                  ↗
                </span>
                <span className="sr">(opens the site in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

    </>
  );
}
