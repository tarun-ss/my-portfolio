"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NAME = ["T", "A", "R", "U", "N"];

export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("lenis-stopped");
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setDone(true);
      document.documentElement.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[3000] flex flex-col items-center justify-center bg-base"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{
            clipPath: "inset(0% 0% 100% 0%)",
            transition: { duration: 0.7, ease: [0.42, 0, 0.21, 1], delay: 0.15 },
          }}
        >
          <div className="overflow-hidden">
            <div className="flex">
              {NAME.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "115%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.7,
                    ease: [0.65, 0, 0.35, 1],
                    delay: 0.2 + i * 0.06,
                  }}
                  className="font-expanded font-black text-ink leading-none tracking-tight text-[18vw] md:text-[9rem]"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="mt-4 font-mono text-sm uppercase tracking-[0.35em] text-muted"
          >
            Data Science · ML Engineering
          </motion.span>

          <div className="absolute bottom-14 left-1/2 h-px w-40 -translate-x-1/2 bg-line">
            <motion.div
              className="h-full bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1], delay: 0.25 }}
              style={{ transformOrigin: "left" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
