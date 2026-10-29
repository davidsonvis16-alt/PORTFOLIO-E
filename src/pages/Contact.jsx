import { EMAIL, INSTAGRAM, waLink } from "../data";
import { Arrow, PageHead } from "../ui";

const WAYS = [
  { k: "Fastest", name: "WhatsApp", value: "+254 142 614 743", href: waLink("Hi Eden, I'd like to talk about a project."), tone: "blue" },
  { k: "Write it out", name: "Email", value: EMAIL, href: `mailto:${EMAIL}`, tone: "ink" },
  { k: "See the posts", name: "Instagram", value: "@vinn_y.codr", href: INSTAGRAM, tone: "paper" },
];

export default function Contact() {
  return (
    <>
      <PageHead stop="05" kicker="· Contact" title="This is your" accent="stop." sub="Tell me what the business needs. WhatsApp is fastest — usually a reply within a couple of hours in working hours." />
      <section className="sec">
        <div className="wrap ways">
          {WAYS.map((w) => (
            <a key={w.name} href={w.href} className={`way way-${w.tone}`} data-reveal {...(w.href.startsWith("mailto") ? {} : { target: "_blank", rel: "noopener noreferrer" })}>
              <span className="mono">{w.k}</span>
              <b className="d-h2">{w.name}</b>
              <span className="way-v">{w.value}</span>
              <span className="way-go">
                Open <Arrow />
              </span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
