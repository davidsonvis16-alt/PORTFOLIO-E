import { PROCESS_STEPS, SKILLS, WHY_POINTS } from "../data";
import { PageTop, StackMark } from "../ui";

export default function About() {
  return (
    <>
      <PageTop title="About" sub="One person. Every poster and every line of code." />
      <section className="wrap block about">
        <p className="about-lead">
          I build websites and design ads for small businesses — restaurants, cafés, florists, shops — around Nairobi and Nakuru.
        </p>
        <p className="about-body">
          Every one is held to the same standard: it has to look like it cost more than it did, and it has to load when the signal drops to three bars. No agency, no team — you deal with the person who designs the posters and writes the code, mostly in React, from the first message to the day it goes live.
        </p>
      </section>

      <section className="wrap block">
        <h2 className="h2">Why a website</h2>
        <div className="tiles4">
          {WHY_POINTS.map((p) => (
            <div key={p.title} className="tile" data-reveal>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap block">
        <h2 className="h2">How a project runs</h2>
        <ol className="steps">
          {PROCESS_STEPS.map((s) => (
            <li key={s.n} className="step" data-reveal>
              <span className="step-n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap block">
        <h2 className="h2">Built with</h2>
        <ul className="stack">
          {SKILLS.map((s) => (
            <li key={s}>
              <StackMark name={s} />
              {s}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
