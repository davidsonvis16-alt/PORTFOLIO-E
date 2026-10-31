/* Renders reel.html to WebM, one frame at a time, so the video is exact
   whatever the machine's speed.

     node tools/reels/render.mjs stage46            → public/ads/stage46/reel.webm + s/reel.jpg
     node tools/reels/render.mjs stage46 --stills   → a few JPEG frames in tools/reels/out/ to check

   Uses the Chromium and ffmpeg that Playwright downloads (~/.cache/ms-playwright);
   that ffmpeg build only writes VP8 WebM, which is what the site serves. */
import { spawn } from "node:child_process";
import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const pw = join(homedir(), ".cache/ms-playwright");
const find = (prefix, rel) => {
  const dir = readdirSync(pw).filter((d) => d.startsWith(prefix)).sort().pop();
  if (!dir) throw new Error(`No ${prefix} in ${pw} — run: npx playwright install chromium`);
  return join(pw, dir, rel);
};
const CHROME = find("chromium-", "chrome-linux64/chrome");
const FFMPEG = find("ffmpeg-", "ffmpeg-linux");

const key = process.argv[2];
const stills = process.argv.includes("--stills");
if (!key) throw new Error("usage: render.mjs <campaign> [--stills]");

const W = 720, H = 1280, FPS = 30, DURATION = 9000;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const port = 9700 + Math.floor(Math.random() * 200);
const chrome = spawn(CHROME, ["--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files", `--remote-debugging-port=${port}`, "about:blank"], { stdio: "ignore" });
await sleep(2000);
const tabs = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
const ws = new WebSocket(tabs.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m.result ?? { error: m.error });
    pending.delete(m.id);
  }
};
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const run = async (expression) => {
  const r = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails).slice(0, 400));
  return r.result?.value;
};
const frame = async () => Buffer.from((await send("Page.captureScreenshot", { format: "jpeg", quality: 92 })).data, "base64");

await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 1, mobile: false });
await send("Page.navigate", { url: `file://${join(here, "reel.html")}?c=${key}` });
// The scene script runs after the font stylesheet arrives; wait for it, then for fonts and posters.
for (let i = 0; i < 100 && !(await run("!!window.__ready")); i++) await sleep(200);
await run("window.__ready");

if (stills) {
  const out = join(here, "out");
  mkdirSync(out, { recursive: true });
  for (const t of [600, 1300, 2600, 3500, 4600, 6200, 7300, 8800]) {
    await run(`window.__seek(${t})`);
    writeFileSync(join(out, `${key}-${t}.jpg`), await frame());
  }
  console.log(`stills → ${out}`);
} else {
  const dest = join(root, "public/ads", key);
  mkdirSync(join(dest, "s"), { recursive: true });
  const ff = spawn(FFMPEG, ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "pipe:0",
    "-c:v", "libvpx", "-b:v", "2400k", "-crf", "8", "-qmin", "4", "-qmax", "40", "-deadline", "good", "-cpu-used", "1", "-auto-alt-ref", "0", "-an", join(dest, "reel.webm")], { stdio: ["pipe", "inherit", "inherit"] });
  let ffDone = false;
  ff.on("close", () => (ffDone = true));
  const total = Math.round((DURATION / 1000) * FPS);
  for (let n = 0; n < total; n++) {
    if (ffDone) throw new Error("ffmpeg exited early — see its error above");
    await run(`window.__seek(${(n * 1000) / FPS})`);
    const img = await frame();
    if (!ff.stdin.write(img)) await new Promise((r) => ff.stdin.once("drain", r));
    if (n === Math.round(2.6 * FPS)) writeFileSync(join(dest, "s/reel.jpg"), img);
  }
  ff.stdin.end();
  await new Promise((r) => ff.on("close", r));
  console.log(`${key}: ${total} frames → public/ads/${key}/reel.webm`);
}
ws.close();
chrome.kill();
