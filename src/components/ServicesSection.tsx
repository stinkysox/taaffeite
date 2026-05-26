"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

import { siteContent } from "../data/siteContent";

export default function Services() {
  const { services } = siteContent;

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
  });

  // Hero transforms
  const heroY = useTransform(
    smooth,
    [0, 0.3],
    ["0%", "20%"]
  );

  const heroOpacity = useTransform(
    smooth,
    [0, 0.2],
    [1, 0.2]
  );

  // Blob scaling
  const blobScale = useTransform(
    smooth,
    [0, 1],
    [1, 1.6]
  );

  const blobRotate = useTransform(
    smooth,
    [0, 1],
    [0, 20]
  );

  return (
    <div
      ref={containerRef}
      className="relative bg-[#faf8f4] overflow-hidden"
    >
      {/* Ambient Orbs */}
      <motion.div
        style={{
          scale: blobScale,
          rotate: blobRotate,
        }}
        className="absolute top-[-10%] right-[-10%] w-[900px] h-[900px] rounded-full bg-[#d4af37]/10 blur-[140px]"
      />

      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#c6a769]/10 blur-[120px]"
      />

      {/* HERO */}
      <motion.section
        style={{
          y: heroY,
          opacity: heroOpacity,
        }}
        className="relative min-h-screen flex items-center px-6 md:px-10"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-[1fr_320px] gap-20 items-end">
            {/* LEFT */}
            <div>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                }}
                viewport={{ once: true }}
                className="block text-[10px] uppercase tracking-[0.55em] text-zinc-400 mb-10"
              >
                {services.hero.label}
              </motion.span>

              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: 140 }}
                  whileInView={{ y: 0 }}
                  transition={{
                    duration: 1.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{ once: true }}
                  className="font-serif text-[4.2rem] sm:text-[5rem] md:text-[7rem] lg:text-[10rem] leading-[0.88] tracking-[-0.07em] text-[#111]"
                >
                  <span className="block">
                    {services.hero.title}
                  </span>

                  <span className="block italic text-[#c6a769] font-light ml-6 md:ml-14">
                    {services.hero.titleAccent}
                  </span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.4,
                  duration: 1.2,
                }}
                viewport={{ once: true }}
                className="mt-14 max-w-2xl text-lg md:text-xl leading-[1.9] text-zinc-500 font-light"
              >
                {services.hero.description}
              </motion.p>
            </div>

            {/* RIGHT META */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.8,
                duration: 1.2,
              }}
              viewport={{ once: true }}
              className="hidden lg:flex flex-col gap-8 mb-10"
            >
              {[
                "Luxury Wedding Planning",
                "Editorial Styling",
                "Emotion Driven Experiences",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4"
                >
                  <div className="w-2 h-2 rounded-full bg-[#c6a769]" />

                  <span className="text-[11px] uppercase tracking-[0.35em] text-zinc-400">
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* SERVICES STACK */}
      <section className="relative z-20 px-6 md:px-10 pb-40">
        <div className="max-w-7xl mx-auto flex flex-col gap-32">
          {services.categories.map((category, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <ServiceCard
                key={idx}
                category={category}
                index={idx}
                align={isEven ? "left" : "right"}
              />
            );
          })}
        </div>
      </section>

      {/* FINAL NOTE */}
      <section className="relative z-20 px-6 md:px-10 pb-40">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-[3rem] border border-black/5 bg-white/70 backdrop-blur-2xl px-10 py-16 md:px-20 md:py-24 shadow-[0_20px_80px_rgba(0,0,0,0.06)]">
            {/* Orb */}
            <div className="absolute top-[-30%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#d4af37]/10 blur-[120px]" />

            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-[0.45em] text-zinc-400">
                Important Note
              </span>

              <h3 className="mt-8 text-4xl md:text-6xl font-serif leading-[1] tracking-tight text-[#111]">
                {services.note.title}
              </h3>

              <p className="mt-10 max-w-3xl text-lg leading-[1.9] text-zinc-500 font-light">
                {services.note.description}
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

/* SERVICE CARD */

function ServiceCard({
  category,
  index,
  align,
}: any) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 100,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{
        once: true,
        margin: "-10%",
      }}
      className={`grid lg:grid-cols-2 gap-12 items-start ${align === "right"
        ? "lg:[&>*:first-child]:order-2"
        : ""
        }`}
    >
      {/* Giant Number */}
      <div className="relative">
        <span className="absolute -top-20 left-0 font-serif text-[8rem] md:text-[12rem] leading-none tracking-[-0.08em] text-black/[0.03] select-none">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="relative z-10 pt-12">
          <span className="text-[10px] uppercase tracking-[0.45em] text-zinc-400">
            Category
          </span>

          <h2 className="mt-6 text-4xl md:text-6xl font-serif leading-[0.95] tracking-[-0.05em] text-[#111]">
            {category.title}
          </h2>
        </div>
      </div>

      {/* Services */}
      <div className="relative">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-black/5 bg-white/70 backdrop-blur-2xl p-10 md:p-14 shadow-[0_10px_60px_rgba(0,0,0,0.04)]">
          {/* Floating Light */}
          <div className="absolute top-[-20%] right-[-10%] w-[240px] h-[240px] rounded-full bg-[#d4af37]/10 blur-[90px]" />

          <div className="relative z-10 grid sm:grid-cols-2 gap-x-10 gap-y-8">
            {category.services.map(
              (item: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: i * 0.05,
                    duration: 0.6,
                  }}
                  viewport={{ once: true }}
                  className="group flex items-start gap-4"
                >
                  <div className="mt-2 w-2 h-2 rounded-full bg-[#c6a769] group-hover:scale-150 transition-transform duration-500" />

                  <span className="text-sm uppercase tracking-[0.18em] leading-[1.8] text-zinc-500 group-hover:text-[#111] transition-colors duration-500">
                    {item}
                  </span>
                </motion.div>
              )
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}