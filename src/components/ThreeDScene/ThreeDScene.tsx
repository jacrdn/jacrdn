"use client";

import { useEffect, useRef } from "react";
import styles from "./ThreeDScene.module.css";

const RING_COUNT = 80;
const GOLDEN     = 0.6180339887;

function smoothstep(x: number) {
  const c = Math.max(0, Math.min(1, x));
  return c * c * (3 - 2 * c);
}

function randSpeed() {
  const base = 0.06 + Math.random() * 0.09;
  const dir  = Math.random() > 0.5 ? 1 : -1;
  return dir * base * (0.5 + Math.random() * 0.8);
}

export default function ThreeDScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ENTER_STAGGER  = 0.04; // seconds between each ring appearing
    const ENTER_DURATION = 0.4;  // seconds for each ring to fade in

    type Ring = {
      radius: number;
      phi: number;
      tilt: number;
      phaseX: number;
      pulsePhase: number;
      speedY: number;
      speedZ: number;
      segStart: number;
      segDuration: number;
      easeTime: number;
      enterDelay: number;
      lineWidth: number;
    };

    const rings: Ring[] = Array.from({ length: RING_COUNT }, (_, i) => {
      const segDuration = 2 + Math.random() * 3;
      const easeTime    = 0.4 + Math.random() * 0.6;
      return {
        radius:      0.25 + ((i * GOLDEN) % 1) * 1.1,
        phi:         Math.random() * Math.PI * 2,
        tilt:        Math.random() * Math.PI * 2,
        phaseX:      i * GOLDEN,
        pulsePhase:  i * GOLDEN * 2.3,
        speedY:      randSpeed(),
        speedZ:      randSpeed(),
        segStart:    -(Math.random() * (easeTime * 2 + segDuration)),
        segDuration,
        easeTime,
        enterDelay:  i * ENTER_STAGGER,
        lineWidth:   0.5 + ((i * GOLDEN * 3.7) % 1) * 3.0,
      };
    });

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
      baseR = Math.min(W, H) * 0.33;
    }
    resize();

    let animId: number;
    let isVisible = true;
    const t0 = performance.now();
    let prevT = 0;

    function draw() {
      if (!isVisible) return;
      animId = requestAnimationFrame(draw);

      const t  = (performance.now() - t0) / 1000;
      const dt = Math.min(t - prevT, 0.1); // clamp to avoid jumps on tab restore
      prevT = t;

      ctx!.clearRect(0, 0, W, H);
      ctx!.strokeStyle = "#ea032e";
      ctx!.globalAlpha = 1;

      for (const ring of rings) {
        const total   = ring.easeTime * 2 + ring.segDuration;
        const elapsed = t - ring.segStart;

        // Start new segment when current is complete
        if (elapsed >= total) {
          ring.segStart    = t;
          ring.segDuration = 2 + Math.random() * 3;
          ring.easeTime    = 0.4 + Math.random() * 0.6;
          ring.speedY      = randSpeed();
          ring.speedZ      = randSpeed();
        }

        // Velocity envelope: ease-in → full speed → ease-out → (briefly stopped) → repeat
        const e = t - ring.segStart;
        let factor: number;
        if (e < ring.easeTime) {
          factor = smoothstep(e / ring.easeTime);
        } else if (e < ring.easeTime + ring.segDuration) {
          factor = 1;
        } else {
          factor = smoothstep((total - e) / ring.easeTime);
        }

        ring.phi  += ring.speedY * factor * dt;
        ring.tilt += ring.speedZ * factor * dt;

        const alpha = smoothstep(Math.min((t - ring.enterDelay) / ENTER_DURATION, 1));
        if (alpha <= 0) continue;

        const pulse = 1 + 0.08 * Math.sin(t * 0.6 + ring.pulsePhase);
        const a     = baseR * ring.radius * pulse;
        const b     = a * Math.abs(Math.cos(ring.tilt));

        ctx!.globalAlpha = alpha;
        ctx!.lineWidth   = ring.lineWidth;
        ctx!.beginPath();
        ctx!.ellipse(cx, cy, a, b, ring.phi, 0, Math.PI * 2);
        ctx!.stroke();
      }
    }
    draw();

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
