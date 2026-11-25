import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CASE_STUDIES, OTHER_BUILDS, PACKAGES, STYLES, ksh, mailLink } from "../data";
import { useCart } from "../cart";
import { Icon, PayMethods, BlockText } from "../ui";
import { Link } from "react-router-dom";

const GROUPS = [...new Set(PACKAGES.map((p) => p.group))];
const TONES = { Websites: "t-blue", "Platforms & apps": "t-green", Ads: "t-tomato" };
const DEADLINES = ["As soon as possible", "Within 2 weeks", "Within a month", "Flexible"];
const BUILDS = [...CASE_STUDIES.map((s) => s.client), ...OTHER_BUILDS.filter((b) => b.demo?.startsWith("http")).map((b) => b.title)];
const MAX_FILES = 3;
const MAX_FILE_BYTES = 1.5 * 1024 * 1024;

const priceLabel = (p) => (p.from == null ? "Quoted" : `from ${ksh(p.from)}${p.unit ? ` ${p.unit}` : ""}`);

/* The plain-text order, for the email link and the email's text part. */
function summary(cart, f) {
  const lines = [
    `New order from ${f.name || "—"} (${f.business || "—"})`,
    "",
    "Packages:",
    ...cart.lines.map((l) => `• ${l.pkg.name}${l.qty > 1 ? ` × ${l.qty}` : ""} — ${priceLabel(l.pkg)}`),
    "",
    `Style: ${STYLES.find((s) => s.key === f.style)?.name || "—"}`,
    f.startFrom && `Start from: ${f.startFrom}`,
    `Colours: ${f.logoColours ? "use my logo's colours" : f.colours.join(", ")}`,
    f.references && `References: ${f.references}`,
    f.details && `What it must do: ${f.details}`,
    `Deadline: ${f.deadline}`,
    f.files.length ? `Files attached: ${f.files.map((x) => x.name).join(", ")}` : null,
    "",
    `Phone: ${f.phone}${f.email ? ` · Email: ${f.email}` : ""}`,
  ];
  return lines.filter((l) => l !== null && l !== undefined && l !== false).join("\n");
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve({ name: file.name, type: file.type, data: String(r.result).split(",")[1] });
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function PackagePicker({ cart }) {
  return (
    <div className="pick">
      {GROUPS.map((g) => (
        <section key={g} className="pick-group" aria-labelledby={`g-${g}`}>
          <h2 id={`g-${g}`} className="pick-title">
            {g}
            <span className="dot">.</span>
          </h2>
          <ul className="pick-list">
            {PACKAGES.filter((p) => p.group === g).map((p) => {
              const on = cart.has(p.key);
              return (
                <li key={p.key}>
                  <button type="button" className={`pkg ${on ? `is-on ${TONES[g]}` : ""}`} aria-pressed={on} onClick={() => (on ? cart.remove(p.key) : cart.add(p.key))}>
                    <span className="pkg-ic">
                      <Icon name={p.icon} size={18} />
                    </span>
                    <b>{p.name}</b>
                    <span className="pkg-blurb">{p.blurb}</span>
                    <span className="pkg-foot">
                      <span>{priceLabel(p)}</span>
                      <span className="pkg-add" aria-hidden="true">
                        {on ? "✓ Added" : "+ Add"}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}

function CartBox({ cart }) {
  return (
    <aside className="cart" aria-label="Your order">
      <div className="cart-head">
        <b>Your order</b>
        <span>{cart.count ? `${cart.count} item${cart.count > 1 ? "s" : ""}` : "Empty"}</span>
      </div>
      {cart.lines.length === 0 ? (
        <p className="cart-empty">Pick one or more.</p>
      ) : (
        <ul className="cart-lines">
          {cart.lines.map((l) => (
            <li key={l.key}>
              <span className="cart-name">{l.pkg.name}</span>
              <span className="cart-price">{l.pkg.from == null ? "Quoted" : ksh(l.pkg.from * l.qty)}</span>
              <span className="cart-qty">
                <button type="button" onClick={() => cart.setQty(l.key, l.qty - 1)} aria-label={`One less ${l.pkg.name}`}>
                  −
                </button>
                <span aria-live="polite">{l.qty}</span>
                <button type="button" onClick={() => cart.setQty(l.key, l.qty + 1)} aria-label={`One more ${l.pkg.name}`}>
                  +
                </button>
              </span>
              <button type="button" className="cart-x" onClick={() => cart.remove(l.key)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-total">
        <span>Starting from</span>
        <b>{ksh(cart.total)}</b>
      </div>
      <p className="cart-note">
        {cart.hasQuoted ? "Plus anything quoted. " : ""}A fixed price comes back to you before any work starts. 60% to start, 40% at launch.
      </p>
      <PayMethods />
    </aside>
  );
}

function OrderForm({ cart }) {
  const [f, setF] = useState({
    name: "",
    phone: "",
    email: "",
    business: "",
    style: STYLES[0].key,
    startFrom: "",
    colours: ["#2433ff", "#111111", "#ffffff"],
    logoColours: false,
    references: "",
    details: "",
    deadline: DEADLINES[1],
    files: [],
    company: "",
  });
  const [state, setState] = useState({ status: "idle", error: "" });
  const set = (k) => (e) => setF((prev) => ({ ...prev, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));
  const text = useMemo(() => summary(cart, f), [cart, f]);

  const addFiles = async (e) => {
    const picked = [...e.target.files].filter((x) => x.type.startsWith("image/"));
    e.target.value = "";
    const tooBig = picked.find((x) => x.size > MAX_FILE_BYTES);
    if (tooBig) return setState({ status: "idle", error: `${tooBig.name} is over 1.5 MB. Email big files to us instead.` });
    const read = await Promise.all(picked.slice(0, MAX_FILES - f.files.length).map(readFile));
    setF((prev) => ({ ...prev, files: [...prev.files, ...read].slice(0, MAX_FILES) }));
    setState({ status: "idle", error: "" });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!cart.lines.length) return setState({ status: "idle", error: "Pick at least one package first." });
    setState({ status: "sending", error: "" });
    try {
      const r = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, items: cart.lines.map((l) => ({ key: l.key, qty: l.qty })) }),
      });
      const out = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(out.error || "The order did not go through by email.");
      setState({ status: "sent", error: "" });
    } catch (err) {
      setState({ status: "error", error: err.message });
    }
  };

  if (state.status === "sent") {
    return (
      <div className="form-done t-pink" role="status">
        <b>Order received — thank you.</b>
        <p>Got it. Fixed price within a working day.</p>
        <a href={mailLink(text)} target="_blank" rel="noopener noreferrer" className="act act-solid">
          Email us a copy <span aria-hidden="true">↗</span>
        </a>
        <button type="button" className="act" onClick={() => cart.clear()}>
          Start a new order
        </button>
      </div>
    );
  }

  return (
    <form className="form order-form" onSubmit={submit}>
      <h2 className="pick-title form-wide">
        Tell us about it<span className="dot">.</span>
      </h2>

      <label>
        <span>Business name</span>
        <input value={f.business} onChange={set("business")} required maxLength={80} />
      </label>
      <label>
        <span>Start from one of our builds (optional)</span>
        <select value={f.startFrom} onChange={set("startFrom")}>
          <option value="">No — start fresh</option>
          {BUILDS.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </label>

      <fieldset className="form-wide styles">
        <legend>Pick a look</legend>
        {STYLES.map((s) => (
          <label key={s.key} className={`style ${f.style === s.key ? "is-on" : ""}`}>
            <input type="radio" name="style" value={s.key} checked={f.style === s.key} onChange={set("style")} />
            <span className="style-sw" aria-hidden="true">
              {s.swatch.map((c) => (
                <i key={c} style={{ background: c }} />
              ))}
            </span>
            {s.name}
          </label>
        ))}
      </fieldset>

      <fieldset className="form-wide colours">
        <legend>Your colours</legend>
        {f.colours.map((c, i) => (
          <label key={i} className="colour">
            <input
              type="color"
              value={c}
              disabled={f.logoColours}
              onChange={(e) => setF((prev) => ({ ...prev, colours: prev.colours.map((x, j) => (j === i ? e.target.value : x)) }))}
              aria-label={`Colour ${i + 1}`}
            />
            <span>{c}</span>
          </label>
        ))}
        <label className="check">
          <input type="checkbox" checked={f.logoColours} onChange={set("logoColours")} />
          Use my logo's colours
        </label>
      </fieldset>

      <label className="form-wide">
        <span>References — links to sites, pages or posts you like</span>
        <textarea value={f.references} onChange={set("references")} rows={3} maxLength={1500} placeholder="e.g. instagram.com/… or a site whose look you like, and what you like about it" />
      </label>
      <label className="form-wide">
        <span>What must it do?</span>
        <textarea value={f.details} onChange={set("details")} rows={4} maxLength={3000} placeholder="Pages you need, M-Pesa, bookings, WhatsApp orders, anything you already have…" />
      </label>

      <div className="form-wide files">
        <span className="files-label">Logo or photos (up to 3 images, 1.5 MB each)</span>
        <label className="act files-add">
          + Add images
          <input type="file" accept="image/*" multiple onChange={addFiles} disabled={f.files.length >= MAX_FILES} />
        </label>
        {f.files.map((x, i) => (
          <span key={i} className="file-chip">
            {x.name}
            <button type="button" aria-label={`Remove ${x.name}`} onClick={() => setF((prev) => ({ ...prev, files: prev.files.filter((_, j) => j !== i) }))}>
              ×
            </button>
          </span>
        ))}
      </div>

      <label>
        <span>When do you need it?</span>
        <select value={f.deadline} onChange={set("deadline")}>
          {DEADLINES.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </label>
      <label>
        <span>Your name</span>
        <input value={f.name} onChange={set("name")} required maxLength={80} autoComplete="name" />
      </label>
      <label>
        <span>Phone</span>
        <input value={f.phone} onChange={set("phone")} required maxLength={20} inputMode="tel" autoComplete="tel" placeholder="07… or +254…" />
      </label>
      <label>
        <span>Email (optional)</span>
        <input type="email" value={f.email} onChange={set("email")} maxLength={120} autoComplete="email" />
      </label>
      <label className="form-trap" aria-hidden="true">
        Company
        <input value={f.company} onChange={set("company")} tabIndex={-1} autoComplete="off" />
      </label>

      <div className="form-end">
        <button type="submit" className="act act-solid" disabled={state.status === "sending"}>
          {state.status === "sending" ? "Sending…" : "Send my order"} <span aria-hidden="true">→</span>
        </button>
        <a href={mailLink(text)} target="_blank" rel="noopener noreferrer" className="act act-quiet">
          Send by email instead <span aria-hidden="true">↗</span>
        </a>
        {state.error && (
          <p className="form-error" role="alert">
            {state.error} You can still send it by email.
          </p>
        )}
      </div>
    </form>
  );
}

export default function Order() {
  const cart = useCart();
  const [params] = useSearchParams();

  // Links from the menu (/order?p=lms) arrive with that package in the cart.
  const preset = params.get("p");
  useEffect(() => {
    if (preset && PACKAGES.some((p) => p.key === preset)) cart.add(preset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset]);

  return (
    <>
      <section className="wrap page-top has-art" aria-labelledby="order-title">
        <span className="idx rise">Fixed price before any work starts</span>
        <h1 id="order-title" className="page-title rise">
          <BlockText text="Order" />
        </h1>
        <img className="page-art page-photo rise" src="/work/pages/order.jpg" alt="A designer working late in a studio" width="900" height="900" decoding="async" />
        <p className="page-sub rise">Pick, send, get a fixed price.</p>
      </section>
      <section className="wrap order">
        <div className="order-main">
          <PackagePicker cart={cart} />
          <OrderForm cart={cart} />
        </div>
        <CartBox cart={cart} />
      </section>
    </>
  );
}
