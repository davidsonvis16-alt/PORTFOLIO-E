import { useEffect } from "react";

const SITE = "Eden. — Web Developer & Designer, Nairobi";

function setMeta(selector, attr, value) {
  if (!value) return;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    const [, key, name] = selector.match(/\[(.+?)="(.+?)"\]/) || [];
    if (key && name) el.setAttribute(key, name);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

/**
 * Per-route document metadata. This is a single-page app, so titles,
 * descriptions and the canonical URL have to be set as routes change.
 */
export function useSeo({ title, description, path }) {
  useEffect(() => {
    const full = title ? `${title} — Eden.` : SITE;
    document.title = full;

    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", full);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[name="twitter:title"]', "content", full);
    setMeta('meta[name="twitter:description"]', "content", description);

    if (path) {
      const url = `${window.location.origin}${path}`;
      setMeta('meta[property="og:url"]', "content", url);

      let link = document.head.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", url);
    }
  }, [title, description, path]);
}
