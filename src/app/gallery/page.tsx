"use client";

import React, { useMemo, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import {
  X,
  Expand,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { GALLERY_DATA } from "@/data/gallery";

const CATEGORIES = [
  "All",
  "Weddings",
  "Haldi/Mehandi",
  "Proposal",
  "Reception",
];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>(
    {}
  );

  const filteredItems = useMemo(() => {
    return GALLERY_DATA.filter((item) =>
      filter === "All" ? true : item.category === filter
    );
  }, [filter]);

  const selectedImage =
    selectedIndex !== null ? filteredItems[selectedIndex] : null;

  const goNext = () => {
    if (selectedIndex === null) return;

    setSelectedIndex((prev) =>
      prev === filteredItems.length - 1 ? 0 : prev! + 1
    );
  };

  const goPrev = () => {
    if (selectedIndex === null) return;

    setSelectedIndex((prev) =>
      prev === 0 ? filteredItems.length - 1 : prev! - 1
    );
  };

  const { scrollYProgress } = useScroll();

  const blobScale = useTransform(scrollYProgress, [0, 1], [1, 1.8]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const blobOpacity = useTransform(scrollYProgress, [0, 1], [0.18, 0.05]);

  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-[#faf8f4]">
        {/* Ambient Blobs */}
        <motion.div
          style={{
            scale: blobScale,
            y: blobY,
            opacity: blobOpacity,
          }}
          className="fixed top-[-15%] right-[-10%] h-[700px] w-[700px] rounded-full bg-[#d4af37]/20 blur-[120px] pointer-events-none"
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
          className="fixed bottom-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-[#d4af37]/10 blur-[140px] pointer-events-none"
        />

        {/* Editorial Lines */}
        <div className="fixed inset-y-0 left-6 right-6 md:left-10 md:right-10 flex justify-between pointer-events-none z-0">
          <div className="w-px bg-black/[0.03]" />
          <div className="hidden lg:block w-px bg-black/[0.03]" />
          <div className="w-px bg-black/[0.03]" />
        </div>

        <div className="relative z-10 px-6 md:px-10 pt-36 pb-32">
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
                className="mb-6 block text-[10px] uppercase tracking-[0.5em] text-zinc-400 font-medium"
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
                <span className="block italic font-light text-[#c6a769]">
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

            {/* Visual Cue */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1,
              }}
              className="mt-12 flex items-center gap-3 text-zinc-500"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 backdrop-blur-xl">
                <Expand size={16} />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.35em]">
                  Tap Images
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  Open photographs in cinematic preview
                </p>
              </div>
            </motion.div>
          </section>

          {/* FILTERS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-7xl mx-auto mb-24 flex flex-wrap items-center gap-3 md:gap-4"
          >
            {CATEGORIES.map((cat) => {
              const isActive = filter === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`group relative overflow-hidden rounded-full border px-7 py-3 transition-all duration-700 ${isActive
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
                    <>
                      <div className="absolute inset-0 origin-left scale-x-0 bg-[#111] transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-x-100" />

                      <span className="absolute inset-0 z-20 flex items-center justify-center text-[10px] uppercase tracking-[0.35em] font-medium text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        {cat}
                      </span>
                    </>
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
              <div className="columns-1 sm:columns-2 xl:columns-3 gap-8 space-y-8">
                {filteredItems.map((item, index) => {
                  const isHovered = hoveredId === item.id;
                  const isLoaded = loadedImages[item.id];

                  const aspectClass =
                    index % 3 === 0
                      ? "aspect-[4/5]"
                      : index % 2 === 0
                        ? "aspect-[1/1]"
                        : "aspect-[3/4]";

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
                      <motion.button
                        whileHover={{
                          y: -10,
                          scale: 1.01,
                        }}
                        transition={{
                          duration: 0.8,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        onMouseEnter={() => setHoveredId(item.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onClick={() => setSelectedIndex(index)}
                        className="group relative w-full overflow-hidden rounded-[2.5rem] border border-black/5 bg-white/70 backdrop-blur-xl shadow-[0_10px_60px_rgba(0,0,0,0.05)]"
                      >
                        <div
                          className={`relative overflow-hidden ${aspectClass}`}
                        >
                          {!isLoaded && (
                            <div className="absolute inset-0 z-10 animate-pulse bg-zinc-100" />
                          )}

                          <motion.div
                            animate={{
                              scale: isHovered ? 1.08 : 1,
                            }}
                            transition={{
                              duration: 1.4,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="relative h-full w-full"
                          >
                            <Image
                              src={item.imageUrl}
                              alt={item.title}
                              fill
                              unoptimized
                              priority={index < 4}
                              sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
                              className={`object-cover transition-all duration-[1600ms] ${isLoaded ? "opacity-100" : "opacity-0"
                                } ${isHovered
                                  ? "grayscale-0 brightness-[0.55]"
                                  : "md:grayscale-[12%]"
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

                          {/* Expand Icon */}
                          <motion.div
                            animate={{
                              opacity: isHovered ? 1 : 0,
                              y: isHovered ? 0 : 10,
                            }}
                            className="absolute top-5 right-5 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl"
                          >
                            <Expand size={18} className="text-white" />
                          </motion.div>

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
                            className="absolute inset-x-0 bottom-0 p-8 md:p-10 text-left"
                          >
                            <p className="mb-4 text-[9px] uppercase tracking-[0.45em] text-[#d4af37] font-medium">
                              {item.category}
                            </p>

                            <h3 className="mb-5 text-3xl md:text-4xl leading-[1] font-serif italic text-white">
                              {item.title}
                            </h3>

                            <p className="max-w-xs text-sm leading-[1.8] text-white/75 font-light">
                              {item.description}
                            </p>
                          </motion.div>

                          <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] ring-1 ring-white/10" />
                        </div>
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          </AnimatePresence>
        </div>
      </main>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedIndex !== null && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 md:p-10"
          >
            {/* Close */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-xl"
            >
              <X size={22} />
            </button>

            {/* Left Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 md:left-8 top-1/2 z-50 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-xl transition-all hover:bg-white/20"
            >
              <ChevronLeft size={26} />
            </button>

            {/* Right Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 md:right-8 top-1/2 z-50 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-xl transition-all hover:bg-white/20"
            >
              <ChevronRight size={26} />
            </button>

            {/* Image */}
            <motion.div
              initial={{
                scale: 0.92,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.95,
                opacity: 0,
              }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative h-[85vh] w-full max-w-7xl overflow-hidden rounded-[2rem]"
            >
              <Image
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                fill
                unoptimized
                className="object-contain"
              />

              {/* Bottom Info */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-8 md:p-12">
                <p className="mb-3 text-[10px] uppercase tracking-[0.45em] text-[#d4af37]">
                  {selectedImage.category}
                </p>

                <h2 className="text-4xl md:text-6xl font-serif italic text-white">
                  {selectedImage.title}
                </h2>

                <p className="mt-4 max-w-2xl leading-[1.9] text-white/70">
                  {selectedImage.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}