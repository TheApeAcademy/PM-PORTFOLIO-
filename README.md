# Banks Portfolio

Personal portfolio for Bankole (Banks) — PM · Frontend · Builder.

Built with React + Vite + TypeScript, Three.js, GSAP ScrollTrigger, Framer Motion, and Tailwind CSS.

## Stack

- **Framework:** React + Vite + TypeScript
- **3D / Canvas:** Three.js (GLB bird slot — inject via `birdCanvasRef.loadBird('/bird.glb')`)
- **Scroll animations:** GSAP ScrollTrigger
- **Component animations:** Framer Motion
- **Styling:** Tailwind CSS + CSS custom properties
- **Deploy:** Vercel

## Dev

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Adding the bird

Drop `bird.glb` into `public/`, then call:

```ts
import { birdCanvasRef } from './components/BirdCanvas'
birdCanvasRef.loadBird('/bird.glb')
```

The Three.js canvas is full-page, fixed, `z-index: 1`, `pointer-events: none` — it sits behind all content.
