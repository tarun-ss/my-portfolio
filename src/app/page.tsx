import React from "react";
import dynamic from "next/dynamic";
import { bentoSkills, experienceData, userContactDetails } from "@/data/portfolio-data";

// Lazy-loaded heavy UI Components
const BentoIntro = dynamic(() => import("@/components/ui/bento-intro").then(mod => mod.BentoIntro));
const CyberneticBentoComponent = dynamic(() => import("@/components/ui/cybernetic-bento-grid-1"));
const Timeline = dynamic(() => import("@/components/ui/timeline").then(mod => mod.Timeline));
const ProjectsGrid = dynamic(() => import("@/components/ui/ProjectsGrid").then(mod => mod.ProjectsGrid));
const PremiumContact = dynamic(() => import("@/components/ui/premium-contact").then(mod => mod.PremiumContact));
const ContainerScroll = dynamic(() => import("@/components/ui/container-scroll-animation").then(mod => mod.ContainerScroll));

// Lazy-loaded client utilities
const ScrollProgress = dynamic(() => import("@/components/ui/scroll-progress").then(mod => mod.ScrollProgress), { ssr: false });
const EmojiReaction = dynamic(() => import("@/components/ui/emoji-reaction").then(mod => mod.EmojiReaction), { ssr: false });
const KonamiCode = dynamic(() => import("@/components/ui/konami-code").then(mod => mod.KonamiCode), { ssr: false });

export default function HomePage() {
  return (
    <div className="bg-black min-h-screen">
      <div className="fixed inset-0 -z-20 pointer-events-none bg-black" />
      <ScrollProgress />
      <EmojiReaction />
      <KonamiCode />

      <div className="relative z-10">
        {/* SECTION 1: BENTO HERO */}
        <section className="relative pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-16 md:pb-20 flex items-center justify-center bg-black">
          <div className="relative z-10 w-full max-w-7xl mx-auto p-4 md:p-8">
            <BentoIntro />
          </div>
        </section>

        <div className="relative bg-black/80 backdrop-blur-sm">

          {/* SECTION 2: SKILLS */}
          <section id="skills" className="scroll-mt-20">
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
              <div className="w-full h-full transform-gpu scale-[0.8] md:scale-[0.9] flex items-center justify-center">
                <CyberneticBentoComponent items={bentoSkills} />
              </div>
            </ContainerScroll>
          </section>

          {/* SECTION 3: EXPERIENCE */}
          <section id="experience" className="scroll-mt-20">
            <Timeline data={experienceData} />
          </section>

          {/* SECTION 4: PROJECTS */}
          <section id="projects" className="py-20 lg:py-32 scroll-mt-20">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl md:text-7xl font-bold text-white text-center mb-12">
                My Projects
              </h2>
              <ProjectsGrid />
            </div>
          </section>

          {/* SECTION 5: CONTACT */}
          <section id="contact" className="scroll-mt-20">
            <PremiumContact contactDetails={userContactDetails} />
          </section>

          <footer className="py-12 text-center text-slate-400">
            <p>&copy; {new Date().getFullYear()} Tarun Sathyanarayanan. All Rights Reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
