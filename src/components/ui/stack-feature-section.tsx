"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  FaReact, FaAws, FaDocker, FaNodeJs, FaGithub,
  FaTwitter, FaLinkedin, FaInstagram, FaGoogle, FaApple
} from "react-icons/fa";
import {
  SiNextdotjs, SiVercel, SiRedux, SiTypescript, SiFacebook
} from "react-icons/si";

const iconConfigs = [
  { Icon: FaReact, color: "#61DAFB" },
  { Icon: FaAws, color: "#FF9900" },
  { Icon: FaDocker, color: "#2496ED" },
  { Icon: FaNodeJs, color: "#339933" },
  { Icon: SiNextdotjs, color: "#000000" },
  { Icon: SiVercel, color: "#000000" },
  { Icon: SiRedux, color: "#764ABC" },
  { Icon: SiTypescript, color: "#3178C6" },
  { Icon: FaGithub, color: "#181717" },
  { Icon: FaTwitter, color: "#1DA1F2" },
  { Icon: FaLinkedin, color: "#0077B5" },
  { Icon: FaInstagram, color: "#E1306C" },
  { Icon: FaGoogle, color: "#DB4437" },
  { Icon: FaApple, color: "#000000" },
  { Icon: SiFacebook, color: "#1877F2" },
];

export default function FeatureSection() {
  const orbitCount = 3;
  const orbitGap = 8; // rem between orbits
  const iconsPerOrbit = Math.ceil(iconConfigs.length / orbitCount);

  return (
    <section className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Orbit animation */}
      <div className="relative w-[50rem] h-[50rem] flex items-center justify-center">
        {/* Center Circle */}
        <div className="w-24 h-24 rounded-full bg-gray-50 dark:bg-gray-800 shadow-lg flex items-center justify-center">
          <FaReact className="w-12 h-12 text-blue-400" />
        </div>

        {/* Generate Orbits */}
        {[...Array(orbitCount)].map((_, orbitIdx) => {
          const size = `${12 + orbitGap * (orbitIdx + 1)}rem`; // equal spacing
          const angleStep = (2 * Math.PI) / iconsPerOrbit;

          return (
            <div
              key={orbitIdx}
              className="absolute rounded-full border-2 border-dotted border-gray-300 dark:border-gray-600"
              style={{
                width: size,
                height: size,
                animation: `spin ${12 + orbitIdx * 6}s linear infinite`,
              }}
            >
              {iconConfigs
                .slice(orbitIdx * iconsPerOrbit, orbitIdx * iconsPerOrbit + iconsPerOrbit)
                .map((cfg, iconIdx) => {
                  const angle = iconIdx * angleStep;
                  const x = 50 + 50 * Math.cos(angle);
                  const y = 50 + 50 * Math.sin(angle);

                  return (
                    <div
                      key={iconIdx}
                      className="absolute bg-white dark:bg-gray-800 rounded-full p-1 shadow-md"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {cfg.Icon && (
                        <cfg.Icon className="w-8 h-8" style={{ color: cfg.color }} />
                      )}
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>

      {/* Animation keyframes need to be in a global stylesheet */}
    </section>
  );
}
