"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const KONAMI_CODE = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
];

export const KonamiCode = () => {
    const [keys, setKeys] = useState<string[]>([]);
    const [activated, setActivated] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setKeys((prevKeys) => {
                const newKeys = [...prevKeys, e.key].slice(-10);

                if (newKeys.join(",") === KONAMI_CODE.join(",")) {
                    setActivated(true);

                    // Epic confetti explosion
                    const duration = 3000;
                    const animationEnd = Date.now() + duration;
                    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

                    const interval = setInterval(() => {
                        const timeLeft = animationEnd - Date.now();

                        if (timeLeft <= 0) {
                            clearInterval(interval);
                            setTimeout(() => setActivated(false), 2000);
                            return;
                        }

                        const particleCount = 50 * (timeLeft / duration);

                        confetti({
                            ...defaults,
                            particleCount,
                            origin: { x: Math.random(), y: Math.random() - 0.2 },
                        });
                    }, 250);

                    setTimeout(() => setKeys([]), 100);
                }

                return newKeys;
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <AnimatePresence>
            {activated && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none"
                >
                    <motion.div
                        className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white text-6xl font-bold px-12 py-8 rounded-3xl shadow-2xl"
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                            duration: 0.5,
                            repeat: 3,
                        }}
                    >
                        🎮 KONAMI CODE! 🎮
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
