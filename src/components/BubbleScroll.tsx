"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BubbleConfig {
  url: string;
  size: number;
  x: string;
  y: string;
  range: [number, number];
  drift: { x: number; y: number };
  layer: 1 | 2 | 3;
  caption: string;
}

interface TitleWord {
  word: string;
  sub: string;
  range: [number, number];
}

// ─── Film progress bar (top edge) ─────────────────────────────────────────────

const FilmBar: React.FC<{ progress: MotionValue<number> }> = ({ progress }) => {
  const scaleX = useSpring(progress, { stiffness: 80, damping: 30 });
  return (
    <motion.div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: "#E5C158",
        transformOrigin: "left center",
        scaleX,
        zIndex: 60,
      }}
    />
  );
};

// ─── Typography phase — overlapping with bubbles ──────────────────────────────

const TitleFrame: React.FC<{
  word: string;
  sub: string;
  progress: MotionValue<number>;
  range: [number, number];
}> = ({ word, sub, progress, range }) => {
  const [s, e] = range;
  const mid = (s + e) / 2;
  const fadeIn = s + (mid - s) * 0.3;
  const fadeOut = mid + (e - mid) * 0.7;

  // Slower, smoother transitions so bubbles drift comfortably through text phases
  const opacity = useTransform(
    progress,
    [s, fadeIn, fadeOut, e],
    [0, 1, 1, 0]
  );

  // Subtle vertical drift
  const wordY = useTransform(progress, [s, fadeIn, fadeOut, e], [15, 0, 0, -15]);

  // Stagger the subtitle slightly
  const subOpacity = useTransform(
    progress,
    [fadeIn + 0.02, fadeIn + 0.06, fadeOut - 0.02, e],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 30, // Elevated layout weight over drifting background nodes
        opacity,
      }}
    >
      <motion.h2
        style={{
          y: wordY,
          fontFamily: "'Playfair Display', 'Bodoni MT', 'Didot', serif",
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: "clamp(56px, 9vw, 110px)",
          color: "#1a1a1a",
          lineHeight: 1,
          margin: 0,
          userSelect: "none",
          letterSpacing: "0.02em",
        }}
      >
        {word}
      </motion.h2>

      <motion.p
        style={{
          opacity: subOpacity,
          marginTop: 20,
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: "clamp(8px, 1vw, 10px)",
          letterSpacing: "0.45em",
          textTransform: "uppercase",
          color: "#71717a",
          fontWeight: 500,
        }}
      >
        {sub}
      </motion.p>

      {/* Elegant gold rule element mapping precisely to aesthetic sample */}
      <motion.div
        style={{
          opacity: subOpacity,
          width: 32,
          height: 1,
          background: "#bf9b30",
          marginTop: 24,
        }}
      />
    </motion.div>
  );
};

// ─── Circular Scroll Indicator (Bottom Right) ─────────────────────────────────

const CircularScrollIndicator: React.FC<{ progress: MotionValue<number> }> = ({ progress }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const wrapperOpacity = useTransform(progress, [0, 0.02, 0.95, 1], [0, 1, 1, 0]);
  const rotation = useTransform(progress, [0, 1], [0, 360]);
  const sRotation = useSpring(rotation, { stiffness: 50, damping: 20 });

  if (!mounted) return null;

  return (
    <motion.div
      style={{ opacity: wrapperOpacity }}
      className="absolute bottom-10 right-10 md:bottom-16 md:right-16 z-50 flex flex-col items-center gap-4 pointer-events-none"
    >
      <span
        style={{
          fontSize: 9,
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          fontWeight: 600,
          color: "#bf9b30",
          fontFamily: "system-ui, sans-serif",
          marginRight: "-0.4em",
        }}
      >
        Scroll
      </span>

      {/* Precision design replica dial assembly */}
      <div className="relative w-24 h-24 rounded-full bg-black/5 flex items-center justify-center backdrop-blur-sm border border-black/5">
        <div className="absolute inset-2 rounded-full border border-black/5" />

        <div className="w-6 h-6 rounded-full bg-[#bf9b30]/90 flex items-center justify-center shadow-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
        </div>

        <motion.div
          style={{ rotate: sRotation }}
          className="absolute inset-0 flex items-start justify-center pt-2 origin-center"
        >
          <div className="w-0.5 h-10 bg-white shadow-sm rounded-full relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-sm" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// ─── Section label (top left) ─────────────────────────────────────────────────

const SectionLabel: React.FC<{ progress: MotionValue<number> }> = ({ progress }) => {
  const opacity = useTransform(progress, [0, 0.03, 0.95, 1], [0, 1, 1, 0]);
  return (
    <motion.div
      style={{
        position: "absolute",
        top: 40,
        left: 40,
        zIndex: 60,
        pointerEvents: "none",
        opacity,
      }}
    >
      <span
        style={{
          fontSize: 10,
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          fontWeight: 500,
          color: "#71717a",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        Archive
      </span>
    </motion.div>
  );
};

// ─── Bubble ───────────────────────────────────────────────────────────────────

const Bubble: React.FC<{
  config: BubbleConfig;
  progress: MotionValue<number>;
  index: number;
}> = ({ config, progress, index }) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const size = isMobile ? config.size * 0.75 : config.size;
  const [s, e] = config.range;
  const mid = (s + e) / 2;
  const layerSpeed = { 1: 0.8, 2: 1.1, 3: 1.4 }[config.layer] ?? 1;
  const driftMult = isMobile ? 0.4 : 1;

  const opacity = useTransform(progress, [s, s + 0.1, e - 0.1, e], [0, 1, 1, 0]);

  const scale = useTransform(
    progress,
    [s, s + 0.15, mid, e - 0.15, e],
    [0.4, 0.95, 1, 0.95, 0.4]
  );

  const driftX = useTransform(progress, [s, e], [0, config.drift.x * driftMult * layerSpeed]);
  const driftY = useTransform(progress, [s, e], [0, config.drift.y * driftMult * layerSpeed]);

  const springCfg = { stiffness: 45 + config.layer * 10, damping: 28 };
  const sScale = useSpring(scale, springCfg);
  const sX = useSpring(driftX, springCfg);
  const sY = useSpring(driftY, springCfg);

  const left = isMobile ? `calc(${config.x} * 0.6 + 20%)` : config.x;

  return (
    <div
      style={{
        position: "absolute",
        left,
        top: config.y,
        width: size,
        height: size,
        transform: "translate(-50%, -50%)",
        zIndex: 10 + config.layer, // Layers drift structurally beneath layout title strings (zIndex 30)
      }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          opacity,
          scale: sScale,
          x: sX,
          y: sY,
          willChange: "transform, opacity",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            overflow: "hidden",
            position: "relative",
            boxShadow: `
              0 24px 48px rgba(0,0,0,0.06),
              0 8px 16px rgba(0,0,0,0.03)
            `,
          }}
        >
          <img
            src={config.url}
            alt=""
            aria-hidden
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

// ─── Main export ──────────────────────────────────────────────────────────────

export const BubbleScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ─── Navbar Syncing Controller Hook ───
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        document.documentElement.setAttribute(
          "data-hide-nav",
          entry.isIntersecting ? "true" : "false"
        );
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      document.documentElement.removeAttribute("data-hide-nav");
    };
  }, []);

  // ─── Overlapping Timeline Structural Configurations ───
  const titleWords: TitleWord[] = [
    { word: "Cherished", sub: "Every beginning deserves a witness", range: [0.00, 0.30] },
    { word: "Crafted", sub: "Details that outlast the moment", range: [0.25, 0.55] },
    { word: "Remembered", sub: "Because the beautiful must endure", range: [0.50, 0.80] },
    { word: "Eternal", sub: "Where time quietly stops", range: [0.75, 1.00] },
  ];

  const bubbles: BubbleConfig[] = [
    {
      url: "https://i.pinimg.com/736x/b5/23/b3/b523b3e8a7410b20dedbac7491a528af.jpg",
      size: 480, x: "22%", y: "28%",
      range: [0.02, 0.35], drift: { x: 30, y: -80 }, layer: 1, caption: "",
    },
    {
      url: "https://i.pinimg.com/736x/ba/63/52/ba63529729f2cc61dbac103f6f7bb238.jpg",
      size: 320, x: "78%", y: "34%",
      range: [0.10, 0.45], drift: { x: -40, y: -60 }, layer: 3, caption: "",
    },
    {
      url: "https://i.pinimg.com/736x/00/bd/a0/00bda06b701af0b5ee56538e55312a06.jpg",
      size: 420, x: "32%", y: "70%",
      range: [0.20, 0.55], drift: { x: 45, y: -90 }, layer: 2, caption: "",
    },
    {
      url: "https://i.pinimg.com/1200x/70/7c/74/707c741bd1aa9d0c154f81f2bc089bd8.jpg",
      size: 280, x: "82%", y: "65%",
      range: [0.35, 0.68], drift: { x: -50, y: -75 }, layer: 3, caption: "",
    },
    {
      url: "https://i.pinimg.com/1200x/b8/9c/5f/b89c5f5d181450d685871a21d76d60ae.jpg",
      size: 460, x: "18%", y: "45%",
      range: [0.45, 0.80], drift: { x: 60, y: -85 }, layer: 1, caption: "",
    },
    {
      url: "https://i.pinimg.com/736x/2d/04/16/2d04167fb5b1b086548758f5f08bf8c4.jpg",
      size: 340, x: "70%", y: "25%",
      range: [0.55, 0.90], drift: { x: -35, y: -95 }, layer: 2, caption: "",
    },
    {
      url: "https://i.pinimg.com/736x/3a/0e/0c/3a0e0c89e90e0caf232ca5f2bd30ea9d.jpg",
      size: 400, x: "35%", y: "75%",
      range: [0.65, 0.98], drift: { x: 40, y: -70 }, layer: 2, caption: "",
    },
    {
      url: "https://i.pinimg.com/736x/43/ea/c0/43eac0aed202d47c88a0715a1c56af64.jpg",
      size: 510, x: "65%", y: "60%",
      range: [0.75, 1.0], drift: { x: -45, y: -110 }, layer: 1, caption: "",
    },
  ];

  return (
    <section ref={containerRef} style={{ position: "relative", height: "800vh", background: "transparent" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          pointerEvents: "none",
          background: "var(--background-color)", // Integrated clean light theme hook base
        }}
      >
        <FilmBar progress={scrollYProgress} />
        <SectionLabel progress={scrollYProgress} />

        <div style={{ position: "absolute", inset: 0 }}>
          {bubbles.map((b, i) => (
            <Bubble key={`bubble-${i}`} config={b} progress={scrollYProgress} index={i} />
          ))}
        </div>

        {titleWords.map((tw, i) => (
          <TitleFrame
            key={`title-${i}`}
            word={tw.word}
            sub={tw.sub}
            progress={scrollYProgress}
            range={tw.range}
          />
        ))}

        <CircularScrollIndicator progress={scrollYProgress} />
      </div>
    </section>
  );
};