"use client";

import { BrainCircuit, Microscope, Code, Bot, Car, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

const projectsData = [
  {
    area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
    icon: <Bot className="h-4 w-4" />,
    title: "Autonomous Prospect Search Agent",
    description: "Designed and implemented an autonomous software agent to discover B2B companies and professional contacts within the USA, filtering results based on a specific Ideal Customer Profile (ICP).",
    date: "Jan. 2026",
    github: "https://github.com/tarun-ss",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2670&auto=format&fit=crop"
  },
  {
    area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
    icon: <Car className="h-4 w-4" />,
    title: "Formula 1 Prediction Model",
    description: "Developed a predictive modeling tool focused on Formula 1 motor racing, utilizing Python to analyze historical data and variables to forecast race results and performance metrics.",
    date: "Dec. 2025",
    github: "https://github.com/tarun-ss",
    image: "https://images.unsplash.com/photo-1532906436402-23c21759247c?q=80&w=2670&auto=format&fit=crop"
  },
  {
    area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]",
    icon: <Code className="h-4 w-4" />,
    title: "Job Search Automation Tool",
    description: "Created a customized, programmatic solution to streamline the job hunting and application process, leveraging Python to automate repetitive search tasks.",
    date: "Sept. – Nov. 2025",
    github: "https://github.com/tarun-ss",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2670&auto=format&fit=crop"
  },
  {
    area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
    icon: <Microscope className="h-4 w-4" />,
    title: "Microplastics Detection ML",
    description: "Developed machine learning models for predicting microplastic contamination in soil samples. Built comprehensive data preprocessing pipelines and feature engineering workflows.",
    date: "Mar. – Jul. 2024",
    github: "https://github.com/tarun-ss",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=2670&auto=format&fit=crop"
  },
  {
    area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]",
    icon: <BrainCircuit className="h-4 w-4" />,
    title: "Hyperspectral U-Net Classifier",
    description: "Implemented U-Net architecture for hyperspectral image segmentation, achieving over 85% accuracy in metal classification. Developed a real-time Streamlit interface for interactive deployment.",
    date: "Jan. – Dec. 2024",
    github: "https://github.com/tarun-ss",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
  },
];

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  date: string;
  github?: string;
  image?: string;
  index: number;
}

const GridItem = ({ area, icon, title, description, date, github, image, index }: GridItemProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 20 });

  return (
    <motion.li
      className={cn("min-h-[14rem] list-none", area)}
      style={{ perspective: "1000px" }}
      initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1], delay: (index % 3) * 0.1 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full"
      >
        <div className="group relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border border-line bg-surface p-6 transition-colors duration-500 hover:border-accent/30">

          {image && (
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none">
              <Image src={image} alt={title} fill className="object-cover grayscale transition-transform duration-1000 group-hover:scale-105" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
            </div>
          )}

          <div className="relative z-10 flex flex-1 flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[12px] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="w-fit rounded-lg border border-line bg-surface2 p-2 text-ink">
                  {icon}
                </div>
              </div>
              <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-muted">
                {date}
              </span>
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-2xl font-bold tracking-tight text-ink md:text-2xl text-balance">
                {title}
              </h3>
              <p className="text-[15px] md:text-base leading-relaxed" style={{ color: "#EDEBE4" }}>
                {description}
              </p>
            </div>
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line inline-flex w-fit items-center gap-2 font-mono text-sm uppercase tracking-[0.2em] text-ink transition-colors hover:text-accent mt-2"
              >
                View on GitHub
                <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.li>
  );
};

export function ProjectsGrid() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:grid-rows-2">
      {projectsData.map((project, i) => (
        <GridItem key={i} {...project} index={i} />
      ))}
    </ul>
  );
}
