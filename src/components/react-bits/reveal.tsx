"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  immediate?: boolean;
  from?: "bottom" | "top";
};

const offsets = {
  bottom: { y: 22 },
  top: { y: -16 },
} as const;

/** Whole-block fade up. No lateral slides. */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.7,
  threshold = 0.15,
  immediate = false,
  from = "bottom",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  const show = immediate || inView;
  const offset = offsets[from];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        y: offset.y,
        filter: "blur(6px)",
      }}
      animate={
        show
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : undefined
      }
      transition={{
        duration,
        delay,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
