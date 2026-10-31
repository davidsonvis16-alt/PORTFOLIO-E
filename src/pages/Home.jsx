import { useMemo } from "react";
import { Link } from "react-router-dom";
import { AD_CAMPAIGNS, AD_TIERS, CASE_STUDIES, OTHER_BUILDS, PRICING_TIERS, WORK_SHELVES } from "../data";
import { AdCard, BuildCard, ClientCard } from "../cards";
import { VIDEO_ITEMS, adItems } from "../adItems";
import { useLightbox } from "../tokens";
import { Icon, Lightbox, Shelf } from "../ui";

/* No hero: one line, then straight into the shelves — the work is the decoration. */
function Intro() {
  return (
    <section className="wrap intro">
      <h1 className="h1 rise">Websites & ads for shops, cafés and restaurants.</h1>
      <p className="ptop-sub rise" style={{ animationDelay: "0.06s" }}>
        Built in Nairobi, made to load on three bars. Fixed prices, one person from start to finish.
      </p>
    </section>
  );
}

const FRESH_ADS = [
  ["stage46", "01-get-off-here"],
  ["lineup", "01-sharp-is-a-habit"],
  ["latch", "02-sunlight-included"],
  ["stage46", "09-sauce-up-to-the-elbow"],
  ["lineup", "04-walk-out-taller"],
  ["latch", "04-the-home-that-says-yes"],
  ["stage46", "12-its-raining-coke"],
  ["lineup", "07-beards-handled"],
  ["latch", "09-latch-after-dark"],
  ["stage46", "13-your-fare-itemised"],
];

export default function Home() {
  const fresh = useMemo(() => {
    const all = AD_CAMPAIGNS.flatMap(adItems);
    return FRESH_ADS.map(([k, f]) => all.find((it) => it.key === k && it.file === f)).filter(Boolean);
  }, []);
  const videos = useLightbox(VIDEO_ITEMS.length);
  const ads = useLightbox(fresh.length);
  const shelf = (s) => OTHER_BUILDS.filter((b) => s.groups.includes(b.group));

  return (
    <>
      <Intro />

      <Shelf title="Client work" icon="star" sub="Live and in daily use" more={<Link to="/work#clients" className="more">See all</Link>}>
        {CASE_STUDIES.map((s) => (
          <ClientCard key={s.n} s={s} />
        ))}
      </Shelf>

      <Shelf title="Video ads" icon="play" sub="Voiced, 15–21 seconds, made for Reels and TikTok" more={<Link to="/ads#video" className="more">See all</Link>}>
        {VIDEO_ITEMS.map((it, i) => (
          <AdCard key={it.key} it={it} onOpen={() => videos.open(i)} />
        ))}
      </Shelf>

      <Shelf title={WORK_SHELVES[0].title} icon={WORK_SHELVES[0].icon} more={<Link to="/work#food" className="more">See all</Link>}>
        {shelf(WORK_SHELVES[0]).map((b) => (
          <BuildCard key={b.title} b={b} />
        ))}
      </Shelf>

      <Shelf title="Fresh ads" icon="image" sub="Three concept campaigns — a chicken joint, a barber and a rental agency" more={<Link to="/ads" className="more">See all</Link>}>
        {fresh.map((it, i) => (
          <AdCard key={it.key + it.file} it={it} onOpen={() => ads.open(i)} />
        ))}
      </Shelf>

      {WORK_SHELVES.slice(1).map((s) => (
        <Shelf key={s.id} title={s.title} icon={s.icon} more={<Link to={`/work#${s.id}`} className="more">See all</Link>}>
          {shelf(s).map((b) => (
            <BuildCard key={b.title} b={b} />
          ))}
        </Shelf>
      ))}

      <section className="wrap prices-strip">
        <h2 className="h2">
          <span className="h2-ic">
            <Icon name="tag" size={18} />
          </span>
          Prices
        </h2>
        <div className="strip">
          {PRICING_TIERS.map((t) => (
            <Link key={t.key} to="/rates" className="strip-item">
              <span>{t.name}</span>
              <b>
                {t.from ? "from " : ""}KSh {t.price}
              </b>
              {t.was && <s>KSh {t.was}</s>}
            </Link>
          ))}
          <Link to="/rates#ads" className="strip-item">
            <span>Ad posters</span>
            <b>from KSh {AD_TIERS[0].price}</b>
          </Link>
        </div>
      </section>

      <Lightbox items={VIDEO_ITEMS} index={videos.index} onClose={videos.close} onStep={videos.step} />
      <Lightbox items={fresh} index={ads.index} onClose={ads.close} onStep={ads.step} />
    </>
  );
}
