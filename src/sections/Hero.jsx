import { Link } from "react-router-dom";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { EASE, stagger } from "../lib/motion";
import { useFinePointer, usePrefersReducedMotion, useScrollToSection } from "../lib/hooks";
import { BRAND, MESSAGES, waLink } from "../data/site";
import { ArrowIcon, LogoMark } from "../components/icons";

const HEADLINE = ["Building digital", "experiences that", "move businesses"];

/** Entrance order: mark, eyebrow, headline, copy, buttons, furniture. */
const T = {
  mark: 0.08,
  eyebrow: 0.2,
  headline: 0.3,
  lede: 0.64,
  cta: 0.74,
  status: 0.82,
  foot: 0.9,
};

export default function Hero() {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const parallax = fine && !reduced;
  const scrollToSection = useScrollToSection();

  // Pointer position drives both the ambient glow and the mark's tilt.
  const px = useMotionValue(62);
  const py = useMotionValue(40);
  const glowX = useSpring(px, { stiffness: 90, damping: 22 });
  const glowY = useSpring(py, { stiffness: 90, damping: 22 });
  const background = useMotionTemplate`radial-gradient(620px circle at ${glowX}% ${glowY}%, rgba(37, 99, 235, 0.10), transparent 62%)`;

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const drift = useMotionValue(0);
  const rotX = useSpring(tiltX, { stiffness: 120, damping: 18, mass: 0.6 });
  const rotY = useSpring(tiltY, { stiffness: 120, damping: 18, mass: 0.6 });
  const driftY = useSpring(drift, { stiffness: 90, damping: 20 });

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width;
    const ny = (event.clientY - rect.top) / rect.height;
    px.set(nx * 100);
    py.set(ny * 100);
    if (!parallax) return;
    tiltY.set((nx - 0.5) * 16);
    tiltX.set((0.5 - ny) * 12);
    drift.set((ny - 0.5) * -10);
  };

  const handleLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    drift.set(0);
  };

  const exploreWork = (event) => {
    if (scrollToSection("work")) event.preventDefault();
  };

  return (
    <section
      id="home"
      className="hero"
      aria-labelledby="hero-title"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <motion.div className="hero__glow" style={{ background }} aria-hidden="true" />
      <div className="hero__grid-lines" aria-hidden="true" />

      <div className="container hero__inner">
        <div>
          <motion.span
            className="mono eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: T.eyebrow }}
          >
            Eden / Digital Studio
          </motion.span>

          <motion.h1
            className="hero__title"
            id="hero-title"
            initial="hidden"
            animate="visible"
            variants={stagger(0.075, T.headline)}
          >
            {HEADLINE.map((line) => (
              <span className="line" key={line}>
                <motion.span
                  variants={{
                    hidden: { y: "110%" },
                    visible: { y: "0%", transition: { duration: 0.85, ease: EASE } },
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="line">
              <motion.span
                variants={{
                  hidden: { y: "110%" },
                  visible: { y: "0%", transition: { duration: 0.85, ease: EASE } },
                }}
              >
                forward<span className="accent">.</span>
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            className="hero__lede"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: T.lede }}
          >
            I design and build <strong>fast, modern websites</strong> and digital
            products for ambitious businesses — restaurants, cafés, shops and
            growing local brands.
          </motion.p>

          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: T.cta }}
          >
            <Link to="/work" className="btn btn--primary" onClick={exploreWork} data-cursor="link">
              Explore work <ArrowIcon />
            </Link>
            <a
              className="btn btn--ghost"
              href={waLink(MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
            >
              Start a project <ArrowIcon />
            </a>
          </motion.div>

          <motion.div
            className="hero__status"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: T.status }}
          >
            <span className="status">
              <span className="status__dot" />
              {BRAND.availability}
            </span>
          </motion.div>
        </div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: T.mark }}
        >
          <motion.div
            className="hero__frame"
            style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1100 }}
            aria-hidden="true"
          >
            <span className="hero__frame-label hero__frame-label--top">Eden / 01</span>
            <span className="hero__frame-label hero__frame-label--top hero__frame-label--right">
              Digital products
            </span>
            <motion.div style={{ y: driftY }}>
              <LogoMark size={168} className="hero__mark" />
            </motion.div>
            <span className="hero__frame-label hero__frame-label--bottom">
              {BRAND.location}
            </span>
            <span className="hero__frame-label hero__frame-label--bottom hero__frame-label--right">
              Independent studio
            </span>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="container hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay: T.foot }}
      >
        <span className="hero__scroll-hint mono">
          <span className="hero__scroll-line" />
          Scroll to selected work
        </span>
        <span className="mono">Nairobi · Nakuru</span>
      </motion.div>
    </section>
  );
}
