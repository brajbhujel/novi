"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/react-bits/reveal";
import { SectionCloud } from "@/components/ui/section-cloud";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

/**
 * Precise diagram in a fixed viewBox so wires stay needle-thin and
 * always meet the hub center (matches Anytrack / Roaspy flow cards).
 */
const NODES = [
  { src: "/logos/trello.svg", alt: "Trello", x: 70, y: 48 },
  { src: "/logos/asana.svg", alt: "Asana", x: 200, y: 48 },
  { src: "/logos/sheets.svg", alt: "Spreadsheets", x: 330, y: 48 },
] as const;

const HUB = { x: 200, y: 248 } as const;
const LOGO = 48;
const HUB_SIZE = 72;
const VB_W = 400;
const VB_H = 320;

function pathToHub(x: number, y: number) {
  // Exit bottom-centre of logo → arrive top-centre of hub (single meet point)
  const startX = x;
  const startY = y + LOGO / 2;
  const endX = HUB.x;
  const endY = HUB.y - HUB_SIZE / 2;
  const midY = (startY + endY) / 2;
  return `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`;
}

function FlowDiagram() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      gsap.from(".flow-node", {
        scale: 0.92,
        autoAlpha: 0,
        duration: reduced ? 0.01 : 0.4,
        stagger: reduced ? 0 : 0.05,
        ease: "power2.out",
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      });

      if (reduced) return;

      gsap.utils.toArray<SVGPathElement>(".flow-pulse").forEach((pulse, i) => {
        const length = pulse.getTotalLength();
        gsap.set(pulse, {
          strokeDasharray: `14 ${length}`,
          strokeDashoffset: length,
        });
        gsap.to(pulse, {
          strokeDashoffset: -length,
          duration: 2.6,
          repeat: -1,
          ease: "none",
          delay: i * 0.35,
          scrollTrigger: { trigger: root, start: "top 80%", once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-[8px] bg-[#F6F6F6] md:rounded-[2rem]"
    >
      <div
        className="relative w-full"
        style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
      >
        <svg
          aria-hidden
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="absolute inset-0 h-full w-full"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          {NODES.map((node) => (
            <g key={node.alt}>
              <path
                d={pathToHub(node.x, node.y)}
                stroke="#ffffff"
                strokeWidth="1.25"
                strokeLinecap="round"
              />
              <path
                d={pathToHub(node.x, node.y)}
                stroke="#9b8fd9"
                strokeWidth="1"
                strokeLinecap="round"
                opacity={0.55}
              />
              <path
                className="flow-pulse"
                d={pathToHub(node.x, node.y)}
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                opacity={0.95}
              />
            </g>
          ))}
        </svg>

        {NODES.map((node) => (
          <div
            key={node.alt}
            className="flow-node absolute z-[2] flex items-center justify-center rounded-2xl bg-white shadow-[0_8px_20px_-10px_rgba(24,24,31,0.35)] ring-1 ring-black/5"
            style={{
              width: `${(LOGO / VB_W) * 100}%`,
              aspectRatio: "1",
              left: `${(node.x / VB_W) * 100}%`,
              top: `${(node.y / VB_H) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <Image
              src={node.src}
              alt={node.alt}
              width={28}
              height={28}
              className="h-[58%] w-[58%] object-contain"
            />
          </div>
        ))}

        <div
          className="flow-node absolute z-[2] flex items-center justify-center rounded-[1.15rem] bg-accent shadow-[0_16px_36px_-12px_rgba(74,58,255,0.55)]"
          style={{
            width: `${(HUB_SIZE / VB_W) * 100}%`,
            aspectRatio: "1",
            left: `${(HUB.x / VB_W) * 100}%`,
            top: `${(HUB.y / VB_H) * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <span className="text-[1.75rem] font-medium tracking-tight text-white">
            N
          </span>
        </div>
      </div>
    </div>
  );
}

export function Integrations() {
  return (
    <section
      id="integrations"
      className="relative scroll-mt-24 overflow-hidden py-28 md:py-36 lg:py-40"
    >
      <SectionCloud tone="rose" />

      <div className="relative z-10 mx-auto grid max-w-[1400px] items-center gap-14 px-4 sm:px-6 md:grid-cols-2 md:gap-16 md:px-8 lg:gap-20 lg:px-12">
        <div className="order-2 md:order-1">
          <FlowDiagram />
        </div>

        <div className="order-1 md:order-2">
          <Reveal from="bottom">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Import and connect
            </p>
          </Reveal>
          <Reveal delay={0.06} from="bottom">
            <h2 className="max-w-[16ch] text-[clamp(1.75rem,3.6vw,2.9rem)] font-medium leading-[1.12] tracking-tight text-foreground">
              Works the way you already do
            </h2>
          </Reveal>
          <Reveal delay={0.12} from="bottom">
            <p className="mt-5 max-w-[40ch] text-base font-normal leading-relaxed text-muted md:text-lg">
              Import from Trello, Asana, or a spreadsheet in minutes. Keep your
              existing process. Novi maps tasks, owners, and due dates for you.
            </p>
          </Reveal>
          <Reveal delay={0.18} from="bottom">
            <a href="#signup" className="group mt-8 inline-flex">
              <Button size="lg" className="gap-3 pl-5 pr-2">
                Start free
                <span className="btn-3d-orb transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowRight weight="bold" className="h-3.5 w-3.5" />
                </span>
              </Button>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
