"use client";

import Image from "next/image";
import { howSteps } from "@/lib/data";
import { Reveal } from "@/components/react-bits/reveal";

export function HowItWorks() {
  return (
    <section id="how" className="relative scroll-mt-24 py-8 md:py-12">
      <Reveal from="bottom" duration={0.85} className="mx-2 sm:mx-3 md:mx-4">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink text-white md:rounded-[2.5rem]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="cloud-blob cloud-blob--a cloud-tone--ink" />
            <div className="cloud-blob cloud-blob--b cloud-tone--ink" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1400px] px-4 py-24 sm:px-6 md:px-8 md:py-32 lg:px-12 lg:py-36">
            <div className="mx-auto mb-14 max-w-2xl text-center md:mb-16">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent-soft">
                How it works
              </p>
              <h2 className="text-[clamp(1.75rem,3.6vw,2.9rem)] font-medium leading-[1.12] tracking-tight text-balance">
                From scattered tools to one calm workspace.
              </h2>
              <p className="mx-auto mt-5 max-w-[40ch] text-base font-normal leading-relaxed text-white/55 md:text-lg">
                Three steps. No onboarding circus. Your team is shipping the
                same afternoon.
              </p>
            </div>

            <div className="mb-14 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] md:mb-16 md:rounded-[2rem]">
              <div className="relative w-full" style={{ aspectRatio: "2.4 / 1" }}>
                <Image
                  src="/screenshots/networking.png"
                  alt="Novi team conversations and connections in one workspace"
                  fill
                  className="object-cover object-left-top opacity-95"
                  sizes="(max-width: 768px) 94vw, min(1320px, 92vw)"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink/50 via-transparent to-transparent" />
              </div>
            </div>

            <div className="grid gap-8 border-t border-white/10 pt-10 md:grid-cols-3 md:gap-10 md:pt-12">
              {howSteps.map((step) => (
                <article key={step.step}>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-soft">
                    Step {step.step}
                  </p>
                  <h3 className="mt-3 text-xl font-medium tracking-tight md:text-[1.3rem]">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[36ch] text-sm font-normal leading-relaxed text-white/55 md:text-[15px]">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
