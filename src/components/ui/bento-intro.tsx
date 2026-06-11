"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Globe, User, Code } from "lucide-react";
import Image from "next/image";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Tilt } from "@/components/ui/tilt";

export function BentoIntro() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="w-full flex flex-col justify-center items-center px-2 sm:px-4">
      <motion.div
        className="max-w-6xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ── Row 1: Hero (full width on mobile, 2/3 + 1/3 on desktop) ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

          {/* Box 1: Title — spans 2 cols on desktop */}
          <motion.div variants={itemVariants} className="md:col-span-2 relative min-h-[220px] sm:min-h-[260px] md:min-h-[320px]">
            <Tilt className="relative h-full w-full rounded-xl border-[0.75px] border-zinc-800/50 p-[1px] group">
              <GlowingEffect spread={60} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={1.5} />
              <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-[inherit] bg-zinc-900 p-5 sm:p-6 md:p-8 shadow-sm">
                <div className="flex items-center justify-between relative z-10">
                  <div className="w-fit rounded-lg border-[0.75px] border-zinc-700 bg-zinc-800 p-2">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xs font-medium text-zinc-500 bg-zinc-800/80 px-3 py-1 rounded-full border border-zinc-700/50">
                    Profile
                  </span>
                </div>
                <div className="space-y-3 mt-auto relative z-10 pointer-events-none">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold font-sans tracking-[-0.04em] text-white leading-[1.2]">
                    Data Science<br />
                    Master&apos;s Student<br />
                    at Basel
                  </h3>
                  <p className="font-sans text-sm md:text-base text-zinc-400 max-w-md">
                    Passionate about building intelligent systems and solving complex problems.
                  </p>
                </div>
              </div>
            </Tilt>
          </motion.div>

          {/* Box 2: Photo — spans 1 col on desktop, half height on mobile */}
          <motion.div variants={itemVariants} className="relative min-h-[200px] sm:min-h-[220px] md:min-h-[320px]">
            <Tilt className="relative h-full w-full rounded-xl border-[0.75px] border-zinc-800/50 p-[1px] group">
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={1.5} />
              <div className="relative overflow-hidden rounded-[inherit] bg-zinc-900 h-full w-full min-h-[200px] sm:min-h-[220px] md:min-h-[320px]">
                <Image
                  src="/profile.png"
                  alt="Tarun"
                  fill
                  priority
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </Tilt>
          </motion.div>
        </div>

        {/* ── Row 2: Identity (morphing) + 3 quick facts ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {/* Box 3: GooeyText — spans 2 cols on desktop */}
          <motion.div variants={itemVariants} className="col-span-2 relative min-h-[160px] sm:min-h-[180px] md:min-h-[200px]">
            <Tilt className="relative h-full w-full rounded-xl border-[0.75px] border-zinc-800/50 p-[1px] group">
              <GlowingEffect spread={60} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={1.5} />
              <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-[inherit] bg-zinc-900 p-5 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between relative z-10">
                  <div className="w-fit rounded-lg border-[0.75px] border-zinc-700 bg-zinc-800 p-2">
                    <Code className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xs font-medium text-zinc-500 bg-zinc-800/80 px-3 py-1 rounded-full border border-zinc-700/50">
                    Identity
                  </span>
                </div>
                <div className="flex-1 w-full flex items-center justify-center relative z-0 py-2">
                  <GooeyText
                    texts={["TARUN", "Developer", "Data Scientist", "Engineer"]}
                    morphTime={2.5}
                    cooldownTime={0.8}
                    className="font-bold w-full"
                    textClassName="text-3xl sm:text-4xl md:text-5xl leading-none text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  />
                </div>
              </div>
            </Tilt>
          </motion.div>

          {/* Box 4: Education */}
          <motion.div variants={itemVariants} className="relative min-h-[160px] sm:min-h-[180px] md:min-h-[200px]">
            <Tilt className="relative h-full w-full rounded-xl border-[0.75px] border-zinc-800/50 p-[1px] group">
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={1.5} />
              <div className="relative flex h-full flex-col justify-between gap-3 overflow-hidden rounded-[inherit] bg-zinc-900 p-4 sm:p-5 shadow-sm">
                <div className="flex items-center justify-between relative z-10">
                  <div className="w-fit rounded-lg border-[0.75px] border-zinc-700 bg-zinc-800 p-1.5">
                    <GraduationCap className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-[10px] font-medium text-zinc-500 bg-zinc-800/80 px-2 py-0.5 rounded-full border border-zinc-700/50">
                    Education
                  </span>
                </div>
                <div className="space-y-1 mt-auto relative z-10">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold font-sans tracking-[-0.03em] text-white leading-tight">
                    MSc Data Science
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-zinc-400">
                    Uni. of Basel, CH
                  </p>
                </div>
              </div>
            </Tilt>
          </motion.div>

          {/* Box 5: Location */}
          <motion.div variants={itemVariants} className="relative min-h-[160px] sm:min-h-[180px] md:min-h-[200px]">
            <Tilt className="relative h-full w-full rounded-xl border-[0.75px] border-zinc-800/50 p-[1px] group">
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={1.5} />
              <div className="relative flex h-full flex-col justify-between gap-3 overflow-hidden rounded-[inherit] bg-zinc-900 p-4 sm:p-5 shadow-sm">
                <div className="flex items-center justify-between relative z-10">
                  <div className="w-fit rounded-lg border-[0.75px] border-zinc-700 bg-zinc-800 p-1.5">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-[10px] font-medium text-zinc-500 bg-zinc-800/80 px-2 py-0.5 rounded-full border border-zinc-700/50">
                    Location
                  </span>
                </div>
                <div className="space-y-1 mt-auto relative z-10">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold font-sans tracking-[-0.03em] text-white leading-tight">
                    Basel, Switzerland
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-zinc-400">
                    Prev. Bangalore, IN
                  </p>
                </div>
              </div>
            </Tilt>
          </motion.div>

          {/* Box 6: Languages — spans 2 on mobile (via col-span-2) */}
          <motion.div variants={itemVariants} className="col-span-2 md:col-span-4 relative min-h-[120px] sm:min-h-[130px]">
            <Tilt className="relative h-full w-full rounded-xl border-[0.75px] border-zinc-800/50 p-[1px] group">
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={1.5} />
              <div className="relative flex h-full flex-row items-center gap-4 overflow-hidden rounded-[inherit] bg-zinc-900 px-5 sm:px-6 py-4 shadow-sm">
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-fit rounded-lg border-[0.75px] border-zinc-700 bg-zinc-800 p-2">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xs font-medium text-zinc-500 bg-zinc-800/80 px-3 py-1 rounded-full border border-zinc-700/50">
                    Languages
                  </span>
                </div>
                <div className="flex items-center gap-3 ml-auto relative z-10">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold font-sans tracking-[-0.03em] text-white">
                    English &amp; German
                  </h3>
                  <p className="hidden sm:block font-sans text-sm text-zinc-400">
                    Bilingual Fluency (C1 / A1)
                  </p>
                </div>
              </div>
            </Tilt>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}