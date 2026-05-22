"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

// ─────────────────────────────────────────────────────────────
// FONT NOTE
// Add in globals.css:
// @import url('https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap');
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// THEME
// ─────────────────────────────────────────────────────────────

const SITE_THEME = {
  background: "#ffffff",
  text: "#111111",
  muted: "#6f6f6f",
  accent: "#c9a84c",
  line: "rgba(0,0,0,0.08)",
};

// ─────────────────────────────────────────────────────────────
// CHAPTERS
// ─────────────────────────────────────────────────────────────

const CHAPTERS = [
  { word: "Cherished", sub: "Every beginning deserves a witness", at: 0.14 },
  { word: "Crafted", sub: "Details that outlast the moment", at: 0.36 },
  { word: "Remembered", sub: "Because the beautiful must endure", at: 0.62 },
  { word: "Eternal", sub: "Where time quietly stops", at: 0.86 },
];

// ─────────────────────────────────────────────────────────────
// BUBBLES
// ─────────────────────────────────────────────────────────────

const BUBBLES = [
  {
    image: "https://i.postimg.cc/nVTTMQyK/AKR05567.jpg",
    size: 480,
    x: "22%",
    y: "28%",
    revealAt: 0.02,
    holdUntil: 0.35,
    drift: { x: 30, y: -80 },
    layer: 1,
  },
  {
    image: "https://i.postimg.cc/138vk5YT/AKR05590.jpg",
    size: 320,
    x: "78%",
    y: "34%",
    revealAt: 0.1,
    holdUntil: 0.45,
    drift: { x: -40, y: -60 },
    layer: 3,
  },
  {
    image: "https://i.postimg.cc/T3KtzYHN/AKR07379.jpg",
    size: 420,
    x: "32%",
    y: "70%",
    revealAt: 0.2,
    holdUntil: 0.55,
    drift: { x: 45, y: -90 },
    layer: 2,
  },
  {
    image: "https://i.postimg.cc/XNxxXyRL/AKR07499.jpg",
    size: 280,
    x: "82%",
    y: "65%",
    revealAt: 0.35,
    holdUntil: 0.68,
    drift: { x: -50, y: -75 },
    layer: 3,
  },
  {
    image: "https://i.postimg.cc/2yjw2zZn/IMG-7087.jpg",
    size: 460,
    x: "18%",
    y: "45%",
    revealAt: 0.45,
    holdUntil: 0.8,
    drift: { x: 60, y: -85 },
    layer: 1,
  },
  {
    image: "https://i.postimg.cc/k58f5YCX/IMG-7093.jpg",
    size: 340,
    x: "70%",
    y: "25%",
    revealAt: 0.55,
    holdUntil: 0.9,
    drift: { x: -35, y: -95 },
    layer: 2,
  },
  {
    image: "https://i.postimg.cc/XJbxBKNz/IMG-7094.jpg",
    size: 400,
    x: "35%",
    y: "75%",
    revealAt: 0.65,
    holdUntil: 0.98,
    drift: { x: 40, y: -70 },
    layer: 2,
  },
  {
    image: "https://i.postimg.cc/WzpnX2kx/IMG-7095.jpg",
    size: 510,
    x: "65%",
    y: "60%",
    revealAt: 0.75,
    holdUntil: 1,
    drift: { x: -45, y: -110 },
    layer: 1,
  },
];

// ─────────────────────────────────────────────────────────────
// SPRINGS
// ─────────────────────────────────────────────────────────────

const SMOOTH = { stiffness: 40, damping: 25, mass: 1.2 };
const CURSOR = { stiffness: 90, damping: 40, mass: 0.8 };

// ─────────────────────────────────────────────────────────────
// CHAPTER COMPONENT
// ─────────────────────────────────────────────────────────────

const Chapter = ({ item, progress }: any) => {
  const opacity = useTransform(
    progress,
    [item.at - 0.12, item.at - 0.03, item.at + 0.03, item.at + 0.12],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    progress,
    [item.at - 0.12, item.at, item.at + 0.12],
    [40, 0, -40]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col items-center justify-center z-[100] pointer-events-none"
    >
      <h2
        style={{
          fontFamily: "'Pinyon Script', cursive",
          fontSize: "clamp(50px,8vw,100px)",
          fontWeight: 500,
          letterSpacing: "0.02em",
          lineHeight: 1.2,

          paddingTop: "10px",
          paddingBottom: "20px",

          // 👇 ADD THESE TO PREVENT THE CHOPPING
          paddingLeft: "0.15em",
          paddingRight: "0.6em",

          background:
            "linear-gradient(135deg, #f6e27a 0%, #c9a84c 40%, #8a6b1f 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",

          textShadow:
            "0 0 20px rgba(201, 168, 76, 0.25), 0 10px 40px rgba(0,0,0,0.15)",
        }}
      >
        {item.word}
      </h2>

      <p className="mt-5 uppercase tracking-[0.45em] text-[10px] text-zinc-500">
        {item.sub}
      </p>

      <div className="mt-6 w-10 h-[1px] bg-[#c9a84c]" />
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────
// BUBBLE COMPONENT
// ─────────────────────────────────────────────────────────────

const Bubble = ({ config, progress, mouseX, mouseY, velocity }: any) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const size = isMobile ? config.size * 0.72 : config.size;

  const reveal = useTransform(
    progress,
    [
      config.revealAt,
      config.revealAt + 0.08,
      config.holdUntil - 0.08,
      config.holdUntil,
    ],
    [0, 1, 1, 0]
  );

  const scale = useSpring(reveal, SMOOTH);
  const opacity = useSpring(reveal, SMOOTH);

  const driftX = useTransform(
    progress,
    [config.revealAt, config.holdUntil],
    [0, config.drift.x]
  );

  const driftY = useTransform(
    progress,
    [config.revealAt, config.holdUntil],
    [0, config.drift.y]
  );

  const parallaxX = useTransform(
    mouseX,
    [-1, 1],
    [-config.layer * 12, config.layer * 12]
  );

  const parallaxY = useTransform(
    mouseY,
    [-1, 1],
    [-config.layer * 8, config.layer * 8]
  );

  const combinedX = useTransform([driftX, parallaxX], (latest) => {
    const [a, b] = latest as number[];
    return a + b;
  });

  const combinedY = useTransform([driftY, parallaxY], (latest) => {
    const [a, b] = latest as number[];
    return a + b;
  });

  const rotate = useTransform(
    progress,
    [config.revealAt, config.holdUntil],
    [-config.layer * 2, config.layer * 2]
  );

  const velocityBoost = useTransform(
    velocity,
    [-2000, 0, 2000],
    [0.97, 1, 1.03]
  );

  const finalScale = useTransform([scale, velocityBoost], (latest) => {
    const [a, b] = latest as number[];
    return a * b;
  });

  return (
    <div
      style={{
        position: "absolute",
        left: isMobile ? config.mobileX || config.x : config.x,
        top: isMobile ? config.mobileY || config.y : config.y,
        width: size,
        height: size,
        transform: "translate(-50%, -50%)",
        zIndex: 20 + config.layer,
      }}
    >
      <motion.div
        style={{
          x: combinedX,
          y: combinedY,
          rotate,
          scale: finalScale,
          opacity,
        }}
        className="w-full h-full"
      >
        <div
          className="relative w-full h-full overflow-hidden"
          style={{
            borderRadius: "42% 58% 63% 37% / 38% 41% 59% 62%",
            boxShadow: "0 40px 100px rgba(0,0,0,0.08)",
          }}
        >
          <img
            src={config.image}
            className="absolute inset-0 w-full h-full object-cover"
            alt=""
          />
        </div>
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export const BubbleScroll = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const velocity = useVelocity(scrollYProgress);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const mouseX = useSpring(mx, CURSOR);
  const mouseY = useSpring(my, CURSOR);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <section ref={ref} className="relative h-[800vh] bg-white">
      <motion.div className="sticky top-0 h-screen overflow-hidden bg-white">
        {BUBBLES.map((b, i) => (
          <Bubble
            key={i}
            config={b}
            progress={scrollYProgress}
            mouseX={mouseX}
            mouseY={mouseY}
            velocity={velocity}
          />
        ))}

        {CHAPTERS.map((c, i) => (
          <Chapter key={i} item={c} progress={scrollYProgress} />
        ))}
      </motion.div>
    </section>
  );
};