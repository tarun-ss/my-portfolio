"use client";

import { BrainCircuit, Microscope, Code, Bot, Car, ArrowUpRight } from "lucide-react";
import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { CornerBrackets } from "@/components/ui/corner-brackets";

const projectsData = [
  {
    icon: <Bot className="h-4 w-4" />,
    title: "Autonomous Prospect Search Agent",
    description: "Designed and implemented an autonomous software agent to discover B2B companies and professional contacts within the USA, filtering results based on a specific Ideal Customer Profile (ICP).",
    date: "Jan. 2026",
    github: "https://github.com/tarun-ss",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2670&auto=format&fit=crop"
  },
  {
    icon: <Car className="h-4 w-4" />,
    title: "Formula 1 Prediction Model",
    description: "Developed a predictive modeling tool focused on Formula 1 motor racing, utilizing Python to analyze historical data and variables to forecast race results and performance metrics.",
    date: "Dec. 2025",
    github: "https://github.com/tarun-ss",
    image: "https://images.unsplash.com/photo-1532906436402-23c21759247c?q=80&w=2670&auto=format&fit=crop"
  },
  {
    icon: <Code className="h-4 w-4" />,
    title: "Job Search Automation Tool",
    description: "Created a customized, programmatic solution to streamline the job hunting and application process, leveraging Python to automate repetitive search tasks.",
    date: "Sept. – Nov. 2025",
    github: "https://github.com/tarun-ss",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2670&auto=format&fit=crop"
  },
  {
    icon: <Microscope className="h-4 w-4" />,
    title: "Microplastics Detection ML",
    description: "Developed machine learning models for predicting microplastic contamination in soil samples. Built comprehensive data preprocessing pipelines and feature engineering workflows.",
    date: "Mar. – Jul. 2024",
    github: "https://github.com/tarun-ss",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=2670&auto=format&fit=crop"
  },
  {
    icon: <BrainCircuit className="h-4 w-4" />,
    title: "Hyperspectral U-Net Classifier",
    description: "Implemented U-Net architecture for hyperspectral image segmentation, achieving over 85% accuracy in metal classification. Developed a real-time Streamlit interface for interactive deployment.",
    date: "Jan. – Dec. 2024",
    github: "https://github.com/tarun-ss",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
  },
];

interface Project {
  icon: React.ReactNode;
  title: string;
  description: string;
  date: string;
  github: string;
  image: string;
}

function ProjectCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const isLast = index === total - 1;
  const seg = 1 / total;
  const start = seg * index;
  const end = seg * (index + 1);

  // Depth cue: as the NEXT card slides over, this one recedes.
  const scale = useTransform(progress, [start, end], isLast ? [1, 1] : [1, 0.97]);
  const brightness = useTransform(progress, [start, end], isLast ? [1, 1] : [1, 0.55]);
  const filter = useMotionTemplate`brightness(${brightness})`;

  return (
    <li
      className="sticky mb-[10vh] list-none [top:calc(72px_+_var(--i)*20px)] last:mb-0 md:[top:calc(96px_+_var(--i)*32px)]"
      style={{ "--i": index } as React.CSSProperties}
    >
      <motion.div
        style={{ scale, filter }}
        className="group/card relative min-h-[70vh] overflow-hidden rounded-xl border border-line bg-surface md:min-h-[66vh]"
      >
        <div className="grid h-full min-h-[inherit] md:grid-cols-2">
          {/* Content */}
          <div className="relative z-10 flex flex-col justify-between gap-8 p-6 md:p-10">
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
              <span>{project.date}</span>
            </div>

            <div>
              <div className="w-fit rounded-lg border border-line bg-surface2 p-2.5 text-ink">
                {project.icon}
              </div>
              <h3 className="mt-5 text-3xl font-expanded font-black uppercase leading-[0.95] tracking-tight text-ink md:text-5xl">
                {project.title}
              </h3>
              <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted md:text-base">
                {project.description}
              </p>
            </div>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex w-fit items-center gap-2 px-2.5 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:text-accent"
            >
              View on GitHub
              <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
              <CornerBrackets />
            </a>
          </div>

          {/* Image — right half on md+ */}
          <div className="relative hidden md:block">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover grayscale opacity-40 transition-opacity duration-700 group-hover/card:opacity-70"
              sizes="(max-width: 1600px) 50vw, 800px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/40 to-transparent" />
          </div>
        </div>
      </motion.div>
    </li>
  );
}

export function ProjectsGrid() {
  const stackRef = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  return (
    <ul ref={stackRef} className="relative">
      {projectsData.map((project, i) => (
        <ProjectCard
          key={i}
          project={project}
          index={i}
          total={projectsData.length}
          progress={scrollYProgress}
        />
      ))}
    </ul>
  );
}
