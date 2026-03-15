"use client";

import { useEffect, useRef } from "react";
import styles from "./ThreeDScene.module.css";

const RING_COUNT = 60;
const GOLDEN     = 0.6180339887;

export default function ThreeDScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Per-ring parameters (same variation logic as before)
    const rings = Array.from({ length: RING_COUNT }, (_, i) => {
      const base  = 0.06 + Math.abs(Math.sin(i * 1.17)) * 0.09;
      const dirY  = Math.sin(i * 2.40) > 0 ? 1 : -1;
      const dirZ  = Math.cos(i * 1.91) > 0 ? 1 : -1;
      return {
        radius:  1.0 + Math.sin(i * 1.3) * 0.18,
        phi0:    (i / RING_COUNT) * Math.PI,
        tilt0:   (i / RING_COUNT) * Math.PI,
        phaseX:  i * GOLDEN,
        pulsePhase: i * GOLDEN * 2.3,
        speedY:  dirY * base * (0.5 + Math.abs(Math.cos(i * 0.83)) * 0.8),
        speedZ:  dirZ * base * (0.3 + Math.abs(Math.sin(i * 1.44)) * 0.5),
      };
    });

    // DPR-aware sizing
    let W = 0, H = 0, cx = 0, cy = 0, baseR = 0;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      W = canvas!.offsetWidth;
      H = canvas!.offsetHeight;
      canvas!.width  = W * dpr;
      canvas!.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx    = W / 2;
      cy    = H / 2;
      baseR = Math.min(W, H) * 0.38;
    }
    resize();

    let animId: number;
    let isVisible = true;
    const t0 = performance.now();

    function draw() {
      if (!isVisible) return;
      animId = requestAnimationFrame(draw);

      const t = (performance.now() - t0) / 1000; // seconds

      ctx!.clearRect(0, 0, W, H);
      ctx!.strokeStyle = "#ea032e";
      ctx!.lineWidth   = 1.5;

      for (const ring of rings) {
        const pulse = 1 + 0.08 * Math.sin(t * 0.6 + ring.pulsePhase);
        const a    = baseR * ring.radius * pulse;
        const phi  = ring.phi0  + t * ring.speedY;
        const tilt = ring.tilt0 + Math.sin(t * 0.25 + ring.phaseX) * 0.5 + t * ring.speedZ;
        const b    = a * Math.abs(Math.cos(tilt));

        ctx!.beginPath();
        ctx!.ellipse(cx, cy, a, b, phi, 0, Math.PI * 2);
        ctx!.stroke();
      }
    }
    draw();

    // Pause off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) draw();
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
