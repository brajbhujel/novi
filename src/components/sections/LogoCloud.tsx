"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { SectionCloud } from "@/components/ui/section-cloud";

const logos = [
  { src: "/logos/trello.svg", alt: "Trello" },
  { src: "/logos/asana.svg", alt: "Asana" },
  { src: "/logos/sheets.svg", alt: "Spreadsheets" },
  { src: "/logos/slack.svg", alt: "Slack" },
  { src: "/logos/google-calendar.svg", alt: "Google Calendar" },
  { src: "/logos/loom.svg", alt: "Loom" },
  { src: "/logos/basecamp.svg", alt: "Basecamp" },
  { src: "/logos/gmail.svg", alt: "Gmail" },
  { src: "/logos/zoom.svg", alt: "Zoom" },
  { src: "/logos/google-drive.svg", alt: "Google Drive" },
] as const;

/**
 * GSAP infinite marquee: two equal tracks, xPercent -50 forever.
 * Greyscale by default; hover only adds color (never pauses).
 */
export function LogoCloud() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tween = gsap.to(track, {
        xPercent: -50,
        duration: 32,
        ease: "none",
        repeat: -1,
      });
      return () => {
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      aria-label="Tools that connect into Novi"
      className="relative py-16 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <SectionCloud tone="lilac" className="opacity-80" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-12">
        <p className="mb-10 text-center text-sm font-normal text-muted md:mb-12">
          Import from Trello, Asana, or a spreadsheet. Then keep shipping.
        </p>
      </div>

      <div className="relative z-10 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-background to-transparent sm:w-32"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-background to-transparent sm:w-32"
        />

        <div ref={trackRef} className="flex w-max will-change-transform">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0 items-center gap-14 pr-14 sm:gap-16 sm:pr-16"
              aria-hidden={copy === 1 ? true : undefined}
            >
              {logos.map((logo) => (
                <div
                  key={`${copy}-${logo.alt}`}
                  className="flex h-11 shrink-0 items-center grayscale transition-[filter] duration-300 hover:grayscale-0 sm:h-12"
                >
                  <Image
                    src={logo.src}
                    alt={copy === 0 ? logo.alt : ""}
                    width={140}
                    height={40}
                    className="h-8 w-auto max-w-[8rem] object-contain sm:h-9"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
