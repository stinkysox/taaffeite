"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { SectionWrapper } from "../components/SectionWrapper";
import { BubbleScroll } from "../components/BubbleScroll";
import { MagneticButton } from "../components/MagneticButton";
import Image from "next/image";
import { siteContent } from "../data/siteContent";
import PremiumHero from "../components/PremiumHero";
import PhilosophySection from "@/components/PhilosophySection";
import { BackgroundGradientOrbs } from "../components/BackgroundGradientOrbs";

export default function Home() {
  const { scrollY } = useScroll();
  const heroContentY = useTransform(scrollY, [0, 500], [0, 100]);
  const { home } = siteContent;

  return (
    <div className="w-full">
      <BackgroundGradientOrbs />

      {/* HERO */}
      <PremiumHero home={home} />

      {/* INTRO SECTION */}
      <section className="py-40 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="grid md:grid-cols-2 gap-32 items-center">

          <SectionWrapper direction="left">
            <h2 className="text-4xl md:text-7xl font-serif mb-10 leading-none tracking-tight text-[#1a1a1a]">
              {home.intro.title} <br />
              <span className="text-gold-600 italic">
                {home.intro.titleAccent}
              </span>
            </h2>

            <p className="premium-para mb-14 max-w-lg">
              {home.intro.description}
            </p>

            <Link
              href={home.intro.linkUrl}
              className="group flex items-center gap-8 text-[10px] uppercase tracking-[0.4em] font-bold dark:text-[#1a1a1a]"
            >
              {home.intro.linkText}
              <span className="w-20 h-[1px] bg-black dark:bg-white group-hover:w-32 transition-all duration-700"></span>
            </Link>
          </SectionWrapper>

          <SectionWrapper direction="right" delay={0.2}>
            <div className="aspect-[4/5] overflow-hidden rounded-[3rem] relative shadow-2xl bg-zinc-900">
              <Image
                src={home.intro.image}
                alt="Brand Intro"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-[2s] hover:scale-110"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/10 rounded-[3rem]" />
            </div>
          </SectionWrapper>

        </div>
      </section>
      <PhilosophySection />

      {/* BUBBLE SCROLL */}
      <div className="relative z-10 mb-20">
        <BubbleScroll />
      </div>

      {/* WHY US CARDS */}
      <section className="relative overflow-hidden px-6 py-40">
        {/* Ambient background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#C6A769]/10 blur-[140px]" />

          <div className="absolute bottom-[-10rem] left-[-8rem] h-[320px] w-[320px] rounded-full bg-[#e7d8bc]/20 blur-[120px]" />

          <div className="absolute right-[-6rem] top-1/2 h-[260px] w-[260px] -translate-y-1/2 rounded-full bg-stone-200/40 blur-[120px]" />
        </div>



        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Top heading */}
          <SectionWrapper direction="up">
            <div className="mb-24 text-center">
              <div className="mb-6 flex items-center justify-center gap-4">
                <div className="h-px w-12 bg-zinc-300" />

                <p className="text-[10px] uppercase tracking-[0.45em] text-zinc-500">
                  Signature Experiences
                </p>

                <div className="h-px w-12 bg-zinc-300" />
              </div>

              <h2 className="font-serif text-[clamp(3rem,5vw,5rem)] leading-[0.95] tracking-[-0.04em] text-[#1a1a1a]">
                Crafted With
                <span className="ml-4 italic text-[#C6A769]">
                  Emotion
                </span>
              </h2>
            </div>
          </SectionWrapper>

          {/* Cards */}
          <div className="grid gap-10 md:grid-cols-3">
            {home.servicesPreview.map((item, idx) => (
              <SectionWrapper key={idx} direction="up" delay={idx * 0.18}>
                <div className="group relative h-full overflow-hidden rounded-[2.8rem] border border-black/5 bg-white/70 p-[1px] backdrop-blur-xl transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_25px_80px_rgba(0,0,0,0.08)]">

                  {/* Glow */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                    <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-[#C6A769]/20 blur-[70px]" />
                  </div>

                  {/* Inner */}
                  <div className="relative flex h-full flex-col rounded-[2.8rem] bg-[#fcfbf8]/95 p-12">

                    {/* Floating number */}
                    <div className="mb-14 flex items-center justify-between">

                      <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-[#C6A769]/20 bg-white shadow-sm">

                        {/* rotating ring */}
                        <div className="absolute inset-0 animate-[spin_12s_linear_infinite] rounded-full border border-dashed border-[#C6A769]/30" />

                        <span className="relative z-10 font-serif text-2xl italic text-[#C6A769]">
                          0{idx + 1}
                        </span>
                      </div>

                      <div className="h-px flex-1 ml-6 bg-gradient-to-r from-[#C6A769]/30 to-transparent" />
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-[2rem] leading-tight tracking-[-0.03em] text-[#1a1a1a] transition-all duration-500 group-hover:translate-x-1">
                      {item.title}
                    </h3>

                    {/* Accent */}
                    <div className="my-8 flex items-center gap-3">
                      <div className="h-[6px] w-[6px] rounded-full bg-[#C6A769]" />
                      <div className="h-px w-20 bg-[#C6A769]/30" />
                    </div>

                    {/* Description */}
                    <p className="premium-para text-[13px] uppercase tracking-[0.18em] !leading-[2.2] text-zinc-500">
                      {item.desc}
                    </p>

                    {/* Bottom hover reveal */}
                    <div className="mt-auto pt-14">
                      <div className="overflow-hidden">
                        <div className="translate-y-6 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">

                          <div className="flex items-center gap-4">
                            <span className="text-[10px] uppercase tracking-[0.45em] text-[#C6A769]">
                              Explore Service
                            </span>

                            <div className="h-px w-10 bg-[#C6A769]" />
                          </div>

                        </div>
                      </div>
                    </div>

                    {/* Corner detail */}
                    <div className="absolute bottom-6 right-6 h-14 w-14 rounded-full border border-[#C6A769]/10 opacity-40 transition-all duration-700 group-hover:scale-125 group-hover:opacity-100" />
                  </div>
                </div>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-40 px-6 overflow-hidden">
        <SectionWrapper
          direction="up"
          className="max-w-6xl mx-auto glass rounded-[5rem] p-12 md:p-24 border border-gold-600/20 relative overflow-hidden shadow-2xl flex flex-col items-center text-center"
        >
          <div className="absolute top-0 right-0 p-16 opacity-[0.05] pointer-events-none text-gold-600">
            <svg width="300" height="300" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          <h2 className="text-5xl md:text-8xl font-serif mb-12 italic leading-none tracking-tighter text-[#1A1A1A]">
            {home.finalCta.title}
          </h2>

          <p className="premium-para text-lg md:text-xl mb-16 max-w-2xl mx-auto !text-zinc-400">
            {home.finalCta.description}
          </p>

          <div className="flex justify-center w-full px-4 sm:px-0">
            <MagneticButton distance={0.3} className="w-full sm:w-auto">
              <Link
                href={home.finalCta.buttonLink}
                className="block sm:inline-block px-10 md:px-16 py-6 md:py-7 rounded-full bg-gold-600 text-[#1a1a1a] uppercase tracking-[0.4em] font-bold text-[9px] md:text-[10px] glow-button transition-all hover:scale-105 active:scale-95 magnetic-target text-center shadow-xl shadow-gold-600/20"
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