import { ADDONS, BASE_SITE, OFFER_ENDS, OTHER_BUILDS, ksh, priceOf, waLink } from "../data";
import { AdPlans, PaySteps, SitePlans } from "../plans";
import { PageTop } from "../ui";

export default function Rates() {
  return (
    <>
      <PageTop title="Prices" sub={`End-of-year offer until ${OFFER_ENDS}. Fixed prices agreed before any work starts, and free hosting on every website.`}>
        <nav className="chips rise" style={{ animationDelay: "0.12s" }} aria-label="Jump to">
          <a href="#sites">Websites</a>
          <a href="#addons">What adds to the price</a>
          <a href="#builds">What the builds cost</a>
          <a href="#ads">Ad design</a>
          <a href="#paying">How paying works</a>
        </nav>
      </PageTop>

      <section id="sites" className="wrap block">
        <h2 className="h2">Websites</h2>
        <SitePlans />
        <div className="bigger">
          <div>
            <h3 className="h3">Something more complex?</h3>
            <p>Marketplaces, customer accounts, multi-branch systems, integrations — we scope it together and price it to the job.</p>
          </div>
          <a href={waLink("Hi Eden, I have a bigger project in mind. Can we talk it through?")} target="_blank" rel="noopener noreferrer" className="pill pill-lime">
            Let's talk
          </a>
        </div>
      </section>

      <section id="addons" className="wrap block">
        <h2 className="h2">What adds to the price</h2>
        <p className="shelf-sub">
          Every build starts as a custom-designed site of up to 5 pages ({ksh(BASE_SITE[1])}). Each feature adds its own price, and the end-of-year offer takes 15% off the total.
        </p>
        <ul className="menu-list">
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

      <section id="builds" className="wrap block">
        <h2 className="h2">What the builds would cost</h2>
        <p className="shelf-sub">Each of my own builds, priced as if you asked for one like it today. Client sites aren't listed — their prices are between me and them.</p>
        <div className="table-wrap">
          <table className="cost">
            <thead>
              <tr>
                <th scope="col">Site</th>
                <th scope="col">What drives the price</th>
                <th scope="col">Normal</th>
                <th scope="col">End-of-year</th>
              </tr>
            </thead>
            <tbody>
              {[...OTHER_BUILDS]
                .sort((a, b) => priceOf(b).total - priceOf(a).total)
                .map((b) => {
                  const p = priceOf(b);
                  return (
                    <tr key={b.title}>
                      <th scope="row">
                        <a href={b.demo} target="_blank" rel="noopener noreferrer">
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

      <section id="ads" className="wrap block">
        <h2 className="h2">Ad design</h2>
        <p className="shelf-sub">Per poster, a monthly content plan, or a whole campaign in one go.</p>
        <AdPlans />
      </section>

      <section id="paying" className="wrap block">
        <h2 className="h2">How paying works</h2>
        <p className="shelf-sub">Two payments, no surprises. The Custom Build comes with a free domain.</p>
        <PaySteps />
      </section>
    </>
  );
}
