import { TIER_SHORT, avatarFor, ksh, phone, priceOf } from "./data";
import { Card } from "./ui";

/* Every project and ad as a card. The phone screenshot is the "food photo":
   the colourful top of each site, cropped square. */

export function ClientCard({ s }) {
  return (
    <Card
      href={s.demo}
      img={phone(s.img)}
      alt={`${s.client} on a phone`}
      title={s.client}
      meta={s.spec.find(([k]) => k === "STATUS")?.[1] ?? "Live"}
      metaIcon="live"
      who={s.place}
      avatar={avatarFor(s.client, s.icon)}
      tag="Client"
      tagTone="lime"
    />
  );
}

/* What one site would cost: each feature and its price, then the totals. */
export function PriceBreakdown({ b, open = false }) {
  const p = priceOf(b);
  return (
    <details className="card-more" open={open}>
      <summary>What's in the price</summary>
      <ul>
        {p.lines.map(([name, v]) => (
          <li key={name}>
            <span>{name}</span>
            <span>{v.toLocaleString("en-US")}</span>
          </li>
        ))}
      </ul>
      <p className="card-more-total">
        <span>Normal price</span>
        <s>{ksh(p.total)}</s>
      </p>
      <p className="card-more-total card-more-now">
        <span>End-of-year</span>
        <b>{ksh(p.now)}</b>
      </p>
    </details>
  );
}

export function BuildCard({ b }) {
  const p = priceOf(b);
  return (
    <Card
      href={b.demo}
      price={{ was: ksh(p.total), now: ksh(p.now) }}
      extra={<PriceBreakdown b={b} />}
      img={phone(b.img)}
      alt={`${b.title} on a phone`}
      title={b.title}
      meta={b.stack}
      metaIcon="code"
      who={b.kind.split(" · ")[0]}
      avatar={avatarFor(b.title, b.icon)}
      tag={TIER_SHORT[b.tier]}
    />
  );
}

export function AdCard({ it, onOpen }) {
  const c = it.campaign;
  if (it.video) {
    return (
      <Card
        onClick={onOpen}
        tall
        img={it.poster}
        video={it.src}
        title={`${c.name} — video ad`}
        meta={`${c.videoLength} · voiceover & music`}
        metaIcon="sound"
        who={c.name}
        avatar={avatarFor(c.name, c.icon, 2)}
        tag="Video"
        tagTone="dark"
        action="play"
      />
    );
  }
  return (
    <Card
      onClick={onOpen}
      poster
      whole={!it.format.startsWith("Feed") && !it.format.startsWith("Story")}
      img={it.thumb}
      alt={it.title}
      title={it.title}
      meta={it.format}
      metaIcon="image"
      who={c.name}
      avatar={avatarFor(c.name, c.icon, 2)}
      tag="Concept"
      action="expand"
    />
  );
}
