import { EMAIL, INSTAGRAM, waLink } from "../data";
import { Icon, PageTop } from "../ui";

const WAYS = [
  { k: "Fastest — usually a reply within a couple of hours", name: "WhatsApp", value: "+254 142 614 743", href: waLink("Hi Eden, I'd like to talk about a project.") },
  { k: "Write it out", name: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { k: "See the latest posts", name: "Instagram", value: "@vinn_y.codr", href: INSTAGRAM },
];

export default function Contact() {
  return (
    <>
      <PageTop title="Contact" sub="Tell me what the business needs. WhatsApp is fastest, during working hours, Nairobi time." />
      <section className="wrap block ways">
        {WAYS.map((w) => (
          <a key={w.name} href={w.href} className="way" {...(w.href.startsWith("mailto") ? {} : { target: "_blank", rel: "noopener noreferrer" })}>
            <span className="way-k">{w.k}</span>
            <b>{w.name}</b>
            <span className="way-v">{w.value}</span>
            <Icon name="out" className="way-go" />
          </a>
        ))}
      </section>
    </>
  );
}
