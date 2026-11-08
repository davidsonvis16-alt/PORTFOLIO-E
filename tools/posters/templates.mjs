/* Poster layouts, 1080×1350. Each takes the brand (colours, fonts, logo, phone)
   and the poster's own props, and returns the inside of <body>.
   Images: p.img / p.hero are file names in photos/ (jpg) or cut/ (png cut-outs). */

const star = (n, r1, r2, cx = 100, cy = 100) =>
  Array.from({ length: n * 2 }, (_, i) => {
    const r = i % 2 ? r2 : r1, a = (Math.PI * i) / n - Math.PI / 2;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");

const zig = (y, h, teeth = 18) =>
  `polygon(0 0, 100% 0, 100% ${y}px, ` +
  Array.from({ length: teeth + 1 }, (_, i) => `${100 - (100 / teeth) * i}% ${y + (i % 2 ? h : 0)}px`).join(", ") +
  `, 0 ${y}px)`;

export const src = (f, dir) => `${dir}/${f.endsWith(".png") ? "cut" : "photos"}/${f}`;

/* Hero image: a cut-out sits free; a photo gets a shape. */
function hero(p, dir, style, shape = p.shape) {
  const f = src(p.hero, dir);
  if (p.hero.endsWith(".png")) return `<img class="cut" src="${f}" style="${style}">`;
  const cls = shape || "card";
  return `<div class="ph ${cls}" style="${style}"><img src="${f}" style="object-position:${p.pos || "50% 50%"}"></div>`;
}

const burst = (b, p, style) => p.price
  ? `<div class="burst" style="${style}"><svg viewBox="0 0 200 200"><polygon points="${star(16, 100, 84)}" fill="${p.burstBg || b.accent}"/></svg>
      <div class="bt" style="color:${p.burstInk || b.onAccent}">${p.priceTop ? `<small>${p.priceTop}</small>` : ""}<b>${p.price}</b><small>${p.priceNote || "ONLY!"}</small></div></div>`
  : "";

const tag = (b, text, style = "") => `<span class="tag" style="background:${b.accent};color:${b.onAccent};${style}">${text}</span>`;

export function base(b) {
  return `
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:1080px;height:1350px;overflow:hidden}
  body{position:relative;font-family:${b.body};color:${b.ink};background:${b.paper};-webkit-font-smoothing:antialiased}
  .abs{position:absolute}
  .d{font-family:${b.display};line-height:.86;letter-spacing:${b.track || "0"};text-transform:${b.caps === false ? "none" : "uppercase"}}
  .s{font-family:${b.script}}
  .cut{position:absolute;object-fit:contain;filter:drop-shadow(0 30px 34px rgba(0,0,0,.32))}
  .ph{position:absolute;overflow:hidden}
  .ph img{width:100%;height:100%;object-fit:cover;display:block}
  .ph.circle{border-radius:50%}
  .ph.arch{border-radius:999px 999px 28px 28px}
  .ph.card{border-radius:34px}
  .ph.ring{border-radius:50%;border:14px solid #fff;box-shadow:0 26px 60px rgba(0,0,0,.28)}
  .burst{position:absolute;width:300px;height:300px;transform:rotate(-8deg)}
  .burst svg{position:absolute;inset:0;width:100%;height:100%;filter:drop-shadow(0 10px 18px rgba(0,0,0,.25))}
  .bt{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:${b.display};text-align:center;line-height:.9}
  .bt b{font-size:84px;font-weight:400;letter-spacing:-1px}
  .bt small{font-size:30px;letter-spacing:1px}
  .tag{display:inline-block;padding:10px 22px;font-weight:800;letter-spacing:5px;font-size:26px;text-transform:uppercase}
  .phone{font-family:${b.phoneFont || b.display};letter-spacing:${b.phoneFont ? 0 : 2}px;white-space:nowrap;font-weight:${b.phoneFont ? 800 : 400};font-style:normal}
  .logo{position:absolute}
  .eden{position:absolute;right:34px;bottom:22px;font:600 22px/1 ${b.body};opacity:.55;letter-spacing:.5px}
  `;
}

const T = {
  /* Reference 1: colour block with a torn edge, stacked words, cut-out over the edge, call-to-order foot. */
  stack(b, p, dir) {
    const top = p.cutAt || 860;
    return `
    <div class="abs" style="inset:0;background:${p.bg || b.main};clip-path:${zig(top, 36, 22)}"></div>
    <div class="logo" style="left:0;right:0;top:56px;display:flex;justify-content:center">${b.logo("on", 1)}</div>
    <div class="abs d" style="left:${p.align ? 70 : 0}px;right:0;top:${p.top || 250}px;text-align:${p.align || "center"};color:${p.headInk || b.onMain};font-size:${p.size || 140}px;text-shadow:0 6px 0 rgba(0,0,0,.12)">${p.lines.join("<br>")}</div>
    ${p.sub ? `<div class="abs s" style="left:${p.align ? 74 : 0}px;right:0;top:${(p.top || 250) + p.lines.length * (p.size || 140) * 0.86 + 22}px;text-align:${p.align || "center"};font-size:58px;color:${p.subInk || b.ink}">${p.sub}</div>` : ""}
    ${hero(p, dir, p.heroStyle)}
    ${p.side ? hero({ hero: p.side, pos: p.sidePos, shape: p.sideShape }, dir, p.sideStyle) : ""}
    ${burst(b, p, p.burstStyle || "right:70px;top:640px")}
    <div class="abs" style="left:0;right:0;bottom:70px;text-align:center">
      <div style="font-weight:800;letter-spacing:6px;font-size:30px;color:${b.accent2 || b.accent}">${p.ctaTop || "CALL TO ORDER"}</div>
      <div class="phone" style="font-size:104px;color:${b.ink};line-height:1.05">${b.phone}</div>
      ${tag(b, p.strip || "Free delivery!")}
    </div>`;
  },

  /* Reference 2: giant two-line offer, white arc, two heroes, star price, call + button foot. */
  bogo(b, p, dir) {
    const dots = (x, y) => `<div class="abs" style="left:${x}px;top:${y}px;display:grid;gap:14px">${"<i style='display:block;width:22px;height:22px;border-radius:50%;border:4px solid #fff'></i>".repeat(4)}</div>`;
    return `
    <div class="abs" style="inset:0;background:${p.bg || b.main}"></div>
    <div class="abs" style="left:-420px;right:-420px;top:${p.arcTop || 900}px;height:1400px;border-radius:50%;background:${b.paper}"></div>
    <div class="logo" style="left:52px;top:46px">${b.logo("on", 0.8)}</div>
    ${dots(40, 330)}${dots(1000, 960)}
    <div class="abs d" style="left:96px;right:40px;top:${p.top || 200}px;color:${p.headInk || b.ink2 || b.ink};font-size:${p.size || 200}px">${p.lines.join("<br>")}</div>
    <div class="abs" style="left:104px;top:${(p.top || 200) + p.lines.length * (p.size || 200) * 0.86 + 26}px;font-weight:800;letter-spacing:9px;font-size:30px;color:${p.kickInk || "#fff"}">${p.kicker}</div>
    ${hero(p, dir, p.heroStyle)}
    ${p.side ? hero({ hero: p.side, pos: p.sidePos, shape: p.sideShape }, dir, p.sideStyle) : ""}
    ${burst(b, p, p.burstStyle || "left:30px;top:930px;width:270px;height:270px")}
    ${p.script ? `<div class="abs s" style="right:${p.scriptRight || 90}px;bottom:150px;font-size:96px;color:${b.ink};transform:rotate(-6deg)">${p.script}</div>` : ""}
    <div class="abs" style="left:80px;right:80px;bottom:46px;display:flex;align-items:center;justify-content:space-between">
      <div style="display:flex;align-items:center;gap:18px">
        <span style="width:84px;height:84px;border-radius:50%;background:${b.ink2 || b.ink};display:grid;place-items:center">${phoneIcon("#fff")}</span>
        <span style="line-height:1.1"><span style="font-size:26px">${p.callLine || "Call for delivery:"}</span><br><b class="phone" style="font-size:52px;color:${b.ink2 || b.ink}">${b.phone}</b></span>
      </div>
      <span style="background:${b.ink2 || b.ink};color:#fff;border-radius:60px;padding:22px 52px;font-weight:800;font-size:36px">${p.button || "Order now!"}</span>
    </div>`;
  },

  /* Reference 3: full photo, outlined deal box with one big number, glowing phone, logo low left. */
  photo(b, p, dir) {
    return `
    <div class="ph" style="inset:0"><img src="${src(p.img, dir)}" style="object-position:${p.pos || "50% 50%"}"></div>
    <div class="abs" style="inset:0;background:${p.shade || "linear-gradient(100deg,rgba(0,0,0,.62) 0%,rgba(0,0,0,.25) 46%,rgba(0,0,0,0) 70%)"}"></div>
    <div class="abs" style="left:48px;top:${p.top || 60}px;border:5px solid #fff;border-radius:30px;padding:18px 30px 18px 24px;display:flex;align-items:center;gap:22px;color:#fff;background:rgba(0,0,0,.18);box-shadow:0 0 30px rgba(255,255,255,.35)">
      <span class="d" style="font-size:230px;line-height:.8">${p.big}</span>
      <span style="line-height:1.02">
        <b class="d" style="font-size:78px;display:block">${p.what}</b>
        <span style="font-size:30px;font-weight:600;letter-spacing:1px;display:block;margin-top:6px">${p.what2}</span>
        <span class="d" style="font-size:118px;display:block;color:${p.priceInk || "#fff"}">${p.price}</span>
      </span>
    </div>
    <div class="abs" style="left:${p.tagLeft || 290}px;top:${(p.top || 60) + 300}px">${tag(b, p.badge || "Unbeatable value!", "font-size:24px;letter-spacing:2px;padding:8px 18px")}</div>
    <div class="abs" style="left:52px;top:${(p.top || 60) + 400}px;color:#fff">
      <div style="font-size:40px;letter-spacing:2px">${p.ctaTop || "TO ORDER, CALL"}</div>
      <div class="phone" style="font-size:96px;text-shadow:0 0 26px rgba(255,255,255,.75)">${b.phone}</div>
      <div style="font-size:28px;letter-spacing:2px;font-weight:600">${p.where || b.where}</div>
    </div>
    ${p.hero ? hero(p, dir, p.heroStyle) : ""}
    <div class="logo" style="left:48px;bottom:56px">${b.logo("light", 1)}</div>`;
  },

  /* Photo top, coloured panel underneath with a slanted seam. */
  split(b, p, dir) {
    return `
    <div class="ph" style="left:0;right:0;top:0;height:860px"><img src="${src(p.img, dir)}" style="object-position:${p.pos || "50% 50%"}"></div>
    <div class="abs" style="left:0;right:0;bottom:0;height:620px;background:${p.bg || b.main};clip-path:polygon(0 90px,100% 0,100% 100%,0 100%)"></div>
    <div class="logo" style="left:48px;top:44px;background:${b.paper};border-radius:22px;padding:16px 22px;box-shadow:0 10px 30px rgba(0,0,0,.2)">${b.logo("chip", 0.7)}</div>
    <div class="abs" style="left:64px;right:64px;top:${p.top || 820}px;color:${p.headInk || b.onMain}">
      <div style="font-weight:800;letter-spacing:7px;font-size:28px;color:${p.kickInk || b.accent}">${p.kicker}</div>
      <div class="d" style="font-size:${p.size || 128}px;margin-top:14px">${p.lines.join("<br>")}</div>
      <div style="font-size:34px;margin-top:20px;max-width:640px;line-height:1.3;opacity:.92">${p.sub}</div>
    </div>
    ${burst(b, p, p.burstStyle || "right:56px;top:700px;width:290px;height:290px")}
    <div class="abs" style="left:64px;right:64px;bottom:54px;display:flex;align-items:center;gap:20px;color:${p.headInk || b.onMain}">
      ${phoneIcon(p.headInk || b.onMain)}<b class="phone" style="font-size:54px">${b.phone}</b>
      <span style="margin-left:auto;font-weight:700;font-size:26px;letter-spacing:1px;opacity:.9;text-align:right">${p.foot || b.where}</span>
    </div>`;
  },

  /* Price menu: four rows, each with a round crop. */
  menu(b, p, dir) {
    const rows = p.items.map(([img, name, note, price, pos]) => `
      <div style="display:flex;align-items:center;gap:30px;height:196px">
        <div class="ph circle" style="position:relative;width:170px;height:170px;flex:none;border:8px solid ${b.paper};box-shadow:0 10px 26px rgba(0,0,0,.22)"><img src="${src(img, dir)}" style="object-position:${pos || "50% 50%"}"></div>
        <div style="flex:1;min-width:0">
          <div class="d" style="font-size:62px;line-height:.95">${name}</div>
          <div style="font-size:28px;opacity:.82;margin-top:6px">${note}</div>
        </div>
        <div class="d" style="font-size:72px;color:${p.priceInk || b.accent}">${price}</div>
      </div>`).join("");
    return `
    <div class="abs" style="inset:0;background:${p.bg || b.ink}"></div>
    <div class="abs" style="left:64px;right:64px;top:54px;display:flex;align-items:center;justify-content:space-between;color:${p.ink || "#fff"}">
      ${b.logo(p.logoMode || "light", 0.75)}<span style="font-weight:800;letter-spacing:6px;font-size:26px">${p.kicker}</span>
    </div>
    <div class="abs d" style="left:64px;top:190px;font-size:150px;color:${p.headInk || b.main}">${p.head}</div>
    <div class="abs" style="left:64px;right:64px;top:350px;color:${p.ink || "#fff"}">${rows}</div>
    <div class="abs" style="left:0;right:0;bottom:0;height:150px;background:${p.footBg || b.main};color:${p.footInk || b.onMain};display:flex;align-items:center;justify-content:center;gap:24px">
      ${phoneIcon(p.footInk || b.onMain)}<b class="phone" style="font-size:66px">${b.phone}</b><span style="font-weight:800;font-size:28px;letter-spacing:3px">${p.foot || ""}</span>
    </div>`;
  },

  /* One product, big, on sun rays. */
  hero(b, p, dir) {
    return `
    <div class="abs" style="inset:0;background:repeating-conic-gradient(from 0deg at 50% 56%,${p.ray1 || b.main} 0deg 9deg,${p.ray2 || b.main2} 9deg 18deg)"></div>
    <div class="abs" style="left:50%;top:56%;width:900px;height:900px;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.55),rgba(255,255,255,0) 66%)"></div>
    <div class="logo" style="left:0;right:0;top:48px;display:flex;justify-content:center">${b.logo("on", 0.85)}</div>
    <div class="abs d" style="left:0;right:0;top:${p.top || 190}px;text-align:center;font-size:${p.size || 150}px;color:${p.headInk || b.ink};text-shadow:0 5px 0 rgba(255,255,255,.35)">${p.lines.join("<br>")}</div>
    ${hero(p, dir, p.heroStyle)}
    ${burst(b, p, p.burstStyle || "right:60px;top:560px")}
    <div class="abs" style="left:0;right:0;bottom:0;height:140px;background:${b.ink};color:#fff;display:flex;align-items:center;justify-content:center;gap:28px">
      <span style="font-size:34px;font-weight:700">${p.foot}</span><b class="phone" style="font-size:60px;color:${b.pop || b.main}">${b.phone}</b>
    </div>`;
  },

  /* Photo in a frame with a hard offset shadow, headline in highlight bars. */
  frame(b, p, dir) {
    const bars = p.lines.map((l, i) => `<span class="d" style="display:inline-block;background:${i % 2 ? b.accent : b.ink};color:${i % 2 ? b.onAccent : b.paper};padding:14px 26px 6px;font-size:${p.size || 112}px;margin-top:-4px">${l}</span>`).join("<br>");
    return `
    <div class="abs" style="inset:0;background:${p.bg || b.main}"></div>
    <div class="ph card" style="left:64px;right:64px;top:150px;height:780px;box-shadow:22px 22px 0 ${b.ink};border-radius:30px"><img src="${src(p.img, dir)}" style="object-position:${p.pos || "50% 50%"}"></div>
    <div class="logo" style="left:64px;top:48px">${b.logo("on", 0.7)}</div>
    <div class="abs" style="right:64px;top:66px;font-weight:800;letter-spacing:5px;font-size:26px;color:${b.onMain}">${p.kicker}</div>
    <div class="abs" style="left:40px;top:${p.top || 820}px;line-height:0">${bars}</div>
    ${burst(b, p, p.burstStyle || "right:40px;top:690px;width:270px;height:270px")}
    <div class="abs" style="left:64px;right:64px;bottom:58px;display:flex;align-items:center;gap:20px;color:${b.onMain}">
      <span style="font-size:32px;max-width:520px;line-height:1.25;font-weight:600">${p.sub}</span>
      <span style="margin-left:auto;text-align:right;line-height:1.05"><span style="font-size:24px;letter-spacing:3px;font-weight:800">${p.ctaTop || "CALL / WHATSAPP"}</span><br><b class="phone" style="font-size:54px">${b.phone}</b></span>
    </div>`;
  },

  /* Four photos and a badge in the middle. */
  collage(b, p, dir) {
    const cells = p.imgs.map(([f, pos], i) => `<div class="ph" style="left:${i % 2 ? 546 : 0}px;top:${i < 2 ? 0 : 546}px;width:534px;height:534px"><img src="${src(f, dir)}" style="object-position:${pos || "50% 50%"}"></div>`).join("");
    return `
    <div class="abs" style="inset:0;background:${b.paper}"></div>
    <div class="abs" style="left:0;top:0;width:1080px;height:1080px">${cells}</div>
    <div class="abs" style="left:50%;top:540px;width:430px;height:430px;transform:translate(-50%,-50%) rotate(-6deg);border-radius:50%;background:${p.badgeBg || b.main};border:12px solid ${b.paper};display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:${p.badgeInk || b.onMain};box-shadow:0 20px 50px rgba(0,0,0,.3)">
      <span style="font-weight:800;letter-spacing:5px;font-size:24px">${p.badgeTop}</span>
      <span class="d" style="font-size:${p.badgeSize || 120}px;line-height:.86;margin:10px 0">${p.badge}</span>
      <span style="font-weight:700;font-size:26px;letter-spacing:1px">${p.badgeNote}</span>
    </div>
    <div class="abs" style="left:0;right:0;top:1080px;bottom:0;background:${b.ink};color:#fff;display:flex;align-items:center;padding:0 60px;gap:30px">
      ${b.logo("light", 0.75)}
      <span style="margin-left:auto;text-align:right;line-height:1.1"><span style="font-size:30px;font-weight:600">${p.foot}</span><br><b class="phone" style="font-size:64px;color:${b.pop || b.main}">${b.phone}</b></span>
    </div>`;
  },
};

function phoneIcon(c) {
  return `<svg width="44" height="44" viewBox="0 0 24 24" fill="${c}"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>`;
}

export function page(b, p, dir) {
  return `<!doctype html><html><head><meta charset="utf-8">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?${b.fonts}&display=block">
  <style>${base(b)}${b.css || ""}</style></head>
  <body>${T[p.t](b, p, dir)}<div class="eden" style="color:${p.edenInk || b.edenInk || "#fff"}">eden</div></body></html>`;
}
