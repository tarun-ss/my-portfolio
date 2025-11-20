"use client";

import { motion } from "framer-motion";

export const WaveDivider = ({ className = "" }: { className?: string }) => {
    return (
        <div className={`relative w-full overflow-hidden ${className}`}>
            <svg
                className="w-full h-24"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
            >
                <motion.path
                    d="M0,0 C300,100 900,100 1200,0 L1200,120 L0,120 Z"
                    fill="url(#wave-gradient)"
                    initial={{ d: "M0,0 C300,100 900,100 1200,0 L1200,120 L0,120 Z" }}
                    animate={{
                        d: [
                            "M0,0 C300,100 900,100 1200,0 L1200,120 L0,120 Z",
                            "M0,50 C300,0 900,0 1200,50 L1200,120 L0,120 Z",
                            "M0,0 C300,100 900,100 1200,0 L1200,120 L0,120 Z",
                        ],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <defs>
                    <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(99, 102, 241, 0.3)" />
                        <stop offset="50%" stopColor="rgba(168, 85, 247, 0.3)" />
                        <stop offset="100%" stopColor="rgba(236, 72, 153, 0.3)" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};
