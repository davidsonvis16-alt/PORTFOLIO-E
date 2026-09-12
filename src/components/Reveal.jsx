import { motion } from "framer-motion";
import { EASE, stagger, viewportOnce } from "../lib/motion";

/**
 * Scroll reveal. One rise-and-fade, used everywhere, so the whole site
 * enters the same way. Honours reduced motion via framer-motion's own
 * reduced-motion handling plus the global CSS override.
 */
export function Reveal({
  as = "div",
  delay = 0,
  y = 18,
  duration = 0.65,
  className,
  children,
  ...rest
}) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Parent that staggers direct <Reveal.Item> children in on scroll. */
export function RevealGroup({ as = "div", gap = 0.08, delay = 0, className, children, ...rest }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={stagger(gap, delay)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({ as = "div", y = 18, className, children, ...rest }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * A headline revealed line by line from behind its own mask.
 * `lines` is an array of strings or nodes; the mask is pure CSS overflow.
 */
export function MaskedLines({ lines, delay = 0, gap = 0.075, className }) {
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={stagger(gap, delay)}
      style={{ display: "block" }}
    >
      {lines.map((line, i) => (
        <span className="line" key={i}>
          <motion.span
            variants={{
              hidden: { y: "110%" },
              visible: { y: "0%", transition: { duration: 0.8, ease: EASE } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
