"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePageReady } from "@/lib/usePageReady";
import styles from "./AnimatedText.module.css";

type AnimationMode =
  | "fadeUp"       // chars slide up on entrance
  | "glitch"       // stepped/jagged glitch reveal
  | "typewriter"   // cursor-style character reveal
  | "scrambleIn";  // chars appear in random order

interface AnimatedTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  mode?: AnimationMode;
  delay?: number;
  className?: string;
  /**
   * Per-character letter-spacing overrides, keyed by index into the chars
   * array (non-space characters only, in source order). Applied to the span
   * at build time so kerning is present throughout the animation.
   * Example: { 8: "-0.06em" } tightens the gap after the 9th non-space char.
   */
  charKerning?: Record<number, string>;
}

export default function AnimatedText({
  text,
  as: Tag = "p",
  mode = "fadeUp",
  delay = 0,
  className = "",
  charKerning,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const ready = usePageReady();

  useEffect(() => {
    // Do nothing until fonts are loaded and layout has settled
    if (!ready) return;

    const el = containerRef.current;
    if (!el) return;

    // Split into words, wrap each word in an inline-block container so the
    // browser only breaks at word boundaries — never mid-word.
    const chars: HTMLSpanElement[] = [];

    el.innerHTML = "";
    // fadeUp needs inline-block for y-transforms; all other modes only animate
    // opacity so inline avoids the sub-pixel gaps and line-height inflation
    // that inline-block causes when applied char-by-char.
    const needsBlock = mode === "fadeUp";

    const lines = text.split("\n");
    lines.forEach((line, li) => {
      const words = line.split(" ");
      words.forEach((word, wi) => {
        const wordSpan = document.createElement("span");
        wordSpan.style.display = needsBlock ? "inline-block" : "inline";
        if (needsBlock) wordSpan.style.whiteSpace = "nowrap";

        word.split("").forEach((char) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.style.display = needsBlock ? "inline-block" : "inline";
          const idx = chars.length;
          if (charKerning?.[idx]) {
            span.style.marginRight = charKerning[idx];
          }
          wordSpan.appendChild(span);
          chars.push(span);
        });

        el.appendChild(wordSpan);

        // Space between words (except after last) — use a raw text node so
        // white-space: nowrap on the word span doesn't suppress the break opportunity
        if (wi < words.length - 1) {
          el.appendChild(document.createTextNode(" "));
        }
      });

      // Hard line break between lines (except after last)
      if (li < lines.length - 1) {
        el.appendChild(document.createElement("br"));
      }
    });

    let tweens: gsap.core.Tween[] = [];

    if (mode === "fadeUp") {
      gsap.set(chars, { opacity: 0, y: 40 });
      tweens = [gsap.to(chars, {
        opacity: 1,
        y: 0,
        stagger: 0.03,
        duration: 0.5,
        ease: "fluid",
        delay,
        onComplete() {
          if (el) el.innerHTML = text;
        },
      })];
    } else if (mode === "glitch") {
      const glitchChars = "!@#$%^&*[]{}|<>";
      // Animate each char independently so we can track per-char progress
      // and stop scrambling once that specific char has settled
      const tweens = chars.map((span, i) => {
        const original = text[i] === " " ? "\u00A0" : text[i];
        gsap.set(span, { opacity: 0 });
        return gsap.to(span, {
          opacity: 1,
          duration: 0.3,
          ease: "steps(6, end)",
          delay: delay + i * 0.04,
          onUpdate(this: gsap.core.Tween) {
            // Only scramble while this char is mid-animation (progress < 0.8)
            if (this.progress() < 0.8 && Math.random() > 0.5) {
              span.textContent =
                glitchChars[Math.floor(Math.random() * glitchChars.length)];
            } else {
              span.textContent = original;
            }
          },
          onComplete() {
            // Lock in the real character once done
            span.textContent = original;
          },
        });
      });
      // tweens already assigned above
    } else if (mode === "typewriter") {
      gsap.set(chars, { opacity: 0 });
      tweens = [gsap.to(chars, {
        opacity: 1,
        stagger: 0.06,
        duration: 0.001,
        ease: "none",
        delay,
      })];
    } else if (mode === "scrambleIn") {
      // Shuffle a copy of the chars array so each appears in random order
      const shuffled = [...chars].sort(() => Math.random() - 0.5);
      gsap.set(chars, { opacity: 0 });
      tweens = [gsap.to(shuffled, {
        opacity: 1,
        stagger: 0.08,
        duration: 0.01,
        ease: "none",
        delay,
      })];
    }

    return () => {
      tweens.forEach((t) => t.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, text, mode, delay]);

  return (
    <Tag ref={containerRef as React.RefObject<never>} className={`${styles.root} ${className}`}>
      {text}
    </Tag>
  );
}
