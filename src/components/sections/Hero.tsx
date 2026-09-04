"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/react-bits/reveal";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { SectionCloud } from "@/components/ui/section-cloud";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.to(".hero-copy", {
          y: -16,
          opacity: 0.6,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
    >
      <SectionCloud tone="lilac" bridgeTop={false} />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="hero-copy mx-auto max-w-3xl text-center">
          <Reveal immediate delay={0.04} from="bottom">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/75 px-3.5 py-1.5 text-sm text-muted backdrop-blur-sm">
              <span className="rounded-full bg-foreground px-2 py-0.5 text-[11px] font-medium tracking-wide text-white">
                Free
              </span>
              <span className="font-normal text-foreground/75">
                Now open: free workspace for your whole team
              </span>
            </div>
          </Reveal>

          <Reveal immediate delay={0.1} from="bottom">
            <h1 className="text-[clamp(2.35rem,5.6vw,4.5rem)] font-medium leading-[1.08] tracking-tight text-foreground text-balance">
              Run your team without the tab switching.
            </h1>
          </Reveal>

          <Reveal immediate delay={0.2} from="bottom">
            <p className="mx-auto mt-6 max-w-[34rem] text-base font-normal leading-relaxed text-muted md:text-lg">
              Novi brings tasks, docs, and conversations into one calm workspace
              built for small, fast moving teams.
            </p>
          </Reveal>

          <Reveal immediate delay={0.3} from="bottom">
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-3">
              <a href="#signup" className="group inline-flex">
                <Button size="lg" className="h-12 gap-3 pl-5 pr-2">
                  Start free
                  <span className="btn-3d-orb transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5">
                    <ArrowRight weight="bold" className="h-3.5 w-3.5" />
                  </span>
                </Button>
              </a>
              <a href="#how" className="group inline-flex">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 gap-2.5 pl-2 pr-5"
                >
                  <span className="flex h-[1.85rem] w-[1.85rem] shrink-0 items-center justify-center rounded-full bg-accent text-white">
                    <svg
                      viewBox="0 0 12 12"
                      className="ml-0.5 h-3 w-3 fill-current"
                      aria-hidden
                    >
                      <path d="M3 1.5v9l8-4.5L3 1.5z" />
                    </svg>
                  </span>
                  See how it works
                </Button>
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal
          immediate
          delay={0.26}
          from="bottom"
          className="relative mt-14 md:mt-16"
        >
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  );
}
