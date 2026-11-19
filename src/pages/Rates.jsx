import { AD_BUNDLE, AD_TERMS, OFFER_ENDS, mailLink } from "../data";
import { AdRows, PriceRows, Steps } from "../blocks";
import { Link } from "react-router-dom";
import { PayMethods, SecHead } from "../ui";

export default function Rates() {
  return (
    <>
      <section className="wrap page-top" aria-labelledby="rates-title">
        <span className="idx rise">End-of-year prices until {OFFER_ENDS}</span>
        <h1 id="rates-title" className="page-title rise">
          Prices<span className="dot">.</span>
        </h1>
        <p className="page-sub rise">Fixed prices. M-Pesa or bank.</p>
        <nav className="jump rise" aria-label="Jump to">
          <a href="#sites" className="pill-link">Websites</a>
          <a href="#ads" className="pill-link">Ad design</a>
          <a href="#paying" className="pill-link">Paying</a>
        </nav>
      </section>

      <section id="sites" className="wrap sec" aria-labelledby="sites-title">
        <SecHead n="01" title="Websites" id="sites-title" note="Each plan includes the one before." />
        <PriceRows />
      </section>

      <section id="ads" className="wrap sec" aria-labelledby="ads-title">
        <SecHead n="02" title="Ad design" id="ads-title" note="Per poster, monthly, or a campaign." />
        <AdRows />
        <p className="fine">
          {AD_TERMS} {AD_BUNDLE}
        </p>
      </section>

      <section id="paying" className="wrap sec" aria-labelledby="paying-title">
        <SecHead n="03" title="How paying works" id="paying-title" note="60% to start, 40% at launch. Domain and database are yours." />
        <Steps />
        <div className="pay-strip">
          <PayMethods />
          <Link to="/pay" className="act act-solid">
            Pay an invoice <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
