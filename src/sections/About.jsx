import SectionHeader from "../components/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "../components/Reveal";
import { ArrowUpRight } from "../components/icons";

/* The chain that ties the studio to the evidence. */
const CHAIN = [
  { label: "About Eden", note: "One person, start to finish." },
  { label: "Real work", note: "Sites that are live, not mockups." },
  { label: "Real businesses", note: "Cafés, shops and local brands." },
  { label: "Real products", note: "Menus, ordering, dashboards." },
];

export default function About({ standalone = false }) {
  return (
    <section id="about" className={`section${standalone ? " section--top" : ""}`} aria-labelledby="about-title">
      <div className="container">
        <SectionHeader
          level={standalone ? 1 : 2}
          index="05"
          label="About Eden"
          titleId="about-title"
          title={["A one-person studio", "that ships."]}
        />

        <div className="about__grid">
          <div>
            <Reveal as="p" className="about__statement">
              Eden is a one-person digital studio building excellent websites and
              digital experiences for small businesses — mostly restaurants, cafés
              and shops around Nairobi and Nakuru.
            </Reveal>

            <div className="about__body">
              <Reveal as="p" delay={0.08}>
                Self-taught, no agency, no team. I work mainly in React. That means
                you talk to the person writing the code, decisions happen in a day
                rather than a fortnight, and nothing gets lost between departments.
              </Reveal>
              <Reveal as="p" delay={0.14}>
                If you want a sense of what I can actually build rather than what I
                say I can build,{" "}
                <a href="https://bakemart.co.ke/" target="_blank" rel="noopener noreferrer">
                  BakeMart Coffee House
                </a>{" "}
                is a good place to look — a full menu, online ordering and an admin
                dashboard, built to stay fast on a weak connection. That is the
                standard every project here is held to.
              </Reveal>
              <Reveal delay={0.2}>
                <a
                  className="tlink"
                  href="https://bakemart.co.ke/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                >
                  Visit BakeMart Coffee House <ArrowUpRight />
                </a>
              </Reveal>
            </div>
          </div>

          <RevealGroup className="chain" gap={0.09}>
            {CHAIN.map((item, i) => (
              <RevealItem key={item.label} y={12}>
                <div className="chain__item">
                  <span className="mono chain__label">{item.label}</span>
                  <span className="chain__note">{item.note}</span>
                </div>
                {i < CHAIN.length - 1 && <span className="chain__link" aria-hidden="true" />}
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
