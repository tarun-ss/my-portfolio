"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#skills", label: "Skills" },
  ];

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 px-4">
        <div className="container mx-auto flex items-center justify-between p-4 bg-black/30 backdrop-blur-sm border border-white/10 rounded-full">
          {/* Name/Logo */}
          <Link href="/" className="text-4xl font-bold text-white">
            S TARUN
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 text-lg font-medium text-slate-300">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white transition-colors px-3 py-2">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Socials & Contact */}
          <div className="hidden md:flex items-center gap-4">
            {/* GitHub and LinkedIn icons */}
            <GradientButton asChild variant="variant" className="p-3 rounded-full min-w-0">
              <a href="https://github.com/tarun-ss" target="_blank" rel="noopener noreferrer">
                <Github className="h-7 w-7 text-white" />
              </a>
            </GradientButton>
            <GradientButton asChild variant="variant" className="p-3 rounded-full min-w-0">
              <a href="https://linkedin.com/in/tarun-s-192273223" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-7 w-7 text-white" />
              </a>
            </GradientButton>
            {/* Changed to scroll to #contact instead of mailto */}
            <GradientButton asChild className="px-6 py-3 text-lg">
              <Link href="#contact">
                <Mail className="h-5 w-5 mr-2" />
                Contact
              </Link>
            </GradientButton>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-8 w-8 text-white" /> : <Menu className="h-8 w-8 text-white" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-24 left-0 right-0 z-40 mx-4">
          <div className="bg-black/50 backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-2xl text-slate-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {/* Social links in mobile menu */}
            <div className="flex items-center gap-4 mt-4">
              <GradientButton asChild variant="variant" className="p-3 rounded-full min-w-0">
                <a href="https://github.com/tarun-ss" target="_blank" rel="noopener noreferrer">
                  <Github className="h-7 w-7 text-white" />
                </a>
              </GradientButton>
              <GradientButton asChild variant="variant" className="p-3 rounded-full min-w-0">
                <a href="https://linkedin.com/in/tarun-s-192273223" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-7 w-7 text-white" />
                </a>
              </GradientButton>
            </div>
            {/* Changed to scroll to #contact in mobile menu too */}
            <GradientButton asChild className="w-full mt-4 py-4 text-xl">
              <Link href="#contact" onClick={() => setIsMenuOpen(false)}>
                <Mail className="h-6 w-6 mr-2" />
                Contact
              </Link>
            </GradientButton>
          </div>
        </div>
      )}
    </>
  );
}