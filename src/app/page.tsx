

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { bentoSkills, experienceData, userContactDetails } from "@/data/portfolio-data";
import { AnimatedBackground } from "@/components/ui/animated-background";

const BentoIntro = dynamic(() => import("@/components/ui/bento-intro").then(mod => mod.BentoIntro));
const CyberneticBentoComponent = dynamic(() => import("@/components/ui/cybernetic-bento-grid-1"));
const Timeline = dynamic(() => import("@/components/ui/timeline").then(mod => mod.Timeline));
const ProjectsGrid = dynamic(() => import("@/components/ui/ProjectsGrid").then(mod => mod.ProjectsGrid));
const PremiumContact = dynamic(() => import("@/components/ui/premium-contact").then(mod => mod.PremiumContact));
const ContainerScroll = dynamic(() => import("@/components/ui/container-scroll-animation").then(mod => mod.ContainerScroll));
const ScrollProgress = dynamic(() => import("@/components/ui/scroll-progress").then(mod => mod.ScrollProgress), { ssr: false });

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

function AnimatedSection({ children, className = "", variant = "fadeUp" }: {
  children: React.ReactNode;
  className?: string;
  variant?: "fadeUp" | "fadeIn";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={variant === "fadeUp" ? fadeUp : fadeIn}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const mobileSkills = [
  { title: "Programming Languages", tags: ["Python", "Java", "JavaScript", "HTML", "R", "R Markdown"] },
  { title: "Libraries & Frameworks", tags: ["Scikit-learn", "Pandas", "NumPy", "Streamlit", "U-Net"] },
  { title: "Developer Tools", tags: ["Git", "GitHub", "Jupyter", "VS Code"] },
  { title: "Spoken Languages", tags: ["English (C1)", "German (A1)"] },
];

export default function HomePage() {
  return (
    <div className="bg-black min-h-screen">
      <AnimatedBackground />
      <ScrollProgress />

      <div className="relative z-10">

        {/* HERO */}
        <section id="about" className="relative pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-16 md:pb-20 flex items-center justify-center bg-transparent">
          <div className="relative z-10 w-full max-w-7xl mx-auto p-4 md:p-8">
            <BentoIntro />
          </div>
        </section>

        <div className="relative">

          {/* SKILLS */}
          <section id="skills" className="scroll-mt-20">
            <AnimatedSection variant="fadeUp">
              <div className="hidden md:block">
                <ContainerScroll
                  titleComponent={
                    <h2 className="text-4xl font-semibold text-white text-center">
                      A showcase of my
                      <br />
                      <span className="text-4xl sm:text-6xl md:text-[8rem] font-bold mt-1 leading-none">
                        Technical Skills
                      </span>
                    </h2>
                  }
                >
                  <div className="w-full h-full transform-gpu scale-[0.9] flex items-center justify-center">
                    <CyberneticBentoComponent items={bentoSkills} />
                  </div>
                </ContainerScroll>
              </div>
              <div className="md:hidden px-4 py-16">
                <h2 className="text-3xl font-bold text-white text-center mb-10">Technical Skills</h2>
                <div className="grid grid-cols-1 gap-4">
                  {mobileSkills.map((skill, i) => (
                    <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                      <h3 className="text-lg font-semibold text-white mb-4">{skill.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {skill.tags.map((tag, j) => (
                          <span key={j} className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-zinc-700 text-zinc-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* EXPERIENCE */}
          <section id="experience" className="scroll-mt-20">
            <AnimatedSection variant="fadeUp">
              <Timeline data={experienceData} />
            </AnimatedSection>
          </section>

          {/* PROJECTS */}
          <section id="projects" className="py-20 lg:py-32 scroll-mt-20">
            <AnimatedSection variant="fadeUp">
              <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-7xl font-bold text-white text-center mb-12">
                  My Projects
                </h2>
                <ProjectsGrid />
              </div>
            </AnimatedSection>
          </section>

          {/* CONTACT */}
          <section id="contact" className="scroll-mt-20">
            <AnimatedSection variant="fadeIn">
              <PremiumContact contactDetails={userContactDetails} />
            </AnimatedSection>
          </section>

          {/* FOOTER */}
          <AnimatedSection variant="fadeIn">
            <footer className="py-10 border-t border-white/10">
              <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-slate-400 text-sm">© {new Date().getFullYear()} Tarun Sathyanarayanan</p>
                <div className="flex items-center gap-6 text-sm">
                  <a href="https://github.com/tarun-ss" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">GitHub</a>
                  <a href="https://linkedin.com/in/tarun-s-192273223" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">LinkedIn</a>
                  <a href="mailto:tarun.sathya23@gmail.com" className="text-slate-400 hover:text-white transition-colors">Email</a>
                </div>
              </div>
            </footer>
          </AnimatedSection>

        </div>
      </div>
    </div>
  );
}
