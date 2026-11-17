import { useMemo } from "react";
import { AD_CAMPAIGNS, AD_COUNT, AD_TERMS, AD_TIERS, waLink } from "../data";
import { AdRows } from "../blocks";
import { VIDEO_ITEMS, adItems } from "../adItems";
import { useLightbox } from "../tokens";
import { Lightbox, SecHead } from "../ui";

/* Each campaign gets its own card colour for the "get one like this" card. */
const TONES = ["t-tomato", "t-lilac", "t-ink", "t-pink", "t-green", "t-blue"];

/* A poster or video frame that opens full screen. */
function Tile({ it, onOpen, lead }) {
  return (
    <li className={lead ? "is-lead" : undefined}>
      <button className={`tile ${it.video ? "is-video" : ""}`} onClick={onOpen} aria-label={`${it.title} — open full screen`}>
        <span className="tile-img">
          <img src={lead && !it.video ? it.src : it.thumb} alt="" width={it.video ? 720 : 640} height={it.video ? 1280 : 800} loading="lazy" decoding="async" />
          {it.video && <span className="tile-play">▶ Play</span>}
        </span>
        <span className="tile-cap">{it.video ? `${it.campaign.name} · ${it.campaign.videoLength}` : it.title}</span>
      </button>
    </li>
  );
}

/* One campaign: a header across the top, then the posters as a board — one
   big lead poster (left or right, alternating) with the rest around it, and
   a coloured card in the last space that asks for a campaign like it. */
function Campaign({ c, i }) {
  const items = useMemo(() => adItems(c).filter((it) => !it.video), [c]);
  const lb = useLightbox(items.length);
  return (
    <section id={c.key} className={`wrap campaign ${i % 2 ? "lead-right" : ""}`} aria-labelledby={`${c.key}-title`}>
      <header className="campaign-head">
        <span className="idx">{c.n}</span>
        <div>
          <h2 id={`${c.key}-title`} className="campaign-name">
            {c.name}
            <span className="dot">.</span>
          </h2>
          <p className="campaign-sector">{c.sector}</p>
        </div>
        <p className="campaign-brief">{c.brief}</p>
      </header>
      <ul className="board">
        {items.map((it, n) => (
          <Tile key={it.file} it={it} lead={n === 0} onOpen={() => lb.open(n)} />
        ))}
        <li>
          <a
            href={waLink(`Hi Tessy, I saw the ${c.name} ads. Could you do a campaign like that for my business?`)}
            target="_blank"
            rel="noopener noreferrer"
            className={`board-ask ${TONES[i % TONES.length]}`}
          >
            <span>Want ads like {c.name}?</span>
            <b>Get a campaign like this</b>
            <span className="board-ask-from">From KSh {AD_TIERS[0].price} a poster ↗</span>
            <span className="sr">(opens WhatsApp in a new tab)</span>
          </a>
        </li>
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
          Promo posters with a price and a number to call, and voiced video ads made for Reels and TikTok. These brands are concepts, not clients — the kind of campaign we make for a real business.
        </p>
        <nav className="jump rise" aria-label="Jump to">
          <a href="#video" className="pill-link">
            Video ads
          </a>
          {AD_CAMPAIGNS.map((c) => (
            <a key={c.key} href={`#${c.key}`} className="pill-link">
              {c.name}
            </a>
          ))}
          <a href="#ad-prices" className="pill-link">
            Prices
          </a>
        </nav>
      </section>

      <section id="video" className="wrap campaign" aria-labelledby="video-title">
        <header className="campaign-head">
          <span className="idx">00</span>
          <div>
            <h2 id="video-title" className="campaign-name">
              Video ads<span className="dot">.</span>
            </h2>
            <p className="campaign-sector">Voiced, 15–21 seconds</p>
          </div>
          <p className="campaign-brief">Full-screen like a Reel, with a voice-over, music and captions burned in — made to stop the thumb on TikTok, Reels and Status.</p>
        </header>
        <ul className="reels">
          {VIDEO_ITEMS.map((it, i) => (
            <Tile key={it.key} it={it} onOpen={() => videos.open(i)} />
          ))}
        </ul>
        <Lightbox items={VIDEO_ITEMS} index={videos.index} onClose={videos.close} onStep={videos.step} />
      </section>

      {AD_CAMPAIGNS.map((c, i) => (
        <Campaign key={c.key} c={c} i={i} />
      ))}

      <section id="ad-prices" className="wrap sec" aria-labelledby="ad-prices-title">
        <SecHead n="07" title="Ad prices" id="ad-prices-title" note="60% to start, 40% on delivery. Monthly content is paid at the start of each month." />
        <AdRows />
        <p className="fine">{AD_TERMS}</p>
      </section>
    </>
  );
}
