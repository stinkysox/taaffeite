"use client";

import React, { useRef } from "react";
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
  size: number;          // desktop diameter in px
  x: string;            // left position
  y: string;            // top position
  range: [number, number];
  drift: { x: number; y: number };
  layer: 1 | 2 | 3;    // parallax depth layer
  caption: string;      // moment title shown at peak
}

// ─── Caption strip ────────────────────────────────────────────────────────────

const Caption: React.FC<{ text: string; progress: MotionValue<number>; range: [number, number] }> = ({
  text,
  progress,
  range,
}) => {
  const [s, e] = range;
  const mid = (s + e) / 2;
  const opacity = useTransform(
    progress,
    [s + 0.04, mid - 0.04, mid, mid + 0.04, e - 0.04],
    [0, 0.9, 1, 0.9, 0]
  );
  const y = useTransform(progress, [s + 0.04, mid, e - 0.04], [6, 0, -6]);

  return (
    <motion.p
      style={{ opacity, y }}
      aria-hidden
      className="absolute bottom-16 left-0 right-0 text-center pointer-events-none"
    >
      <span
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontStyle: "italic",
          fontSize: "clamp(11px, 1.2vw, 13px)",
          letterSpacing: "0.38em",
          textTransform: "uppercase",
          color: "rgba(0,0,0,0.32)",
          fontWeight: 400,
        }}
      >
        {text}
      </span>
    </motion.p>
  );
};

// ─── Single bubble ────────────────────────────────────────────────────────────

const Bubble: React.FC<{
  config: BubbleConfig;
  progress: MotionValue<number>;
  index: number;
}> = ({ config, progress, index }) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const size = isMobile ? config.size * 0.52 : config.size;

  const [s, e] = config.range;
  const mid = (s + e) / 2;

  // Parallax speed per layer
  const layerSpeed = { 1: 0.8, 2: 1.0, 3: 1.25 }[config.layer] ?? 1;
  const driftMult = isMobile ? 0.28 : 1;

  const opacity = useTransform(
    progress,
    [s, s + 0.12, e - 0.12, e],
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    progress,
    [s, s + 0.18, mid, e - 0.18, e],
    [0.55, 0.92, 1, 0.92, 0.55]
  );
  const driftX = useTransform(
    progress,
    [s, e],
    [0, config.drift.x * driftMult * layerSpeed]
  );
  const driftY = useTransform(
    progress,
    [s, e],
    [0, config.drift.y * driftMult * layerSpeed]
  );

  const springCfg = { stiffness: 50 + config.layer * 10, damping: 22 };
  const sScale = useSpring(scale, springCfg);
  const sX = useSpring(driftX, springCfg);
  const sY = useSpring(driftY, springCfg);

  const left = isMobile
    ? `calc(${config.x} * 0.55 + 22.5%)`
    : config.x;

  return (
    <div
      style={{
        position: "absolute",
        left,
        top: config.y,
        width: size,
        height: size,
        transform: "translate(-50%, -50%)",
        zIndex: 10 + index,
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
        {/* Photo */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            overflow: "hidden",
            position: "relative",
            // Clean shadow for white bg
            boxShadow: `
              0 0 0 1px rgba(0,0,0,0.06),
              0 12px 48px rgba(0,0,0,0.10),
              0 4px 16px rgba(0,0,0,0.06)
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
              filter: "brightness(1.02) contrast(1.03) saturate(0.88)",
            }}
          />

          {/* Soft edge fade — blends into white bg */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              boxShadow: "inset 0 0 40px rgba(255,255,255,0.18)",
              pointerEvents: "none",
            }}
          />

          {/* Rim — thin dark ring so circle reads on white */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "1px solid rgba(0,0,0,0.08)",
              pointerEvents: "none",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

// ─── Scroll indicator ─────────────────────────────────────────────────────────

const ScrollIndicator: React.FC<{ progress: MotionValue<number> }> = ({ progress }) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const wrapperOpacity = useTransform(progress, [0, 0.04, 0.96, 1], [0, 1, 1, 0]);
  // Dot travels down the 80px track
  const dotY = useTransform(progress, [0, 1], [0, 72]);
  const dotOpacity = useTransform(progress, [0.96, 1], [1, 0]);

  if (!mounted) return null;

  return (
    <motion.div
      style={{ opacity: wrapperOpacity }}
      className="absolute bottom-12 right-10 md:right-16 z-50 flex flex-col items-center gap-3 pointer-events-none"
    >
      <span
        style={{
          fontSize: 8,
          letterSpacing: "0.5em",
          textTransform: "uppercase",
          fontWeight: 600,
          color: "rgba(212,175,55,0.6)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        Scroll
      </span>

      {/* Track */}
      <div
        style={{
          position: "relative",
          width: 1,
          height: 80,
          background: "rgba(0,0,0,0.1)",
        }}
      >
        {/* Gliding gold dot */}
        <motion.div
          style={{
            y: dotY,
            opacity: dotOpacity,
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "#d4af37",
            boxShadow: "0 0 8px rgba(212,175,55,0.9), 0 0 3px rgba(212,175,55,0.6)",
          }}
        />
      </div>
    </motion.div>
  );
};

// ─── Counter ──────────────────────────────────────────────────────────────────

const Counter: React.FC<{ progress: MotionValue<number>; total: number; bubbles: BubbleConfig[] }> = ({
  progress,
  total,
  bubbles,
}) => {
  const [current, setCurrent] = React.useState(1);

  React.useEffect(() => {
    return progress.on("change", (v) => {
      // Find which bubble is most "active"
      let best = 0;
      let bestScore = -1;
      bubbles.forEach((b, i) => {
        const mid = (b.range[0] + b.range[1]) / 2;
        const dist = 1 - Math.abs(v - mid) * 4;
        if (dist > bestScore) { bestScore = dist; best = i; }
      });
      setCurrent(best + 1);
    });
  }, [progress, bubbles]);

  return (
    <div
      className="absolute top-10 right-10 md:right-16 z-50 pointer-events-none flex items-baseline gap-1"
    >
      <motion.span
        key={current}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.3 }}
        style={{
          fontSize: 13,
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
          color: "rgba(0,0,0,0.5)",
          fontWeight: 400,
          minWidth: 16,
          display: "inline-block",
          textAlign: "right",
        }}
      >
        {String(current).padStart(2, "0")}
      </motion.span>
      <span
        style={{
          fontSize: 9,
          color: "rgba(0,0,0,0.18)",
          letterSpacing: "0.1em",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        /{String(total).padStart(2, "0")}
      </span>
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

  // Hide navbar while this section is in view
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        document.documentElement.setAttribute(
          "data-hide-nav",
          entry.isIntersecting ? "true" : "false"
        );
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      document.documentElement.removeAttribute("data-hide-nav");
    };
  }, []);

  const bubbles: BubbleConfig[] = [
    {
      url: "https://i.pinimg.com/736x/b5/23/b3/b523b3e8a7410b20dedbac7491a528af.jpg",
      size: 520,
      x: "18%",
      y: "32%",
      range: [0, 0.38],
      drift: { x: 40, y: -70 },
      layer: 1,
      caption: "The First Look",
    },
    {
      url: "https://i.pinimg.com/736x/ba/63/52/ba63529729f2cc61dbac103f6f7bb238.jpg",
      size: 340,
      x: "72%",
      y: "24%",
      range: [0.08, 0.46],
      drift: { x: -50, y: -55 },
      layer: 3,
      caption: "Golden Hour",
    },
    {
      url: "https://i.pinimg.com/736x/00/bd/a0/00bda06b701af0b5ee56538e55312a06.jpg",
      size: 440,
      x: "34%",
      y: "62%",
      range: [0.22, 0.58],
      drift: { x: 55, y: -90 },
      layer: 2,
      caption: "Quiet Ceremony",
    },
    {
      url: "https://i.pinimg.com/1200x/70/7c/74/707c741bd1aa9d0c154f81f2bc089bd8.jpg",
      size: 290,
      x: "78%",
      y: "48%",
      range: [0.32, 0.68],
      drift: { x: -70, y: -65 },
      layer: 3,
      caption: "The Details",
    },
    {
      url: "https://i.pinimg.com/1200x/b8/9c/5f/b89c5f5d181450d685871a21d76d60ae.jpg",
      size: 490,
      x: "12%",
      y: "52%",
      range: [0.46, 0.80],
      drift: { x: 80, y: -85 },
      layer: 1,
      caption: "First Dance",
    },
    {
      url: "https://i.pinimg.com/736x/2d/04/16/2d04167fb5b1b086548758f5f08bf8c4.jpg",
      size: 370,
      x: "66%",
      y: "68%",
      range: [0.58, 0.88],
      drift: { x: -35, y: -110 },
      layer: 2,
      caption: "Joy Unscripted",
    },
    {
      url: "https://i.pinimg.com/736x/3a/0e/0c/3a0e0c89e90e0caf232ca5f2bd30ea9d.jpg",
      size: 415,
      x: "28%",
      y: "72%",
      range: [0.72, 0.96],
      drift: { x: 45, y: -80 },
      layer: 2,
      caption: "Into the Night",
    },
    {
      url: "https://i.pinimg.com/736x/43/ea/c0/43eac0aed202d47c88a0715a1c56af64.jpg",
      size: 530,
      x: "62%",
      y: "22%",
      range: [0.82, 1.0],
      drift: { x: -50, y: -130 },
      layer: 1,
      caption: "Forever Begins",
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
          background: "#ffffff",
        }}
      >

        {/* Bubbles */}
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {bubbles.map((b, i) => (
            <Bubble key={i} config={b} progress={scrollYProgress} index={i} />
          ))}
        </div>

        {/* Captions — only show the active one */}
        {bubbles.map((b, i) => (
          <Caption key={i} text={b.caption} progress={scrollYProgress} range={b.range} />
        ))}

        {/* Counter */}
        <Counter progress={scrollYProgress} total={bubbles.length} bubbles={bubbles} />

        {/* Scroll indicator */}
        <ScrollIndicator progress={scrollYProgress} />

        {/* Section label — top left */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 36,
            zIndex: 50,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontSize: 9,
              letterSpacing: "0.46em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "rgba(0,0,0,0.18)",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Archive
          </span>
        </div>
      </div>
    </section>
  );
};