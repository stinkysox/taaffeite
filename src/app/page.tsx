"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { SectionWrapper } from "../components/SectionWrapper";
import { MagneticButton } from "../components/MagneticButton";
import Image from "next/image";
import { siteContent } from "../data/siteContent";
import PremiumHero from "../components/PremiumHero";
import PhilosophySection from "@/components/PhilosophySection";
import { BackgroundGradientOrbs } from "../components/BackgroundGradientOrbs";

const CAROUSEL_IMAGES = [
  "https://i.postimg.cc/nVTTMQyK/AKR05567.jpg",
  "https://i.postimg.cc/138vk5YT/AKR05590.jpg",
  "https://i.postimg.cc/T3KtzYHN/AKR07379.jpg",
  "https://i.postimg.cc/XNxxXyRL/AKR07499.jpg",
  "https://i.postimg.cc/2yjw2zZn/IMG-7087.jpg",
  "https://i.postimg.cc/k58f5YCX/IMG-7093.jpg",
  "https://i.postimg.cc/XJbxBKNz/IMG-7094.jpg",
  "https://i.postimg.cc/WzpnX2kx/IMG-7095.jpg",
];

export default function Home() {
  const { scrollY } = useScroll();
  const heroContentY = useTransform(scrollY, [0, 500], [0, 100]);
  const { home } = siteContent;

  return (
    <div className="w-full bg-[#fcfbf8]">
      <BackgroundGradientOrbs />

      {/* HERO */}
      <PremiumHero home={home} />

      {/* INTRO SECTION */}
      <section className="py-40 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="grid md:grid-cols-2 gap-32 items-center">

          <SectionWrapper direction="left">
            <h2 className="text-4xl md:text-7xl font-serif mb-10 leading-none tracking-tight text-stone-800">
              {home.intro.title} <br />
              <span className="text-gold-600 italic">
                {home.intro.titleAccent}
              </span>
            </h2>

            <p className="premium-para mb-14 max-w-lg text-stone-600">
              {home.intro.description}
            </p>

            <Link
              href={home.intro.linkUrl}
              className="group flex items-center gap-8 text-[10px] uppercase tracking-[0.4em] font-bold text-stone-700 hover:text-gold-600 transition-colors duration-300"
            >
              {home.intro.linkText}
              <span className="w-20 h-[1px] bg-stone-400 group-hover:w-32 group-hover:bg-gold-600 transition-all duration-700"></span>
            </Link>
          </SectionWrapper>

          <SectionWrapper direction="right" delay={0.2}>
            <div className="aspect-[4/5] overflow-hidden rounded-[3rem] relative shadow-2xl bg-stone-100">
              <Image
                src={home.intro.image}
                alt="Brand Intro"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-[2s] hover:scale-110"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-stone-900/5 rounded-[3rem]" />
            </div>
          </SectionWrapper>

        </div>
      </section>

      <PhilosophySection />

      {/* SMOOTH HORIZONTAL CAROUSEL (LEFT TO RIGHT) - CLEAN EDGE-TO-EDGE */}
      <div className="w-full py-20 overflow-hidden relative bg-transparent">
        <div className="flex w-max gap-6">
          <motion.div 
            className="flex gap-6 shrink-0"
            animate={{ x: [ "-50%", "0%" ] }}
            transition={{
              ease: "linear",
              duration: 35,
              repeat: Infinity,
            }}
          >
            {[...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES].map((src, idx) => (
              <div 
                key={`track-1-${idx}`} 
                className="relative w-[300px] md:w-[400px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-md bg-stone-100 shrink-0"
              >
                <img 
                  src={src} 
                  alt={`Gallery image ${idx}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* CTA */}
      <section className="pb-40 px-6 overflow-hidden">
        <SectionWrapper
          direction="up"
          className="max-w-6xl mx-auto bg-white/60 backdrop-blur-xl rounded-[5rem] p-12 md:p-24 border border-gold-600/20 relative overflow-hidden shadow-2xl flex flex-col items-center text-center"
        >
          <div className="absolute top-0 right-0 p-16 opacity-[0.05] pointer-events-none text-gold-600">
            <svg width="300" height="300" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          <h2 className="text-5xl md:text-8xl font-serif mb-12 italic leading-none tracking-tighter text-stone-800">
            {home.finalCta.title}
          </h2>

          <p className="premium-para text-lg md:text-xl mb-16 max-w-2xl mx-auto !text-stone-500">
            {home.finalCta.description}
          </p>

          <div className="flex justify-center w-full px-4 sm:px-0">
            <MagneticButton distance={0.3} className="w-full sm:w-auto">
              <Link
                href={home.finalCta.buttonLink}
                className="block sm:inline-block px-10 md:px-16 py-6 md:py-7 rounded-full bg-gold-600 text-stone-900 uppercase tracking-[0.4em] font-bold text-[9px] md:text-[10px] glow-button transition-all hover:scale-105 active:scale-95 magnetic-target text-center shadow-xl shadow-gold-600/20"
              >
                {home.finalCta.buttonText}
              </Link>
            </MagneticButton>
          </div>

        </SectionWrapper>
      </section>

    </div>
  ); 
}