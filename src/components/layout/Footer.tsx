"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  GithubLogo,
  LinkedinLogo,
  XLogo,
} from "@phosphor-icons/react";
import { footerLinks } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/react-bits/reveal";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setError("Enter a valid work email.");
      return;
    }

    setStatus("loading");
    await new Promise((r) => setTimeout(r, 700));
    setStatus("success");
    setEmail("");
  };

  useEffect(() => {
    if (status !== "success") return;
    const t = window.setTimeout(() => setStatus("idle"), 4000);
    return () => window.clearTimeout(t);
  }, [status]);

  return (
    <footer id="signup" className="scroll-mt-24">
      <div className="relative mx-2 overflow-hidden rounded-[2rem] bg-[linear-gradient(145deg,#fff1be_0%,#d4c4ff_45%,#a8a0ff_100%)] sm:mx-3 md:mx-4 md:rounded-[2.5rem]">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/4 h-48 w-72 rounded-full bg-white/50 blur-3xl"
        />
        <div className="absolute inset-2 rounded-[calc(2rem-0.5rem)] bg-white/90 md:inset-2.5 md:rounded-[calc(2.5rem-0.625rem)]" />

        <div className="relative mx-auto max-w-[1400px] px-6 py-16 sm:px-8 md:px-12 md:py-20 lg:px-16">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal from="bottom">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Start free
              </p>
            </Reveal>
            <Reveal delay={0.05} from="bottom">
              <p className="mt-4 text-[clamp(1.65rem,3.5vw,2.75rem)] font-medium leading-[1.15] tracking-tight text-foreground text-balance">
                Ready for a calmer workspace?
                <br className="hidden sm:block" /> Bring your team into Novi.
              </p>
            </Reveal>
            <Reveal delay={0.1} from="bottom">
              <p className="mx-auto mt-4 max-w-sm text-sm font-normal leading-relaxed text-muted">
                Join teams who replaced scattered tabs with one shared place to
                plan, talk, and ship.
              </p>
            </Reveal>

            <Reveal delay={0.14} from="bottom">
              <form
                onSubmit={onSubmit}
                className="mx-auto mt-8 max-w-md"
                noValidate
              >
                <label htmlFor="footer-email" className="sr-only">
                  Work email
                </label>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
                  <input
                    id="footer-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="you@studio.co"
                    disabled={status === "loading" || status === "success"}
                    className="h-12 w-full rounded-full border border-border bg-white px-5 text-sm text-foreground outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted/70 focus:border-accent/40 focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
                    aria-invalid={status === "error"}
                    aria-describedby={
                      status === "error"
                        ? "footer-email-error"
                        : status === "success"
                          ? "footer-email-success"
                          : undefined
                    }
                  />
                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "loading" || status === "success"}
                    className="w-full shrink-0 pl-6 pr-1.5 sm:w-auto"
                  >
                    {status === "loading"
                      ? "Joining…"
                      : status === "success"
                        ? "You're in"
                        : "Join waitlist"}
                    {status === "idle" || status === "error" ? (
                      <span className="btn-3d-orb">
                        <ArrowRight weight="bold" className="h-3.5 w-3.5" />
                      </span>
                    ) : null}
                  </Button>
                </div>
                {status === "error" ? (
                  <p
                    id="footer-email-error"
                    className="mt-2 text-sm text-red-600"
                    role="alert"
                  >
                    {error}
                  </p>
                ) : null}
                {status === "success" ? (
                  <p
                    id="footer-email-success"
                    className="mt-2 text-sm text-emerald-600"
                    role="status"
                  >
                    Thanks. We will be in touch soon.
                  </p>
                ) : null}
              </form>
            </Reveal>
          </div>

          <div
            id="pricing"
            className="mt-16 scroll-mt-24 border-t border-foreground/8 pt-12 md:mt-20"
          >
            <div className="grid grid-cols-2 gap-y-10 pb-10 lg:grid-cols-6 lg:gap-8">
              <div className="col-span-2 flex flex-col">
                <Link href="/" className="inline-flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-[13px] font-medium text-white">
                    N
                  </span>
                  <span className="text-xl font-medium tracking-tight">novi</span>
                </Link>
                <p className="mt-4 max-w-[30ch] text-sm font-normal leading-relaxed text-muted">
                  Project management for teams that move fast, without the
                  clutter.
                </p>
              </div>

              <div className="col-span-2 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:col-span-4 lg:grid-cols-4">
                {Object.entries(footerLinks).map(([group, links]) => (
                  <div key={group}>
                    <p className="text-sm font-medium text-foreground/45">
                      {group}
                    </p>
                    <ul className="mt-5 space-y-3.5 text-sm">
                      {links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            className="font-medium text-foreground transition-colors duration-200 hover:text-foreground/70"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div
              id="customers"
              className="flex flex-col gap-6 border-t border-foreground/8 pt-6 md:flex-row md:items-center md:justify-between"
            >
              <p className="text-sm text-foreground">
                © {new Date().getFullYear()} Novi Inc.
              </p>

              <div className="flex items-center gap-5">
                <a
                  href="#"
                  className="text-sm font-medium text-foreground transition-colors hover:text-foreground/70"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="text-sm font-medium text-foreground transition-colors hover:text-foreground/70"
                >
                  Terms
                </a>
                <div className="flex items-center gap-3 pl-1">
                  {[
                    { Icon: XLogo, label: "X" },
                    { Icon: LinkedinLogo, label: "LinkedIn" },
                    { Icon: GithubLogo, label: "GitHub" },
                  ].map(({ Icon, label }) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={label}
                      className="text-foreground transition-opacity duration-200 hover:opacity-70 active:scale-95"
                    >
                      <Icon weight="bold" className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-3 sm:h-4" />
    </footer>
  );
}
