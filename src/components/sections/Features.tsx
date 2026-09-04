"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { features } from "@/lib/data";
import { Reveal } from "@/components/react-bits/reveal";
import { SectionCloud } from "@/components/ui/section-cloud";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const previews = [
  "/screenshots/app.png",
  "/screenshots/networking.png",
  "/screenshots/competitors.png",
  "/screenshots/profile.png",
] as const;

const CARD_GAP = 24;

export function Features() {
  const pinRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const pin = pinRef.current;
    const stack = stackRef.current;
    if (!pin || !stack) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(prefers-reduced-motion: no-preference) and (min-width: 1024px)",
      () => {
        const cards = gsap.utils.toArray<HTMLElement>(".cap-card", stack);
        if (!cards.length) return;

        const step = () => cards[0].offsetHeight + CARD_GAP;

        const ctx = gsap.context(() => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: pin,
              // Pin a bit early so the left list sits mid-viewport
              start: "center center",
              end: () => `+=${features.length * window.innerHeight * 0.9}`,
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const idx = Math.min(
                  features.length - 1,
                  Math.floor(self.progress * features.length),
                );
                setActive(idx);
              },
            },
          });

          for (let i = 1; i < features.length; i++) {
            tl.to(
              stack,
              { y: () => -i * step(), duration: 1, ease: "none" },
              i - 1,
            );
          }
        }, pin);

        return () => ctx.revert();
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section id="features" className="relative scroll-mt-24 py-28 md:py-36 lg:py-40">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <SectionCloud tone="mist" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <Reveal from="bottom">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Capabilities
            </p>
          </Reveal>
          <Reveal delay={0.06} from="bottom">
            <h2 className="text-[clamp(1.75rem,3.8vw,3rem)] font-medium leading-[1.12] tracking-tight text-foreground text-balance">
              Everything your team needs. Nothing that slows you down.
            </h2>
          </Reveal>
          <Reveal delay={0.12} from="bottom">
            <p className="mx-auto mt-5 max-w-[42ch] text-base font-normal leading-relaxed text-muted md:text-lg">
              Four focused tools that keep work, context, and deadlines in the
              same calm place.
            </p>
          </Reveal>
        </div>

        {/* Mobile */}
        <div className="lg:hidden">
          <div className="divide-y divide-border/80 border-y border-border/80">
            {features.map((feature, index) => {
              const isActive = active === index;
              return (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => setActive(index)}
                  className="w-full py-5 text-left"
                >
                  <div className="flex gap-3">
                    <span
                      className={cn(
                        "mt-1 text-[11px] font-medium tracking-[0.16em]",
                        isActive ? "text-accent" : "text-muted/50",
                      )}
                    >
                      0{index + 1}
                    </span>
                    <div>
                      <h3
                        className={cn(
                          "text-lg tracking-tight",
                          isActive
                            ? "font-medium text-foreground"
                            : "font-normal text-muted/70",
                        )}
                      >
                        {feature.title}
                      </h3>
                      <div
                        className={cn(
                          "grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
                          isActive
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <div className="overflow-hidden">
                          <p className="mt-2 text-sm leading-relaxed text-muted">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="relative mt-8 overflow-hidden rounded-[1.5rem] bg-[linear-gradient(145deg,#e8f4ff_0%,#f3e8ff_48%,#ffe8f0_100%)] p-3">
            <div className="overflow-hidden rounded-[1.15rem] bg-white ring-1 ring-black/5">
              <Image
                src={previews[active]}
                alt={`${features[active].title} preview`}
                width={1216}
                height={768}
                className="h-auto w-full object-cover object-top"
                sizes="92vw"
              />
            </div>
          </div>
        </div>

        {/* Desktop: full-height pin, list mid-screen, stacked images */}
        <div
          ref={pinRef}
          className="hidden min-h-[100dvh] lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16 xl:gap-20"
        >
          <div className="divide-y divide-border/80 border-y border-border/80">
            {features.map((feature, index) => {
              const isActive = active === index;
              return (
                <div key={feature.id} className="py-6 xl:py-7">
                  <div className="flex gap-4">
                    <span
                      className={cn(
                        "mt-1 shrink-0 text-[11px] font-medium tabular-nums tracking-[0.16em] transition-colors duration-300",
                        isActive ? "text-accent" : "text-muted/45",
                      )}
                    >
                      0{index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3
                        className={cn(
                          "text-[1.2rem] leading-snug tracking-tight transition-colors duration-300 xl:text-[1.35rem]",
                          isActive
                            ? "font-medium text-foreground"
                            : "font-normal text-muted/65",
                        )}
                      >
                        {feature.title}
                      </h3>
                      <div
                        className={cn(
                          "grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
                          isActive
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <div className="overflow-hidden">
                          <p className="mt-2.5 max-w-[40ch] text-[15px] leading-relaxed text-muted">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative h-[min(620px,72vh)] overflow-hidden">
            {/* Edge fades where cards enter / leave */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-20 h-16 bg-linear-to-b from-background to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16 bg-linear-to-t from-background to-transparent"
            />

            <div
              ref={stackRef}
              className="flex flex-col will-change-transform"
              style={{ gap: CARD_GAP }}
            >
              {previews.map((src, index) => (
                <div
                  key={src}
                  className={cn(
                    "cap-card shrink-0 overflow-hidden rounded-[1.75rem] p-3 ",
                  )}
                >
                  <div className="overflow-hidden rounded-[1.35rem] ring-1 ring-black/5">
                    <div className="relative w-full" style={{ aspectRatio: "1216 / 768" }}>
                      <Image
                        src={src}
                        alt={`${features[index].title} preview`}
                        fill
                        className="object-cover object-top"
                        sizes="42vw"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
