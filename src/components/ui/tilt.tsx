"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const Tilt = ({
  children,
  className = "",
  rotation = 10,
  scale = 1.02,
}: {
  children: React.ReactNode;
  className?: string;
  rotation?: number;
  scale?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [rotation, -rotation]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-rotation, rotation]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale }}
      className={className}
    >
      {/* Glare effect overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl z-50 mix-blend-overlay"
        style={{
          background: useTransform(
            () =>
              `radial-gradient(circle at ${
                (x.get() + 0.5) * 100
              }% ${(y.get() + 0.5) * 100}%, rgba(255,255,255,0.1) 0%, transparent 60%)`
          ),
        }}
      />
      {children}
    </motion.div>
  );
};
