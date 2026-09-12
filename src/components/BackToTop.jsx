import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "../lib/motion";
import { useScrolled } from "../lib/hooks";
import { ArrowUpIcon } from "./icons";

export default function BackToTop() {
  const show = useScrolled(900);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          className="to-top"
          aria-label="Back to top"
          data-cursor="link"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 10 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <ArrowUpIcon />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
