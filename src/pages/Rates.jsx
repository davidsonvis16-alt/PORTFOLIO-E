import { OFFER_ENDS, waLink } from "../data";
import { AdPlans, PayRoute, SitePlans } from "../plans";
import { Arrow, PageHead, SecHead } from "../ui";
import { StopCta } from "./Home";

export default function Rates() {
  return (
    <>
      <PageHead stop="03" kicker={`· End-of-year fares until ${OFFER_ENDS}`} title="Your fare," accent="itemised." sub="Websites and ad design at fixed prices. You know the full cost before any work starts.">
        <nav className="camp-tabs rise" style={{ animationDelay: "0.24s" }} aria-label="Rates">
          <a href="#sites" className="camp-tab-price">
            <span>
              <i className="mono">01</i>Websites
            </span>
          </a>
          <a href="#ads" className="camp-tab-price">
            <span>
              <i className="mono">02</i>Ad design
            </span>
          </a>
          <a href="#paying" className="camp-tab-price">
            <span>
              <i className="mono">03</i>Paying
            </span>
          </a>
        </nav>
      </PageHead>

      <section id="sites" className="sec">
        <div className="wrap">
          <SecHead kick="Websites" title="Which site is" accent="right for you?" sub="Prices are cut for the end of the year, and hosting is free on every plan." />
          <SitePlans />
          <div className="bigger" data-reveal>
            <div>
              <span className="mono">Something more complex?</span>
              <h3 className="d-h3">Let's talk.</h3>
              <p>Marketplaces, customer accounts, multi-branch systems, integrations — we scope it together and price it to the job.</p>
            </div>
            <a href={waLink("Hi Eden, I have a bigger project in mind. Can we talk it through?")} target="_blank" rel="noopener noreferrer" className="btn btn-blue">
              Start the conversation <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section id="ads" className="band band-paper">
        <div className="wrap">
          <SecHead kick="Ad design" title="Posters," accent="by the piece or the month." sub="Per poster, a monthly content plan, or a whole campaign in one go." />
          <AdPlans />
        </div>
      </section>

      <section id="paying" className="band band-ink">
        <div className="wrap">
          <SecHead kick="How paying works" title="Two payments." accent="No surprises." sub="Hosting is free, and the Custom Build comes with a free domain." light />
          <PayRoute light />
        </div>
      </section>
      <StopCta />
    </>
  );
}
