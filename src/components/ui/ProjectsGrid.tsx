"use client";

import { BrainCircuit, Microscope, Code, Bot, Car } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";
import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

// The data for your projects, tailored from your updated resume
const projectsData = [
  {
    area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
    icon: <Bot className="h-4 w-4 text-white" />,
    title: "Autonomous Prospect Search Agent",
    description: "Designed and implemented an autonomous software agent to discover B2B companies and professional contacts within the USA, filtering results based on a specific Ideal Customer Profile (ICP).",
    date: "Jan. 2026",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2670&auto=format&fit=crop"
  },
  {
    area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
    icon: <Car className="h-4 w-4 text-white" />,
    title: "Formula 1 Prediction Model",
    description: "Developed a predictive modeling tool focused on Formula 1 motor racing, utilizing Python to analyze historical data and variables to forecast race results and performance metrics.",
    date: "Dec. 2025",
    image: "https://images.unsplash.com/photo-1532906436402-23c21759247c?q=80&w=2670&auto=format&fit=crop"
  },
  {
    area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]",
    icon: <Code className="h-4 w-4 text-white" />,
    title: "Job Search Automation Tool",
    description: "Created a customized, programmatic solution to streamline the job hunting and application process, leveraging Python to automate repetitive search tasks.",
    date: "Sept. – Nov. 2025",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2670&auto=format&fit=crop"
  },
  {
    area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
    icon: <Microscope className="h-4 w-4 text-white" />,
    title: "Microplastics Detection ML",
    description: "Developed machine learning models for predicting microplastic contamination in soil samples. Built comprehensive data preprocessing pipelines and feature engineering workflows.",
    date: "Mar. – Jul. 2024",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=2670&auto=format&fit=crop"
  },
  {
    area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]",
    icon: <BrainCircuit className="h-4 w-4 text-white" />,
    title: "Hyperspectral U-Net Classifier",
    description: "Implemented U-Net architecture for hyperspectral image segmentation, achieving over 85% accuracy in metal classification. Developed a real-time Streamlit interface for interactive deployment.",
    date: "Jan. – Dec. 2024",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
  },
];

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  date: string;
  image?: string;
}

const GridItem = ({ area, icon, title, description, date, image }: GridItemProps) => {
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
        <div className="group relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-zinc-800 bg-zinc-900 p-6 shadow-sm md:p-6 transition-colors duration-500 hover:border-zinc-700/50">
          
          {/* Hover Image Background */}
          {image && (
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none">
              <Image 
                src={image} 
                alt={title} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                unoptimized 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
            </div>
          )}

          <div className="relative z-10 flex flex-1 flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <div className="w-fit rounded-lg border-[0.75px] border-zinc-700 bg-zinc-800 p-2">
                {icon}
              </div>
              <span className="text-xs font-medium text-zinc-500 bg-zinc-800/80 px-3 py-1 rounded-full border border-zinc-700/50">
                {date}
              </span>
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
