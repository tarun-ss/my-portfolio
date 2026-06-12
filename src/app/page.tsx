import React from "react";
import dynamic from "next/dynamic";
import { bentoSkills, experienceData, userContactDetails } from "@/data/portfolio-data";

const BentoIntro = dynamic(() => import("@/components/ui/bento-intro").then(mod => mod.BentoIntro));
const CyberneticBentoComponent = dynamic(() => import("@/components/ui/cybernetic-bento-grid-1"));
const Timeline = dynamic(() => import("@/components/ui/timeline").then(mod => mod.Timeline));
const ProjectsGrid = dynamic(() => import("@/components/ui/ProjectsGrid").then(mod => mod.ProjectsGrid));
const PremiumContact = dynamic(() => import("@/components/ui/premium-contact").then(mod => mod.PremiumContact));
const ContainerScroll = dynamic(() => import("@/components/ui/container-scroll-animation").then(mod => mod.ContainerScroll));
const ScrollProgress = dynamic(() => import("@/components/ui/scroll-progress").then(mod => mod.ScrollProgress), { ssr: false });

export default function HomePage() {
  const mobileSkills = [
    { title: "Programming Languages", tags: ["Python", "Java", "JavaScript", "HTML", "R", "R Markdown"] },
    { title: "Libraries & Frameworks", tags: ["Scikit-learn", "Pandas", "NumPy", "Streamlit", "U-Net"] },
    { title: "Developer Tools", tags: ["Git", "GitHub", "Jupyter", "VS Code"] },
    { title: "Spoken Languages", tags: ["English (C1)", "German (A1)"] },
  ];

  return (
    <div className="bg-black min-h-screen">
      <div className="fixed inset-0 -z-20 pointer-events-none bg-black" />
      <ScrollProgress />

      <div className="relative z-10">
        <section id="about" className="relative pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-16 md:pb-20 flex items-center justify-center bg-black">
          <div className="relative z-10 w-full max-w-7xl mx-auto p-4 md:p-8">
            <BentoIntro />
          </div>
        </section>

        <div className="relative bg-black/80 backdrop-blur-sm">

          {/* SKILLS */}
          <section id="skills" className="scroll-mt-20">
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
          </section>

          {/* EXPERIENCE */}
          <section id="experience" className="scroll-mt-20">
            <Timeline data={experienceData} />
          </section>

          {/* PROJECTS */}
          <section id="projects" className="py-20 lg:py-32 scroll-mt-20">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl md:text-7xl font-bold text-white text-center mb-12">My Projects</h2>
              <ProjectsGrid />
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" className="scroll-mt-20">
            <PremiumContact contactDetails={userContactDetails} />
          </section>

          {/* FOOTER */}
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

        </div>
      </div>
    </div>
  );
}
