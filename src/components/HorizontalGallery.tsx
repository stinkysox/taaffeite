"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface GalleryItem {
  id: number | string;
  url: string;
  title: string;
  category: string;
}

interface HorizontalGalleryProps {
  items?: GalleryItem[];
}

const DEFAULT_ITEMS: GalleryItem[] = [
  {
    id: 1,
    url: "https://i.pinimg.com/736x/8d/68/7c/8d687ca0c53869d80c3569766d78709a.jpg",
    title: "Shadows of Love",
    category: "Candid",
  },
  {
    id: 2,
    url: "https://i.pinimg.com/736x/2a/56/67/2a5667e51c8651817478631199388837.jpg",
    title: "The Regal Veil",
    category: "Editorial",
  },
  {
    id: 3,
    url: "https://i.pinimg.com/1200x/31/31/6a/31316a3c6130386c99c90a169b1397b2.jpg",
    title: "Midnight Vows",
    category: "Cinematic",
  },
  {
    id: 4,
    url: "https://i.pinimg.com/736x/eb/9b/87/eb9b876a3809df6595562d98993876ae.jpg",
    title: "Golden Hour Bliss",
    category: "Portraits",
  },
  {
    id: 5,
    url: "https://i.pinimg.com/736x/6f/9d/2c/6f9d2cb3809fb2a4d0f6828551105781.jpg",
    title: "Monochrome Magic",
    category: "Artistic",
  },
];

export const HorizontalGallery: React.FC<HorizontalGalleryProps> = ({ items = DEFAULT_ITEMS }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate dynamic scroll height: roughly 100vh per item + a bit more for the end card
  // For 3 items, we'll use 300vh. For more, it scales.
  const scrollHeight = `${Math.max(200, (items.length + 1) * 80)}vh`;
  
  // Calculate horizontal translation. 
  // For 4 items plus end card, we need to scroll significantly.
  // On very narrow screens (320px-360px), we need to reach ~85-90% translation.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${Math.min(90, (items.length) * 22)}%`]);

  // Derived progress and opacity for the indicators
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={targetRef} style={{ height: scrollHeight }} className="relative bg-transparent">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Scroll Interaction Hint */}
        <motion.div 
          style={{ opacity: indicatorOpacity }}
          className="absolute top-1/2 left-12 md:left-24 -translate-y-1/2 z-20 pointer-events-none"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-gold-600" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold-600">
              Scroll to explore
            </span>
          </div>
        </motion.div>

        <motion.div style={{ x }} className="flex gap-8 md:gap-12 px-12 md:px-24 w-full">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="group relative h-[60vh] md:h-[70vh] aspect-[4/5] flex-shrink-0 overflow-hidden rounded-3xl md:rounded-[3rem] bg-zinc-900 border border-black/5"
            >
              <div className="absolute inset-0 shimmer opacity-20" />
              <Image
                src={item.url}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end">
                <motion.span 
                  className="text-[10px] uppercase tracking-[0.3em] text-gold-500 font-bold mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {item.category}
                </motion.span>
                <motion.h3 
                  className="text-3xl md:text-5xl font-serif text-[#1a1a1a] tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {item.title}
                </motion.h3>
              </div>
            </div>
          ))}
          
          {/* Ending Card / Call to Action */}
          <div className="h-[60vh] md:h-[70vh] aspect-[4/5] md:aspect-[1/1] flex-shrink-0 flex items-center justify-center p-6">
             <div className="text-center">
                <h3 className="text-3xl md:text-6xl font-serif text-[#1a1a1a] mb-8 italic leading-tight">And many more stories...</h3>
                <a href="/gallery" className="premium-label border border-black/20 px-8 py-4 rounded-full hover:bg-black/10 transition-colors inline-block">
                    View Full Archive
                </a>
             </div>
          </div>
        </motion.div>

        {/* Progress Bar Container */}
        <div className="absolute bottom-12 left-12 md:left-24 right-12 md:right-24 h-[1px] bg-black/10 overflow-hidden">
          <motion.div 
            style={{ width: progressWidth }}
            className="h-full bg-gold-600 shadow-[0_0_10px_rgba(202,138,4,0.5)]"
          />
        </div>
      </div>
    </section>
  );
};
