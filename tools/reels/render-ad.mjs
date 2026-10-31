/* Renders a voiced advert to MP4 (H.264 + AAC), frame by frame.

     PYTHONPATH=tools/reels/.pylib python3 tools/reels/voice.py stage46   # voice, music, timeline
     node tools/reels/render-ad.mjs stage46            → public/ads/stage46/advert.mp4 + s/advert.jpg
     node tools/reels/render-ad.mjs stage46 --stills   → a few frames in tools/reels/out/stage46/

   Chromium comes from Playwright (~/.cache/ms-playwright); ffmpeg from the
   imageio-ffmpeg package in tools/reels/.pylib (pip install --target). */
import { spawn } from "node:child_process";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const pw = join(homedir(), ".cache/ms-playwright");
const chromeDir = readdirSync(pw).filter((d) => d.startsWith("chromium-")).sort().pop();
const CHROME = join(pw, chromeDir, "chrome-linux64/chrome");
const ffDir = join(here, ".pylib/imageio_ffmpeg/binaries");
const FFMPEG = join(ffDir, readdirSync(ffDir).find((f) => f.startsWith("ffmpeg-")));

const key = process.argv[2];
const stills = process.argv.includes("--stills");
if (!key) throw new Error("usage: render-ad.mjs <campaign> [--stills]");
const work = join(here, "out", key);
const tl = JSON.parse(readFileSync(join(work, "timeline.json"), "utf8"));
// Timing comes from the voice; shots and styling are read fresh so visual edits need no re-voicing.
tl.spec = JSON.parse(readFileSync(join(here, "adverts.json"), "utf8"))[key];
if (tl.spec.lines.length !== tl.lines.length) throw new Error("adverts.json lines changed — re-run voice.py first");

const W = 720, H = 1280, FPS = 30;
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
  if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails).slice(0, 500));
  return r.result?.value;
};
const frame = async () => Buffer.from((await send("Page.captureScreenshot", { format: "jpeg", quality: 92 })).data, "base64");

await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 1, mobile: false });
await send("Page.navigate", { url: `file://${join(here, "advert.html")}` });
// The page script runs once the font stylesheet arrives.
for (let i = 0; i < 100 && !(await run("typeof window.__init === 'function'")); i++) await sleep(200);
await run(`window.__init(${JSON.stringify(tl)})`);

if (stills) {
  const times = [0.3, ...tl.lines.map((l) => l.t1 - 0.05), tl.end + 0.3, tl.total - 0.05];
  for (const t of times) {
    await run(`window.__seek(${t})`);
    writeFileSync(join(work, `still-${t.toFixed(2)}.jpg`), await frame());
  }
  console.log(`stills → ${work}`);
} else {
  const dest = join(root, "public/ads", key);
  mkdirSync(join(dest, "s"), { recursive: true });
  const ff = spawn(FFMPEG, ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "pipe:0", "-i", join(work, "audio.wav"),
    "-c:v", "libx264", "-preset", "slow", "-crf", "21", "-pix_fmt", "yuv420p", "-profile:v", "high", "-movflags", "+faststart",
    "-c:a", "aac", "-b:a", "128k", "-ar", "44100", "-shortest", join(dest, "advert.mp4")], { stdio: ["pipe", "inherit", "inherit"] });
  let ffDone = false;
  ff.on("close", () => (ffDone = true));
  const total = Math.ceil(tl.total * FPS);
  const posterAt = Math.round((tl.lines[0].t1 - 0.05) * FPS);
  for (let n = 0; n < total; n++) {
    if (ffDone) throw new Error("ffmpeg exited early — see its error above");
    await run(`window.__seek(${n / FPS})`);
    const img = await frame();
    if (!ff.stdin.write(img)) await new Promise((r) => ff.stdin.once("drain", r));
    if (n === posterAt) writeFileSync(join(dest, "s/advert.jpg"), img);
  }
  ff.stdin.end();
  await new Promise((r) => ff.on("close", r));
  console.log(`${key}: ${total} frames, ${tl.total.toFixed(1)}s → public/ads/${key}/advert.mp4`);
}
ws.close();
chrome.kill();
