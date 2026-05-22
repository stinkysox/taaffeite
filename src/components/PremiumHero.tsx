"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

export default function PremiumHero({ home }: { home: any }) {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen overflow-hidden bg-white text-[#111]"
            aria-label="Luxury Wedding Planning Hero"
        >
            {/* Ambient light (subtle, not flashy) */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-40 -left-40 h-[300px] w-[300px] rounded-full bg-[#C6A769]/10 blur-[120px]" />
                <div className="absolute -bottom-40 -right-40 h-[350px] w-[350px] rounded-full bg-[#C6A769]/10 blur-[140px]" />
            </div>

            {/* Layout container */}
            <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-5 sm:px-8 lg:px-12">
                <div className="w-full">

                    {/* Label */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-6 text-[10px] uppercase tracking-[0.4em] text-zinc-400"
                    >
                        Taaffeite Events • Luxury Wedding Atelier
                    </motion.p>

                    {/* Title */}
                    <div className="max-w-4xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="font-serif text-[clamp(2.2rem,6vw,5.5rem)] leading-[1.05] tracking-[-0.04em]"
                        >
                            <span className="block">{home.hero.title}</span>

                            <span className="block italic text-[#C6A769]">
                                {home.hero.titleAccent}
                            </span>

                            <span className="block">{home.hero.titleEnd}</span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.9 }}
                            className="mt-8 max-w-xl text-sm leading-[1.9] text-zinc-500 sm:text-base"
                        >
                            Luxury wedding planning, destination celebrations, and curated
                            event experiences designed with cinematic detail and emotional
                            precision.
                        </motion.p>

                        {/* Tags (clean + wrapping safe) */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 flex flex-wrap gap-2"
                        >
                            {[
                                "Luxury Weddings",
                                "Destination Weddings",
                                "Wedding Planning",
                                "Cinematic Events",
                                "Reception Design",
                            ].map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full border border-black/5 bg-black/[0.03] px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-zinc-500"
                                >
                                    {tag}
                                </span>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right subtle meta (becomes bottom on mobile) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-16 grid gap-3 border-t border-black/5 pt-8 sm:grid-cols-2 lg:absolute lg:right-12 lg:top-1/2 lg:mt-0 lg:w-[280px] lg:-translate-y-1/2 lg:border-l lg:border-t-0 lg:pl-6"
                    >
                        {[
                            "Curated Wedding Experiences",
                            "Luxury Guest Hospitality",
                            "Destination Planning",
                            "Editorial Storytelling",
                        ].map((item) => (
                            <div key={item} className="flex items-start gap-2">
                                <span className="mt-[6px] h-1 w-1 rounded-full bg-[#C6A769]" />
                                <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 leading-relaxed">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}