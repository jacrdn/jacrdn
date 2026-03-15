/**
 * Central GSAP configuration.
 * Import gsap and plugins from here — never directly from "gsap" —
 * so registration only happens once and tree-shaking is consistent.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

// ─── Custom eases ────────────────────────────────────────────────
// Fluid: smooth deceleration (cubic-bezier via function)
gsap.registerEase("fluid", (t: number) => {
  // approximates cubic-bezier(0.25, 0.46, 0.45, 0.94)
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
});

// Snap: overshoot + settle
gsap.registerEase("snap", (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
});

// ─── Default tweens ──────────────────────────────────────────────
gsap.defaults({
  ease: "fluid",
  duration: 0.6,
});

export { gsap, ScrollTrigger, TextPlugin };
