import { PROCESS_STEPS, SKILLS } from "../data";
import { Contact } from "../blocks";
import { SecHead } from "../ui";

export default function About() {
  return (
    <>
      <section className="wrap page-top" aria-labelledby="about-title">
        <span className="idx rise">About Tess</span>
        <h1 id="about-title" className="page-title page-title-text rise">
          One team. Every poster and every line of code<span className="dot">.</span>
        </h1>
      </section>

      <section className="wrap sec" aria-label="Who builds it">
        <SecHead n="01" title="Who builds it" />
        <div className="prose" data-reveal>
          <p className="prose-lead">We build websites and apps and design ads for businesses all over Kenya — shops, restaurants, schools, trainers, churches, NGOs and anyone with something to tell people.</p>
          <p>
            Every one is held to the same standard: it has to look like it cost more than it did, and it has to load when the signal drops to three bars. You deal directly with the people who design the posters and write the code, from the first message to the day it goes live. We host what we build; the domain, database and accounts stay in your name.
          </p>
        </div>
      </section>

      <section className="wrap sec" aria-labelledby="process-title">
        <SecHead n="02" title="How a project runs" id="process-title" />
        <ol className="steps">
          {PROCESS_STEPS.map((s) => (
            <li key={s.n} data-reveal>
              <span className="idx">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap sec" aria-labelledby="tools-title">
        <SecHead n="03" title="Built with" id="tools-title" />
        <ul className="tools" data-reveal>
          {SKILLS.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <Contact n="04" />
    </>
  );
}
