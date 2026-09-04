import { cn } from "@/lib/utils";

type Tone = "lilac" | "mist" | "rose" | "ink";

type SectionCloudProps = {
  tone?: Tone;
  className?: string;
  /** Soft fade at the top edge so the previous section bleeds in */
  bridgeTop?: boolean;
  /** Soft fade at the bottom edge so the next section bleeds in */
  bridgeBottom?: boolean;
};

/**
 * Soft color clouds that sit behind section content.
 * Bridges remove hard section lines without changing the page background.
 */
export function SectionCloud({
  tone = "lilac",
  className,
  bridgeTop = true,
  bridgeBottom = true,
}: SectionCloudProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className={cn("cloud-blob cloud-blob--a", `cloud-tone--${tone}`)} />
      <div className={cn("cloud-blob cloud-blob--b", `cloud-tone--${tone}`)} />

      {bridgeTop ? (
        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-background to-transparent md:h-52" />
      ) : null}
      {bridgeBottom ? (
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent md:h-52" />
      ) : null}
    </div>
  );
}
