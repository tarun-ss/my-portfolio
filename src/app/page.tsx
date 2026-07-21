import React from "react";
import dynamic from "next/dynamic";
import { bentoSkills, experienceData, userContactDetails } from "@/data/portfolio-data";
import { SectionHeading } from "@/components/ui/section-heading";
import { CornerBrackets } from "@/components/ui/corner-brackets";
import { FooterCta } from "@/components/ui/footer-cta";

const BentoIntro = dynamic(() => import("@/components/ui/bento-intro").then(mod => mod.BentoIntro));
const CyberneticBentoComponent = dynamic(() => import("@/components/ui/cybernetic-bento-grid-1"));
const Timeline = dynamic(() => import("@/components/ui/timeline").then(mod => mod.Timeline));
const ProjectsGrid = dynamic(() => import("@/components/ui/ProjectsGrid").then(mod => mod.ProjectsGrid));
const PremiumContact = dynamic(() => import("@/components/ui/premium-contact").then(mod => mod.PremiumContact));
const ContainerScroll = dynamic(() => import("@/components/ui/container-scroll-animation").then(mod => mod.ContainerScroll));
const ScrollProgress = dynamic(() => import("@/components/ui/scroll-progress").then(mod => mod.ScrollProgress), { ssr: false });
const StarsBackground = dynamic(() => import("@/components/ui/stars").then(mod => mod.StarsBackground), { ssr: false });

const mobileSkills = [
  { title: "Programming Languages", tags: ["Python", "Java", "JavaScript", "HTML", "R", "R Markdown"] },
  { title: "Libraries & Frameworks", tags: ["Scikit-learn", "Pandas", "NumPy", "Streamlit", "U-Net"] },
  { title: "Developer Tools", tags: ["Git", "GitHub", "Jupyter", "VS Code"] },
  { title: "Spoken Languages", tags: ["English (C1)", "German (A1)"] },
];

export default function HomePage() {
  return (
    <StarsBackground className="bg-base" starColor="#5c5c56">
      <ScrollProgress />
      <div className="relative z-10">
        {/* Hero */}
        <section id="about" className="relative pt-28 md:pt-36 pb-16 md:pb-24 scroll-mt-20">
          <div className="mx-auto w-full max-w-[1600px] px-5 md:px-10">
            <BentoIntro />
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="relative py-14 md:py-20 scroll-mt-20">
          <div className="hidden md:block">
            <ContainerScroll
              titleComponent={
                <SectionHeading index="02" label="Capabilities" title={<>Technical<br />Skills</>} />
              }
            >
              <div className="w-full h-full transform-gpu scale-[0.9] flex items-center justify-center">
                <CyberneticBentoComponent items={bentoSkills} />
              </div>
            </ContainerScroll>
          </div>
          <div className="md:hidden px-5">
            <SectionHeading index="02" label="Capabilities" title={<>Technical<br />Skills</>} />
            <div className="grid grid-cols-1 gap-4 pt-12">
              {mobileSkills.map((skill, i) => (
                <div key={i} className="rounded-xl border border-line bg-surface p-5">
                  <h3 className="text-lg font-semibold text-ink mb-4">{skill.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.tags.map((tag, j) => (
                      <span key={j} className="font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full border border-line bg-surface2/70 text-ink/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="relative py-14 md:py-20 scroll-mt-20">
          <div className="mx-auto w-full max-w-[1600px] px-5 md:px-10">
            <SectionHeading index="03" label="Journey" title={<>Experience &<br />Education</>} />
            <div className="mt-12 md:mt-16">
              <Timeline data={experienceData} />
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="relative py-14 md:py-20 scroll-mt-20">
          <div className="mx-auto w-full max-w-[1600px] px-5 md:px-10">
            <SectionHeading index="04" label="Selected Work" title="Projects" />
            <div className="mt-12 md:mt-16">
              <ProjectsGrid />
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="relative py-14 md:py-20 scroll-mt-20">
          <div className="mx-auto w-full max-w-[1600px] px-5 md:px-10">
            <SectionHeading index="05" label="Contact" title={<>Let&apos;s<br />Talk</>} />
            <div className="mt-12 md:mt-16">
              <PremiumContact contactDetails={userContactDetails} />
            </div>
          </div>
        </section>

        {/* Acid CTA band */}
        <FooterCta />

        {/* Footer */}
        <footer className="border-t border-line">
          <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row md:px-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              © {new Date().getFullYear()} Tarun Sathyanarayanan
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              47.5596° N / 7.5886° E&nbsp;&nbsp;·&nbsp;&nbsp;v2.0 — 2026
            </p>
            <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.2em]">
              <a href="https://github.com/tarun-ss" target="_blank" rel="noopener noreferrer" className="group relative px-1.5 py-1 text-muted transition-colors hover:text-accent">
                GitHub
                <CornerBrackets />
              </a>
              <a href="https://linkedin.com/in/tarun-s-192273223" target="_blank" rel="noopener noreferrer" className="group relative px-1.5 py-1 text-muted transition-colors hover:text-accent">
                LinkedIn
                <CornerBrackets />
              </a>
              <a href="mailto:tarun.sathya23@gmail.com" className="group relative px-1.5 py-1 text-muted transition-colors hover:text-accent">
                Email
                <CornerBrackets />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </StarsBackground>
  );
}
