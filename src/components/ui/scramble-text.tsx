"use client";

import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+";
const TICK_MS = 50;
const MAX_ITERATIONS = 10;

function scrambleAll(text: string) {
  return text
    .split("")
    .map((ch) => (ch === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]))
    .join("");
}

/**
 * Character-scramble reveal. Re-runs whenever `text` changes.
 * Reveal direction "start": characters lock in progressively from the left
 * while the remaining characters keep scrambling (max 10 ticks per char).
 */
export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(() => scrambleAll(text));

  useEffect(() => {
    setDisplay(scrambleAll(text));
    let frame = 0;
    const id = window.setInterval(() => {
      frame += 1;
      const lockCount = Math.ceil((frame / MAX_ITERATIONS) * text.length);
      if (lockCount >= text.length) {
        setDisplay(text);
        window.clearInterval(id);
        return;
      }
      setDisplay(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " " || i < lockCount) return ch;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [text]);

  return <span className={className}>{display}</span>;
}
