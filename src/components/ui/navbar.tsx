"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Github, Linkedin, Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { href: "#about", label: "About", index: "01" },
  { href: "#skills", label: "Skills", index: "02" },
  { href: "#experience", label: "Experience", index: "03" },
  { href: "#projects", label: "Projects", index: "04" },
  { href: "#contact", label: "Contact", index: "05" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 180);
    setScrolled(latest > 24);
  });

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled ? "bg-base/80 backdrop-blur-md border-b border-line" : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-10">
          <Link href="/" className="group flex items-baseline gap-1">
            <span className="font-expanded text-xl font-black uppercase tracking-tight text-ink">
              Tarun
            </span>
            <span className="font-expanded text-xl font-black uppercase tracking-tight text-accent transition-transform duration-300 group-hover:rotate-90 inline-block">
              .
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link-line group font-mono text-sm uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink"
              >
                <span className="mr-1 text-xs text-accent">{link.index}</span>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href="https://github.com/tarun-ss"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted transition-colors hover:text-ink"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/in/tarun-s-192273223"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted transition-colors hover:text-ink"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="/Tarun_sathyanarayanan_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wipe group inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 font-mono text-sm font-bold uppercase tracking-[0.15em] text-lg hover:text-white"
            >
              Resume
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <button
            className="p-1 text-ink lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-surface px-6 pb-10 pt-28 lg:hidden"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <div key={link.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1], delay: 0.15 + i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-baseline gap-3 py-2"
                    >
                      <span className="font-mono text-sm text-accent">{link.index}</span>
                      <span className="font-expanded text-6xl font-black uppercase tracking-tight text-ink">
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="flex items-center justify-between border-t border-line pt-6"
            >
              <div className="flex items-center gap-5">
                <a href="https://github.com/tarun-ss" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ink">
                  <Github className="h-5 w-5" />
                </a>
                <a href="https://linkedin.com/in/tarun-s-192273223" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ink">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
              <a
                href="/Tarun_sathyanarayanan_resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-mono text-sm font-bold uppercase tracking-[0.15em] text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Resume
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
