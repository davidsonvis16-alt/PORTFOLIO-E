import { PROCESS_STEPS, SKILLS, WHY_POINTS } from "../data";
import { PageHead, SecHead, StackMark } from "../ui";
import { StopCta } from "./Home";

export default function About() {
  return (
    <>
      <PageHead stop="04" kicker="· About" title="One person." accent="Every line." />
      <section className="sec">
        <div className="wrap about-cols">
          <p className="d-h3" data-reveal>
            I build websites and design ads for small businesses — restaurants, cafés, florists, shops — around Nairobi and Nakuru.
          </p>
          <p className="body" data-reveal>
            Every one is held to the same standard: it has to look like it cost more than it did, and it has to load when the signal drops to three bars. No agency, no team — you deal with the person who designs the posters and writes the code, mostly in React, from the first message to the day it goes live.
          </p>
        </div>
      </section>

      <section className="band band-paper">
        <div className="wrap">
          <SecHead kick="Why bother" title="Why a" accent="website." sub="Social pages are a start. A site is the shopfront you own." />
          <div className="why">
            {WHY_POINTS.map((p, i) => (
              <div key={p.title} className="why-card" data-reveal>
                <span className="why-n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band band-blue">
        <div className="wrap">
          <SecHead kick="Process" title="First message" accent="to launch." sub="Four steps. You see the design before any code is written." light />
          <ol className="stops">
            {PROCESS_STEPS.map((s) => (
              <li key={s.n} data-reveal>
                <span className="mono">Stop {s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SecHead kick="Tools" title="Built" accent="with." />
          <ul className="stack" data-reveal>
            {SKILLS.map((s) => (
              <li key={s}>
                <StackMark name={s} />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <StopCta />
    </>
  );
}
