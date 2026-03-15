"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { crtVertex, crtFragment } from "./shaders";
import styles from "./ThreeDScene.module.css";

const RING_COLOR = new THREE.Color(0x624b5b);
const RING_COUNT = 12;
const GOLDEN     = 0.6180339887;

export default function ThreeDScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // ── Renderer ─────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0); // transparent — page peach shows through
    mount.appendChild(renderer.domElement);

    // ── Pass 1: 3D band scene ────────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.z = 3;

    // Build orbital rings — TorusGeometry so center is empty, no nucleus glow
    const rings: THREE.Mesh[] = [];
    const ringInit:  { x: number; y: number; z: number }[] = [];
    const ringSpeed: { y: number; z: number }[] = [];

    for (let i = 0; i < RING_COUNT; i++) {
      // Vary radius and tube slightly per ring for depth layering
      const radius = 1.1 + Math.sin(i * 1.3) * 0.2;
      const tube   = 0.045 + Math.abs(Math.sin(i * 2.1)) * 0.02;
      const geo    = new THREE.TorusGeometry(radius, tube, 8, 100);

      const mat = new THREE.MeshBasicMaterial({
        color:       RING_COLOR,
        transparent: true,
        opacity:     0.80,
        blending:    THREE.AdditiveBlending,
        depthWrite:  false,
      });

      const mesh = new THREE.Mesh(geo, mat);

      // Spread orbital inclinations evenly — rings at truly different 3D angles
      const initX = (i / RING_COUNT) * Math.PI;
      const initY = i * GOLDEN * Math.PI * 0.5;
      const initZ = i * GOLDEN * Math.PI * 0.3;
      mesh.rotation.x = initX;
      mesh.rotation.y = initY;
      mesh.rotation.z = initZ;
      ringInit.push({ x: initX, y: initY, z: initZ });

      // Per-ring speed: varied magnitude AND direction — some go opposite ways
      const base = 0.06 + Math.abs(Math.sin(i * 1.17)) * 0.09; // 0.06–0.15
      const dirY = Math.sin(i * 2.40) > 0 ? 1 : -1;
      const dirZ = Math.cos(i * 1.91) > 0 ? 1 : -1;
      ringSpeed.push({
        y: dirY * base * (0.5 + Math.abs(Math.cos(i * 0.83)) * 0.8),
        z: dirZ * base * (0.3 + Math.abs(Math.sin(i * 1.44)) * 0.5),
      });

      rings.push(mesh);
      scene.add(mesh);
    }

    // ── Render target for pass 1 output ─────────────────────────────
    const rt = new THREE.WebGLRenderTarget(W, H, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
    });

    // ── Pass 2: CRT post-process quad ───────────────────────────────
    const postScene  = new THREE.Scene();
    const postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const postGeo    = new THREE.PlaneGeometry(2, 2);
    const postMat    = new THREE.ShaderMaterial({
      vertexShader:   crtVertex,
      fragmentShader: crtFragment,
      uniforms: {
        uTexture:    { value: rt.texture },
        uTime:       { value: 0 },
        uResolution: { value: new THREE.Vector2(W, H) },
      },
      transparent: true,
    });
    postScene.add(new THREE.Mesh(postGeo, postMat));

    // ── Animation loop ───────────────────────────────────────────────
    const clock = new THREE.Clock();
    let animId:   number;
    let isVisible = true;

    function animate() {
      if (!isVisible) return;
      animId = requestAnimationFrame(animate);

      const t = clock.getElapsedTime();

      rings.forEach((ring, i) => {
        const phase = i * GOLDEN;

        // Each ring precesses on its own Y+Z axes at its own speed and direction
        ring.rotation.y = ringInit[i].y + t * ringSpeed[i].y;
        ring.rotation.z = ringInit[i].z + t * ringSpeed[i].z;

        // Slow inclination wobble for 3D depth variation
        ring.rotation.x = ringInit[i].x + Math.sin(t * 0.25 + phase) * 0.25;

        // Opacity breathes gently at lower base
        (ring.material as THREE.MeshBasicMaterial).opacity =
          0.80 + Math.sin(i * 0.73 + t * 0.22) * 0.10;
      });

      // Pass 1 → render target
      renderer.setRenderTarget(rt);
      renderer.render(scene, camera);

      // Pass 2 → screen
      postMat.uniforms.uTime.value = t;
      renderer.setRenderTarget(null);
      renderer.render(postScene, postCamera);
    }
    animate();

    // ── Pause off-screen ─────────────────────────────────────────────
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) animate();
      },
      { threshold: 0.1 }
    );
    observer.observe(mount);

    // ── Resize ───────────────────────────────────────────────────────
    function onResize() {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rt.setSize(w, h);
      postMat.uniforms.uResolution.value.set(w, h);
    }
    window.addEventListener("resize", onResize);

    // ── Cleanup ──────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      rings.forEach((r) => {
        r.geometry.dispose();
        (r.material as THREE.Material).dispose();
      });
      postGeo.dispose();
      postMat.dispose();
      rt.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={styles.canvas} />;
}
