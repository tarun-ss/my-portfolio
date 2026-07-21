"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import { ScrambleText } from "@/components/ui/scramble-text";

const WORDMARK = ["T", "A", "R", "U", "N"];
const ROLES = ["Data Scientist", "ML Engineer", "Problem Solver", "Developer"];

const EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];
const LOAD_DELAY = 2.15; // after the preloader curtain lifts

function RoleRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ROLES.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="inline-flex align-bottom">
      <ScrambleText text={ROLES[index]} className="whitespace-nowrap text-accent" />
    </span>
  );
}

const metaItems = [
  {
    label: "Status",
    value: "Open to work",
    dot: true,
  },
  { label: "Education", value: "MSc Data Science · Uni. Basel" },
  { label: "Experience", value: "Technical Intern · HAL" },
  { label: "Languages", value: "English (C1) · German (A1)" },
];

export function BentoIntro() {
  return (
    <div className="w-full">
      {/* Top meta row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: LOAD_DELAY + 0.7 }}
        className="flex items-center justify-between border-b border-line pb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted"
      >
        <span>Portfolio © 2026</span>
        <span className="hidden md:inline">MSc Data Science — Uni. Basel</span>
        <span>Basel ⇄ Bengaluru</span>
      </motion.div>

      {/* Oversized wordmark */}
      <h1 className="mt-8 md:mt-12">
        <span className="sr-only">Tarun Sathyanarayanan — I turn data into decisions</span>
        <span aria-hidden className="block overflow-hidden">
          <span className="flex">
            {WORDMARK.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: LOAD_DELAY + i * 0.05 }}
                className="display-fluid font-expanded font-black uppercase text-ink"
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </span>
        <span aria-hidden className="block overflow-hidden">
          <motion.span
            initial={{ y: "112%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: LOAD_DELAY + 0.35 }}
            className="block text-right text-outline font-expanded font-black uppercase whitespace-nowrap leading-[0.9] tracking-tight text-[clamp(1.8rem,7.6vw,8rem)]"
          >
            Data→Decisions
          </motion.span>
        </span>
      </h1>

      {/* Portrait + intro */}
      <div className="mt-10 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-12 md:gap-8">
        <motion.figure
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 0.9, ease: EASE, delay: LOAD_DELAY + 0.55 }}
          className="group md:col-span-5 lg:col-span-4"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface">
            <Image
              src="/IMG_2612.jpeg"
              alt="Tarun Sathyanarayanan"
              fill
              priority
              className="object-cover object-top grayscale transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <figcaption className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
            <span>Tarun Sathyanarayanan</span>
            <span className="text-accent">Fig. 01</span>
          </figcaption>
        </motion.figure>

        <div className="flex flex-col justify-between md:col-span-7 lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: LOAD_DELAY + 0.7 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
              I am a <RoleRotator />
            </p>
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-muted md:text-2xl">
              Data Scientist &amp; ML Engineer with a passion for building{" "}
              <span className="text-ink">intelligent systems</span> — from{" "}
              <span className="text-ink">hyperspectral imaging</span> to{" "}
              <span className="text-ink">autonomous agents</span>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: LOAD_DELAY + 0.85 }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <Magnetic>
              <a
                href="#projects"
                className="btn-wipe group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.15em] text-base hover:text-white"
              >
                View Projects
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                href="#contact"
                className="link-line inline-flex items-center gap-2 px-1 py-2 font-mono text-xs uppercase tracking-[0.15em] text-ink"
              >
                Get in touch
                <ArrowUpRight className="h-4 w-4 text-accent" />
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      {/* Info strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: LOAD_DELAY + 1.05 }}
        className="mt-14 grid grid-cols-2 border-t border-line md:mt-20 md:grid-cols-4"
      >
        {metaItems.map((item, i) => (
          <div
            key={item.label}
            className={`border-line px-4 py-5 md:px-6 ${i > 0 ? "border-l max-md:[&:nth-child(3)]:border-l-0" : ""} max-md:[&:nth-child(n+3)]:border-t`}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              {item.label}
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm font-medium text-ink">
              {item.dot && (
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
              )}
              {item.value}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
