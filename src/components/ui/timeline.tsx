"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import { GraduationCap, Briefcase, Code2, Award } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  icon?: "education" | "work" | "project" | "award";
}

const iconMap = {
  education: GraduationCap,
  work: Briefcase,
  project: Code2,
  award: Award,
};

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref, data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 60%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [50, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-transparent font-sans"
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-[1600px] mx-auto pb-10">
        {data.map((item, index) => {
          const Icon = iconMap[item.icon || "work"];
          return (
            <div
              key={index}
              className="flex justify-start pt-10 md:pt-16 md:gap-10"
            >
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-base border border-line flex items-center justify-center">
                  <div className="h-6 w-6 rounded-full bg-accent/10 border border-accent/40 flex items-center justify-center">
                    <Icon className="h-3 w-3 text-accent" strokeWidth={2.5} />
                  </div>
                </div>
                <h3 className="hidden md:block md:pl-20 font-mono text-base uppercase tracking-[0.2em] text-muted">
                  {item.title}
                </h3>
              </div>

              <div className="relative pl-20 pr-4 md:pl-4 w-full">
                <h3 className="md:hidden block font-mono text-sm uppercase tracking-[0.2em] mb-4 text-left text-muted">
                  {item.title}
                </h3>
                {item.content}{" "}
              </div>
            </div>
          );
        })}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-white/10 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-accent via-accent/50 to-transparent from-[0%] via-[10%] rounded-full shadow-[0_0_12px_rgba(234,255,0,0.5)]"
          />
        </div>
      </div>
    </div>
  );
};
