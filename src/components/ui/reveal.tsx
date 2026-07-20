"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "right" | "bottom" | "left";

const initialClip: Record<Direction, string> = {
  right: "inset(0% 100% 0% 0%)",
  left: "inset(0% 0% 0% 100%)",
  bottom: "inset(100% 0% 0% 0%)",
};

export function Reveal({
  children,
  className,
  delay = 0,
  from = "right",
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: Direction;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: initialClip[from] }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once, margin: "-8% 0px" }}
      transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1], delay }}
      style={{ willChange: "clip-path" }}
    >
      {children}
    </motion.div>
  );
}

export function FadeUp({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
