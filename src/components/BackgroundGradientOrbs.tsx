"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export const BackgroundGradientOrbs = () => {
    const { scrollY } = useScroll();

    // Create different parallax speeds for each orb
    const y1 = useTransform(scrollY, [0, 2000], [0, -300]);
    const y2 = useTransform(scrollY, [0, 2000], [0, -600]);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {/* Orb 1 - Top Left */}
            <motion.div
                style={{ y: y1 }}
                className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-[#C6A769]/5 blur-[120px]"
            />

            {/* Orb 2 - Center Right */}
            <motion.div
                style={{ y: y2 }}
                className="absolute top-[40%] -right-20 w-[600px] h-[600px] rounded-full bg-[#C6A769]/5 blur-[150px]"
            />

            {/* Orb 3 - Bottom Left */}
            <motion.div
                style={{ y: y1 }}
                className="absolute bottom-0 left-[20%] w-[400px] h-[400px] rounded-full bg-[#C6A769]/5 blur-[100px]"
            />
        </div>
    );
};