# Novi Landing Page

Frontend assessment for **Veel**: a responsive marketing landing page for Novi, a project and task management tool for small, fast-moving teams.

## Preview

http://novi.bishawaraj.com.np/

## Run locally

```bash
cd novi
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- **Next.js 16** (App Router, RSC shell, SEO metadata)
- **TypeScript** + **Tailwind CSS v4**
- **GSAP** + ScrollTrigger
- **Motion** (text/block reveals)
- **Phosphor Icons**
- **Clash Grotesk** (local variable font)

## Design decisions

- Centered hero with dual CTAs and real product screenshots on a soft lilac cloud.
- Section rhythm inspired by Tailwind Plus Radiant: generous vertical spacing and soft cloud overlays between sections (no hard cuts).
- Capabilities as scroll-pinned scrollytelling: compact feature list + vertical image stack.
- Import diagram with needle-thin converging wires into Novi (Trello, Asana, spreadsheet).
- Infinite greyscale logo marquee; color on hover only.
- Press feedback via `active:scale-[0.97]` (no magnetic buttons).
- SSR / SEO: metadata, OG/Twitter, robots, sitemap, JSON-LD.

## Assets note

Product UI screenshots and integration marks are included for **reference purposes only**. They were taken from previously completed projects and are not intended as final production brand assets.
