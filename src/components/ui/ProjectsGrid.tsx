"use client";

import { BrainCircuit, Microscope, Code, Wind, Atom } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";
import React from "react";

// The data for your projects, tailored from your resume
const projectsData = [
  {
    area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
    icon: <Microscope className="h-4 w-4 text-white" />,
    title: "Machine Learning for Environmental Monitoring",
    description: "Developed ML models with Python & Scikit-Learn to detect microplastics in soil, contributing to environmental sustainability research.",
  },
  {
    area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
    icon: <BrainCircuit className="h-4 w-4 text-white" />,
    title: "Biomedical Data Analysis System",
    description: "Analyzed human lower joint movement using kinematic data from IMU sensors, developing Python algorithms for biomechanical data processing.",
  },
  {
    area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]",
    icon: <Code className="h-4 w-4 text-white" />,
    title: "Full-Stack Web Application",
    description: "Built a responsive scientific calculator with advanced math functions using modern web technologies like HTML5, CSS3, and JavaScript.",
  },
  {
    area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
    icon: <Wind className="h-4 w-4 text-white" />,
    title: "Statistical Weather Analysis",
    description: "Conducted comprehensive meteorological data analysis using R and RStudio, applying statistical modeling to identify weather patterns.",
  },
  {
    area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]",
    icon: <Atom className="h-4 w-4 text-white" />,
    title: "Advanced Materials Classification",
    description: "Designed a U-Net CNN model for automated metal sorting from hyperspectral imaging, achieving high accuracy with a Streamlit-based UI.",
  },
];


interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 150, damping: 20 });

  return (
    <li className={cn("min-h-[14rem] list-none", area)} style={{ perspective: "1000px" }}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full rounded-[1.25rem] border-[0.75px] border-white/10 p-2 md:rounded-[1.5rem] md:p-3"
      >
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={1}
        />
        {/* The main change is here: using explicit dark theme classes */}
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-zinc-800 bg-zinc-900 p-6 shadow-sm md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border-[0.75px] border-zinc-700 bg-zinc-800 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-white">
                {title}
              </h3>
              <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-zinc-400">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </motion.div>
    </li>
  );
};


export function ProjectsGrid() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      {projectsData.map((project, i) => (
        <GridItem key={i} {...project} />
      ))}
    </ul>
  );
}

