import { WHY } from "../data/site";
import SectionHeader from "../components/SectionHeader";
import { RevealGroup, RevealItem } from "../components/Reveal";

/**
 * Four reasons, as editorial rows rather than cards. Nothing is hidden behind
 * a hover — hovering sharpens the row, it doesn't reveal the content.
 */
export default function Why({ standalone = false }) {
  return (
    <section id="why" className={`section${standalone ? " section--top" : ""}`} aria-labelledby="why-title">
      <div className="container">
        <SectionHeader
          level={standalone ? 1 : 2}
          index="04"
          label="Why a website"
          titleId="why-title"
          title={["Why your business", "needs a website."]}
          lede="A page you own, working for you at two in the morning, when the shop is closed and someone is deciding where to go tomorrow."
        />

        <RevealGroup className="why__list" as="ul" gap={0.08}>
          {WHY.map((item) => (
            <RevealItem as="li" className="why__row" key={item.n} y={16}>
              <span className="why__num" aria-hidden="true">{item.n}</span>
              <h3 className="why__title">{item.title}</h3>
              <p className="why__desc">{item.desc}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
