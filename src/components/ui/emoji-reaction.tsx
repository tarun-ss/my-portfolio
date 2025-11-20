"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface FloatingEmoji {
    id: number;
    emoji: string;
    x: number;
}

const emojis = ["👍", "💯", "🔥", "❤️", "🚀", "✨"];

export const EmojiReaction = () => {
    const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const addEmoji = (emoji: string) => {
        const id = Date.now();
        const x = Math.random() * 80 + 10; // 10-90% from left
        setFloatingEmojis((prev) => [...prev, { id, emoji, x }]);
        setTimeout(() => {
            setFloatingEmojis((prev) => prev.filter((e) => e.id !== id));
        }, 3000);
    };

    return (
        <>
            {/* Floating Emojis */}
            <AnimatePresence>
                {floatingEmojis.map((item) => (
                    <motion.div
                        key={item.id}
                        className="fixed bottom-0 text-4xl md:text-6xl pointer-events-none z-50"
                        style={{ left: `${item.x}%` }}
                        initial={{ y: 0, opacity: 1, scale: 0 }}
                        animate={{ y: -500, opacity: 0, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 3, ease: "easeOut" }}
                    >
                        {item.emoji}
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Emoji Picker Button - larger on mobile */}
            <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.8 }}
                            className="absolute bottom-16 md:bottom-20 right-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 md:p-3 flex gap-2"
                        >
                            {emojis.map((emoji) => (
                                <motion.button
                                    key={emoji}
                                    onClick={() => addEmoji(emoji)}
                                    className="text-2xl md:text-3xl hover:scale-125 transition-transform p-1"
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {emoji}
                                </motion.button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl md:text-2xl shadow-lg hover:shadow-xl transition-shadow"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    😊
                </motion.button>
            </div>
        </>
    );
};
