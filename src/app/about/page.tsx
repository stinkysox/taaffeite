"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../../components/SectionWrapper";
import Link from "next/link";
import { siteContent } from "../../data/siteContent";

export default function About() {
  const [isImageFocused, setIsImageFocused] = useState(false);

  const { about } = siteContent;

  const easeCustom = [0.22, 1, 0.36, 1] as const;

  return (
    <div className="bg-[#faf8f4] text-[#111] pt-36 pb-32 overflow-hidden selection:bg-[#111] selection:text-white">
      {/* Ambient Luxury Glow */}
      <div className="fixed top-[-15%] right-[-10%] w-[700px] h-[700px] rounded-full bg-[#d4af37]/10 blur-[140px] pointer-events-none" />

      {/* HERO */}
      <SectionWrapper className="max-w-[1440px] mx-auto px-6 md:px-12 text-center mb-48 relative z-10">
        <div className="overflow-hidden mb-8">
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 1,
              ease: easeCustom,
            }}
            className="text-[10px] uppercase tracking-[0.55em] text-zinc-400 font-medium block"
          >
            {about.hero.label}
          </motion.span>
        </div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 160 }}
            animate={{ y: 0 }}
            transition={{
              duration: 1.8,
              ease: easeCustom,
            }}
            className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-serif leading-[0.86] tracking-[-0.07em] text-[#111]"
          >
            {about.hero.title}

            <span className="italic font-light text-[#c6a769] block">
              {about.hero.titleAccent}
            </span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 1.2,
            ease: easeCustom,
          }}
          className="mt-14 text-lg md:text-xl max-w-3xl mx-auto leading-[1.9] text-zinc-500 font-light"
        >
          {about.hero.description}
        </motion.p>
      </SectionWrapper>

      {/* PHILOSOPHY */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 mb-56 relative z-10">
        <div className="grid lg:grid-cols-12 gap-20 lg:gap-28 items-center">
          {/* IMAGE */}
          <div className="lg:col-span-5">
            <SectionWrapper direction="left">
              <motion.div
                onClick={() =>
                  setIsImageFocused((prev) => !prev)
                }
                onMouseEnter={() =>
                  setIsImageFocused(true)
                }
                onMouseLeave={() =>
                  setIsImageFocused(false)
                }
                className="relative aspect-[3/4] w-full overflow-hidden rounded-[2.5rem] bg-[#f5f3ef] cursor-pointer group shadow-[0_20px_80px_rgba(0,0,0,0.08)]"
              >
                {/* Image */}
                <motion.img
                  animate={{
                    scale: isImageFocused ? 1.06 : 1,
                    filter: isImageFocused
                      ? "grayscale(0%)"
                      : "grayscale(100%)",
                  }}
                  transition={{
                    duration: 1.5,
                    ease: easeCustom,
                  }}
                  src={about.story.image}
                  alt="Story Visual"
                  className="w-full h-full object-cover"
                />

                {/* Cinematic Overlay */}
                <motion.div
                  animate={{
                    opacity: isImageFocused ? 0.08 : 0.42,
                  }}
                  transition={{
                    duration: 1,
                  }}
                  className="absolute inset-0 bg-black"
                />

                {/* Editorial Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-white/10 pointer-events-none" />

                {/* Luxury Glow */}
                <motion.div
                  animate={{
                    opacity: isImageFocused ? 1 : 0,
                    scale: isImageFocused ? 1 : 0.7,
                  }}
                  transition={{
                    duration: 1.2,
                    ease: easeCustom,
                  }}
                  className="absolute -bottom-28 left-1/2 -translate-x-1/2 w-[70%] h-[150px] rounded-full bg-[#d4af37]/25 blur-[100px]"
                />

                {/* Floating Label */}
                <motion.div
                  animate={{
                    y: isImageFocused ? 0 : 10,
                    opacity: isImageFocused ? 1 : 0.75,
                    scale: isImageFocused ? 1 : 0.96,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: easeCustom,
                  }}
                  className="absolute bottom-8 left-8"
                >
                  <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-full px-5 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.15)]">
                    <span className="text-[9px] uppercase tracking-[0.38em] text-white font-medium">
                      {isImageFocused
                        ? "Emotion In Motion"
                        : "Tap To Reveal"}
                    </span>
                  </div>
                </motion.div>

                {/* Edge Highlight */}
                <div className="absolute inset-0 rounded-[2.5rem] ring-1 ring-white/10 pointer-events-none" />

                {/* Floating Light Sweep */}
                <motion.div
                  animate={{
                    x: isImageFocused ? 30 : -30,
                    opacity: isImageFocused ? 0.5 : 0.15,
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  }}
                  className="absolute top-0 left-[-20%] w-[40%] h-full bg-white/10 blur-[60px] rotate-12"
                />
              </motion.div>
            </SectionWrapper>
          </div>

          {/* TEXT */}
          <div className="lg:col-span-7">
            <SectionWrapper direction="right">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mb-12 leading-[1] tracking-[-0.05em] text-[#111]">
                {about.story.title}

                <span className="italic font-light text-[#c6a769] block mt-3">
                  {about.story.titleAccent}
                </span>
              </h2>

              <div className="space-y-8 max-w-2xl text-zinc-500 font-light text-base md:text-lg leading-[1.9]">
                <p>{about.story.text1}</p>
                <p>{about.story.text2}</p>
              </div>

              {/* Stats */}
              <div className="mt-20 grid grid-cols-3 gap-8 border-t border-black/5 pt-10 max-w-lg">
                {about.story.stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{
                      y: -4,
                    }}
                    className="flex flex-col gap-3"
                  >
                    <p className="text-3xl md:text-4xl font-serif text-[#111]">
                      {stat.value}
                    </p>

                    <p className="text-[9px] uppercase tracking-[0.35em] text-zinc-400 font-medium leading-none">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </SectionWrapper>
          </div>
        </div>
      </section>

      {/* THE ARCHIVE */}
      <section className="bg-[#111] text-white py-32 px-6 md:px-16 relative z-10 overflow-hidden mb-56 rounded-[3rem] mx-4 md:mx-12 max-w-[1440px] xl:mx-auto shadow-2xl shadow-black/20">
        {/* Glow behind */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gold-600/5 blur-[120px] pointer-events-none" />

        <div className="grid lg:grid-cols-12 gap-20 items-center relative z-10">
          {/* TEXT SIDE */}
          <div className="lg:col-span-6 space-y-16">
            <h2 className="text-5xl md:text-7xl font-serif italic text-white tracking-tight">
              {about.archive.title}
            </h2>
            <div className="space-y-12">
              {about.archive.items.map((item, i) => (
                <div key={i} className="flex gap-8 items-start group">
                  <span className="text-xl font-serif italic text-gold-600 mt-1">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-2xl font-serif mb-3 text-white group-hover:text-gold-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-zinc-400 font-light leading-relaxed max-w-md">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* IMAGES SIDE */}
          <div className="lg:col-span-6 relative h-[600px] w-full hidden md:block">
            <motion.div
              className="absolute top-0 right-10 w-3/5 h-4/5 rounded-[2.5rem] overflow-hidden border border-white/10 z-10 shadow-2xl"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <img
                src={about.archive.images[0]}
                className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                alt="Archive 1"
              />
            </motion.div>
            <motion.div
              className="absolute bottom-0 left-0 w-3/5 h-4/5 rounded-[2.5rem] overflow-hidden border border-white/10 z-20 shadow-2xl"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <img
                src={about.archive.images[1]}
                className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                alt="Archive 2"
              />
            </motion.div>

            {/* Vinyl record abstract decoration */}
            <motion.div 
               initial={{ rotate: 0 }}
               animate={{ rotate: 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="absolute -bottom-8 -right-8 w-40 h-40 opacity-40 pointer-events-none z-30"
            >
              <div className="w-full h-full rounded-full border border-zinc-700/50 bg-black flex items-center justify-center relative shadow-xl">
                <div className="w-[90%] h-[90%] rounded-full border border-zinc-800/80"></div>
                <div className="w-[80%] h-[80%] rounded-full border border-zinc-800/60 absolute"></div>
                <div className="w-[70%] h-[70%] rounded-full border border-zinc-800/40 absolute"></div>
                <div className="w-12 h-12 rounded-full bg-gold-600/90 shadow-[0_0_15px_rgba(212,175,55,0.5)] z-10"></div>
                <div className="w-3 h-3 rounded-full bg-black absolute z-20"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <SectionWrapper className="text-center max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-serif mb-16 tracking-[-0.04em] max-w-5xl mx-auto leading-[0.95] text-[#111]">
          {about.cta.title}
        </h2>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            href={about.cta.primaryLink}
            className="group relative inline-flex items-center justify-center px-12 py-5 bg-[#111] rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.03] active:scale-[0.98] w-full sm:w-auto"
          >
            <div className="absolute inset-0 bg-[#c6a769] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-[0.22,1,0.36,1]" />

            <span className="relative z-10 text-[10px] uppercase tracking-[0.35em] text-white group-hover:text-[#111] transition-colors duration-500 font-medium">
              {about.cta.primaryButton}
            </span>
          </Link>

          <Link
            href={about.cta.secondaryLink}
            className="group relative inline-flex items-center justify-center px-12 py-5 border border-zinc-200 hover:border-[#111] rounded-full overflow-hidden transition-all duration-500 hover:bg-white active:scale-[0.98] w-full sm:w-auto"
          >
            <span className="relative z-10 text-[10px] uppercase tracking-[0.35em] text-[#111] font-medium">
              {about.cta.secondaryButton}
            </span>
          </Link>
        </div>
      </SectionWrapper>
    </div>
  );
}