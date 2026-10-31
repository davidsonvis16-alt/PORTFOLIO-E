import { AD_CAMPAIGNS, adSrc, adVideo, isVideo } from "./data";

/* Ads open in the lightbox; each list keeps its own order for stepping. */
export function adItems(c) {
  return c.pieces.map(([file, title, format]) =>
    isVideo(format)
      ? { key: c.key, file, title, format, video: true, ...adVideo(c.key, file), thumb: adVideo(c.key, file).poster, campaign: c }
      : { key: c.key, file, title, format, src: adSrc(c.key, file), thumb: adSrc(c.key, file, true), campaign: c }
  );
}

export const VIDEO_ITEMS = AD_CAMPAIGNS.flatMap((c) => adItems(c).filter((it) => it.video));
