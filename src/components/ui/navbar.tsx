"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Menu, X, FileText } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
  ];

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 px-4">
        <div className="container mx-auto flex items-center justify-between p-3 sm:p-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-full shadow-lg">
          <Link href="/" className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Tarun S.
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors px-3 py-2 rounded-full hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/tarun-ss"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/tarun-s-192273223"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-all"
            >
              <FileText className="h-4 w-4" />
              Resume
            </a>
          </div>

          <button
            className="md:hidden p-2 rounded-full text-white hover:bg-white/10 transition-all"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="md:hidden fixed top-20 left-4 right-4 z-40">
          <div className="bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-4 shadow-2xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xl text-slate-300 hover:text-white transition-colors w-full text-center py-2 rounded-xl hover:bg-white/5"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="w-full h-px bg-white/10 my-2" />
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/tarun-ss"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/in/tarun-s-192273223"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              <FileText className="h-5 w-5" />
              Download Resume
            </a>
          </div>
        </div>
      )}
    </>
  );
}
