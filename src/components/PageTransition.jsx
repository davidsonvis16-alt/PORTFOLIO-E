import { motion } from "framer-motion";
import { EASE } from "../lib/motion";
import { LogoMark } from "./icons";

export const COVER_MS = 260;

/**
 * Full-screen Eden mark that covers the outgoing page, swaps the route
 * underneath, then wipes away. Deliberately short — around 600ms end to end.
 */
export default function PageTransition() {
  return (
    <motion.div
      className="transition"
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      exit={{ y: "-100%" }}
      transition={{ duration: COVER_MS / 1000, ease: EASE }}
    >
      <motion.div
        className="transition__mark"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.26, ease: EASE, delay: 0.04 }}
      >
        <LogoMark size={48} />
        <motion.span
          className="mono mono--accent"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: EASE, delay: 0.1 }}
        >
          Eden / Digital Studio
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
