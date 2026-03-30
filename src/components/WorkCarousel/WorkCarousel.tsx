"use client";

import { workItems } from "@/data/work";
import styles from "./WorkCarousel.module.css";

export default function WorkCarousel() {
  const total = workItems.length;

  return (
    <div className={styles.outer}>
    <div className={styles.root}>
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
