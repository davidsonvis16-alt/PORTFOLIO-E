import { motion } from "framer-motion";
import { BRAND, CONTACT, MESSAGES, waLink } from "../data/site";
import { EASE, stagger, viewportOnce } from "../lib/motion";
import { Reveal } from "../components/Reveal";
import { ArrowIcon, InstagramIcon, LogoMark, WhatsAppIcon } from "../components/icons";

const LINES = ["Your business", "deserves a better", "digital presence"];

/* `level` is 1 on /contact, where this block is the page's main content. */
export default function FinalCTA({ level = 2 }) {
  const Heading = level === 1 ? motion.h1 : motion.h2;

  return (
    <section id="contact" className="cta" aria-labelledby="cta-title">
      <LogoMark size={560} tone="light" className="cta__mark" />

      <div className="container cta__inner">
        <Reveal as="span" className="mono mono--dark eyebrow" y={10}>
          Start a project
        </Reveal>

        <Heading
          className="cta__title"
          id="cta-title"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger(0.08, 0.1)}
          style={{ marginTop: 26 }}
        >
          {LINES.map((line, i) => (
            <span className="line" key={line}>
              <motion.span
                variants={{
                  hidden: { y: "110%" },
                  visible: { y: "0%", transition: { duration: 0.85, ease: EASE } },
                }}
              >
                {line}
                {i === LINES.length - 1 && <span className="accent">.</span>}
              </motion.span>
            </span>
          ))}
        </Heading>

        <Reveal as="p" className="cta__sub" delay={0.16}>
          Let&rsquo;s build it. Tell me about the business and what it needs to do
          online — you will hear back within a day.
        </Reveal>

        <Reveal className="cta__actions" delay={0.24}>
          <a
            className="btn btn--light"
            href={waLink(MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
          >
            <WhatsAppIcon size={16} /> Start a project <ArrowIcon />
          </a>
          <a
            className="btn btn--onDark"
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
          >
            <InstagramIcon size={16} /> Instagram
          </a>
          <a className="btn btn--onDark" href={`mailto:${CONTACT.email}`} data-cursor="link">
            Email
          </a>
        </Reveal>

        <Reveal delay={0.3} style={{ marginTop: 34 }}>
          <span className="status status--dark">
            <span className="status__dot" />
            {BRAND.availability} · {BRAND.location}
          </span>
        </Reveal>
      </div>
    </section>
  );
}
