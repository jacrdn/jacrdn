"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import styles from "./Section.module.css";

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  /** Enable scroll-driven entrance animation (activate when ready) */
  scrollAnimate?: boolean;
}

/**
 * Section — scroll-animation-ready wrapper.
 * Set scrollAnimate={true} to opt into GSAP ScrollTrigger entrance.
 * Currently fires immediately if scrollAnimate is false (one-pager default).
 */
export default function Section({
  id,
  children,
  className = "",
  scrollAnimate = false,
}: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !scrollAnimate) return;

    const targets = el.querySelectorAll<HTMLElement>(".gsap-hidden");
    if (!targets.length) return;

    gsap.set(targets, { opacity: 0, y: 40 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 75%",
      onEnter: () => {
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: "fluid",
        });
      },
    });

    return () => trigger.kill();
  }, [scrollAnimate]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`section ${styles.section} ${className}`}
    >
      {children}
    </section>
  );
}
