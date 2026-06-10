"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, GraduationCap, MapPin, Globe, User, Code } from "lucide-react";
import Image from "next/image";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Tilt } from "@/components/ui/tilt";

export function BentoIntro() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-4" style={{ perspective: "1000px" }}>
      <motion.div 
        className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* TOP ROW */}
        
        {/* Box 1: Title */}
        <motion.div variants={itemVariants} className="relative h-full min-h-[350px]">
          <Tilt className="relative h-full w-full rounded-xl border-[0.75px] border-zinc-800/50 p-[1px] group">
            <GlowingEffect spread={60} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={1.5} />
            <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-[inherit] bg-zinc-900 p-6 md:p-8 shadow-sm">
              <div className="flex items-center justify-between relative z-10">
                <div className="w-fit rounded-lg border-[0.75px] border-zinc-700 bg-zinc-800 p-2">
                  <User className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs font-medium text-zinc-500 bg-zinc-800/80 px-3 py-1 rounded-full border border-zinc-700/50">
                  Profile
                </span>
              </div>
              <div className="space-y-4 mt-auto relative z-10 pointer-events-none">
                <h3 className="text-3xl md:text-4xl font-semibold font-sans tracking-[-0.04em] text-white leading-[1.2]">
                  Data Science<br />
                  Master's Student<br />
                  at Basel
                </h3>
                <p className="font-sans text-sm md:text-base text-zinc-400">
                  Passionate about building intelligent systems and solving complex problems.
                </p>
              </div>
            </div>
          </Tilt>
        </motion.div>

        {/* Box 2: Photo */}
        <motion.div variants={itemVariants} className="relative h-full min-h-[350px]">
          <Tilt className="relative h-full w-full rounded-xl border-[0.75px] border-zinc-800/50 p-[1px] group">
            <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={1.5} />
            <div className="relative overflow-hidden rounded-[inherit] bg-zinc-900 h-full w-full">
              <Image 
                src="/profile.png" 
                alt="Tarun" 
                fill 
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                unoptimized
              />
            </div>
          </Tilt>
        </motion.div>

        {/* Box 3: Gooey Text */}
        <motion.div variants={itemVariants} className="relative h-full min-h-[350px]">
          <Tilt className="relative h-full w-full rounded-xl border-[0.75px] border-zinc-800/50 p-[1px] group">
            <GlowingEffect spread={60} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={1.5} />
            <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-[inherit] bg-zinc-900 p-6 md:p-8 shadow-sm">
              <div className="flex items-center justify-between relative z-10">
                <div className="w-fit rounded-lg border-[0.75px] border-zinc-700 bg-zinc-800 p-2">
                  <Code className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs font-medium text-zinc-500 bg-zinc-800/80 px-3 py-1 rounded-full border border-zinc-700/50">
                  Identity
                </span>
              </div>
              
              <div className="flex-1 w-full flex items-center justify-center relative z-0">
                <GooeyText
                  texts={["TARUN", "Developer", "Data Scientist", "Engineer"]}
                  morphTime={2.5}
                  cooldownTime={0.8}
                  className="font-bold w-full"
                  textClassName="text-4xl md:text-5xl lg:text-6xl leading-none text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                />
              </div>
            </div>
          </Tilt>
        </motion.div>


        {/* BOTTOM ROW: Colorful Quick Facts */}

        {/* Box 4: Currently */}
        <motion.div variants={itemVariants} className="relative h-full min-h-[350px]">
          <Tilt className="relative h-full w-full rounded-xl border-[0.75px] border-zinc-800/50 p-[1px] group">
            <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={1.5} />
            <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-[inherit] bg-zinc-900 p-6 md:p-8 shadow-sm">
              <div className="flex items-center justify-between relative z-10">
                <div className="w-fit rounded-lg border-[0.75px] border-zinc-700 bg-zinc-800 p-2">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs font-medium text-zinc-500 bg-zinc-800/80 px-3 py-1 rounded-full border border-zinc-700/50">
                  Education
                </span>
              </div>
              
              <div className="space-y-3 mt-auto relative z-10">
                <h3 className="text-2xl md:text-3xl font-semibold font-sans tracking-[-0.04em] text-white leading-[1.2]">
                  MSc Data Science
                </h3>
                <p className="font-sans text-sm md:text-base text-zinc-400">
                  University of Basel, Switzerland
                </p>
              </div>
            </div>
          </Tilt>
        </motion.div>

        {/* Box 5: Based in */}
        <motion.div variants={itemVariants} className="relative h-full min-h-[350px]">
          <Tilt className="relative h-full w-full rounded-xl border-[0.75px] border-zinc-800/50 p-[1px] group">
            <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={1.5} />
            <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-[inherit] bg-zinc-900 p-6 md:p-8 shadow-sm">
              <div className="flex items-center justify-between relative z-10">
                <div className="w-fit rounded-lg border-[0.75px] border-zinc-700 bg-zinc-800 p-2">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs font-medium text-zinc-500 bg-zinc-800/80 px-3 py-1 rounded-full border border-zinc-700/50">
                  Location
                </span>
              </div>
              
              <div className="space-y-3 mt-auto relative z-10">
                <h3 className="text-2xl md:text-3xl font-semibold font-sans tracking-[-0.04em] text-white leading-[1.2]">
                  Basel, Switzerland
                </h3>
                <p className="font-sans text-sm md:text-base text-zinc-400">
                  Previously Bangalore, India
                </p>
              </div>
            </div>
          </Tilt>
        </motion.div>

        {/* Box 6: Languages */}
        <motion.div variants={itemVariants} className="relative h-full min-h-[350px]">
          <Tilt className="relative h-full w-full rounded-xl border-[0.75px] border-zinc-800/50 p-[1px] group">
            <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={1.5} />
            <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-[inherit] bg-zinc-900 p-6 md:p-8 shadow-sm">
              <div className="flex items-center justify-between relative z-10">
                <div className="w-fit rounded-lg border-[0.75px] border-zinc-700 bg-zinc-800 p-2">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs font-medium text-zinc-500 bg-zinc-800/80 px-3 py-1 rounded-full border border-zinc-700/50">
                  Languages
                </span>
              </div>
              
              <div className="space-y-3 mt-auto relative z-10">
                <h3 className="text-2xl md:text-3xl font-semibold font-sans tracking-[-0.04em] text-white leading-[1.2]">
                  English & German
                </h3>
                <p className="font-sans text-sm md:text-base text-zinc-400">
                  Bilingual Fluency (C1 / A1)
                </p>
              </div>
            </div>
          </Tilt>
        </motion.div>

      </motion.div>
    </div>
  );
}
