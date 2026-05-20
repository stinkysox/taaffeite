"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, MotionValue } from "framer-motion";

interface BubbleConfig {
  url: string;
  size: number;
  x: string;
  y: string;
  range: [number, number]; // [start, end] of global scroll
  drift: { x: number; y: number };
}

const Bubble: React.FC<{ config: BubbleConfig; progress: MotionValue<number>; index: number }> = ({
  config,
  progress,
  index,
}) => {
  const [mounted, setMounted] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
  }, []);

  const responsiveSize = (mounted && isMobile) ? config.size * 0.45 : config.size;

  const start = config.range[0];
  const end = config.range[1];
  const mid = (start + end) / 2;

  // Extremely generous opacity range to ensure we don't have blank screens
  const opacity = useTransform(progress, [start, start + 0.15, end - 0.15, end], [0, 1, 1, 0]);
  const scale = useTransform(progress, [start, mid, end], [0.6, 1.8, 0.6]);
  
  // Drift values
  const driftX = useTransform(progress, [start, end], ["0%", ((mounted && isMobile) ? config.drift.x * 0.2 : config.drift.x) + "%"]);
  const driftY = useTransform(progress, [start, end], ["0%", ((mounted && isMobile) ? config.drift.y * 0.4 : config.drift.y) + "%"]);

  const springScale = useSpring(scale, { stiffness: 60, damping: 25 });
  const springX = useSpring(driftX, { stiffness: 45, damping: 20 });
  const springY = useSpring(driftY, { stiffness: 45, damping: 20 });

  const responsiveLeft = (mounted && isMobile)
    ? `calc(${config.x} * 0.6 + 20%)`
    : config.x;

  return (
    <div
      style={{
        position: "absolute",
        left: responsiveLeft,
        top: config.y,
        width: responsiveSize,
        height: responsiveSize,
        transform: "translate(-50%, -50%)", // Static centering
        zIndex: 10 + index,
      }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          opacity,
          scale: springScale,
          x: springX,
          y: springY,
        }}
        className="rounded-full overflow-hidden border border-black/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] pointer-events-none will-change-transform"
      >
        <img
          src={config.url}
          alt="Wedding moment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 pointer-events-none" />
      </motion.div>
    </div>
  );
};

const ScrollIndicator: React.FC<{ progress: MotionValue<number> }> = ({ progress }) => {
  const [mounted, setMounted] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  React.useEffect(() => setMounted(true), []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.4);
    y.set((clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const opacity = useTransform(progress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);
  const rotate = useTransform(progress, [0, 1], [0, 360]);

  if (!mounted) return null;

  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-12 right-12 md:right-24 z-50 flex flex-col items-center gap-4 pointer-events-auto"
    >
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-20 h-20 flex items-center justify-center cursor-pointer group"
      >
        <motion.div
          style={{ x: springX, y: springY }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Progress Ring */}
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              className="opacity-10"
            />
            <motion.circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="#ca8a04" // gold-600
              strokeWidth="1.5"
              strokeDasharray="226"
              style={{
                pathLength: progress,
              }}
              className="transition-all duration-300"
            />
          </svg>

          {/* Pulsing Core */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-1.5 h-1.5 bg-gold-600 rounded-full shadow-[0_0_12px_rgba(202,138,4,0.6)] animate-pulse" />
          </div>

          {/* Magnetic text label */}
          <motion.div 
            style={{ rotate }}
            className="absolute inset-0 rounded-full border border-dashed border-black/5 group-hover:border-gold-600/20 transition-colors" 
          />
        </motion.div>
      </div>

      <div className="flex flex-col items-center gap-1.5">
         <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-gold-600/70">Scroll</span>
         <div className="w-px h-6 bg-gradient-to-b from-gold-600/60 to-transparent" />
      </div>
    </motion.div>
  );
};

export const BubbleScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Balanced, overlapping ranges to ensure no blank zones
  const bubbles: BubbleConfig[] = [
    {
      url: "https://i.pinimg.com/736x/b5/23/b3/b523b3e8a7410b20dedbac7491a528af.jpg",
      size: 500,
      x: "15%",
      y: "30%",
      range: [0, 0.4],
      drift: { x: 50, y: -80 },
    },
    {
      url: "https://i.pinimg.com/736x/ba/63/52/ba63529729f2cc61dbac103f6f7bb238.jpg",
      size: 350,
      x: "70%",
      y: "25%",
      range: [0.1, 0.5],
      drift: { x: -40, y: -60 },
    },
    {
      url: "https://i.pinimg.com/736x/00/bd/a0/00bda06b701af0b5ee56538e55312a06.jpg",
      size: 420,
      x: "30%",
      y: "60%",
      range: [0.25, 0.65],
      drift: { x: 60, y: -100 },
    },
    {
      url: "https://i.pinimg.com/1200x/70/7c/74/707c741bd1aa9d0c154f81f2bc089bd8.jpg",
      size: 280,
      x: "80%",
      y: "45%",
      range: [0.35, 0.75],
      drift: { x: -80, y: -70 },
    },
    {
      url: "https://i.pinimg.com/1200x/b8/9c/5f/b89c5f5d181450d685871a21d76d60ae.jpg",
      size: 480,
      x: "10%",
      y: "50%",
      range: [0.5, 0.85],
      drift: { x: 100, y: -90 },
    },
    {
      url: "https://i.pinimg.com/736x/2d/04/16/2d04167fb5b1b086548758f5f08bf8c4.jpg",
      size: 380,
      x: "65%",
      y: "70%",
      range: [0.6, 0.95],
      drift: { x: -30, y: -120 },
    },
    {
      url: "https://i.pinimg.com/736x/3a/0e/0c/3a0e0c89e90e0caf232ca5f2bd30ea9d.jpg",
      size: 400,
      x: "25%",
      y: "75%",
      range: [0.75, 1.0],
      drift: { x: 40, y: -90 },
    },
    {
      url: "https://i.pinimg.com/736x/43/ea/c0/43eac0aed202d47c88a0715a1c56af64.jpg",
      size: 520,
      x: "60%",
      y: "20%",
      range: [0.8, 1.0],
      drift: { x: -60, y: -150 },
    },
  ];

  return (
    <section ref={containerRef} className="relative h-[800vh] bg-transparent">
      {/* Sticky Tracker */}
      <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none">
        {/* Visual Watermark for Debugging & Aesthetic */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
          <h2 className="text-[20vw] font-serif uppercase tracking-tighter leading-none dark:text-[#1a1a1a] text-black text-center select-none italic">
            Archive
          </h2>
        </div>

        {/* Bubbles Render */}
        <div className="relative h-full w-full">
          {bubbles.map((bubble, i) => (
            <Bubble key={i} config={bubble} progress={scrollYProgress} index={i} />
          ))}
        </div>

        {/* Interactive Scroll Indicator */}
        <ScrollIndicator progress={scrollYProgress} />
      </div>
    </section>
  );
};
