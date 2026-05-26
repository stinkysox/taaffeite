"use client";

import { motion } from "framer-motion";

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
    return (
        <section
            className="
                relative
                min-h-screen
                overflow-hidden
                bg-[#f6f1ea]
                px-6
                pt-32
                pb-24
                text-[#171717]
                md:pt-40
            "
        >
            {/* soft paper texture */}
            <div
                className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
                style={{
                    backgroundImage:
                        "url('https://www.transparenttextures.com/patterns/noise.png')",
                }}
            />

            {/* subtle glow */}
            <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#c5ab7c]/10 blur-3xl" />

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    flex
                    max-w-6xl
                    flex-col
                    items-center
                "
            >
                {/* TEXT CONTENT FIRST */}
                <div className="max-w-4xl text-center mb-20">
                    {/* small label */}
                    <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.2,
                            duration: 0.8,
                        }}
                        className="
                            mb-8
                            text-[10px]
                            uppercase
                            tracking-[0.45em]
                            text-[#8a8175]
                        "
                    >
                        Taaffeite Events
                    </motion.p>

                    {/* heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.35,
                            duration: 1,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="
                            font-serif
                            text-[clamp(3.8rem,8vw,8rem)]
                            leading-[0.92]
                            tracking-[-0.05em]
                            text-[#161616]
                        "
                    >
                        <span className="block">
                            {home.hero.title}
                        </span>

                        <span className="block italic text-[#b9965b]">
                            {home.hero.titleAccent}
                        </span>

                        <span className="block">
                            {home.hero.titleEnd}
                        </span>
                    </motion.h1>

                    {/* description */}
                    <motion.p
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.55,
                            duration: 1,
                        }}
                        className="
                            mx-auto
                            mt-10
                            max-w-2xl
                            text-[15px]
                            leading-[2]
                            text-[#6d655c]
                            md:text-[16px]
                        "
                    >
                        Luxury wedding planning and destination celebrations
                        designed with cinematic elegance, emotional storytelling,
                        and timeless sophistication.
                    </motion.p>
                </div>

                {/* SIMPLE OVAL IMAGE LATER */}
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                        duration: 1.2,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                        relative
                        mb-16
                        h-[540px]
                        w-[390px]
                        overflow-hidden
                        rounded-[50%]
                        shadow-[0_25px_60px_rgba(0,0,0,0.12)]
                    "
                >
                    {/* shadow layer */}
                    <div className="absolute inset-0 scale-[1.05] rounded-[50%] bg-black/10 blur-2xl z-[-1]" />

                    {/* image layer */}
                    <div
                        className="
                            absolute
                            inset-0
                            rounded-[50%]
                            bg-[url('https://i.postimg.cc/qqdVJ6JB/AKR07499.jpg')]
                            bg-cover
                            bg-center
                        "
                    />

                    {/* soft fade overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.45),transparent_38%)]" />
                </motion.div>

                {/* scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        y: [0, 10, 0],
                    }}
                    transition={{
                        opacity: {
                            delay: 1.2,
                            duration: 1,
                        },
                        y: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        },
                    }}
                    className="
                        mt-12
                        flex
                        flex-col
                        items-center
                        gap-3
                    "
                >
                    <p className="text-[9px] uppercase tracking-[0.35em] text-[#9a9187]">
                        Scroll
                    </p>

                    <div className="relative h-14 w-px overflow-hidden bg-[#d7cec2]">
                        <motion.div
                            animate={{
                                y: ["-100%", "100%"],
                            }}
                            transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute inset-0 bg-[#b9965b]"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}