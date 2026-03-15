// Band meshes use MeshBasicMaterial — no custom shader needed for pass 1.
// These shaders are for the CRT post-process pass (pass 2).

export const crtVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export const crtFragment = /* glsl */ `
  precision highp float;

  uniform sampler2D uTexture;
  uniform float     uTime;
  uniform vec2      uResolution;

  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    // ── Barrel chromatic aberration ──────────────────────────────
    // R expands outward from center, B contracts — classic CRT lens fringe
    float barrel = 0.018 + sin(uTime * 0.55) * 0.004;
    vec2  fromCtr = uv - 0.5;

    float r     = texture2D(uTexture, uv + fromCtr * barrel).r;
    float g     = texture2D(uTexture, uv                   ).g;
    float b     = texture2D(uTexture, uv - fromCtr * barrel).b;
    float alpha = texture2D(uTexture, uv                   ).a;

    vec3 color = vec3(r, g, b);

    // ── CRT scanlines ────────────────────────────────────────────
    float sl = mod(gl_FragCoord.y, 3.0);
    color   *= (sl < 1.0) ? 0.76 : 1.0;

    // Phosphor column dot gap
    float px  = mod(gl_FragCoord.x, 2.0);
    color    *= (px < 0.5) ? 0.95 : 1.0;

    // ── Vignette ─────────────────────────────────────────────────
    vec2  vig = (uv * 2.0 - 1.0) * 0.60;
    float v   = pow(clamp(1.0 - dot(vig, vig), 0.0, 1.0), 1.3);
    color    *= v;

    gl_FragColor = vec4(color, alpha);
  }
`;
