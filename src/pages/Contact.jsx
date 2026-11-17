import { EMAIL, waLink } from "../data";
import { Icon, PageTop } from "../ui";

const WAYS = [
  { k: "Fastest — usually a reply within a couple of hours", name: "WhatsApp", value: "+254 142 614 743", href: waLink("Hi Tess, I'd like to talk about a project.") },
  { k: "For quotes, documents and anything long", name: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
];

export default function Contact() {
  return (
    <>
      <PageTop title="Contact" sub="Tell us what you need built. WhatsApp is fastest, during working hours, East Africa time — wherever you are in Kenya." />
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
