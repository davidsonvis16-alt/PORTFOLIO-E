/* Renders the concept posters to WebP, 1080×1350 plus a 640×800 thumbnail.

     node tools/posters/render.mjs                 → every campaign
     node tools/posters/render.mjs stage46 lineup  → just those
     node tools/posters/render.mjs slice 03        → posters whose file starts with 03

   Writes public/ads/<campaign>/<file>.webp and s/<file>.webp. Chromium comes from
   Playwright (~/.cache/ms-playwright); photos/ and cut/ must be filled first (see posters.mjs). */
import { spawn } from "node:child_process";
import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { BRANDS, POSTERS } from "./posters.mjs";
import { page } from "./templates.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const pw = join(homedir(), ".cache/ms-playwright");
const CHROME = join(pw, readdirSync(pw).filter((d) => d.startsWith("chromium-")).sort().pop(), "chrome-linux64/chrome");
const W = 1080, H = 1350;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const args = process.argv.slice(2);
const keys = args.filter((a) => BRANDS[a]);
const only = args.filter((a) => !BRANDS[a]);
const todo = (keys.length ? keys : Object.keys(POSTERS)).flatMap((k) =>
  POSTERS[k].filter((p) => !only.length || only.some((o) => p.file.startsWith(o))).map((p) => [k, p]));

const port = 9500 + Math.floor(Math.random() * 200);
const chrome = spawn(CHROME, ["--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files", `--remote-debugging-port=${port}`, "about:blank"], { stdio: "ignore" });
await sleep(2000);
const tabs = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
const ws = new WebSocket(tabs.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result ?? { error: m.error }); pending.delete(m.id); }
};
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 1, mobile: false });

const build = join(here, "out");
mkdirSync(build, { recursive: true });
for (const [key, p] of todo) {
  const html = join(build, `${key}-${p.file}.html`);
  writeFileSync(html, page(BRANDS[key], p, here));
  await send("Page.navigate", { url: `file://${html}` });
  await sleep(400);
  const r = await send("Runtime.evaluate", {
    awaitPromise: true, returnByValue: true,
    expression: `(async () => { await document.fonts.ready; await Promise.all([...document.images].map((i) => i.decode().catch(() => i.src))); await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))); return [...document.images].filter((i) => !i.naturalWidth).map((i) => i.src); })()`,
  });
  if (r.result?.value?.length) console.warn(`  missing images in ${key}/${p.file}:`, r.result.value);
  const dir = join(root, "public/ads", key);
  mkdirSync(join(dir, "s"), { recursive: true });
  const big = await send("Page.captureScreenshot", { format: "webp", quality: 86 });
  writeFileSync(join(dir, `${p.file}.webp`), Buffer.from(big.data, "base64"));
  const small = await send("Page.captureScreenshot", { format: "webp", quality: 80, clip: { x: 0, y: 0, width: W, height: H, scale: 640 / W } });
  writeFileSync(join(dir, "s", `${p.file}.webp`), Buffer.from(small.data, "base64"));
  console.log(`${key}/${p.file}`);
}
ws.close();
chrome.kill();
