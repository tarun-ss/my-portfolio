"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

export function SectionHeading({
  index,
  label,
  title,
  className = "",
}: {
  index: string;
  label: string;
  title: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Reveal from="bottom">
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm text-accent">{index}</span>
          <span className="font-mono text-sm uppercase tracking-[0.35em] text-muted">
            {label}
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-expanded mt-6 text-[clamp(2.6rem,7vw,6.5rem)] font-black uppercase leading-[0.92] tracking-tight text-ink">
          {title}
        </h2>
      </Reveal>
    </div>
  );
}
