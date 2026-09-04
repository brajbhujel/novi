"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export function HeroVisual() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".hero-shot",
          { y: 28, opacity: 0, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            delay: 0.25,
          },
        );
      }, root);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative mx-auto w-full max-w-6xl">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[40%] h-[80%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--accent)_18%,white)_0%,transparent_70%)] blur-2xl"
      />

      {/* Wider, shorter crop — not a floating loop */}
      <div className="hero-shot relative">
        <div className="overflow-hidden rounded-[1.5rem] bg-white shadow-[0_36px_70px_-28px_rgba(24,24,31,0.38)] ring-1 ring-black/6 md:rounded-[2rem]">
          <div
            className="relative w-full"
            style={{ aspectRatio: "16 / 9" }}
          >
            <Image
              src="/screenshots/app.png"
              alt="Novi workspace with projects, tasks, and team activity in one view"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 94vw, min(1150px, 88vw)"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
