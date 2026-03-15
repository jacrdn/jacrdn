"use client";

import { useState, useEffect } from "react";

/**
 * Resolves true only after:
 *   1. All fonts are painted (document.fonts.ready)
 *   2. A small buffer for layout to settle
 *
 * Pass the returned boolean as a gate before running any entrance animation
 * so GSAP never fires against fallback fonts or a partially-loaded page.
 */
export function usePageReady(bufferMs = 120): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      // Wait for every @font-face to finish loading
      await document.fonts.ready;
      // Small buffer so layout reflow from font swap settles
      setTimeout(() => {
        if (!cancelled) setReady(true);
      }, bufferMs);
    }

    if (document.readyState === "complete") {
      init();
    } else {
      window.addEventListener("load", init, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", init);
    };
  }, [bufferMs]);

  return ready;
}
