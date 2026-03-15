"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import styles from "./AnimatedButton.module.css";

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "outline" | "fill";
}

export default function AnimatedButton({
  children,
  onClick,
  href,
  variant = "outline",
}: AnimatedButtonProps) {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const [isPressed, setIsPressed] = useState(false);

  function onMouseEnter() {
    if (!fillRef.current) return;
    gsap.fromTo(
      fillRef.current,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.35, ease: "fluid" }
    );
  }

  function onMouseLeave() {
    if (!fillRef.current) return;
    gsap.to(fillRef.current, {
      scaleX: 0,
      transformOrigin: "right center",
      duration: 0.3,
      ease: "fluid",
    });
    // Snap button scale back
    gsap.to(btnRef.current, { scale: 1, duration: 0.25, ease: "snap" });
  }

  function onMouseDown() {
    setIsPressed(true);
    gsap.to(btnRef.current, { scale: 0.95, duration: 0.1, ease: "snap" });
  }

  function onMouseUp() {
    setIsPressed(false);
    gsap.to(btnRef.current, { scale: 1, duration: 0.3, ease: "snap" });
  }

  const sharedProps = {
    className: `${styles.btn} ${styles[variant]} ${isPressed ? styles.pressed : ""}`,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onClick,
  };

  const inner = (
    <>
      <span ref={fillRef} className={styles.fill} aria-hidden="true" />
      <span className={styles.label}>{children}</span>
    </>
  );

  if (href) {
    return (
      <a ref={btnRef as React.RefObject<HTMLAnchorElement>} href={href} {...sharedProps}>
        {inner}
      </a>
    );
  }

  return (
    <button ref={btnRef as React.RefObject<HTMLButtonElement>} type="button" {...sharedProps}>
      {inner}
    </button>
  );
}
