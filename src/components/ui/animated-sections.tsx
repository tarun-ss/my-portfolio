"use client";

import { useEffect } from "react";

export function AnimatedSections() {
  useEffect(() => {
    const sections = document.querySelectorAll(
      "#skills, #experience, #projects, #contact, footer"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "-60px" }
    );

    sections.forEach((section) => {
      (section as HTMLElement).style.opacity = "0";
      (section as HTMLElement).style.transform = "translateY(40px)";
      (section as HTMLElement).style.transition =
        "opacity 0.7s ease-out, transform 0.7s ease-out";
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
