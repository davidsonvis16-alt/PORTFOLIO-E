import { useMemo } from "react";
import { AD_CAMPAIGNS, AD_COUNT, waLink } from "../data";
import { AdCard } from "../cards";
import { VIDEO_ITEMS, adItems } from "../adItems";
import { AdPlans } from "../plans";
import { useLightbox } from "../tokens";
import { Icon, Lightbox, PageTop, Shelf } from "../ui";

function Campaign({ c }) {
  const items = useMemo(() => adItems(c).filter((it) => !it.video), [c]);
  const lb = useLightbox(items.length);
  return (
    <>
      <Shelf
        id={c.key}
        title={c.name}
        icon={c.icon}
        sub={`${c.sector} · ${c.brief.split(". ")[0]}.`}
        grid
        more={
          <a href={waLink(`Hi Eden, I saw the ${c.name} ads. Could you do a campaign like that for my business?`)} target="_blank" rel="noopener noreferrer" className="more">
            Get one like this
          </a>
        }
      >
        {items.map((it, i) => (
          <AdCard key={it.file} it={it} onOpen={() => lb.open(i)} />
        ))}
      </Shelf>
      <Lightbox items={items} index={lb.index} onClose={lb.close} onStep={lb.step} />
    </>
  );
}

export default function Ads() {
  const videos = useLightbox(VIDEO_ITEMS.length);
  return (
    <>
      <PageTop title="Ad campaigns" sub={`Three concept campaigns, ${AD_COUNT} pieces — posters, stories, billboards and voiced video ads. Tap any one to see it full screen.`}>
        <nav className="chips rise" style={{ animationDelay: "0.12s" }} aria-label="Jump to">
          <a href="#video">
            <Icon name="play" size={14} /> Video ads
          </a>
          {AD_CAMPAIGNS.map((c) => (
            <a key={c.key} href={`#${c.key}`}>
              <Icon name={c.icon} size={14} /> {c.name}
            </a>
          ))}
          <a href="#ad-rates">Prices</a>
        </nav>
      </PageTop>

      <Shelf id="video" title="Video ads" icon="play" sub="Voiced, 15–21 seconds, made for Reels and TikTok">
        {VIDEO_ITEMS.map((it, i) => (
          <AdCard key={it.key} it={it} onOpen={() => videos.open(i)} />
        ))}
      </Shelf>
      <Lightbox items={VIDEO_ITEMS} index={videos.index} onClose={videos.close} onStep={videos.step} />

      {AD_CAMPAIGNS.map((c) => (
        <Campaign key={c.key} c={c} />
      ))}

      <section id="ad-rates" className="wrap block">
        <h2 className="h2">Ad prices</h2>
        <p className="shelf-sub">Per poster, every month, or a whole campaign. Paying: 60% to start, 40% on delivery · monthly content is paid at the start of each month · M-Pesa or bank transfer.</p>
        <AdPlans />
      </section>
    </>
  );
}
