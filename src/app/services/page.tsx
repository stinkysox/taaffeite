"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import Image from "next/image";

// Premium, lightweight luxury editorial icons from Lucide React
import { 
  Compass, 
  Sparkles, 
  Layers, 
  Heart,
  ChevronRight 
} from "lucide-react";

import { siteContent } from "../../data/siteContent";

/* ─── DYNAMIC EDITORIAL CATEGORY ICONS ────────────────────────────── */
const CategoryIcon = ({ index, className }: { index: number; className?: string }) => {
  const icons = [
    <Compass key="0" className={className} strokeWidth={1.2} />,   // Planning / Architecture
    <Sparkles key="1" className={className} strokeWidth={1.2} />,  // Styling / Design Curation
    <Layers key="2" className={className} strokeWidth={1.2} />,     // Coordination / Execution
    <Heart key="3" className={className} strokeWidth={1.2} />       // Fallback
  ];
  return icons[index] || icons[3];
};

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

  const blobScale = useTransform(smooth, [0, 1], [1, 1.5]);
  const blobRotate = useTransform(smooth, [0, 1], [0, 20]);

  return (
    <div ref={containerRef} className="relative bg-[#faf8f4] overflow-hidden">
      
      {/* Ambient Orbs */}
      <motion.div
        style={{ scale: blobScale, rotate: blobRotate }}
        className="absolute top-[-10%] right-[-10%] w-[900px] h-[900px] rounded-full bg-[#d4af37]/10 blur-[140px] pointer-events-none"
      />

      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#c6a769]/10 blur-[120px] pointer-events-none"
      />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 pt-36 pb-24 lg:py-0">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            
            {/* LEFT: TEXT CONTENT */}
            <div className="flex flex-col justify-center z-10">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="block text-[10px] uppercase tracking-[0.55em] text-stone-400 mb-6 lg:mb-8"
              >
                {services.hero.label}
              </motion.span>

              <div className="overflow-hidden py-2">
                <motion.h1
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  className="font-serif text-[3.2rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6.5rem] xl:text-[7.8rem] leading-[1.02] tracking-[-0.04em] text-stone-800"
                >
                  <span className="block pr-4">
                    {services.hero.title}
                  </span>
                  <span className="block italic text-[#c6a769] font-light mt-2 sm:mt-4 ml-4 md:ml-12">
                    {services.hero.titleAccent}
                  </span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1.2 }}
                viewport={{ once: true }}
                className="mt-8 lg:mt-12 max-w-xl text-base md:text-lg leading-[1.8] text-stone-500 font-light"
              >
                {services.hero.description}
              </motion.p>

              {/* META BULLETS */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1.2 }}
                viewport={{ once: true }}
                className="mt-12 flex flex-wrap gap-x-8 gap-y-4"
              >
                {[
                  "Luxury Wedding Planning",
                  "Editorial Styling",
                  "Emotion Driven Experiences",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c6a769]" />
                    <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT: HERO IMAGE ENTRY */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="w-full max-w-xl mx-auto lg:max-w-none relative z-10"
            >
              <div className="aspect-[4/5] sm:aspect-[14/17] lg:aspect-[4/5] overflow-hidden rounded-[3.5rem] relative shadow-[0_30px_100px_rgba(0,0,0,0.08)] bg-stone-100 group">
                <Image
                  src={services.hero.image || "https://i.postimg.cc/nVTTMQyK/AKR05567.jpg"}
                  alt="Our Premium Services Overview"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-103"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-[#c6a769]/10 rounded-[3.5rem] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/5 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

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
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-[3rem] border border-stone-200/50 bg-white/70 backdrop-blur-2xl px-10 py-16 md:px-20 md:py-24 shadow-[0_20px_80px_rgba(0,0,0,0.03)]">
            <div className="absolute top-[-30%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#d4af37]/10 blur-[120px]" />

            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-[0.45em] text-stone-400">
                Important Note
              </span>

              <h3 className="mt-8 text-3xl md:text-5xl font-serif leading-[1.1] tracking-tight text-stone-800">
                {services.note.title}
              </h3>

              <p className="mt-8 max-w-3xl text-base md:text-lg leading-[1.8] text-stone-500 font-light">
                {services.note.description}
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

/* SERVICE CARD WITH INTEGRATED LUCIDE ICONS */
function ServiceCard({ category, index, align }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-10%" }}
      className={`grid lg:grid-cols-2 gap-12 items-start ${
        align === "right" ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* LEFT COLUMN: CATEGORY HEADER & COUNTER */}
      <div className="relative">
        <span className="absolute -top-16 left-0 font-serif text-[7rem] md:text-[10rem] leading-none tracking-[-0.08em] text-stone-900/[0.02] select-none pointer-events-none">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="relative z-10 pt-12 flex flex-col items-start">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-11 h-11 rounded-full border border-[#c6a769]/30 bg-white flex items-center justify-center text-[#c6a769] shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
              <CategoryIcon index={index} className="w-4 h-4" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.45em] text-stone-400 font-medium">
              Category
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif leading-[1.05] tracking-[-0.03em] text-stone-800">
            {category.title}
          </h2>
        </div>
      </div>

      {/* RIGHT COLUMN: DETAILED SERVICES GRID CONTAINER */}
      <div className="relative">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-stone-200/60 bg-white/70 backdrop-blur-2xl p-8 md:p-12 shadow-[0_12px_50px_rgba(0,0,0,0.02)]">
          <div className="absolute top-[-20%] right-[-10%] w-[240px] h-[240px] rounded-full bg-[#d4af37]/10 blur-[90px]" />

          <div className="relative z-10 grid sm:grid-cols-2 gap-x-8 gap-y-6">
            {category.services.map((item: string, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
                viewport={{ once: true }}
                className="group/item flex items-center gap-3 py-1 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#c6a769]/5 group-hover/item:bg-[#c6a769]/10 text-[#c6a769] transition-colors duration-500 shrink-0">
                  <ChevronRight 
                    className="w-3 h-3 group-hover/item:translate-x-0.5 transition-transform duration-300" 
                    strokeWidth={1.5} 
                  />
                </div>

                <span className="text-xs uppercase tracking-[0.15em] leading-relaxed text-stone-500 group-hover/item:text-stone-900 transition-colors duration-500">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}