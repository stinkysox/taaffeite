import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function PhilosophySection() {
    const ref = useRef<HTMLDivElement>(null);
    const [typedText, setTypedText] = useState("");
    const [startTyping, setStartTyping] = useState(false);

    const fullText = "Because rare stories deserve rare celebrations.";

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.8", "start 0.3"],
    });

    // subtle parallax
    const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
    const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

    // Trigger typing when section comes into view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStartTyping(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.4 }
        );

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    // Typewriter effect
    useEffect(() => {
        if (!startTyping) return;

        let i = 0;
        const interval = setInterval(() => {
            setTypedText(fullText.slice(0, i + 1));
            i++;

            if (i === fullText.length) clearInterval(interval);
        }, 45); // slower = more luxury feel

        return () => clearInterval(interval);
    }, [startTyping]);

    return (
        <section ref={ref} className="py-44 px-6 bg-white overflow-hidden">
            <div className="max-w-5xl mx-auto text-center">

                <motion.div style={{ y: smoothY }}>



                    {/* ✨ TYPEWRITER TITLE */}
                    <h2 className="mt-6 mb-20 font-serif italic text-[clamp(2.2rem,5vw,4.8rem)] leading-[1.1] text-[#1a1a1a]">
                        {typedText}
                        <span className="animate-pulse">|</span>
                    </h2>

                    {/* PHILOSOPHY */}
                    <div className="space-y-16">

                        <div>
                            <p className="text-[11px] tracking-[0.5em] uppercase text-zinc-400 mb-8">
                                Philosophy
                            </p>

                            <div className="space-y-6 text-[16px] md:text-[20px] leading-[1.8] text-zinc-600 max-w-3xl mx-auto font-light">
                                <p>
                                    At Taaffeite, we believe the most meaningful celebrations are the ones that feel personal. Not overly staged, but honest, warm, and deeply reflective.
                                </p>
                                <p>
                                    We approach every event with intention, creating spaces that feel natural, elegant, and emotionally connected.
                                </p>
                                <p>
                                    For us, luxury is not about excess. It is about creating something that feels profoundly right.
                                </p>
                            </div>
                        </div>

                        {/* MISSION */}
                        <div className="pt-10 border-t border-zinc-100">
                            <p className="text-[11px] tracking-[0.5em] uppercase text-zinc-400 mb-8 mt-10">
                                Mission
                            </p>

                            <p className="text-[18px] md:text-[24px] leading-[1.6] text-[#1a1a1a] max-w-3xl mx-auto font-serif italic">
                                To create thoughtful and beautifully executed celebrations that feel seamless and memorable for every guest.
                            </p>
                        </div>

                    </div>

                </motion.div>

            </div>
        </section>
    );
}