# 9xbetter — Portfolio Site

## What This Is

Personal portfolio site for **Jack Cardin** at `9xbetter.com`. The site communicates a design + engineering identity: someone who builds things that move, that feel considered, and that push past the ordinary. The tone is confident, minimal, and slightly editorial — not a typical dev portfolio.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **GSAP** + ScrollTrigger for all motion — imported exclusively from `src/lib/gsap.ts`, never directly from `"gsap"`
- **Canvas 2D** for the hero orbital rings animation (was Three.js — do not revert)
- No UI libraries, no Tailwind — plain CSS modules

## Design System

### Colors
```
--bg:       #E8C3A8   /* warm peach — the dominant background */
--fg:       #EA032E   /* vivid red — all text, strokes, UI elements */
--fg-muted: rgba(234, 3, 46, 0.45)  /* red at reduced opacity for secondary elements */
```
**Two colors only.** Do not introduce neutrals, grays, blacks, or whites. The peach/red pairing is intentional and non-negotiable — it defines the site's character.

### Typography
```
--font-display: "Ballet"     → h1 only (name/hero headline)
--font-sub:     "Glasset"    → h2, h3 (section headings, subtitles)
--font-body:    "NewEdge666" → all body copy, buttons, inputs
```
- Fonts are loaded from `/public/fonts/` via `@font-face` in `globals.css`
- `h1` uses Ballet — expressive, high-contrast serif with swashes. Give it `padding-top` or `overflow: visible` where needed since swashes clip.
- NewEdge666 is a geometric monospace — keep body copy tight and functional

### Eases (registered in `src/lib/gsap.ts`)
- `"fluid"` — smooth deceleration, the default for most transitions
- `"snap"` — overshoot + settle, use for interactive/playful moments
- `"ease-jagged"` / `steps(8, end)` — glitch/stepped, use sparingly

## Animation Principles

- Motion is **purposeful and confident** — not decorative for its own sake
- Entrance animations use `AnimatedText` with modes: `fadeUp`, `glitch`, `typewriter`, `scrambleIn`
- `scrambleIn` — letters appear in random order (used for subtitle lines)
- Scroll-driven sections use `Section` with `scrollAnimate` prop — targets need `.gsap-hidden` class
- Hero rings: Canvas 2D ellipses, 80 rings, staggered entrance, graceful stop/start per ring, varied line weights and radii

## Project Structure

```
src/
  app/
    layout.tsx        — metadata, font preloads, global CSS
    page.tsx          — page sections: Hero, About, Work, Contact
    page.module.css   — section-level layout styles
  components/
    Hero/             — hero layout (grid: content left, canvas right)
    ThreeDScene/      — Canvas 2D orbital rings (name is legacy, it's 2D now)
    AnimatedText/     — char-level text animation component
    AnimatedButton/   — styled CTA button with animation
    Section/          — scroll-animated section wrapper
  lib/
    gsap.ts           — GSAP + plugin registration + custom eases
    usePageReady.ts   — waits for fonts + layout before triggering animations
  styles/
    globals.css       — design tokens, reset, font-face declarations
```

## HeaderWord ("the scroller")

`src/components/HeaderWord/` — the word mark in the top-left corner. Jack calls it **"the scroller"** because it cycles through words ("agents", "health", "product", "safety") driven by `main`'s `scrollTop`. It uses each section's `offsetTop` to compute animation progress.

**Critical:** Never change section heights (`height: 100dvh`) on mobile — doing so shifts `offsetTop` values and breaks the HeaderWord animation timing.

## Sections (page.tsx)

| Section | Status |
|---------|--------|
| Hero | Complete — name, taglines, orbital canvas, CTAs |
| About | Placeholder — bio copy needed |
| Work | Placeholder — project cards (currently "Project A/B/C") |
| Contact | Placeholder — contact info needed |

## Collaboration Style

- When something is ambiguous or unclear, **always ask rather than guess**. Jack prefers a quick clarifying question over multiple wrong attempts — it saves time and context.

## UI Copy Conventions

- **No arrows in button/link text** — omit `→`, `←`, and similar directional glyphs from all labels, nav links, and CTAs. Let the typography and layout carry directionality; the glyphs read as noise against NewEdge666.

## Key Conventions

- Always use CSS variables for color (`var(--fg)`, `var(--bg)`) — never hardcode hex in components
- Canvas strokes use `#ea032e` directly (canvas API doesn't read CSS vars)
- `usePageReady` must gate any animation that depends on font layout — skipping it causes jitter on first load
- DPR-aware canvas: always `canvas.width = W * dpr` + `ctx.setTransform(dpr, 0, 0, dpr, 0, 0)`
- Keep `ThreeDScene` as Canvas 2D — the Three.js rewrite was intentional (z-fighting + grain issues)
