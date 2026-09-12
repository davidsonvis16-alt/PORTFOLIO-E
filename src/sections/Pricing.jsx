import { CONTACT, MESSAGES, PRICING, waLink } from "../data/site";
import SectionHeader from "../components/SectionHeader";
import { RevealGroup, RevealItem } from "../components/Reveal";
import { ArrowIcon, CheckIcon, InstagramIcon, WhatsAppIcon } from "../components/icons";

export default function Pricing({ standalone = false }) {
  return (
    <section
      id="pricing"
      className={`section${standalone ? " section--top" : ""}`}
      aria-labelledby="pricing-title"
    >
      <div className="container">
        <SectionHeader
          level={standalone ? 1 : 2}
          index="08"
          label="Pricing"
          titleId="pricing-title"
          title={["What it costs", "to work together."]}
          lede="Starting points, not rigid packages. Every site is scoped around what your business actually needs before a final number is quoted."
        />

        <RevealGroup className="price__grid" gap={0.09}>
          {PRICING.map((tier) => (
            <RevealItem
              className={`tier${tier.featured ? " tier--featured" : ""}`}
              key={tier.name}
              y={20}
            >
              {tier.flag && <span className="tier__flag">{tier.flag}</span>}

              <h3 className="tier__name">{tier.name}</h3>
              <p className="tier__desc">{tier.desc}</p>

              <div className="tier__price">
                <span className="mono">{tier.note}</span>
                <div className="tier__amount">{tier.price}</div>
              </div>

              <ul className="tier__features">
                {tier.features.map((feature) => (
                  <li className="tier__feature" key={feature}>
                    <CheckIcon /> {feature}
                  </li>
                ))}
              </ul>

              <div className="tier__actions">
                <a
                  className="btn btn--primary btn--sm"
                  href={waLink(MESSAGES.tier(tier.name, tier.price))}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                >
                  <WhatsAppIcon size={15} /> WhatsApp <ArrowIcon size={13} />
                </a>
                <a
                  className="btn btn--ghost btn--sm"
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                >
                  <InstagramIcon size={15} /> Instagram
                </a>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="price__note">
          <p>
            Prices start where the scope starts. Hosting, a domain and anything
            beyond the listed scope are quoted separately, agreed before work
            begins — no invoice arrives as a surprise.
          </p>
          <a
            className="tlink"
            href={waLink(MESSAGES.quote)}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
          >
            Get a quote for your business <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
