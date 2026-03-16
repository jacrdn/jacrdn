"use client";
import { useEffect, useRef } from "react";
import styles from "./HeaderWord.module.css";

const WORDS = ["agents", "health", "product", "safety"];

export default function HeaderWord() {
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const scroller = document.querySelector<HTMLElement>("main");
    if (!scroller) return;

    const ids = ["hero", "about", "work", "contact"];

    const update = () => {
      const snaps = ids.map((id) => document.getElementById(id)?.offsetTop ?? 0);
      const st = scroller.scrollTop;

      // Walk from highest segment down — first match wins
      for (let i = WORDS.length - 2; i >= 0; i--) {
        if (st >= snaps[i]) {
          const segP = Math.min(1, (st - snaps[i]) / (snaps[i + 1] - snaps[i]));
          WORDS.forEach((_, j) => {
            const span = spansRef.current[j];
            if (!span) return;
            let y: number;
            if (j === i) y = -segP * 100;
            else if (j === i + 1) y = (1 - segP) * 100;
            else y = j < i ? -100 : 100;
            span.style.transform = `translateY(${y}%)`;
          });
          return;
        }
      }
    };

    scroller.addEventListener("scroll", update, { passive: true });
    update();
    return () => scroller.removeEventListener("scroll", update);
  }, []);

  return (
    <div className={styles.root}>
      {/* Invisible sizer — establishes the container width from the longest word */}
      <span className={styles.sizer} aria-hidden>product</span>
      {WORDS.map((word, i) => (
        <span
          key={word}
          ref={(el) => {
            spansRef.current[i] = el;
          }}
          className={styles.word}
          data-inverted={String(i % 2 === 1)}
        >
          {word}
        </span>
      ))}
    </div>
  );
}
