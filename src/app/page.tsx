"use client";

import { ShaderAnimation } from "@/components/ui/shader-animation";
import { ContainerTextScroll } from "@/components/ui/container-text-scroll";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import CyberneticBentoComponent from "@/components/ui/cybernetic-bento-grid-1";
import { Timeline } from "@/components/ui/timeline";
import React from "react";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { IconCloud } from "@/components/ui/interactive-icon-cloud";
import { StarsBackground as Stars } from "@/components/ui/stars";
import { ProjectsGrid } from "@/components/ui/ProjectsGrid";
import { PremiumContact } from "@/components/ui/premium-contact";
import { Mail, Phone, MapPin } from "lucide-react";
import { MagicCursor } from "@/components/ui/magic-cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";
// import { SplineScene } from "@/components/ui/spline-scene";
import { TypeAnimation } from "react-type-animation";
import dynamic from "next/dynamic";
import { FloatingParticles } from "@/components/ui/floating-particles";
import { EmojiReaction } from "@/components/ui/emoji-reaction";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { KonamiCode } from "@/components/ui/konami-code";
import { motion } from "framer-motion";
import { InteractiveParticles } from "@/components/ui/interactive-particles";

const SplineScene = dynamic(() => import("@/components/ui/spline-scene").then(mod => mod.SplineScene), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-black/50" />
});


// Re-usable component for the gradient cards in the timeline
const ExperienceCard = ({ children }: { children: React.ReactNode }) => {
  return <div className="gradient-card">{children}</div>;
};

// Icon slugs for the new IconCloud, based on your resume
const iconSlugs = [
  "python", "java", "c", "r", "javascript", "html5", "css3", "react",
  "nodedotjs", "mysql", "scikitlearn", "opencv", "streamlit", "jira",
  "git", "github", "docker", "amazonaws", "nextdotjs", "vercel", "typescript"
];

// Data for the skills bento grid
const bentoSkills = [
  {
    id: 1,
    className: "col-span-4 md:col-span-2 row-span-2 flex flex-col justify-between",
    title: "Programming Languages",
    description: "Core languages for building robust applications and algorithms.",
    content: (
      <div className="flex flex-wrap gap-2 mt-4">
        {["Python", "Java", "C", "R"].map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.1 }}
            className="bg-cyan-900/50 text-cyan-300 text-xs font-medium px-2 py-1 rounded-full cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    )
  },
  {
    id: 2,
    className: "col-span-4 md:col-span-2 flex flex-col justify-between",
    title: "Web Technologies",
    description: "Building modern, responsive, and dynamic user interfaces.",
    content: (
      <div className="flex flex-wrap gap-2 mt-4">
        {["JavaScript", "HTML5", "CSS3", "React", "Streamlit"].map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.1 }}
            className="bg-purple-900/50 text-purple-300 text-xs font-medium px-2 py-1 rounded-full cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    )
  },
  {
    id: 3,
    className: "col-span-4 md:col-span-1 flex flex-col justify-between",
    title: "Data Science & ML",
    description: "Extracting insights from data.",
    content: (
      <div className="flex flex-wrap gap-2 mt-4">
        {["Scikit-Learn", "OpenCV"].map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.1 }}
            className="bg-pink-900/50 text-pink-300 text-xs font-medium px-2 py-1 rounded-full cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    )
  },
  {
    id: 5,
    className: "col-span-4 md:col-span-1 flex flex-col justify-between",
    title: "Project Management",
    description: "Agile development and collaboration.",
    content: (
      <div className="flex flex-wrap gap-2 mt-4">
        {["JIRA"].map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.1 }}
            className="bg-green-900/50 text-green-300 text-xs font-medium px-2 py-1 rounded-full cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    )
  },
  {
    id: 4,
    className: "col-span-4 flex flex-col justify-between",
    title: "Development & Simulation",
    description: "Tools for engineering, simulation, and database management.",
    content: (
      <div className="flex flex-wrap gap-2 mt-4">
        {["MySQL", "MATLAB", "Cadence Virtuoso"].map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.1 }}
            className="bg-amber-900/50 text-amber-300 text-xs font-medium px-2 py-1 rounded-full cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    )
  },
];

// Data for the experience and education timeline
const experienceData = [
  {
    title: "Aug 2023",
    content: (
      <ExperienceCard>
        <h3 className="font-bold text-xl text-white mb-2">Technical Intern</h3>
        <p className="font-normal text-base text-slate-400 mb-4">Hindustan Aeronautics Limited (HAL), Bangalore</p>
        <ul className="list-disc list-inside text-neutral-300 space-y-2">
          <li>Conducted technical analysis of Light Combat Aircraft (LCA Tejas) systems.</li>
          <li>Prepared detailed technical documentation and system analysis reports.</li>
        </ul>
      </ExperienceCard>
    )
  },
  {
    title: "2021-2025",
    content: (
      <ExperienceCard>
        <h3 className="font-bold text-xl text-white mb-2">B.Tech in Electronics and Computer Engineering</h3>
        <p className="font-normal text-base text-slate-400 mb-4">Vellore Institute of Technology, India</p>
        <p className="text-neutral-300">CGPA: 8.18/10 (First Class with Distinction)</p>
      </ExperienceCard>
    )
  },
  {
    title: "2021",
    content: (
      <ExperienceCard>
        <h3 className="font-bold text-xl text-white mb-2">Higher Secondary Education (CBSE)</h3>
        <p className="font-normal text-base text-slate-400 mb-4">Amara Jyothi Public School, Bangalore</p>
        <p className="text-neutral-300">Percentage: 83% (Distinction)</p>
      </ExperienceCard>
    )
  },
  {
    title: "2019",
    content: (
      <ExperienceCard>
        <h3 className="font-bold text-xl text-white mb-2">Secondary Education (CBSE)</h3>
        <p className="font-normal text-base text-slate-400 mb-4">Amara Jyothi Public School, Bangalore</p>
        <p className="text-neutral-300">Percentage: 77% (First Class)</p>
      </ExperienceCard>
    )
  }
];

// Contact details tailored from your resume
const userContactDetails = {
  email: {
    icon: Mail,
    title: "Email",
    value: "tarun.sathya23@gmail.com",
    link: "mailto:tarun.sathya23@gmail.com",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  phone: {
    icon: Phone,
    title: "Phone",
    value: "+91 8073 820 553",
    link: "tel:+918073820553",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  address: {
    icon: MapPin,
    title: "Location",
    value: "Bangalore, India",
    link: "https://www.google.com/maps/search/?api=1&query=Bangalore",
    gradient: "from-purple-500/20 to-pink-500/20",
  }
};


export default function HomePage() {
  return (
    <div className="bg-black">
      <div className="fixed inset-0 -z-20 pointer-events-none">
        <Stars />
      </div>
      <AnimatedBackground />
      <FloatingParticles />
      <MagicCursor />
      <ScrollProgress />
      <EmojiReaction />
      <KonamiCode />

      <div className="relative z-10">
        {/* SECTION 1: INTRO & ICON CLOUD */}
        <section className="relative flex h-screen w-full items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative z-20 flex max-w-7xl w-full items-center justify-center lg:justify-between px-4">
            <div className="max-w-xl text-white text-center lg:text-left">
              <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 min-h-[160px] md:min-h-[220px]">
                <TypeAnimation
                  sequence={[
                    'Innovate. Engineer. Create.',
                    2000,
                    'Building the Future.',
                    2000,
                    'Turning Coffee into Code.',
                    2000,
                    'Designing Experiences.',
                    2000
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </h1>
              <p className="mt-6 text-lg text-slate-300">
                An Electronics and Computer Engineering graduate passionate about building robust applications and exploring the frontiers of technology.
              </p>
            </div>
            <div className="hidden lg:flex flex-1 -mr-20">
              <IconCloud iconSlugs={iconSlugs} />
            </div>
          </div>
        </section>

        {/* SECTION 2: GOOEY TEXT HERO */}
        <section className="relative">
          <ContainerTextScroll
            titleComponent={
              <div className="flex flex-col items-center">
                <h2 className="text-2xl md:text-4xl font-semibold text-slate-200 mb-4">
                  The Portfolio of
                </h2>
                <div className="h-40 md:h-48 w-full flex items-center justify-center">
                  <GooeyText
                    texts={["TARUN", "Developer", "Engineer", "Creator"]}
                    morphTime={2.5}
                    cooldownTime={0.8}
                    className="font-bold w-full"
                    textClassName="text-6xl md:text-[8rem] leading-none"
                  />
                </div>
              </div>
            }
          >
            <div className="h-full w-full relative">
              <InteractiveParticles />
            </div>
          </ContainerTextScroll>
        </section>

        {/* SECTIONS WRAPPER */}
        <div className="relative bg-black/80 backdrop-blur-sm">
          {/* SECTION 3: SKILLS */}
          <section id="skills" className="scroll-mt-20">
            <ContainerScroll
              titleComponent={
                <h2 className="text-4xl font-semibold text-white text-center">
                  A showcase of my
                  <br />
                  <span className="text-7xl md:text-[8rem] font-bold mt-1 leading-none">
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

          {/* SECTION 4: EXPERIENCE */}
          <section id="experience" className="scroll-mt-20">
            <Timeline data={experienceData} />
          </section>

          {/* SECTION 5: PROJECTS */}
          <section id="projects" className="py-20 lg:py-32 scroll-mt-20">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl md:text-7xl font-bold text-white text-center mb-12">
                My Projects
              </h2>
              <ProjectsGrid />
            </div>
          </section>

          {/* SECTION 6: CONTACT */}
          <section id="contact" className="scroll-mt-20">
            <PremiumContact contactDetails={userContactDetails} />
          </section>

          {/* FOOTER */}
          <footer className="py-12 text-center text-slate-400">
            <p>&copy; {new Date().getFullYear()} S Tarun. All Rights Reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}