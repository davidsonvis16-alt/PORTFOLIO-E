import { motion, useScroll, useSpring } from "framer-motion";

/** Hairline reading-progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.3 });
  return (
    <div className="progress" aria-hidden="true">
      <motion.div className="progress__bar" style={{ scaleX }} />
    </div>
  );
}
