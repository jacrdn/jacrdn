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
      <div className={styles.content}>
        <AnimatedText
          text="Jack Cardin"
          as="h1"
          mode="fadeUp"
          className={styles.title}
        />
        <AnimatedText
          text="Design. Motion. Experience."
          as="h2"
          mode="fadeUp"
          delay={0.4}
          className={styles.subtitle}
        />
        <AnimatedText
          text="Building things that move differently."
          as="p"
          mode="typewriter"
          delay={0.8}
          className={styles.body}
        />
        <div className={styles.actions}>
          <AnimatedButton href="#work">View Work</AnimatedButton>
          <AnimatedButton href="#contact" variant="fill">
            Get in Touch
          </AnimatedButton>
        </div>
      </div>

      <div className={styles.three}>
        <ThreeDScene />
      </div>
    </section>
  );
}
