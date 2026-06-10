"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { InteractiveParticles } from "@/components/ui/interactive-particles";
import Image from "next/image";
import { MapPin, Globe } from "lucide-react";

interface VideoScrollHeroProps {
  videoSrc?: string;
  enableAnimations?: boolean;
  className?: string;
  startScale?: number;
}

export function VideoScrollHero({
  videoSrc = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  enableAnimations = true,
  className = "",
  startScale = 0.25,
}: VideoScrollHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [scrollScale, setScrollScale] = useState(startScale);

  useEffect(() => {
    if (!enableAnimations || shouldReduceMotion) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress based on container position
      const scrolled = Math.max(0, -rect.top);
      const maxScroll = containerHeight - windowHeight;
      const progress = Math.min(scrolled / maxScroll, 1);
      
      // Scale from startScale to 1
      const newScale = startScale + (progress * (1 - startScale));
      setScrollScale(newScale);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [enableAnimations, shouldReduceMotion, startScale]);

  const shouldAnimate = enableAnimations && !shouldReduceMotion;

  return (
    <div className={`relative ${className}`}>
      {/* Hero Section with Video */}
      <div
        ref={containerRef}
        className="relative h-[200vh] bg-background"
      >
        {/* Fixed Video Container */}
        <div className="sticky top-0 w-full h-screen flex items-center justify-center z-10">
          <div
            className="relative flex items-center justify-center will-change-transform"
            style={{
              transform: shouldAnimate ? `scale(${scrollScale})` : 'scale(1)',
              transformOrigin: "center center",
            }}
          >
            {/* Stunning Abstract Background Image instead of generic video */}
            <div className="w-[80vw] max-w-4xl h-[60vh] relative shadow-2xl rounded-2xl border border-white/10 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                alt="Abstract Tech Background"
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Video Overlay Content */}
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center rounded-2xl overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="text-center text-white relative z-10 w-full flex flex-col items-center">
                <div className="h-24 md:h-32 lg:h-40 w-full flex items-center justify-center mb-2">
                  <GooeyText
                    texts={["TARUN", "Developer", "Data Scientist", "Engineer"]}
                    morphTime={2.5}
                    cooldownTime={0.8}
                    className="font-bold w-full"
                    textClassName="text-6xl md:text-8xl lg:text-[8rem] leading-none text-white drop-shadow-2xl"
                  />
                </div>
                
                <motion.p
                  className="text-lg md:text-2xl lg:text-3xl text-white/90 max-w-2xl px-4 mx-auto font-medium tracking-wide"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 1.0,
                    duration: 0.8,
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                  }}
                >
                  Data Science Master's Student at Basel
                </motion.p>
                
                {/* Personal Touch: Glassmorphic ID Pills */}
                <motion.div
                  className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mt-8 md:mt-12 w-full max-w-4xl px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
                >
                  {/* Photo & Name */}
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full pr-5 md:pr-6 pl-2 py-1.5 md:py-2 backdrop-blur-md hover:bg-white/10 transition-colors">
                     <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-white/20">
                       <Image src="/profile.png" alt="Tarun" fill className="object-cover" unoptimized />
                     </div>
                     <div className="text-left leading-tight hidden sm:block">
                       <p className="text-white font-medium text-xs md:text-sm">Tarun Sathyanarayanan</p>
                       <p className="text-white/50 text-[10px] md:text-xs">University of Basel</p>
                     </div>
                  </div>
                  
                  {/* Location */}
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 md:px-5 py-2 md:py-3 backdrop-blur-md hover:bg-white/10 transition-colors">
                     <MapPin className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
                     <span className="text-white/80 text-xs md:text-sm">Basel, Switzerland</span>
                  </div>
                  
                  {/* Languages */}
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 md:px-5 py-2 md:py-3 backdrop-blur-md hover:bg-white/10 transition-colors">
                     <Globe className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" />
                     <span className="text-white/80 text-xs md:text-sm">EN / DE</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
