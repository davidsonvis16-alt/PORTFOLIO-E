import { ADDONS, AD_BUNDLE, AD_TERMS, BASE_SITE, OFFER_ENDS, OTHER_BUILDS, ksh, priceOf, waLink } from "../data";
import { AdRows, PriceRows, Steps } from "../blocks";
import { SecHead } from "../ui";

export default function Rates() {
  const builds = [...OTHER_BUILDS].sort((a, b) => priceOf(b).total - priceOf(a).total);
  return (
    <>
      <section className="wrap page-top" aria-labelledby="rates-title">
        <span className="idx rise">End-of-year prices until {OFFER_ENDS}</span>
        <h1 id="rates-title" className="page-title rise">
          Prices<span className="dot">.</span>
        </h1>
        <p className="page-sub rise">Fixed prices, agreed before any work starts. Free hosting on every website. M-Pesa or bank transfer.</p>
        <nav className="jump rise" aria-label="Jump to">
          <a href="#sites" className="ulink">Websites</a>
          <a href="#addons" className="ulink">What adds to the price</a>
          <a href="#builds" className="ulink">What the builds cost</a>
          <a href="#ads" className="ulink">Ad design</a>
          <a href="#paying" className="ulink">Paying</a>
        </nav>
      </section>

      <section id="sites" className="wrap sec" aria-labelledby="sites-title">
        <SecHead n="01" title="Websites" id="sites-title" note="Each plan includes everything in the one before it." />
        <PriceRows />
        <div className="sec-end">
          <p>Something more complex? Marketplaces, customer accounts, multi-branch systems — scoped together and priced to the job.</p>
          <a href={waLink("Hi Eden, I have a bigger project in mind. Can we talk it through?")} target="_blank" rel="noopener noreferrer" className="act">
            Talk it through <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section id="addons" className="wrap sec" aria-labelledby="addons-title">
        <SecHead
          n="02"
          title="What adds to the price"
          id="addons-title"
          note={`Every build starts as a custom-designed site of up to 5 pages (${ksh(BASE_SITE[1])}). Each feature adds its own price; the end-of-year offer takes 15% off the total.`}
        />
        <ul className="ledger">
          {Object.values(ADDONS)
            .sort((a, b) => b[1] - a[1])
            .map(([name, v]) => (
              <li key={name}>
                <span>{name}</span>
                <b>+{v.toLocaleString("en-US")}</b>
              </li>
            ))}
        </ul>
      </section>

      <section id="builds" className="wrap sec" aria-labelledby="builds-title">
        <SecHead n="03" title="What the builds would cost" id="builds-title" note="My own builds, priced as if you asked for one like it today. Client prices stay between me and them." />
        <div className="table-wrap">
          <table className="cost">
            <thead>
              <tr>
                <th scope="col">Site</th>
                <th scope="col">What drives the price</th>
                <th scope="col">Normal</th>
                <th scope="col">Until {OFFER_ENDS}</th>
              </tr>
            </thead>
            <tbody>
              {builds.map((b) => {
                const p = priceOf(b);
                return (
                  <tr key={b.title}>
                    <th scope="row">
                      <a href={b.demo} target="_blank" rel="noopener noreferrer" className="ulink">
                        {b.title}
                      </a>
                    </th>
                    <td>{b.addons.map((k) => ADDONS[k][0]).join(" · ")}</td>
                    <td>
                      <s>{ksh(p.total)}</s>
                    </td>
                    <td>
                      <b>{ksh(p.now)}</b>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section id="ads" className="wrap sec" aria-labelledby="ads-title">
        <SecHead n="04" title="Ad design" id="ads-title" note="Per poster, a monthly content plan, or a whole campaign in one go." />
        <AdRows />
        <p className="fine">
          {AD_TERMS} {AD_BUNDLE}
        </p>
      </section>

      <section id="paying" className="wrap sec" aria-labelledby="paying-title">
        <SecHead n="05" title="How paying works" id="paying-title" note="Two payments, no surprises. The Custom Build comes with a free domain." />
        <Steps />
      </section>
    </>
  );
}
