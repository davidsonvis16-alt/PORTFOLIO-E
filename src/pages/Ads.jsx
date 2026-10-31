import { useEffect, useRef } from "react";
import { AD_CAMPAIGNS, AD_COUNT, adSrc, adVideo, isVideo, waLink } from "../data";
import { AdPlans } from "../plans";
import { useLightbox, usePrefersReducedMotion } from "../tokens";
import { Arrow, Lightbox, PageHead, SecHead } from "../ui";

/* Bento cell size from the piece's format: the cover poster gets the
   big 2×2 slot, billboards and brand sheets run two columns wide,
   stories run tall. The grid packs the rest densely around them. */
function cellFor(file, format, cover) {
  if (file === cover) return "cell-cover";
  if (format.startsWith("Billboard") || format.startsWith("Brand")) return "cell-wide";
  if (format.startsWith("Story") || isVideo(format)) return "cell-tall";
  return "cell-feed";
}

/* Muted loop that only plays while it is on screen, and never for
   people who have asked for less motion — the poster frame stands in. */
function CellVideo({ src, poster, title }) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const v = ref.current;
    if (!v || reduced) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.4 });
    io.observe(v);
    return () => io.disconnect();
  }, [reduced]);
  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none" aria-label={title} />;
}

function Campaign({ c }) {
  const items = c.pieces.map(([file, title, format]) =>
    isVideo(format) ? { file, title, format, video: true, ...adVideo(c.key, file) } : { file, title, format, src: adSrc(c.key, file) }
  );
  const lb = useLightbox(items.length);

  return (
    <section id={c.key} className={`camp camp-${c.key}`}>
      <div className="wrap camp-in">
        <aside className="camp-info" data-reveal>
          <p className="mono camp-n">
            Campaign {c.n} · {c.sector}
          </p>
          <h2 className="d-h2">{c.name}</h2>
          <p className="camp-brief">{c.brief}</p>
          <p className="mono camp-voice">{c.voice}</p>
          <ul className="swatches" aria-label="Palette">
            {c.palette.map((hex) => (
              <li key={hex} style={{ background: hex }}>
                <span className="mono">{hex}</span>
              </li>
            ))}
          </ul>
          <dl className="camp-facts mono">
            <div>
              <dt>Pieces</dt>
              <dd>{c.pieces.length}</dd>
            </div>
            <div>
              <dt>Formats</dt>
              <dd>{[...new Set(c.pieces.map((p) => p[2].split(" ")[0]))].length}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>Concept</dd>
            </div>
          </dl>
          <a href={waLink(`Hi Eden, I saw the ${c.name} ads. Could you do a campaign like that for my business?`)} target="_blank" rel="noopener noreferrer" className="btn btn-blue">
            Get a campaign like this <Arrow />
          </a>
        </aside>

        <div className="bento-box">
          <p className="swipe mono" aria-hidden="true">
            <span>
              <b>{c.pieces.length}</b> pieces · tap to enlarge
            </span>
            <span>Swipe →</span>
          </p>
          <ul className="bento">
            {items.map((it, i) => (
              <li key={it.file} className={`cell ${cellFor(it.file, it.format, c.cover)}`} data-reveal style={{ "--d": `${(i % 6) * 0.05}s` }}>
                <button onClick={() => lb.open(i)} aria-label={`View ${it.title}`}>
                  {it.video ? (
                    <CellVideo src={it.src} poster={it.poster} title={it.title} />
                  ) : (
                    <img src={adSrc(c.key, it.file, it.file !== c.cover)} alt={it.title} loading="lazy" decoding="async" />
                  )}
                  {it.video && <span className="cell-play mono">▶ Reel</span>}
                  <span className="cell-cap">
                    <span className="mono">{it.format}</span>
                    <b>{it.title}</b>
                  </span>
                  <span className="cell-n mono">{String(i + 1).padStart(2, "0")}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Lightbox items={items} index={lb.index} onClose={lb.close} onStep={lb.step} />
    </section>
  );
}

export default function Ads() {
  return (
    <>
      <PageHead stop="02" kicker="· Ad campaigns" title="Ads that" accent="stop traffic." sub={`Three concept campaigns, ${AD_COUNT} pieces — feed posts, stories, billboards, brand sheets and motion reels. Tap any one to see it full size.`}>
        <nav className="camp-tabs rise" style={{ animationDelay: "0.24s" }} aria-label="Campaigns">
          {AD_CAMPAIGNS.map((c) => (
            <a key={c.key} href={`#${c.key}`}>
              <img src={adSrc(c.key, c.cover, true)} alt="" />
              <span>
                <i className="mono">{c.n}</i>
                {c.name}
              </span>
            </a>
          ))}
          <a href="#ad-rates" className="camp-tab-price">
            <span>
              <i className="mono">KSh</i>
              Prices
            </span>
          </a>
        </nav>
      </PageHead>

      {AD_CAMPAIGNS.map((c) => (
        <Campaign key={c.key} c={c} />
      ))}

      <section id="ad-rates" className="band band-paper">
        <div className="wrap">
          <SecHead kick="Ad packages" title="Pick your" accent="fare." sub="Per poster, every month, or a whole campaign in one go. Fixed prices, agreed before anything is designed." />
          <AdPlans />
          <p className="pay-line mono" data-reveal>
            Paying: 60% to start, 40% when the files are delivered · Monthly content is paid at the start of each month · M-Pesa or bank transfer
          </p>
        </div>
      </section>
    </>
  );
}
