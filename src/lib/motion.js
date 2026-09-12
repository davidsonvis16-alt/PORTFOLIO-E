/* Shared motion vocabulary. One easing curve and one stagger helper, so every
   entrance on the site feels like it came from the same place. */

export const EASE = [0.16, 1, 0.3, 1];

/** Parent that staggers its children in. */
export const stagger = (gap = 0.07, delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: gap, delayChildren: delay } },
});

/** Viewport config used by every scroll reveal on the site. */
export const viewportOnce = { once: true, amount: 0.25, margin: "0px 0px -8% 0px" };
