"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { List, X, ArrowUpRight } from "@phosphor-icons/react";
import gsap from "gsap";
import { navLinks } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(
      headerRef.current,
      { y: -16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.12 },
    );
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useLayoutEffect(() => {
    if (!overlayRef.current) return;
    const links = linkRefs.current.filter(Boolean);

    if (open) {
      gsap.set(overlayRef.current, { display: "flex" });
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.28, ease: "power2.out" },
      );
      gsap.fromTo(
        links,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.05,
          ease: "power3.out",
          delay: 0.08,
        },
      );
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          if (overlayRef.current) {
            gsap.set(overlayRef.current, { display: "none" });
          }
        },
      });
    }
  }, [open]);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled || open
            ? "border-b border-border/80 bg-background/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6 md:h-[4.5rem] md:px-8 lg:px-12">
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            aria-label="Novi home"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-[13px] font-medium text-white transition-transform duration-200 group-active:scale-95">
              N
            </span>
            <span className="text-[1.15rem] font-medium tracking-tight text-foreground">
              novi
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium text-muted transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="#signup"
              className="text-[13px] font-medium text-muted transition-colors duration-200 hover:text-foreground"
            >
              Log in
            </a>
            <a href="#signup">
              <Button size="sm" className="gap-1.5 pl-4 pr-1.5">
                Start free
                <span className="btn-3d-orb h-6 w-6">
                  <ArrowUpRight weight="bold" className="h-3 w-3" />
                </span>
              </Button>
            </a>
          </div>

          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center text-foreground transition-transform duration-150 active:scale-95 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative h-4 w-4">
              <List
                weight="bold"
                className={cn(
                  "absolute inset-0 h-4 w-4 transition-[opacity,transform] duration-200",
                  open ? "scale-75 opacity-0" : "scale-100 opacity-100",
                )}
              />
              <X
                weight="bold"
                className={cn(
                  "absolute inset-0 h-4 w-4 transition-[opacity,transform] duration-200",
                  open ? "scale-100 opacity-100" : "scale-75 opacity-0",
                )}
              />
            </span>
          </button>
        </div>
      </header>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 hidden flex-col bg-background/95 px-6 pb-10 pt-24 backdrop-blur-2xl md:hidden"
        style={{ display: "none" }}
      >
        <nav className="flex flex-1 flex-col gap-2" aria-label="Mobile">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              ref={(el) => {
                linkRefs.current[i] = el;
              }}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-border py-4 text-3xl font-medium tracking-tight text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a href="#signup" onClick={() => setOpen(false)}>
          <Button size="lg" className="w-full">
            Start free
          </Button>
        </a>
      </div>
    </>
  );
}
