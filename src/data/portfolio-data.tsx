"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Mail, Phone, MapPin } from "lucide-react";

// Re-usable component for the gradient cards in the timeline
export const ExperienceCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border-[0.75px] border-white/10 bg-zinc-900/50 p-6 md:p-8 backdrop-blur-md shadow-xl transition-all duration-500 hover:bg-zinc-800/50 hover:border-white/20 hover:-translate-y-1">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

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
            whileHover={{ scale: 1.05, y: -2 }}
            className="bg-white/5 backdrop-blur-sm border border-cyan-500/30 text-cyan-200 text-xs font-medium px-3 py-1.5 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.1)] hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:border-cyan-400/50 hover:bg-cyan-900/20 transition-all duration-300 cursor-default"
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
            whileHover={{ scale: 1.05, y: -2 }}
            className="bg-white/5 backdrop-blur-sm border border-purple-500/30 text-purple-200 text-xs font-medium px-3 py-1.5 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.1)] hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:border-purple-400/50 hover:bg-purple-900/20 transition-all duration-300 cursor-default"
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
            whileHover={{ scale: 1.05, y: -2 }}
            className="bg-white/5 backdrop-blur-sm border border-pink-500/30 text-pink-200 text-xs font-medium px-3 py-1.5 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.1)] hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:border-pink-400/50 hover:bg-pink-900/20 transition-all duration-300 cursor-default"
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
            whileHover={{ scale: 1.05, y: -2 }}
            className="bg-white/5 backdrop-blur-sm border border-green-500/30 text-green-200 text-xs font-medium px-3 py-1.5 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.1)] hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:border-green-400/50 hover:bg-green-900/20 transition-all duration-300 cursor-default"
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
          <GraduationCap className="h-6 w-6 text-cyan-400" />
          <h3 className="font-bold text-xl text-white">Masters in Data Science</h3>
        </div>
        <p className="font-normal text-base text-slate-400 mb-4">University of Basel — Basel, Switzerland</p>
        <ul className="list-disc list-inside text-neutral-300 space-y-2">
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
          <Briefcase className="h-6 w-6 text-amber-400" />
          <h3 className="font-bold text-xl text-white">Technical Intern</h3>
        </div>
        <p className="font-normal text-base text-slate-400 mb-4">Hindustan Aeronautics Limited — India</p>
        <ul className="list-disc list-inside text-neutral-300 space-y-2">
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
          <GraduationCap className="h-6 w-6 text-purple-400" />
          <h3 className="font-bold text-xl text-white">B.Tech in Electronics & Computer Engineering</h3>
        </div>
        <p className="font-normal text-base text-slate-400 mb-4">Vellore Institute of Technology — Chennai, India</p>
        <ul className="list-disc list-inside text-neutral-300 space-y-2">
          <li>CGPA: 8.18 / 10.0</li>
          <li>Coursework: Machine Learning, Computer Vision, Signal Processing, Data Structures, Algorithms, Embedded Systems, and Hardware-Software Integration.</li>
        </ul>
      </ExperienceCard>
    )
  },
];

// Contact details tailored from your updated resume
export const userContactDetails = {
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
    value: "+41 779904139 (CH) / +91 8073 820 553 (IN)",
    link: "tel:+41779904139",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  address: {
    icon: MapPin,
    title: "Location",
    value: "Basel, Switzerland / Bangalore, India",
    link: "https://www.google.com/maps/search/?api=1&query=Basel+Switzerland",
    gradient: "from-purple-500/20 to-pink-500/20",
  }
};
