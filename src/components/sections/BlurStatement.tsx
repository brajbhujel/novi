"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATEMENT =
  "One calm place to plan, talk, and ship. Built for teams that move fast.";

/**
 * Pinned word-by-word blur reveal on a full-height white canvas.
 */
export function BlurStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted || !sectionRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".blur-word", { clearProps: "all", opacity: 1, filter: "none" });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const words = gsap.utils.toArray<HTMLSpanElement>(".blur-word");
        gsap.set(words, { filter: "blur(12px)", opacity: 0.12 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "center center",
            end: `+=${Math.max(words.length * 70, 500)}`,
            scrub: 1.4,
            pin: true,
            pinSpacing: true,
          },
        });

        words.forEach((word, i) => {
          tl.to(
            word,
            {
              filter: "blur(0px)",
              opacity: 1,
              duration: 1.2,
              ease: "power2.out",
            },
            i * 0.35,
          );
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [mounted]);

  const words = STATEMENT.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100dvh] items-center justify-center bg-background px-4 py-24 sm:px-6 md:px-8 lg:px-12"
      aria-label="Product statement"
    >
      <div className="relative z-10 mx-auto max-w-[920px] text-center">
        <p className="text-[clamp(1.55rem,4vw,3.1rem)] font-medium leading-[1.3] tracking-tight text-foreground text-balance">
          {words.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="blur-word mr-[0.28em] inline-block will-change-[filter,opacity]"
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
