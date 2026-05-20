"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { GALLERY_DATA } from "@/data/gallery";

const CATEGORIES = [
  "All",
  "Wedding",
  "Pre-Wedding",
  "Maternity",
  "Baby Shoot",
  "Engagement",
  "Family",
  "Rituals",
  "Other Events",
];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const filteredItems = useMemo(() => {
    return GALLERY_DATA.filter((item) =>
      filter === "All" ? true : item.category === filter
    );
  }, [filter]);

  const { scrollYProgress } = useScroll();

  const blobScale = useTransform(scrollYProgress, [0, 1], [1, 1.8]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const blobOpacity = useTransform(scrollYProgress, [0, 1], [0.18, 0.05]);

  return (
    <main className="relative min-h-screen bg-[#faf8f4] overflow-hidden">
      {/* Luxury Ambient Blobs */}
      <motion.div
        style={{
          scale: blobScale,
          y: blobY,
          opacity: blobOpacity,
        }}
        className="fixed top-[-15%] right-[-10%] w-[700px] h-[700px] rounded-full bg-[#d4af37]/20 blur-[120px] pointer-events-none"
      />

      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="fixed bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#d4af37]/10 blur-[140px] pointer-events-none"
      />

      {/* Vertical Editorial Lines */}
      <div className="fixed inset-y-0 left-6 right-6 md:left-10 md:right-10 flex justify-between pointer-events-none z-0">
        <div className="w-px bg-black/[0.03]" />
        <div className="w-px bg-black/[0.03] hidden lg:block" />
        <div className="w-px bg-black/[0.03]" />
      </div>

      <div className="relative z-10 pt-36 pb-32 px-6 md:px-10">
        {/* HERO */}
        <section className="max-w-7xl mx-auto mb-28">
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="block mb-6 text-[10px] uppercase tracking-[0.5em] text-zinc-400 font-medium"
            >
              Curated Visual Narratives
            </motion.span>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 140 }}
              animate={{ y: 0 }}
              transition={{
                duration: 1.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] leading-[0.85] tracking-[-0.08em] font-serif text-[#111]"
            >
              The
              <span className="italic text-[#c6a769] font-light block">
                Archive
              </span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
              duration: 1.2,
            }}
            className="mt-10 max-w-2xl text-lg md:text-xl leading-[1.9] text-zinc-500 font-light"
          >
            A refined collection of emotionally driven celebrations,
            cinematic moments, and timeless visual storytelling crafted
            with intention.
          </motion.p>
        </section>

        {/* FILTERS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-7xl mx-auto flex flex-wrap items-center gap-3 md:gap-4 mb-24"
        >
          {CATEGORIES.map((cat) => {
            const isActive = filter === cat;

            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`group relative overflow-hidden px-7 py-3 rounded-full border transition-all duration-700 ${isActive
                    ? "border-[#111] bg-[#111]"
                    : "border-black/10 bg-white/60 backdrop-blur-xl hover:border-black/30"
                  }`}
              >
                <span
                  className={`relative z-10 text-[10px] uppercase tracking-[0.35em] font-medium transition-colors duration-500 ${isActive ? "text-white" : "text-zinc-500"
                    }`}
                >
                  {cat}
                </span>

                {!isActive && (
                  <div className="absolute inset-0 bg-[#111] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-[0.22,1,0.36,1]" />
                )}

                {!isActive && (
                  <span className="absolute inset-0 flex items-center justify-center z-20 text-[10px] uppercase tracking-[0.35em] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {cat}
                  </span>
                )}
              </button>
            );
          })}
        </motion.div>

        {/* GALLERY */}
        <AnimatePresence mode="wait">
          <motion.section
            key={filter}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-7xl mx-auto"
          >
            {filteredItems.length > 0 ? (
              <div className="columns-1 sm:columns-2 xl:columns-3 gap-8 space-y-8">
                {filteredItems.map((item, index) => {
                  const isHovered = hoveredId === item.id;
                  const isLoaded = loadedImages[item.id];

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{
                        opacity: 0,
                        y: 60,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                        margin: "-10%",
                      }}
                      transition={{
                        duration: 1,
                        delay: index * 0.04,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="break-inside-avoid"
                    >
                      <motion.div
                        onMouseEnter={() =>
                          setHoveredId(item.id)
                        }
                        onMouseLeave={() =>
                          setHoveredId(null)
                        }
                        className="group relative overflow-hidden rounded-[2.5rem] bg-white/70 backdrop-blur-xl border border-black/5 shadow-[0_10px_60px_rgba(0,0,0,0.05)]"
                      >
                        {/* IMAGE */}
                        <div className="relative aspect-[4/5] overflow-hidden">
                          {!isLoaded && (
                            <div className="absolute inset-0 bg-zinc-100 animate-pulse z-10" />
                          )}

                          <motion.div
                            animate={{
                              scale: isHovered ? 1.08 : 1,
                            }}
                            transition={{
                              duration: 1.4,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="relative w-full h-full"
                          >
                            <Image
                              src={item.imageUrl}
                              alt={item.title}
                              fill
                              priority={index < 4}
                              sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
                              className={`object-cover transition-all duration-[1600ms] ${isHovered
                                  ? "grayscale-0 brightness-[0.55]"
                                  : "grayscale-[12%]"
                                }`}
                              onLoad={() =>
                                setLoadedImages((prev) => ({
                                  ...prev,
                                  [item.id]: true,
                                }))
                              }
                            />
                          </motion.div>

                          {/* Overlay */}
                          <motion.div
                            animate={{
                              opacity: isHovered ? 1 : 0,
                            }}
                            transition={{
                              duration: 0.6,
                            }}
                            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"
                          />

                          {/* Glow */}
                          <motion.div
                            animate={{
                              opacity: isHovered ? 1 : 0,
                              scale: isHovered ? 1 : 0.7,
                            }}
                            transition={{
                              duration: 1,
                            }}
                            className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[70%] h-[120px] rounded-full bg-[#d4af37]/30 blur-[90px]"
                          />

                          {/* Content */}
                          <motion.div
                            animate={{
                              y: isHovered ? 0 : 40,
                              opacity: isHovered ? 1 : 0,
                            }}
                            transition={{
                              duration: 0.8,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="absolute inset-x-0 bottom-0 p-8 md:p-10"
                          >
                            <p className="text-[9px] uppercase tracking-[0.45em] text-[#d4af37] font-medium mb-4">
                              {item.category}
                            </p>

                            <h3 className="text-3xl md:text-4xl leading-[1] font-serif text-white italic mb-5">
                              {item.title}
                            </h3>

                            <p className="text-sm leading-[1.8] text-white/75 max-w-xs font-light">
                              {item.description}
                            </p>
                          </motion.div>

                          {/* Editorial Frame */}
                          <div className="absolute inset-0 rounded-[2.5rem] ring-1 ring-white/10 pointer-events-none" />
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="flex flex-col items-center justify-center py-40"
              >
                <div className="w-24 h-px bg-[#d4af37]/30 mb-10" />

                <h2 className="text-5xl md:text-7xl font-serif italic text-[#111] mb-6">
                  Coming Soon
                </h2>

                <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400">
                  Curating this collection
                </p>

                <div className="w-24 h-px bg-[#d4af37]/30 mt-10" />
              </motion.div>
            )}
          </motion.section>
        </AnimatePresence>
      </div>
    </main>
  );
}