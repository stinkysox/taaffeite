"use client";

import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    AnimatePresence,
} from "framer-motion";

import { useEffect, useRef, useState } from "react";

export default function PhilosophySection() {
    const ref = useRef<HTMLDivElement>(null);

    const [typedText, setTypedText] = useState("");
    const [startTyping, setStartTyping] = useState(false);

    const fullText =
        "Because rare stories deserve rare celebrations.";

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.9", "end 0.4"],
    });

    // Cinematic movement
    const y = useTransform(scrollYProgress, [0, 1], [120, -40]);
    const opacity = useTransform(scrollYProgress, [0, 0.15, 1], [0, 1, 1]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);

    const smoothY = useSpring(y, {
        stiffness: 80,
        damping: 25,
        mass: 0.6,
    });

    // Trigger typewriter
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStartTyping(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.35,
            }
        );

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    // Luxury typewriter effect
    useEffect(() => {
        if (!startTyping) return;

        let i = 0;

        const interval = setInterval(() => {
            setTypedText(fullText.slice(0, i + 1));

            i++;

            if (i >= fullText.length) {
                clearInterval(interval);
            }
        }, 42);

        return () => clearInterval(interval);
    }, [startTyping]);

    return (
        <section
            ref={ref}
            className="relative overflow-hidden bg-[#faf8f5] px-6 py-44"
        >
            {/* Cinematic ambient lighting */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-[-12rem] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-[#C6A769]/10 blur-[160px]" />

                <div className="absolute bottom-[-10rem] left-[-8rem] h-[26rem] w-[26rem] rounded-full bg-[#e9dcc1]/20 blur-[140px]" />

                <div className="absolute right-[-8rem] top-1/2 h-[24rem] w-[24rem] -translate-y-1/2 rounded-full bg-stone-200/40 blur-[120px]" />
            </div>

            {/* Luxury grid texture */}


            <motion.div
                style={{
                    y: smoothY,
                    opacity,
                    scale,
                }}
                className="relative z-10 mx-auto max-w-6xl"
            >
                {/* Top label */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 1,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mb-12 flex items-center justify-center gap-5"
                >
                    <div className="h-px w-14 bg-zinc-300" />

                    <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-500">
                        Our Philosophy
                    </p>

                    <div className="h-px w-14 bg-zinc-300" />
                </motion.div>

                {/* Hero statement */}
                <div className="relative text-center">
                    {/* giant background word */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.04 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2 }}
                        className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 select-none font-serif text-[14rem] italic leading-none text-[#C6A769] md:block"
                    >
                        Rare
                    </motion.div>

                    {/* Main headline */}
                    <h2 className="relative z-10 mx-auto max-w-5xl font-serif text-[clamp(2.8rem,6vw,6.5rem)] italic leading-[1.05] tracking-[-0.04em] text-[#1a1a1a]">
                        {typedText}

                        <AnimatePresence>
                            {typedText.length !== fullText.length && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 0.8,
                                    }}
                                    className="ml-1 text-[#C6A769]"
                                >
                                    |
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </h2>

                    {/* soft accent */}
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        whileInView={{ width: 120, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: 0.4,
                            duration: 1.2,
                        }}
                        className="mx-auto mt-12 h-px bg-gradient-to-r from-transparent via-[#C6A769] to-transparent"
                    />
                </div>

                {/* Content blocks */}
                <div className="mt-28 grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">

                    {/* Left philosophy card */}
                    <motion.div
                        initial={{ opacity: 0, y: 70 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 1.1,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="group relative overflow-hidden rounded-[3rem] border border-black/5 bg-white/70 p-12 backdrop-blur-xl"
                    >
                        {/* glow */}
                        <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                            <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-[#C6A769]/15 blur-[80px]" />
                        </div>

                        <div className="relative z-10">
                            <div className="mb-10 flex items-center gap-5">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#C6A769]/20">
                                    <span className="font-serif text-xl italic text-[#C6A769]">
                                        01
                                    </span>
                                </div>

                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.45em] text-zinc-400">
                                        Philosophy
                                    </p>

                                    <h3 className="mt-2 font-serif text-3xl italic text-[#1a1a1a]">
                                        Emotion Over Excess
                                    </h3>
                                </div>
                            </div>

                            <div className="space-y-8 text-[16px] leading-[2] text-zinc-600 md:text-[18px]">
                                <p>
                                    At Taaffeite, we believe the most meaningful celebrations are
                                    the ones that feel personal. Not overly staged, but honest,
                                    warm, and deeply reflective.
                                </p>

                                <p>
                                    We approach every event with intention, creating spaces that
                                    feel natural, elegant, and emotionally connected.
                                </p>

                                <p>
                                    For us, luxury is not about excess. It is about creating
                                    something that feels profoundly right.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right mission card */}
                    {/* Right mission card */}
                    <motion.div
                        initial={{ opacity: 0, y: 90 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: 0.15,
                            duration: 1.1,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="group relative overflow-hidden rounded-[3rem] border border-black/5 bg-white/70 p-12 backdrop-blur-xl"
                    >
                        {/* glow */}
                        <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                            <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-[#C6A769]/15 blur-[80px]" />
                        </div>

                        <div className="relative z-10 flex h-full flex-col">

                            <div className="mb-10 flex items-center gap-5">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#C6A769]/20">
                                    <span className="font-serif text-xl italic text-[#C6A769]">
                                        02
                                    </span>
                                </div>

                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.45em] text-zinc-400">
                                        Mission
                                    </p>

                                    <h3 className="mt-2 font-serif text-3xl italic text-[#1a1a1a]">
                                        Thoughtfully Timeless
                                    </h3>
                                </div>
                            </div>

                            <div className="my-10 h-px w-full bg-gradient-to-r from-[#C6A769]/30 to-transparent" />

                            <p className="font-serif text-[28px] italic leading-[1.7] text-[#1a1a1a]/90 md:text-[38px]">
                                “To create thoughtful and beautifully executed celebrations
                                that feel seamless and memorable for every guest.”
                            </p>

                            {/* bottom detail */}
                            <div className="mt-auto pt-16">
                                <div className="flex items-center gap-4">
                                    <div className="h-px w-12 bg-[#C6A769]" />

                                    <span className="text-[10px] uppercase tracking-[0.45em] text-[#C6A769]">
                                        Taaffeite Events
                                    </span>
                                </div>
                            </div>

                            {/* subtle corner detail */}
                            <div className="absolute bottom-6 right-6 h-14 w-14 rounded-full border border-[#C6A769]/10 opacity-40 transition-all duration-700 group-hover:scale-125 group-hover:opacity-100" />
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}