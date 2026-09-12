import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { PROCESS_STEPS } from "../data/site";
import SectionHeader from "../components/SectionHeader";
import { Reveal } from "../components/Reveal";

/**
 * Process timeline. Scroll position drives both the dashed rail's progress
 * and which stage is highlighted — horizontal on desktop, vertical on mobile
 * (the rail is swapped for per-step connectors in CSS).
 */
export default function Process({ standalone = false }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 80%", "end 55%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.4 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.max(0, Math.min(PROCESS_STEPS.length - 1, Math.floor(v * PROCESS_STEPS.length)));
    setActive((current) => (current === next ? current : next));
  });

  return (
    <section
      id="process"
      className={`section process${standalone ? " section--top" : ""}`}
      aria-labelledby="process-title"
    >
      <div className="container">
        <SectionHeader
          level={standalone ? 1 : 2}
          index="06"
          label="Process"
          titleId="process-title"
          title={["How a project", "comes together."]}
          lede="Four stages, no mystery. You know what is happening, what you get at the end of each one, and when."
        />

        <div className="process__track" ref={trackRef}>
          <div className="process__rail" aria-hidden="true">
            <motion.div className="process__rail-fill" style={{ scaleX: fill }} />
          </div>

          <ol className="process__steps">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal
                as="li"
                key={step.n}
                className={`step${i <= active ? " step--active" : ""}`}
                delay={i * 0.06}
                y={16}
              >
                <span className="step__node">{step.n}</span>
                <div className="step__body">
                  <h3 className="step__title">{step.title}</h3>
                  <p className="step__desc">{step.desc}</p>
                  <span className="step__deliver mono mono--accent">{step.deliverable}</span>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
