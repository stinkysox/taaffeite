"use client";

import { useRef } from "react";
import Link from "next/link";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
} from "framer-motion";

export default function PremiumHero({
    home,
}: {
    home: any;
}) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 22,
        restDelta: 0.001,
    });

    /* Cinematic Scroll Motion */
    const textY = useTransform(
        smoothProgress,
        [0, 1],
        ["0%", "-14%"]
    );

    const opacity = useTransform(
        smoothProgress,
        [0, 0.85],
        [1, 0.35]
    );

    return (
        <section
            ref={containerRef}
            aria-label="Taaffeite Events Luxury Wedding Planning"
            className="relative min-h-screen overflow-hidden bg-white selection:bg-[#111] selection:text-white"
        >
            {/* SEO H1 — hidden visually but indexed */}
            <h1 className="sr-only">
                Taaffeite Events – Luxury Wedding Planning, Destination Weddings,
                Premium Celebrations & Event Experiences
            </h1>

            {/* Ambient Luxury Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] h-[400px] w-[400px] rounded-full bg-[#C6A769]/10 blur-[120px]" />

                <div className="absolute bottom-[-15%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#C6A769]/10 blur-[150px]" />
            </div>

            {/* Editorial Lines */}
            <div className="pointer-events-none absolute inset-y-0 left-6 right-6 z-0 flex justify-between md:left-10 md:right-10">
                <div className="w-px bg-black/[0.04]" />
                <div className="hidden w-px bg-black/[0.04] lg:block" />
                <div className="w-px bg-black/[0.04]" />
            </div>

            {/* MAIN CONTENT */}
            <motion.div
                style={{ y: textY, opacity }}
                className="relative z-20 flex min-h-screen items-center px-6 pt-32 md:px-10"
            >
                <div className="mx-auto w-full max-w-7xl">
                    <div className="grid items-end gap-16 lg:grid-cols-[1fr_320px]">

                        {/* LEFT CONTENT */}
                        <div className="max-w-5xl">
                            {/* Premium Label */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 1,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="mb-10"
                            >
                                <span className="text-[10px] font-medium uppercase tracking-[0.55em] text-zinc-400">
                                    Taaffeite Events • Luxury Wedding Atelier
                                </span>
                            </motion.div>

                            {/* MAIN HEADING */}
                            <div className="overflow-hidden">
                                <motion.div
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{
                                        duration: 1.6,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                >
                                    {/* Visible SEO heading */}
                                    <h2 className="mb-6 text-[1rem] uppercase tracking-[0.45em] text-[#C6A769] md:text-[1.1rem]">
                                        Taaffeite Events
                                    </h2>

                                    <div className="font-serif text-[4.5rem] leading-[0.88] tracking-[-0.05em] text-[#111] sm:text-[6rem] md:text-[8rem] lg:text-[9.5rem]">
                                        <span className="block">
                                            {home.hero.title}
                                        </span>

                                        <span className="my-1 ml-6 block italic font-light text-[#C6A769] md:ml-12">
                                            {home.hero.titleAccent}
                                        </span>

                                        <span className="block">
                                            {home.hero.titleEnd}
                                        </span>
                                    </div>
                                </motion.div>
                            </div>

                            {/* SEO Rich Description */}
                            <motion.div
                                initial={{ opacity: 0, y: 25 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.5,
                                    duration: 1.2,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="mt-14 max-w-2xl"
                            >
                                <p className="text-base font-light leading-[1.9] text-zinc-500 md:text-lg">
                                    Taaffeite Events crafts luxury weddings, destination
                                    celebrations, engagement ceremonies, receptions, and curated
                                    guest experiences through cinematic storytelling, elevated
                                    aesthetics, and emotionally driven event design.
                                </p>

                                {/* SEO supporting keywords */}
                                <div className="mt-8 flex flex-wrap gap-3">
                                    {[
                                        "Luxury Weddings",
                                        "Destination Weddings",
                                        "Wedding Planning",
                                        "Premium Events",
                                        "Cinematic Celebrations",
                                        "Reception Design",
                                    ].map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full border border-black/5 bg-black/[0.03] px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-zinc-500"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>


                        </div>

                        {/* RIGHT META SECTION */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: 0.8,
                                duration: 1.2,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="mb-10 hidden flex-col gap-6 border-l border-zinc-200 pl-8 lg:flex"
                        >
                            {[
                                "Emotionally Curated Experiences",
                                "Luxury Guest Hospitality",
                                "Destination Wedding Specialists",
                                "Editorial Storytelling",
                            ].map((item) => (
                                <div key={item} className="group">
                                    <div className="flex items-center gap-4">
                                        <div className="h-1.5 w-1.5 rounded-full bg-[#C6A769]/70 transition-colors duration-300 group-hover:bg-[#C6A769]" />

                                        <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-zinc-400 transition-colors duration-500 group-hover:text-[#111]">
                                            {item}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </motion.div>


        </section>
    );
}