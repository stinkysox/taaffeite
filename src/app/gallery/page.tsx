"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GALLERY_DATA } from "@/data/gallery";
import Image from "next/image";

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
  const [filter, setFilter] = useState<string>("All");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const handleItemInteraction = (id: string, isClick: boolean) => {
    if (isClick) {
      setActiveId((prev) => (prev === id ? null : id));
    } else {
      setActiveId(id);
    }
  };

  const filteredItems = GALLERY_DATA.filter((item) =>
    filter === "All" ? true : item.category === filter
  );

  return (
    <div className="pt-40 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Luxury Category Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-3 md:gap-6 mb-24"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                setActiveId(null);
              }}
              className={`px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-500 border ${
                filter === cat
                  ? "bg-gold-600 border-gold-600 text-[#1a1a1a] shadow-xl shadow-gold-600/20 scale-105"
                  : "border-black/5 text-gray-400 hover:text-[#1a1a1a] hover:border-black/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid or Coming Soon State */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {filteredItems.length > 0 ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8"
              >
                {filteredItems.map((item) => {
                  const isLoaded = loadedImages[item.id];
                  const isActive = activeId === item.id;

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="break-inside-avoid"
                    >
                      <div
                        className="group relative overflow-hidden rounded-[2.5rem] glass-light border border-black/5 shadow-sm cursor-pointer"
                        onClick={() => handleItemInteraction(item.id, true)}
                        onMouseEnter={() =>
                          handleItemInteraction(item.id, false)
                        }
                        onMouseLeave={() => setActiveId(null)}
                      >
                        <div className="relative w-full aspect-[4/5] overflow-hidden">
                          <div className={`absolute inset-0 shimmer transition-opacity duration-700 z-10 ${isLoaded ? 'opacity-0' : 'opacity-100'}`} />
                          <div className={`relative w-full h-full ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}>
                            <Image
                              src={item.imageUrl}
                              alt={item.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              priority={GALLERY_DATA.indexOf(item) < 4}
                              className={`object-cover transition-all duration-1000 ${
                                isActive ? "brightness-[0.3] blur-[6px] scale-110" : "brightness-100 blur-0 scale-100"
                              }`}
                              onLoad={() =>
                                setLoadedImages((prev) => ({
                                  ...prev,
                                  [item.id]: true,
                                }))
                              }
                            />
                          </div>
                        </div>

                        <motion.div
                          initial={false}
                          animate={{ opacity: isActive ? 1 : 0 }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0 p-10 flex flex-col justify-end pointer-events-none"
                        >
                          <div className="relative z-10">
                            <motion.p
                              animate={{ y: isActive ? 0 : 20 }}
                              className="text-gold-600 uppercase text-[9px] tracking-[0.6em] font-bold mb-4"
                            >
                              {item.category}
                            </motion.p>
                            <motion.h3
                              animate={{ y: isActive ? 0 : 20 }}
                              transition={{ delay: 0.05 }}
                              className="text-3xl md:text-4xl font-serif text-[#1a1a1a] mb-5 italic leading-tight"
                            >
                              {item.title}
                            </motion.h3>
                            <motion.p
                              animate={{ y: isActive ? 0 : 20 }}
                              transition={{ delay: 0.1 }}
                              className="text-[#1a1a1a]/80 text-[12px] md:text-sm leading-relaxed max-w-[280px] font-light italic"
                            >
                              {item.description}
                            </motion.p>
                          </div>
                        </motion.div>
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2.5rem] pointer-events-none" />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              /* --- Coming Soon --- */
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <div className="w-24 h-[1px] bg-gold-600/30 mb-8" />
                <h3 className="text-4xl md:text-5xl font-serif italic text-black dark:text-[#1a1a1a] mb-4">
                  Coming Soon
                </h3>
                <p className="text-gray-400 uppercase tracking-[0.4em] text-[10px] font-medium">
                  We are currently curating this collection
                </p>
                <div className="w-24 h-[1px] bg-gold-600/30 mt-8" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
