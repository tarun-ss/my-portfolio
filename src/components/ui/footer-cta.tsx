"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";

export function FooterCta() {
  return (
    <motion.a
      href="mailto:tarun.sathya23@gmail.com"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
      className="btn-wipe group block bg-accent text-base transition-colors hover:text-white [--wipe-color:var(--volt)]"
    >
      <div className="mx-auto flex max-w-[1600px] flex-col gap-10 px-5 py-16 md:flex-row md:items-end md:justify-between md:px-10 md:py-24">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-base/70 transition-colors duration-300 group-hover:text-white/70">
            05 — Contact / Next step
          </p>
          <p className="mt-6 font-expanded text-[clamp(2.5rem,8vw,7.5rem)] font-black uppercase leading-[0.9] tracking-tight">
            Let&apos;s work together
          </p>
        </div>

        <div className="flex items-end justify-between gap-8 md:flex-col md:items-end">
          <Magnetic>
            <span className="flex h-20 w-20 items-center justify-center rounded-full border border-base/30 transition-colors duration-300 group-hover:border-white/40 group-hover:bg-base group-hover:text-accent md:h-28 md:w-28">
              <ArrowUpRight className="h-8 w-8 transition-transform duration-300 group-hover:rotate-45 md:h-10 md:w-10" />
            </span>
          </Magnetic>
          <p className="text-right font-mono text-[11px] uppercase tracking-[0.2em] text-base/70 transition-colors duration-300 group-hover:text-white/70">
            Basel ⇄ Bengaluru · Usually replies within 24h
          </p>
        </div>
      </div>
    </motion.a>
  );
}
