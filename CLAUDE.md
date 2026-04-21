# Lumière Salon — Claude Project Rules

## Global image rule

**Whenever a UI component references an image or asset that does not exist locally,
automatically fetch and download a suitable replacement image from Unsplash or Pexels
and save it in the appropriate `public/images/` subdirectory before committing the code.**

Specifically:

1. **Detect** — before finishing any component edit, grep for `https://images.unsplash.com`
   or `https://images.pexels.com` URLs inside `src/`.
2. **Download** — use `curl -L -o public/images/<subdir>/<slug>.jpg "<url>"` to save each
   image locally.  Subdirectory mirrors the feature: `gallery/`, `stylists/`, `team/`, etc.
3. **Update** — replace the remote URL in the source file with the local path
   `/images/<subdir>/<slug>.jpg` (Astro serves `public/` at the site root).
4. **Thumbs** — if a component uses a `thumb` / blurred-placeholder URL for the same photo,
   save a separate `<slug>-thumb.jpg` at ≤100 px wide in the same directory.
5. **Verify** — run `npx astro build` and confirm no 404s before reporting done.

## Tech stack

- Astro 6 · React 19 · TailwindCSS 4 · Three.js / R3F / Drei · GSAP 3 · Framer Motion 12

## Design tokens

| Token        | Value     |
|-------------|-----------|
| Rose gold   | `#b76e79` |
| Champagne   | `#f7e7ce` |
| Rose light  | `#d4a0a8` |
| Rose dark   | `#8b4d57` |
| Obsidian    | `#0a0a0a` |
| Charcoal    | `#1a1a1a` |
| Gold        | `#c9a96e` |

## Conventions

- All React components use `"use client"` directive at the top.
- Animations: prefer Framer Motion for DOM, GSAP ScrollTrigger for scroll-linked, RAF loops for
  cursor/tilt effects (zero re-renders).
- 3D: share `THREE.Material` instances across meshes; use `InstancedMesh` for repeated geometry.
- Images: `loading="lazy" decoding="async"` on every `<img>` tag that is below the fold.
- Cursor: all interactive elements use `cursor: none` — `CustomCursor` handles the pointer.
- No `overflow-x` on tilt card parents — perspective bleeds need room.
