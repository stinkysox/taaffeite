import { useRef } from "react";
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

    // Premium cinematic movement
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
            className="relative min-h-screen overflow-hidden bg-white selection:bg-[#111] selection:text-white"
        >
            {/* MAIN CONTENT WRAPPER */}
            <motion.div
                style={{ y: textY, opacity }}
                className="relative z-20 min-h-screen flex items-center px-6 md:px-10 pt-32"
            >
                <div className="max-w-7xl mx-auto w-full">
                    <div className="grid lg:grid-cols-[1fr_320px] gap-16 items-end">

                        {/* LEFT CONTENT */}
                        <div className="max-w-5xl">
                            {/* Label */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 1,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="mb-10"
                            >
                                <span className="text-[10px] uppercase tracking-[0.55em] text-zinc-400 font-medium">
                                    Luxury Wedding Atelier
                                </span>
                            </motion.div>

                            {/* Heading */}
                            <div className="overflow-hidden">
                                <motion.h1
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{
                                        duration: 1.6,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="font-serif text-[4.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[9.5rem] leading-[0.88] tracking-[-0.05em] text-[#111]"
                                >
                                    <span className="block">
                                        {home.hero.title}
                                    </span>

                                    <span className="block italic font-light text-[#C6A769] ml-6 md:ml-12 my-1">
                                        {home.hero.titleAccent}
                                    </span>

                                    <span className="block">
                                        {home.hero.titleEnd}
                                    </span>
                                </motion.h1>
                            </div>

                            {/* Description */}
                            <motion.div
                                initial={{ opacity: 0, y: 25 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.5,
                                    duration: 1.2,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="mt-14 max-w-xl"
                            >
                                <p className="text-base md:text-lg leading-[1.9] text-zinc-500 font-light">
                                    {home.hero.subtitle}
                                </p>
                            </motion.div>
                        </div>

                        {/* RIGHT FLOATING META CARD */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: 0.8,
                                duration: 1.2,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="hidden lg:flex flex-col gap-6 mb-10 border-l border-zinc-200 pl-8"
                        >
                            {[
                                "Emotionally Curated",
                                "Luxury Guest Experience",
                                "Worldwide Celebrations",
                            ].map((item) => (
                                <div key={item} className="group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#C6A769]/70 group-hover:bg-[#C6A769] transition-colors duration-300" />
                                        <span className="text-[10px] uppercase tracking-[0.35em] text-zinc-400 group-hover:text-[#111] transition-colors duration-500 font-medium">
                                            {item}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* BOTTOM SCROLL INDICATOR */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
            >
                <div className="flex flex-col items-center gap-4">
                    <span className="text-[9px] uppercase tracking-[0.45em] text-zinc-400 font-medium">
                        Scroll
                    </span>

                    <motion.div
                        animate={{
                            y: [0, 16, 0],
                            opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="w-px h-16 bg-[#C6A769]/60"
                    />
                </div>
            </motion.div>
        </section>
    );
}