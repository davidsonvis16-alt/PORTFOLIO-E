import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { ArrowIcon, LogoMark } from "../components/icons";
import { useSeo } from "../lib/seo";

export default function NotFound() {
  useSeo({
    title: "Page not found",
    description: "That page does not exist. Head back to the Eden home page.",
  });

  return (
    <section className="container nf">
      <Reveal style={{ display: "grid", placeItems: "center", gap: 20 }}>
        <LogoMark size={44} />
        <span className="mono">Error / 404</span>
        <h1 className="nf__code">Not found</h1>
        <p style={{ color: "var(--muted)", maxWidth: "42ch" }}>
          That page has moved or never existed. The work, the process and the
          pricing are all still where you left them.
        </p>
        <Link to="/" className="btn btn--primary" data-cursor="link">
          Back to home <ArrowIcon />
        </Link>
      </Reveal>
    </section>
  );
}
