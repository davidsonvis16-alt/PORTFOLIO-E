import { CASE_META, CASE_STUDIES, OTHER_BUILDS, waLink } from "../data";

/* The full index: client work first, then self-initiated builds, set as
   one typographic table. Every row opens the live site. */
const ROWS = [
  ...CASE_STUDIES.map((s) => ({
    title: s.client,
    kind: CASE_META[s.client]?.sector ?? "",
    stack: Object.fromEntries(s.spec).STACK,
    type: "Client",
    year: null,
    demo: s.demo,
  })),
  ...OTHER_BUILDS.filter((b) => b.demo?.startsWith("http")).map((b) => ({
    title: b.title,
    kind: b.kind,
    stack: b.stack,
    type: "Self-initiated",
    year: b.year,
    demo: b.demo,
  })),
];

export default function Work() {
  return (
    <>
      <section className="wrap page-top" aria-labelledby="work-title">
        <span className="idx rise">Index — {ROWS.length} live projects</span>
        <h1 id="work-title" className="page-title rise">
          Work<span className="dot">.</span>
        </h1>
        <p className="page-sub rise">
          Every site here is live — open any one on your phone. The first three are client sites; the rest I built on my own, to try ideas a client could ask for tomorrow.
        </p>
      </section>

      <section className="wrap index" aria-label="All projects">
        <div className="index-head" aria-hidden="true">
          <span>No.</span>
          <span>Project</span>
          <span>Type</span>
          <span>Stack</span>
          <span>Year</span>
        </div>
        <ol className="index-list">
          {ROWS.map((r, i) => (
            <li key={r.title}>
              <a href={r.demo} target="_blank" rel="noopener noreferrer" className="index-row">
                <span className="index-n">{String(i + 1).padStart(2, "0")}</span>
                <span className="index-title">
                  {r.title}
                  <small>{r.kind}</small>
                </span>
                <span className={`index-type ${r.type === "Client" ? "is-client" : ""}`}>{r.type}</span>
                <span className="index-stack">{r.stack}</span>
                <span className="index-year">{r.year ?? "—"}</span>
                <span className="index-go" aria-hidden="true">
                  ↗
                </span>
                <span className="sr">(opens the live site in a new tab)</span>
              </a>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap page-end">
        <p>Want one like these?</p>
        <a href={waLink("Hi Eden, I saw your work. I'd like a site like one of these.")} target="_blank" rel="noopener noreferrer" className="act">
          Ask on WhatsApp <span aria-hidden="true">↗</span>
        </a>
      </section>
    </>
  );
}
