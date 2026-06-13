"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Globe, Briefcase, Sparkles } from "lucide-react";
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
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

          {/* Box 1: Hero */}
          <motion.div variants={itemVariants} className="md:col-span-2 relative min-h-[240px] sm:min-h-[280px] md:min-h-[340px]">
            <Tilt className="relative h-full w-full rounded-xl border-[0.75px] border-zinc-800/50 p-[1px] group">
              <GlowingEffect spread={60} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={1.5} />
              <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-[inherit] bg-zinc-900 p-5 sm:p-6 md:p-8 shadow-sm">
                {/* Open to work badge */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-medium text-emerald-400">Open to work · Bengaluru</span>
                  </div>
                  <Sparkles className="h-4 w-4 text-zinc-600" />
                </div>

                {/* Hero text */}
                <div className="space-y-3 mt-auto relative z-10 pointer-events-none">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans tracking-[-0.04em] text-white leading-[1.1]">
                    Hi, I&apos;m Tarun.
                    <br />
                    <span className="text-zinc-400 font-semibold text-2xl sm:text-3xl md:text-4xl">
                      I turn data into decisions.
                    </span>
                  </h1>
                  <p className="font-sans text-sm md:text-base text-zinc-500 max-w-md leading-relaxed">
                    Data Scientist & ML Engineer with a passion for building intelligent systems — from hyperspectral imaging to autonomous agents.
                  </p>
                  <div className="flex items-center gap-3 pt-1">
                    <a
                      href="#projects"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-all"
                    >
                      View Projects
                    </a>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-700 text-white text-sm font-medium hover:border-zinc-500 hover:bg-white/5 transition-all"
                    >
                      Contact Me
                    </a>
                  </div>
                </div>
              </div>
            </Tilt>
          </motion.div>

          {/* Box 2: Photo */}
          <motion.div variants={itemVariants} className="relative min-h-[220px] sm:min-h-[240px] md:min-h-[340px]">
            <Tilt className="relative h-full w-full rounded-xl border-[0.75px] border-zinc-800/50 p-[1px] group">
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={1.5} />
              <div className="relative overflow-hidden rounded-[inherit] bg-zinc-900 h-full w-full min-h-[220px] sm:min-h-[240px] md:min-h-[340px]">
                <Image
                  src="/profile.png"
                  alt="Tarun Sathyanarayanan"
                  fill
                  priority
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-semibold text-sm">Tarun Sathyanarayanan</p>
                  <p className="text-zinc-400 text-xs">MSc Data Science · Uni. Basel</p>
                </div>
              </div>
            </Tilt>
          </motion.div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {/* Box 3: GooeyText */}
          <motion.div variants={itemVariants} className="col-span-2 relative min-h-[160px] sm:min-h-[180px] md:min-h-[200px]">
            <Tilt className="relative h-full w-full rounded-xl border-[0.75px] border-zinc-800/50 p-[1px] group">
              <GlowingEffect spread={60} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={1.5} />
              <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-[inherit] bg-zinc-900 p-5 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between relative z-10">
                  <span className="text-xs font-medium text-zinc-500 bg-zinc-800/80 px-3 py-1 rounded-full border border-zinc-700/50">
                    I am a...
                  </span>
                </div>
                <div className="flex-1 w-full flex items-center justify-center relative z-0 py-2">
                  <GooeyText
                    texts={["Developer", "Data Scientist", "ML Engineer", "Problem Solver"]}
                    morphTime={2.5}
                    cooldownTime={0.8}
                    className="font-bold w-full"
                    textClassName="text-3xl sm:text-4xl md:text-5xl leading-none text-white"
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
                <div className="w-fit rounded-lg border-[0.75px] border-zinc-700 bg-zinc-800 p-1.5">
                  <GraduationCap className="h-4 w-4 text-white" />
                </div>
                <div className="space-y-1 mt-auto relative z-10">
                  <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Education</span>
                  <h3 className="text-base sm:text-lg font-semibold text-white leading-tight">
                    MSc Data Science
                  </h3>
                  <p className="text-xs text-zinc-400">Uni. of Basel, CH</p>
                </div>
              </div>
            </Tilt>
          </motion.div>

          {/* Box 5: Experience */}
          <motion.div variants={itemVariants} className="relative min-h-[160px] sm:min-h-[180px] md:min-h-[200px]">
            <Tilt className="relative h-full w-full rounded-xl border-[0.75px] border-zinc-800/50 p-[1px] group">
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={1.5} />
              <div className="relative flex h-full flex-col justify-between gap-3 overflow-hidden rounded-[inherit] bg-zinc-900 p-4 sm:p-5 shadow-sm">
                <div className="w-fit rounded-lg border-[0.75px] border-zinc-700 bg-zinc-800 p-1.5">
                  <Briefcase className="h-4 w-4 text-white" />
                </div>
                <div className="space-y-1 mt-auto relative z-10">
                  <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Experience</span>
                  <h3 className="text-base sm:text-lg font-semibold text-white leading-tight">
                    HAL Intern
                  </h3>
                  <p className="text-xs text-zinc-400">Hindustan Aeronautics</p>
                </div>
              </div>
            </Tilt>
          </motion.div>

          {/* Box 6: Languages + Location */}
          <motion.div variants={itemVariants} className="col-span-2 md:col-span-4 relative min-h-[100px] sm:min-h-[110px]">
            <Tilt className="relative h-full w-full rounded-xl border-[0.75px] border-zinc-800/50 p-[1px] group">
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={1.5} />
              <div className="relative flex h-full flex-row items-center justify-between overflow-hidden rounded-[inherit] bg-zinc-900 px-5 sm:px-6 py-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-fit rounded-lg border-[0.75px] border-zinc-700 bg-zinc-800 p-1.5">
                    <Globe className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Languages</p>
                    <p className="text-sm font-semibold text-white">English · German</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-zinc-800" />
                <div className="flex items-center gap-3">
                  <div className="w-fit rounded-lg border-[0.75px] border-zinc-700 bg-zinc-800 p-1.5">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Based in</p>
                    <p className="text-sm font-semibold text-white">Basel · Bengaluru</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-500">
                  <span className="px-2 py-1 rounded-full bg-zinc-800 border border-zinc-700">B.Tech ECE · VIT Chennai</span>
                </div>
              </div>
            </Tilt>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
