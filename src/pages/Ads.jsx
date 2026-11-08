import { useMemo } from "react";
import { AD_CAMPAIGNS, AD_COUNT, AD_TERMS, waLink } from "../data";
import { AdRows } from "../blocks";
import { VIDEO_ITEMS, adItems } from "../adItems";
import { useLightbox } from "../tokens";
import { Lightbox, SecHead } from "../ui";

/* A poster or video frame that opens full screen. */
function Tile({ it, onOpen }) {
  return (
    <li>
      <button className={`tile ${it.video ? "is-video" : ""}`} onClick={onOpen} aria-label={`${it.title} — open full screen`}>
        <span className="tile-img">
          <img src={it.thumb} alt="" width={it.video ? 720 : 640} height={it.video ? 1280 : 800} loading="lazy" decoding="async" />
        </span>
        <span className="tile-cap">
          {it.video ? `${it.campaign.name} · video` : it.title}
        </span>
      </button>
    </li>
  );
}

function Campaign({ c }) {
  const items = useMemo(() => adItems(c).filter((it) => !it.video), [c]);
  const lb = useLightbox(items.length);
  return (
    <section id={c.key} className="wrap sec campaign" aria-labelledby={`${c.key}-title`}>
      <div className="sec-head">
        <span className="idx">{c.n}</span>
        <h2 id={`${c.key}-title`} className="campaign-name">
          {c.name}
        </h2>
        <p className="sec-note">{c.sector}</p>
        <p className="campaign-brief">{c.brief}</p>
        <a href={waLink(`Hi Eden, I saw the ${c.name} ads. Could you do a campaign like that for my business?`)} target="_blank" rel="noopener noreferrer" className="act">
          Get one like this <span aria-hidden="true">↗</span>
        </a>
      </div>
      <ul className="tiles">
        {items.map((it, i) => (
          <Tile key={it.file} it={it} onOpen={() => lb.open(i)} />
        ))}
      </ul>
      <Lightbox items={items} index={lb.index} onClose={lb.close} onStep={lb.step} />
    </section>
  );
}

export default function Ads() {
  const videos = useLightbox(VIDEO_ITEMS.length);
  return (
    <>
      <section className="wrap page-top" aria-labelledby="ads-title">
        <span className="idx rise">Six concept brands — {AD_COUNT} pieces</span>
        <h1 id="ads-title" className="page-title rise">
          Ads<span className="dot">.</span>
        </h1>
        <p className="page-sub rise">
          Promo posters with a price and a number to call, and voiced video ads made for Reels and TikTok. These brands are concepts, not clients — the kind of campaign I make for a real business.
        </p>
        <nav className="jump rise" aria-label="Jump to">
          <a href="#video" className="ulink">
            Video ads
          </a>
          {AD_CAMPAIGNS.map((c) => (
            <a key={c.key} href={`#${c.key}`} className="ulink">
              {c.name}
            </a>
          ))}
          <a href="#ad-prices" className="ulink">
            Prices
          </a>
        </nav>
      </section>

      <section id="video" className="wrap sec campaign" aria-labelledby="video-title">
        <SecHead n="00" title="Video ads" id="video-title" note="Voiced, 15–21 seconds, full-screen like a Reel." />
        <ul className="tiles tiles-video">
          {VIDEO_ITEMS.map((it, i) => (
            <Tile key={it.key} it={it} onOpen={() => videos.open(i)} />
          ))}
        </ul>
        <Lightbox items={VIDEO_ITEMS} index={videos.index} onClose={videos.close} onStep={videos.step} />
      </section>

      {AD_CAMPAIGNS.map((c) => (
        <Campaign key={c.key} c={c} />
      ))}

      <section id="ad-prices" className="wrap sec" aria-labelledby="ad-prices-title">
        <SecHead n="07" title="Ad prices" id="ad-prices-title" note="60% to start, 40% on delivery. Monthly content is paid at the start of each month." />
        <AdRows />
        <p className="fine">{AD_TERMS}</p>
      </section>
    </>
  );
}
