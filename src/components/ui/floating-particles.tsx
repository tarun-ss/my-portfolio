"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface Particle {
    id: number;
    size: number;
    x: number;
    y: number;
    duration: number;
    delay: number;
    shape: "circle" | "square" | "triangle";
    color: string;
}

export const FloatingParticles = () => {
    const particles = useMemo(() => {
        const colors = [
            "rgba(99, 102, 241, 0.3)", // indigo
            "rgba(168, 85, 247, 0.3)", // purple
            "rgba(236, 72, 153, 0.3)", // pink
            "rgba(59, 130, 246, 0.3)", // blue
            "rgba(34, 211, 238, 0.3)", // cyan
        ];

        const shapes: Array<"circle" | "square" | "triangle"> = ["circle", "square", "triangle"];

        // Reduce particle count on mobile
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        const particleCount = isMobile ? 8 : 20;

        return Array.from({ length: particleCount }, (_, i) => ({
            id: i,
            size: Math.random() * (isMobile ? 20 : 30) + 10,
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: Math.random() * 20 + 20,
            delay: Math.random() * 5,
            shape: shapes[Math.floor(Math.random() * shapes.length)],
            color: colors[Math.floor(Math.random() * colors.length)],
        })) as Particle[];
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, Math.random() * 50 - 25, 0],
                        rotate: [0, 360],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: "easeInOut",
                    }}
                >
                    {particle.shape === "circle" && (
                        <div
                            className="w-full h-full rounded-full"
                            style={{ backgroundColor: particle.color }}
                        />
                    )}
                    {particle.shape === "square" && (
                        <div
                            className="w-full h-full"
                            style={{ backgroundColor: particle.color }}
                        />
                    )}
                    {particle.shape === "triangle" && (
                        <div
                            className="w-0 h-0"
                            style={{
                                borderLeft: `${particle.size / 2}px solid transparent`,
                                borderRight: `${particle.size / 2}px solid transparent`,
                                borderBottom: `${particle.size}px solid ${particle.color}`,
                            }}
                        />
                    )}
                </motion.div>
            ))}
        </div>
    );
};
