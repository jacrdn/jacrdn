"use client";

import dynamic from "next/dynamic";
import AnimatedText from "@/components/AnimatedText/AnimatedText";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";
import styles from "./Hero.module.css";

// Three.js is browser-only — dynamic import with no SSR
const ThreeDScene = dynamic(
  () => import("@/components/ThreeDScene/ThreeDScene"),
  { ssr: false }
);

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <AnimatedText
            text="Jack Cardin"
            as="h1"
            mode="fadeUp"
            className={styles.title}
          />
          <div className={styles.subtitleGroup}>
            <AnimatedText
              text="Engineer Better"
              charKerning={{ 10: "-0.08em", 11: "-0.08em" }}
              as="h2"
              mode="scrambleIn"
              delay={0.4}
              className={styles.subtitle}
            />
            <AnimatedText
              text="Engineer Together"
              charKerning={{ 8: "-0.08em", 12: "-0.11em" }}
              as="h2"
              mode="scrambleIn"
              delay={0.7}
              className={styles.subtitle}
            />
          </div>
          <AnimatedText
            text={"Intentional engineering for the agentic age. Physical necessities for those in need. Security for what matters most."}
            as="p"
            mode="typewriter"
            delay={0.8}
            className={styles.body}
          />
          <div className={styles.actions}>
            <AnimatedButton href="#contact" variant="fill">
              Get in Touch
            </AnimatedButton>
          </div>
        </div>

        <div className={styles.three}>
          <ThreeDScene />
        </div>
      </div>
    </section>
  );
}
