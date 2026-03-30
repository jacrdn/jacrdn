"use client";

import { useEffect, useRef } from "react";
import { workItems } from "@/data/work";
import styles from "./WorkCarousel.module.css";

export default function WorkCarousel() {
  const total = workItems.length;
  const rootRef = useRef<HTMLDivElement>(null);
  const hovered = useRef(false);
  const snapTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const onEnter = () => { hovered.current = true; };
    const onLeave = () => { hovered.current = false; };

    const onWheel = (e: WheelEvent) => {
      if (!hovered.current) return;

      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1;

      // At limits, let page scroll naturally
      if ((atStart && e.deltaY < 0) || (atEnd && e.deltaY > 0)) return;

      e.preventDefault();

      // Disable snap while scrolling — re-enable after gesture ends (triggers snap-to-card)
      el.style.scrollSnapType = "none";
      el.scrollLeft += e.deltaY;

      clearTimeout(snapTimeout.current);
      snapTimeout.current = setTimeout(() => {
        el.style.scrollSnapType = "";
      }, 150);
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("wheel", onWheel);
      clearTimeout(snapTimeout.current);
    };
  }, []);

  return (
    <div className={styles.outer}>
    <div className={styles.root} ref={rootRef}>
      <div className={styles.track}>
        <div className={styles.spacer} aria-hidden />
        {workItems.map((item) => (
          <article key={item.index} className={styles.card}>
            {/* Index + rule */}
            <div className={styles.cardHeader}>
              <span className={styles.index}>{item.index} / {String(total).padStart(2, "0")}</span>
              <span className={styles.rule} />
            </div>

            {/* Identity */}
            <div className={styles.identity}>
              <h3 className={styles.company}>{item.company}</h3>
              <p className={styles.role}>{item.role}</p>
              <p className={styles.period}>{item.period}</p>
            </div>

            {/* Responsibilities */}
            <ul className={styles.responsibilities}>
              {item.responsibilities.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>

            {/* Bio — hidden until filled in */}
            {item.bio && <p className={styles.bio}>{item.bio}</p>}

            {/* Tags */}
            <ul className={styles.tags}>
              {item.tags.map((tag) => (
                <li key={tag} className={styles.tag}>{tag}</li>
              ))}
            </ul>
          </article>
        ))}
        <div className={styles.spacer} aria-hidden />
      </div>
    </div>
    </div>
  );
}
