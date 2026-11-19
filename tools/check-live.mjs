/* Checks every site listed on the Work page and records which ones answer.
     node tools/check-live.mjs
   Writes src/live.json — { checked: "YYYY-MM-DD", sites: { url: true|false } }.
   Run it before a deploy so the Live / Not live labels stay true. */
import { writeFileSync } from "node:fs";
import { CASE_STUDIES, OTHER_BUILDS } from "../src/data.js";

const urls = [...CASE_STUDIES.map((s) => s.demo), ...OTHER_BUILDS.filter((b) => b.demo?.startsWith("http")).map((b) => b.demo)];
const sites = {};
await Promise.all(
  urls.map(async (u) => {
    try {
      const r = await fetch(u, { redirect: "follow", signal: AbortSignal.timeout(15000) });
      sites[u] = r.ok;
    } catch {
      sites[u] = false;
    }
  })
);
const out = { checked: new Date().toISOString().slice(0, 10), sites };
writeFileSync(new URL("../src/live.json", import.meta.url), JSON.stringify(out, null, 2) + "\n");
console.log(`${Object.values(sites).filter(Boolean).length}/${urls.length} live, checked ${out.checked}`);
