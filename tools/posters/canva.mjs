/* Poster layouts in the Petal style, 1080×1350.

   Paper background, heavy grotesque headline with the last line in an italic
   serif, handwritten notes, a tilted tape strip, price and phone in pills.
   Rules: only pills are rounded — photos, tape and everything else have sharp
   corners. No boxes drawn around text; words sit on the paper or on the photo.
   Photos are mounted on photos: a second print, paper-edged, tilted over the
   corner of the first.

   Reads the same poster props as templates.mjs (lines, sub, price, img/hero,
   items, imgs …), so posters.mjs only needs new brands, not new posters. */

const FONTS = "family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=Instrument+Serif:ital@0;1&family=Caveat:wght@600;700";
export const src = (f, dir) => `${dir}/${f.endsWith(".png") ? "cut" : "photos"}/${f}`;
const strip = (s = "") => String(s).replace(/<br>/g, " ");
const isCut = (f) => f && f.endsWith(".png");

/* Headline: heavy lines, the last one in italic serif. */
function head(b, lines, width, cap = 170, ink = b.dark) {
  const longest = Math.max(...lines.map((l) => strip(l).length));
  const size = Math.round(Math.min(cap, width / (longest * (b.head === "caps" ? 0.64 : 0.54))));
  const mode = b.head || "mix";
  const fs = mode === "serif" ? Math.round(size * 1.15) : size;
  return `<div class="h ${mode}" style="font-size:${fs}px;color:${ink}">${lines
    .map((l, i) => (mode === "serif" || (mode === "mix" && i === lines.length - 1 && lines.length > 1) ? `<em>${l}</em>` : `<span>${l}</span>`))
    .join("<br>")}</div>`;
}

/* A photo, sharp. A cut-out sits free with a shadow. */
function photo(f, dir, style, pos = "50% 50%") {
  if (isCut(f)) return `<img class="cut" src="${src(f, dir)}" style="${style}">`;
  return `<div class="ph" style="${style}"><img src="${src(f, dir)}" style="object-position:${pos}"></div>`;
}

/* A second print mounted over the first: paper edge, a handwritten caption. */
function mount(b, f, dir, style, caption = "", pos = "50% 50%") {
  if (!f) return "";
  if (b.captions === false) caption = "";
  if (isCut(f)) return photo(f, dir, style);
  return `<div class="print" style="${style}"><div class="ph" style="position:relative;width:100%;height:calc(100% - ${caption ? 70 : 0}px)"><img src="${src(f, dir)}" style="object-position:${pos}"></div>${caption ? `<div class="cap">${caption}</div>` : ""}</div>`;
}

const pricePill = (b, p, style = "") =>
  p.price ? `<div class="pill price" style="${style}">${p.priceTop ? `<small>${p.priceTop.toLowerCase()}</small>` : ""}<b>${p.price}</b>${p.priceNote && p.priceNote !== "ONLY!" ? `<small>${p.priceNote.toLowerCase()}</small>` : ""}</div>` : "";

const tape = (b, text, style) => {
  if (b.tapeKind === "none") return "";
  if (b.tapeKind === "stripe") return `<div class="tape" style="${style};height:40px;background:repeating-linear-gradient(-45deg,#E63B2E 0 22px,#fff 22px 44px,#1D4ED8 44px 66px,#fff 66px 88px)"></div>`;
  const t = strip(text);
  return `<div class="tape" style="${style}">${Array(6).fill(`<span>${t}</span><i>✺</i>`).join("")}</div>`;
};

const note = (text, style, arrow = true, b = {}) =>
  text && b.notes === false ? `<div class="sub" style="${style.replace(/transform:[^;]*;?/, "")};font-size:30px;max-width:520px">${text}</div>` :
  text ? `<div class="note" style="${style}">${text}${arrow ? `<svg width="90" height="60" viewBox="0 0 90 60"><path d="M4 8 C 30 4, 60 14, 76 46" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M62 42 L77 49 L80 32" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>` : ""}</div>` : "";

const foot = (b, p, ink = b.dark, onDark = false) => `
  <div class="foot" style="color:${ink}">
    <span class="pill call" style="background:${onDark ? b.pop : b.dark};color:${onDark ? b.onPop || b.dark : b.paper}">${p.ctaTop ? p.ctaTop.toLowerCase().replace(/^./, (c) => c.toUpperCase()) : b.cta || "Order"} · ${b.phone}</span>
    <span class="where">${strip(p.foot || p.strip || b.where)}</span>
  </div>`;

const top = (b, p, ink = b.dark, mode = b.logoOn || "dark") => `
  <div class="top" style="color:${ink}">${b.logo(mode, 0.62)}<span class="kick">${strip(p.kicker || p.badgeTop || b.where)}</span></div>`;

export function base(b) {
  return `
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:1080px;height:1350px;overflow:hidden}
  body{position:relative;font-family:'Bricolage Grotesque';color:${b.dark};background:${b.paper};-webkit-font-smoothing:antialiased}
  .abs{position:absolute}
  .h{font-weight:800;line-height:.9;letter-spacing:-.045em}
  .h em{font:italic 400 1.12em/.86 'Instrument Serif';letter-spacing:-.02em}
  .h.serif em{font-size:1em;font-style:${b.serifItalic === false ? "normal" : "italic"}}
  .h.caps{text-transform:uppercase;letter-spacing:-.035em;line-height:.86;${b.skew ? `transform:skewX(-${b.skew}deg);transform-origin:left bottom;` : ""}}
  .ph{position:absolute;overflow:hidden}
  .ph img{width:100%;height:100%;object-fit:cover;display:block}
  .cut{position:absolute;object-fit:contain;filter:drop-shadow(0 26px 30px rgba(0,0,0,.28))}
  .print{position:absolute;background:#fff;padding:14px 14px 0;box-shadow:0 22px 40px rgba(0,0,0,.25)}
  .print .cap{height:70px;display:flex;align-items:center;justify-content:center;font:700 40px/1 Caveat;color:#222}
  .pill{position:absolute;display:inline-flex;align-items:baseline;gap:12px;border-radius:999px;white-space:nowrap}
  .price{background:${b.pop};color:${b.onPop || b.dark};padding:16px 34px 18px;box-shadow:0 14px 30px rgba(0,0,0,.18)}
  .price b{font-size:72px;font-weight:800;letter-spacing:-.04em;line-height:1}
  .price small{font-size:28px;font-weight:600}
  .tape{position:absolute;left:-60px;right:-60px;height:92px;background:${b.pop};color:${b.onPop || b.dark};display:flex;align-items:center;gap:30px;white-space:nowrap;overflow:hidden;font-weight:800;font-size:44px;letter-spacing:-.02em;text-transform:uppercase;box-shadow:0 10px 24px rgba(0,0,0,.15)}
  .tape i{font-style:normal;font-size:38px}
  .note{position:absolute;font:700 50px/1 Caveat;display:flex;align-items:flex-start;gap:8px}
  .top{position:absolute;left:64px;right:64px;top:52px;display:flex;align-items:center;justify-content:space-between}
  .kick{font-size:22px;font-weight:600;letter-spacing:4px;text-transform:uppercase;display:flex;align-items:center;gap:14px}
  .kick::before{content:"";width:46px;height:2px;background:currentColor}
  .foot{position:absolute;left:64px;right:64px;bottom:54px;display:flex;align-items:center;justify-content:space-between;gap:20px}
  .call{position:relative;padding:20px 34px;font-size:34px;font-weight:800;letter-spacing:-.01em}
  .where{font-size:24px;font-weight:600;letter-spacing:2px;text-transform:uppercase;text-align:right}
  .sub{position:absolute;font-size:34px;line-height:1.3;font-weight:400}
  .mark{position:absolute;right:34px;bottom:16px;font:600 18px/1 'Bricolage Grotesque';opacity:.45}
  `;
}

const T = {
  /* Headline up top, the product big below it, tape across, price pill on the photo. */
  lead(b, p, dir) {
    const main = p.hero || p.img;
    const second = p.side || p._alt[0];
    const lines = p.lines;
    const longest = Math.max(...lines.map((l) => strip(l).length));
    const size = Math.round(Math.min(150, 620 / (longest * 0.54)));
    const below = 150 + lines.length * size * 0.92;
    return `
    ${top(b, p)}
    <div class="abs" style="left:64px;top:150px">${head(b, lines, 620, 150)}</div>
    ${note(p.sub, `left:70px;top:${below + 20}px;color:${b.accentInk || b.dark};transform:rotate(-3deg)`, true, b)}
    ${isCut(main)
      ? photo(main, dir, `left:120px;top:${Math.max(560, below + 60)}px;width:840px;height:${1060 - Math.max(560, below + 60)}px`)
      : `${photo(main, dir, `left:0;right:0;top:${Math.max(600, below + 80)}px;bottom:240px`, p.pos)}
         ${mount(b, second, dir, `right:70px;top:${Math.max(600, below + 80) - 80}px;width:290px;height:350px;transform:rotate(5deg)`, b.caption, p.sidePos)}`}
    ${pricePill(b, p, "right:64px;top:250px;transform:rotate(-5deg)")}
    ${tape(b, p.strip || b.tape, "top:1080px;transform:rotate(-3deg)")}
    ${foot(b, { ...p, foot: b.where, strip: null })}`;
  },

  /* Photo across the top bleeding off the edges, a second print mounted on its corner, headline below. */
  print(b, p, dir) {
    const main = p.img || p.hero;
    const second = p.side || p._alt[0];
    return `
    ${photo(main, dir, isCut(main) ? "left:60px;top:130px;width:620px;height:600px" : "left:0;right:0;top:0;height:720px", p.pos)}
    ${isCut(main) ? top(b, p) : `<div class="top" style="color:#fff;text-shadow:0 2px 12px rgba(0,0,0,.45)">${b.logo("light", 0.62)}<span class="kick">${strip(p.kicker || b.where)}</span></div>`}
    ${mount(b, second, dir, "right:60px;top:520px;width:330px;height:400px;transform:rotate(6deg)", p.script || b.caption, p.sidePos)}
    <div class="abs" style="left:64px;top:780px">${head(b, p.lines, 640, 150)}</div>
    ${p.sub ? `<div class="sub" style="left:66px;top:${790 + p.lines.length * 140}px;width:600px;color:${b.dark}">${p.sub}</div>` : ""}
    ${pricePill(b, p, "right:70px;top:960px;transform:rotate(-5deg)")}
    ${foot(b, p)}`;
  },

  /* Full photo, words written straight on it, a print mounted in the corner. */
  bleed(b, p, dir) {
    const lines = p.lines || [`${p.big} ${p.what.toLowerCase()}`, ...(p.badge ? [p.badge.replace(/!$/, "") + "."] : [])];
    return `
    ${photo(p.img, dir, "inset:0", p.pos)}
    <div class="abs" style="inset:0;background:linear-gradient(180deg,rgba(0,0,0,.38) 0%,rgba(0,0,0,0) 30%,rgba(0,0,0,0) 45%,rgba(0,0,0,.72) 100%)"></div>
    <div class="top" style="color:#fff">${b.logo("light", 0.62)}<span class="kick">${strip(p.where || b.where)}</span></div>
    ${mount(b, p.hero || p._alt[0], dir, "right:64px;top:170px;width:290px;height:350px;transform:rotate(5deg)", b.caption)}
    <div class="pill" style="left:64px;top:170px;background:rgba(255,255,255,.92);color:${b.dark};padding:14px 26px;font-size:24px;font-weight:600;align-items:center"><i style="width:12px;height:12px;border-radius:50%;background:#2fbf71;display:inline-block"></i>${b.chip}</div>
    <div class="abs" style="left:64px;bottom:250px">${head(b, lines, 900, 150, "#fff")}</div>
    ${p.what2 ? `<div class="sub" style="left:66px;bottom:196px;color:#fff;font-weight:600;font-size:30px;letter-spacing:1px">${p.what2.replace(/\s*(·\s*)?FOR$/, "").toLowerCase().replace(/^./, (c) => c.toUpperCase())}</div>` : ""}
    ${pricePill(b, p, "right:64px;bottom:250px;transform:rotate(-5deg)")}
    ${foot(b, p, "#fff", true)}`;
  },

  /* peeza: four pizzas as a grid of photos, name and price written on each. */
  menuGrid(b, p, dir) {
    const cells = p.items.map(([img, name, note, price, pos], i) => `
      <div class="ph" style="left:${i % 2 ? 548 : 0}px;top:${i < 2 ? 330 : 830}px;width:532px;height:490px"><img src="${src(img, dir)}" style="object-position:${pos || "50% 50%"}"></div>
      <div class="abs" style="left:${(i % 2 ? 548 : 0) + 34}px;top:${(i < 2 ? 330 : 830) + 340}px;color:#fff;text-shadow:0 2px 16px rgba(0,0,0,.6)">
        <div style="font-size:52px;font-weight:800;letter-spacing:-.04em;line-height:1">${name}</div>
        <div style="font-size:24px;margin-top:6px">${note}</div>
      </div>
      <div class="pill price" style="left:${(i % 2 ? 548 : 0) + 330}px;top:${(i < 2 ? 330 : 830) + 30}px;transform:rotate(-5deg);padding:10px 24px 12px"><b style="font-size:48px">${price}</b></div>`).join("");
    return `
    <div class="abs" style="left:0;right:0;top:320px;bottom:0;background:${b.paper}"></div>
    ${cells}
    ${top(b, p)}
    <div class="abs" style="left:64px;top:130px">${head(b, ["The menu."], 700, 150)}</div>
    <div class="foot" style="bottom:20px"><span class="pill call" style="background:${b.pop};color:${b.onPop || b.dark}">${b.cta} · ${b.phone}</span><span class="where" style="color:#fff">${strip(p.foot || "")}</span></div>`;
  },

  /* kinyozi: a barber's price board — big capitals, dotted leaders, no thumbnails. */
  menuBoard(b, p, dir) {
    const rows = p.items.map(([, name, note, price]) => `
      <div style="padding:40px 0">
        <div style="display:flex;align-items:baseline;gap:18px;font-size:100px;font-weight:800;letter-spacing:-.04em;text-transform:uppercase;line-height:.9">
          <span>${name}</span><span style="flex:1;border-bottom:6px dotted ${b.dark};transform:translateY(-14px)"></span><span style="color:${b.pop}">${price}</span>
        </div>
        <div style="font-size:26px;margin-top:10px;opacity:.7">${note}</div>
      </div>`).join("");
    return `
    ${top(b, p)}
    <div class="abs" style="left:0;right:0;top:140px;height:40px;background:repeating-linear-gradient(-45deg,#E63B2E 0 22px,#fff 22px 44px,#1D4ED8 44px 66px,#fff 66px 88px)"></div>
    <div class="abs" style="left:64px;top:220px;font-size:30px;font-weight:600;letter-spacing:6px;text-transform:uppercase">Price list · KSh</div>
    <div class="abs" style="left:64px;right:64px;top:280px;color:${b.dark}">${rows}</div>
    ${foot(b, p)}`;
  },

  /* Bella: a soft price card — one big photo, the list centred in serif. */
  menuSerif(b, p, dir) {
    const rows = p.items.map(([, name, note, price]) => `
      <div style="display:flex;justify-content:space-between;align-items:baseline;padding:18px 0;border-bottom:1px solid ${b.dark}33">
        <span><span style="font:italic 400 58px/1 'Instrument Serif'">${name}</span><span style="font-size:22px;margin-left:16px;opacity:.7">${note}</span></span>
        <span style="font:400 54px/1 'Instrument Serif'">${price}</span>
      </div>`).join("");
    const [img, , , , pos] = p.items[0];
    return `
    ${photo(img, dir, "left:0;right:0;top:0;height:470px", pos)}
    ${mount(b, p.items[1][0], dir, "right:70px;top:300px;width:250px;height:300px;transform:rotate(5deg)", "", p.items[1][4])}
    <div class="top" style="color:#fff;text-shadow:0 2px 12px rgba(0,0,0,.4)">${b.logo("light", 0.62)}<span class="kick">${strip(p.kicker)}</span></div>
    <div class="abs" style="left:64px;top:500px">${head(b, ["Price list."], 600, 130)}</div>
    <div class="abs" style="left:64px;right:64px;top:660px;color:${b.dark}">${rows}</div>
    ${foot(b, p)}`;
  },

  /* gymm: a raw training flyer. Hard black-and-white photo, huge condensed
     capitals, one red-orange accent, timetable details in mono. Nothing
     tilted, no prints, no tape, no pills. */
  raw(b, p, dir) {
    const A = b.pop;
    const mono = "font-family:'Space Mono';text-transform:uppercase;letter-spacing:1px";
    const lines = p.lines || (p.head ? [p.head] : p.big ? [`${p.big}${p.what}`, strip(p.badge || "")].filter(Boolean) : [p.badgeTop, strip(p.badge)]);
    const longest = Math.max(...lines.map((l) => strip(l).length));
    const size = Math.round(Math.min(230, 960 / (longest * 0.47)));
    const big = `<div style="font:400 ${size}px/.84 Anton;text-transform:uppercase;letter-spacing:-1px;color:#fff">${lines.map((l, i) => (i === lines.length - 1 && lines.length > 1 ? `<span style="color:${A}">${strip(l)}</span>` : strip(l))).join("<br>")}</div>`;
    const bar = `<div class="abs" style="left:56px;right:56px;top:46px;display:flex;justify-content:space-between;align-items:center;color:#fff">${b.logo("light", 0.6)}<span style="${mono};font-size:20px">${strip(p.kicker || p.badgeTop || b.where)} / ${b.hours || ""}</span></div>`;
    const price = p.price ? `<div style="${mono};font-size:22px;color:#fff;margin-top:26px">${p.priceTop ? strip(p.priceTop) + " " : ""}<b style="font:400 92px/1 Anton;color:${A};letter-spacing:0">${p.price}</b> ${p.priceNote && p.priceNote !== "ONLY!" ? strip(p.priceNote) : ""}</div>` : "";
    const foot = `<div class="abs" style="left:56px;right:56px;bottom:44px;border-top:2px solid #fff;padding-top:18px;display:flex;justify-content:space-between;color:#fff;${mono};font-size:22px"><span>${b.cta} — ${b.phone}</span><span>${strip(p.foot || b.where)}</span></div>`;
    const gray = p.colour ? "filter:saturate(1.15) contrast(1.05)" : "filter:grayscale(1) contrast(1.35) brightness(.85)";
    if (p.t === "menu") {
      const rows = p.items.map(([, name, note, price]) => `<div style="display:flex;align-items:baseline;justify-content:space-between;border-top:2px solid #333;padding:22px 0"><span><span style="font:400 76px/1 Anton;text-transform:uppercase;color:#fff">${name}</span><br><span style="${mono};font-size:20px;color:#999">${note}</span></span><span style="font:400 76px/1 Anton;color:${A}">${price}</span></div>`).join("");
      return `<div class="abs" style="inset:0;background:#000"></div>
        <div class="ph" style="left:0;right:0;top:0;height:330px"><img src="${src(p.items[0][0], dir)}" style="object-position:${p.items[0][4] || "50% 30%"};${gray}"></div>
        <div class="abs" style="left:0;right:0;top:130px;height:200px;background:linear-gradient(transparent,#000)"></div>
        ${bar}
        <div class="abs" style="left:56px;top:250px;font:400 150px/.84 Anton;color:#fff;text-transform:uppercase">Prices<span style="color:${A}">.</span></div>
        <div class="abs" style="left:56px;right:56px;top:420px">${rows}</div>${foot}`;
    }
    if (p.t === "collage") {
      const cells = p.imgs.map(([f, pos], i) => `<div class="ph" style="left:${i % 2 ? 543 : 0}px;top:${i < 2 ? 0 : 413}px;width:537px;height:410px"><img src="${src(f, dir)}" style="object-position:${pos || "50% 50%"};${gray}"></div>`).join("");
      return `<div class="abs" style="inset:0;background:#000"></div>${cells}
        <div class="abs" style="left:0;right:0;top:600px;height:230px;background:linear-gradient(transparent,#000)"></div>${bar}
        <div class="abs" style="left:56px;bottom:200px">${big}<div style="${mono};font-size:24px;color:#fff;margin-top:22px">${strip(p.badgeNote || "")}</div></div>${foot}`;
    }
    const main = [p.img, p.hero, p.side, ...(p._alt || []).slice().reverse()].find((f) => f && !f.endsWith(".png")) || p.img || p.hero;
    return `<div class="abs" style="inset:0;background:#000"></div>
      <div class="ph" style="inset:0"><img src="${src(main, dir)}" style="object-position:${p.pos || "50% 35%"};${gray}"></div>
      <div class="abs" style="inset:0;background:linear-gradient(180deg,rgba(0,0,0,.55) 0%,rgba(0,0,0,0) 22%,rgba(0,0,0,0) 38%,rgba(0,0,0,.92) 78%)"></div>
      ${bar}
      <div class="abs" style="left:56px;right:56px;bottom:150px">${big}${p.sub || p.what2 ? `<div style="${mono};font-size:22px;color:#ccc;margin-top:22px;max-width:760px">${strip(p.sub || p.what2)}</div>` : ""}${price}</div>
      ${foot}`;
  },

  /* The menu: square photos, names in heavy type, prices on the right, written on the paper. */
  menu(b, p, dir) {
    const rows = p.items.map(([img, name, note, price, pos], i) => `
      <div style="display:flex;align-items:center;gap:30px;padding:22px 0;border-top:2px solid ${b.dark}">
        <div class="ph" style="position:relative;width:150px;height:150px;flex:none;transform:rotate(${i % 2 ? 3 : -3}deg);box-shadow:0 10px 22px rgba(0,0,0,.2)"><img src="${src(img, dir)}" style="object-position:${pos || "50% 50%"}"></div>
        <div style="flex:1;min-width:0"><div style="font-size:52px;font-weight:800;letter-spacing:-.04em;line-height:1">${name}</div><div style="font-size:26px;margin-top:8px;opacity:.75">${note}</div></div>
        <div style="font-size:60px;font-weight:800;letter-spacing:-.04em">${price}</div>
      </div>`).join("");
    return `
    ${top(b, p)}
    <div class="abs" style="left:64px;top:140px">${head(b, ((w) => [w.slice(0, -1).join(" "), w[w.length - 1].toLowerCase() + "."])(strip(p.head).split(" ")), 700, 150)}</div>
    ${note(b.menuNote, `right:80px;top:200px;color:${b.accentInk || b.dark};transform:rotate(-5deg)`, false, b)}
    <div class="abs" style="left:64px;right:64px;top:440px;color:${b.dark}">${rows}</div>
    ${foot(b, p)}`;
  },

  /* Pop-coloured page, one product big, a tape strip and the price. */
  pop(b, p, dir) {
    const main = p.hero || p.img;
    return `
    <div class="abs" style="inset:0;background:${b.pop}"></div>
    ${top(b, p, b.onPop || b.dark, "dark")}
    <div class="abs" style="left:64px;top:150px">${head(b, p.lines, 920, 180, b.onPop || b.dark)}</div>
    ${isCut(main)
      ? photo(main, dir, p.heroStyle || "left:300px;top:480px;width:480px;height:640px")
      : `${photo(main, dir, "left:200px;top:520px;width:560px;height:560px;transform:rotate(-3deg);box-shadow:0 26px 50px rgba(0,0,0,.25)", p.pos)}${mount(b, p._alt[0], dir, "right:60px;top:700px;width:270px;height:330px;transform:rotate(7deg)", b.caption)}`}
    ${p.price ? `<div class="pill price" style="left:64px;top:900px;background:${b.paper};color:${b.dark};transform:rotate(-5deg)">${p.priceTop ? `<small>${p.priceTop.toLowerCase()}</small>` : ""}<b>${p.price}</b>${p.priceNote ? `<small>${p.priceNote.toLowerCase()}</small>` : ""}</div>` : ""}
    ${tape(b, b.tape, `top:1110px;transform:rotate(2deg);background:${b.onPop || b.dark};color:${b.pop}`)}
    <div class="foot" style="color:${b.onPop || b.dark}"><span class="pill call" style="background:${b.onPop || b.dark};color:${b.pop}">${b.phone}</span><span class="where">${strip(p.foot || b.where)}</span></div>`;
  },

  /* Four prints pinned overlapping, the offer written big underneath. */
  wall(b, p, dir) {
    const spots = [
      "left:40px;top:150px;width:470px;height:420px;transform:rotate(-4deg)",
      "left:470px;top:120px;width:540px;height:440px;transform:rotate(3deg)",
      "left:90px;top:520px;width:430px;height:380px;transform:rotate(2deg)",
      "left:500px;top:530px;width:500px;height:400px;transform:rotate(-3deg)",
    ];
    const prints = p.imgs.map(([f, pos], i) => mount(b, f, dir, spots[i], i === 3 ? b.caption : "", pos)).join("");
    return `
    ${top(b, p)}
    ${prints}
    ${tape(b, p.badgeTop, "top:500px;transform:rotate(-4deg)")}
    <div class="abs" style="left:64px;top:980px">${head(b, [strip(p.badge).replace(/\.$/, "") + "."], 940, 170)}</div>
    ${p.badgeNote ? `<div class="sub" style="left:66px;top:1150px;font-size:32px;color:${b.dark}">${p.badgeNote}</div>` : ""}
    <div class="foot" style="color:${b.dark}"><span></span><span class="pill call" style="background:${b.dark};color:${b.paper}">${b.phone}</span></div>`;
  },
};

/* Old layout names → new ones. */
const MAP = { stack: "lead", hero: "pop", bogo: "print", split: "print", frame: "print", photo: "bleed", menu: "menu", collage: "wall" };

export function page(b, p, dir) {
  return `<!doctype html><html><head><meta charset="utf-8">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?${FONTS}${b.fonts ? "&" + b.fonts : ""}&display=block">
  <style>${base(b)}</style></head>
  <body>${T[b.raw || p.raw ? "raw" : p.t === "menu" && b.menu ? b.menu : MAP[p.t]](b, p, dir)}<div class="mark" style="color:${p.t === "photo" ? "#fff" : b.dark}">tessy</div></body></html>`;
}
