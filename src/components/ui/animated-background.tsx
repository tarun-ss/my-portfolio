"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const AnimatedBackground = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
            {/* Animated gradient blobs - fewer on mobile */}
            <motion.div
                className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-30"
                style={{
                    background: "radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, rgba(99, 102, 241, 0) 70%)",
                }}
                animate={{
                    x: ["-10%", "110%"],
                    y: ["10%", "80%"],
                }}
                transition={{
                    duration: isMobile ? 30 : 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
                style={{
                    background: "radial-gradient(circle, rgba(168, 85, 247, 0.8) 0%, rgba(168, 85, 247, 0) 70%)",
                }}
                animate={{
                    x: ["110%", "-10%"],
                    y: ["80%", "10%"],
                }}
                transition={{
                    duration: isMobile ? 35 : 25,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                }}
            />

            {/* Only show these blobs on desktop */}
            {!isMobile && (
                <>
                    <motion.div
                        className="absolute w-[450px] h-[450px] rounded-full blur-3xl opacity-30"
                        style={{
                            background: "radial-gradient(circle, rgba(236, 72, 153, 0.8) 0%, rgba(236, 72, 153, 0) 70%)",
                        }}
                        animate={{
                            x: ["50%", "30%"],
                            y: ["-10%", "110%"],
                        }}
                        transition={{
                            duration: 22,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                        }}
                    />

                    <motion.div
                        className="absolute w-[550px] h-[550px] rounded-full blur-3xl opacity-30"
                        style={{
                            background: "radial-gradient(circle, rgba(34, 211, 238, 0.8) 0%, rgba(34, 211, 238, 0) 70%)",
                        }}
                        animate={{
                            x: ["30%", "70%"],
                            y: ["110%", "-10%"],
                        }}
                        transition={{
                            duration: 28,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                        }}
                    />
                </>
            )}

            {/* Mesh grid overlay */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
                    backgroundSize: "50px 50px",
                }}
            />
        </div>
    );
};
