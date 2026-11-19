import { PROCESS_STEPS } from "../data";
import { Contact } from "../blocks";
import { SecHead } from "../ui";

export default function About() {
  return (
    <>
      <section className="wrap page-top" aria-labelledby="about-title">
        <span className="idx rise">About Tessy</span>
        <h1 id="about-title" className="page-title page-title-text rise">
          One team. Every poster and every line of code<span className="dot">.</span>
        </h1>
      </section>

      <section className="wrap sec" aria-label="Who builds it">
        <SecHead n="01" title="Who builds it" />
        <div className="prose" data-reveal>
          <p className="prose-lead">Websites, apps and ads for businesses all over Kenya.</p>
          <p>
            Fast on three bars of signal. You talk to the people who build it. We host; the domain is yours.
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

      <Contact n="03" />
    </>
  );
}
