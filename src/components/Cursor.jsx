import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { EASE } from "../lib/motion";
import { useFinePointer, usePrefersReducedMotion } from "../lib/hooks";
import { ArrowIcon } from "./icons";

/**
 * Custom cursor — a small dot that tracks exactly, and a ring that lags
 * behind it. Elements opt in with data-cursor="link" | "project" | "drag"
 * and an optional data-cursor-label.
 *
 * Only mounts for fine pointers (mouse/trackpad) and never when the visitor
 * has asked for reduced motion. Touch devices keep the native behaviour.
 */
export default function Cursor() {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 34, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 380, damping: 34, mass: 0.5 });

  const [variant, setVariant] = useState("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      // React bails out when the next state is identical, so these are free
      setVisible(true);

      const target = e.target instanceof Element ? e.target.closest("[data-cursor]") : null;
      if (target) {
        setVariant(target.dataset.cursor || "link");
        setLabel(target.dataset.cursorLabel || "");
      } else {
        const interactive =
          e.target instanceof Element
            ? e.target.closest("a, button, input, textarea, select, [role='button']")
            : null;
        setVariant(interactive ? "link" : "default");
        setLabel("");
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("blur", onLeave);

    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("blur", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const hasLabel = Boolean(label);
  const ring = hasLabel
    ? { width: "auto", height: 34, opacity: visible ? 1 : 0 }
    : {
        width: variant === "link" ? 42 : 26,
        height: variant === "link" ? 42 : 26,
        opacity: visible ? 1 : 0,
      };

  return (
    <>
      <motion.div className="cursor-layer" style={{ x, y }} aria-hidden="true">
        <motion.div
          className="cursor-dot"
          animate={{ opacity: visible && !hasLabel ? 1 : 0, scale: pressed ? 0.6 : 1 }}
          transition={{ duration: 0.18, ease: EASE }}
        />
      </motion.div>

      <motion.div className="cursor-layer" style={{ x: ringX, y: ringY }} aria-hidden="true">
        <motion.div
          className={`cursor-ring${hasLabel ? " cursor-ring--label" : ""}`}
          animate={{ ...ring, scale: pressed ? 0.9 : 1 }}
          transition={{ duration: 0.28, ease: EASE }}
        >
          <AnimatePresence mode="wait">
            {hasLabel && (
              <motion.span
                key={label}
                className="cursor-ring__label"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.16 }}
              >
                {label}
                <ArrowIcon size={12} className="" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}
