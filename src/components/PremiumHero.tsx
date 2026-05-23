"use client";

import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useVelocity,
} from "framer-motion";
import { useRef } from "react";

interface PremiumHeroProps {
    home: {
        hero: {
            title: string;
            titleAccent: string;
            titleEnd: string;
        };
    };
}

export default function PremiumHero({ home }: PremiumHeroProps) {
    const ref = useRef<HTMLDivElement>(null);

    // Scroll tracking
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    // Smoother cinematic motion
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 90,
        damping: 25,
        mass: 0.35,
    });

    const velocity = useVelocity(scrollYProgress);

    // Hero transforms
    const opacity = useTransform(smoothProgress, [0, 0.75], [1, 0]);
    const y = useTransform(smoothProgress, [0, 1], [0, -120]);
    const scale = useTransform(smoothProgress, [0, 1], [1, 0.92]);
    const blur = useTransform(smoothProgress, [0, 1], [0, 8]);

    // Background cinematic movement
    const glowY = useTransform(smoothProgress, [0, 1], [0, -180]);
    const glowScale = useTransform(smoothProgress, [0, 1], [1, 1.4]);

    // Tiny reactive movement
    const rotate = useTransform(velocity, [-1, 1], [-0.5, 0.5]);

    return (
        <section
            ref={ref}
            className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#faf8f5] px-6 text-[#111]"
        >
            {/* Grain texture */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply"
                style={{
                    backgroundImage:
                        "url('https://www.transparenttextures.com/patterns/noise.png')",
                }}
            />

            {/* Cinematic gradient mesh */}


            {/* Luxury floating lines */}


            {/* Main Hero */}
            <motion.div
                style={{
                    opacity,
                    y,
                    scale,
                    rotate,
                    filter: useTransform(blur, (b) => `blur(${b}px)`),
                }}
                className="relative z-10 mx-auto max-w-5xl text-center"
            >
                {/* Top Label */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 1,
                        delay: 0.1,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mb-8 flex items-center justify-center gap-4"
                >
                    <div className="h-px w-10 bg-zinc-300" />

                    <p className="text-[10px] uppercase tracking-[0.45em] text-zinc-500">
                        Taaffeite Events
                    </p>

                    <div className="h-px w-10 bg-zinc-300" />
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 1.3,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="font-serif text-[clamp(3.5rem,8vw,8rem)] leading-[0.95] tracking-[-0.05em]"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 1 }}
                        className="block"
                    >
                        {home.hero.title}
                    </motion.span>

                    <motion.span
                        initial={{ opacity: 0, y: 35 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 1 }}
                        className="mt-3 block italic text-[#C6A769]"
                    >
                        {home.hero.titleAccent}
                    </motion.span>

                    <motion.span
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="block"
                    >
                        {home.hero.titleEnd}
                    </motion.span>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.6,
                        duration: 1,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mx-auto mt-10 max-w-2xl text-[15px] leading-[2] tracking-[0.01em] text-zinc-500 md:text-[16px]"
                >
                    Luxury wedding planning and destination celebrations
                    designed with cinematic elegance, emotional storytelling,
                    and timeless sophistication.
                </motion.p>

                {/* Bottom Divider */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.9,
                        duration: 1,
                    }}
                    className="mt-14 flex items-center justify-center gap-5"
                >
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 70 }}
                        transition={{ delay: 1, duration: 1.2 }}
                        className="h-px bg-zinc-300"
                    />

                    <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-400">
                        Weddings • Destinations • Experiences
                    </p>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 70 }}
                        transition={{ delay: 1, duration: 1.2 }}
                        className="h-px bg-zinc-300"
                    />
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        y: [0, 10, 0],
                    }}
                    transition={{
                        opacity: { delay: 1.4, duration: 1 },
                        y: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        },
                    }}
                    className="absolute left-1/2 top-[115%] flex -translate-x-1/2 flex-col items-center gap-3"
                >
                    <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-400">
                        Scroll
                    </p>

                    <div className="relative h-16 w-[1px] overflow-hidden bg-zinc-200">
                        <motion.div
                            animate={{
                                y: ["-100%", "100%"],
                            }}
                            transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute inset-0 bg-[#C6A769]"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}