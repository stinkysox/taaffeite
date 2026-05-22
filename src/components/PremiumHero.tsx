"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function PremiumHero({ home }: { home: any }) {
    const ref = useRef<HTMLDivElement>(null);

    // Track scroll progress of hero section
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    // Smooth cinematic transformations
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

    return (
        <section
            ref={ref}
            className="relative flex min-h-screen items-center justify-center bg-white text-[#111] px-6 overflow-hidden"
        >
            {/* ambient glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-40 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[#C6A769]/10 blur-[140px]" />
            </div>

            {/* scroll animated container */}
            <motion.div
                style={{ opacity, y, scale }}
                className="relative max-w-3xl text-center"
            >
                {/* H1 */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="font-serif text-[clamp(2.6rem,5vw,5.5rem)] leading-[1.05] tracking-[-0.03em]"
                >
                    <span className="block">{home.hero.title}</span>

                    <span className="block italic text-[#C6A769] mt-2">
                        {home.hero.titleAccent}
                    </span>

                    <span className="block">{home.hero.titleEnd}</span>
                </motion.h1>

                {/* Paragraph */}
                <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.9 }}
                    className="mt-8 text-[15px] leading-[1.9] text-zinc-500"
                >
                    Luxury wedding planning and destination celebrations crafted with
                    cinematic intention, emotional depth, and refined storytelling.
                </motion.p>

                {/* Elegant divider */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45 }}
                    className="mt-10 flex items-center justify-center gap-4"
                >
                    <div className="h-[1px] w-12 bg-zinc-200" />

                    <p className="text-[9px] tracking-[0.35em] uppercase text-zinc-400">
                        Weddings • Destinations • Storytelling
                    </p>

                    <div className="h-[1px] w-12 bg-zinc-200" />
                </motion.div>
            </motion.div>
        </section>
    );
}