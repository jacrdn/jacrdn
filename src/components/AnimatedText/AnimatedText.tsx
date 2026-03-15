"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePageReady } from "@/lib/usePageReady";
import styles from "./AnimatedText.module.css";

type AnimationMode =
  | "fadeUp"       // chars slide up on entrance
  | "glitch"       // stepped/jagged glitch reveal
  | "typewriter";  // cursor-style character reveal

interface AnimatedTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  mode?: AnimationMode;
  delay?: number;
  className?: string;
}

export default function AnimatedText({
  text,
  as: Tag = "p",
  mode = "fadeUp",
  delay = 0,
  className = "",
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const ready = usePageReady();

  useEffect(() => {
    // Do nothing until fonts are loaded and layout has settled
    if (!ready) return;

    const el = containerRef.current;
    if (!el) return;

    // Split text into individual char spans
    const chars = text.split("").map((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.display = "inline-block";
      return span;
    });

    el.innerHTML = "";
    chars.forEach((c) => el.appendChild(c));

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
