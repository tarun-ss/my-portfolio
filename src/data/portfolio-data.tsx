"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Mail, Phone, MapPin } from "lucide-react";

// Re-usable card for the timeline entries
export const ExperienceCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-line bg-surface p-6 md:p-8 transition-all duration-500 hover:border-accent/30 hover:bg-surface2 hover:-translate-y-1">
      <div className="relative z-10">{children}</div>
    </div>
  );
};

const chipClass =
  "bg-surface2/70 border border-line text-ink/80 font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full hover:border-accent/60 hover:text-accent transition-colors duration-300 cursor-default";

// Data for the skills bento grid
export const bentoSkills = [
  {
    id: 1,
    className: "col-span-4 md:col-span-2 row-span-2 flex flex-col justify-between",
    title: "Programming Languages",
    description: "Core languages for building robust applications and data science pipelines.",
    content: (
      <div className="flex flex-wrap gap-2 mt-4">
        {["Python", "Java", "JavaScript", "HTML", "R", "R Markdown"].map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={chipClass}
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
    title: "Libraries & Frameworks",
    description: "Machine learning and data science ecosystem tools.",
    content: (
      <div className="flex flex-wrap gap-2 mt-4">
        {["Scikit-learn", "Pandas", "NumPy", "Streamlit", "U-Net"].map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={chipClass}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    )
  },
  {
    id: 3,
    className: "col-span-4 md:col-span-2 flex flex-col justify-between",
    title: "Developer Tools",
    description: "Tools for version control, development, and collaboration.",
    content: (
      <div className="flex flex-wrap gap-2 mt-4">
        {["Git", "GitHub", "Jupyter", "VS Code"].map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={chipClass}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    )
  },
  {
    id: 4,
    className: "col-span-4 md:col-span-2 flex flex-col justify-between",
    title: "Languages",
    description: "Human languages for international communication.",
    content: (
      <div className="flex flex-wrap gap-2 mt-4">
        {["English (C1)", "German (A1)"].map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={chipClass}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    )
  },
];

// Data for the experience and education timeline
export const experienceData = [
  {
    title: "Feb 2026 – Present",
    content: (
      <ExperienceCard>
        <div className="flex items-center gap-3 mb-2">
          <GraduationCap className="h-6 w-6 text-accent" />
          <h3 className="font-bold text-xl text-ink">Masters in Data Science</h3>
        </div>
        <p className="font-mono text-xs uppercase tracking-wider text-muted mb-4">University of Basel — Basel, Switzerland</p>
        <ul className="list-disc list-inside text-ink/70 space-y-2 marker:text-accent">
          <li>Focus: Natural sciences, mathematics, and statistics.</li>
        </ul>
      </ExperienceCard>
    )
  },
  {
    title: "Aug – Sept 2023",
    content: (
      <ExperienceCard>
        <div className="flex items-center gap-3 mb-2">
          <Briefcase className="h-6 w-6 text-accent" />
          <h3 className="font-bold text-xl text-ink">Technical Intern</h3>
        </div>
        <p className="font-mono text-xs uppercase tracking-wider text-muted mb-4">Hindustan Aeronautics Limited — India</p>
        <ul className="list-disc list-inside text-ink/70 space-y-2 marker:text-accent">
          <li>Gained valuable exposure to aerospace systems and engineering processes within a high-tech manufacturing environment.</li>
          <li>Applied technical knowledge and engineering principles to support practical systems workflows.</li>
        </ul>
      </ExperienceCard>
    )
  },
  {
    title: "Jul 2021 – May 2025",
    content: (
      <ExperienceCard>
        <div className="flex items-center gap-3 mb-2">
          <GraduationCap className="h-6 w-6 text-accent" />
          <h3 className="font-bold text-xl text-ink">B.Tech in Electronics & Computer Engineering</h3>
        </div>
        <p className="font-mono text-xs uppercase tracking-wider text-muted mb-4">Vellore Institute of Technology — Chennai, India</p>
        <ul className="list-disc list-inside text-ink/70 space-y-2 marker:text-accent">
          <li>CGPA: 8.18 / 10.0</li>
          <li>Coursework: Machine Learning, Computer Vision, Signal Processing, Data Structures, Algorithms, Embedded Systems, and Hardware-Software Integration.</li>
        </ul>
      </ExperienceCard>
    )
  },
];

// Contact details
export const userContactDetails = {
  email: {
    icon: Mail,
    title: "Email",
    value: "tarun.sathya23@gmail.com",
    link: "mailto:tarun.sathya23@gmail.com",
  },
  phone: {
    icon: Phone,
    title: "Phone",
    value: "+41 779904139 (CH) / +91 8073 820 553 (IN)",
    link: "tel:+41779904139",
  },
  address: {
    icon: MapPin,
    title: "Location",
    value: "Basel, Switzerland / Bangalore, India",
    link: "https://www.google.com/maps/search/?api=1&query=Basel+Switzerland",
  }
};
