"use client";

import { Children, Fragment, isValidElement, type ReactNode } from "react";
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];

/** Flatten fragments and split the title into lines at <br /> boundaries. */
function splitLines(node: ReactNode): ReactNode[][] {
  const lines: ReactNode[][] = [];
  let current: ReactNode[] = [];

  const walk = (children: ReactNode) => {
    Children.forEach(children, (child) => {
      if (isValidElement(child)) {
        if (child.type === "br") {
          lines.push(current);
          current = [];
          return;
        }
        if (child.type === Fragment) {
          walk((child.props as { children?: ReactNode }).children);
          return;
        }
      }
      current.push(child);
    });
  };

  walk(node);
  lines.push(current);
  return lines.filter((line) => line.length > 0);
}

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
  const lines = splitLines(title);

  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
        className="flex items-center gap-4"
      >
        <span className="font-mono text-xs text-accent">{index}</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted">
          {label}
        </span>
        <span className="h-px flex-1 bg-line" />
      </motion.div>

      <h2 className="font-expanded mt-6 text-[clamp(2.6rem,7vw,6.5rem)] font-black uppercase leading-[0.92] tracking-tight text-ink">
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: "100%", filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: "0%", filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.12 + i * 0.06 }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h2>
    </div>
  );
}
