"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";

import { siteContent } from "../data/siteContent";

export default function Testimonials() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleInteraction = (id: string, isClick: boolean) => {
    if (isClick) {
      setActiveId((prev) => (prev === id ? null : id));
    } else {
      setActiveId(id);
    }
  };

  return (
    <section className="py-40 px-6 overflow-hidden bg-[#f8f5ef]">
      <SectionWrapper className="max-w-4xl mx-auto text-center mb-32">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[#b68b4c] uppercase tracking-[0.5em] text-[10px] font-semibold mb-4"
        >
          Reflections
        </motion.p>

        <h2 className="text-5xl md:text-8xl font-serif text-[#1f1f1f] italic leading-none">
          Kind Words.
        </h2>
      </SectionWrapper>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        {siteContent.testimonials.items.map((review, idx) => {
          const id = idx.toString();
          const isActive = activeId === id;

          return (
            <SectionWrapper
              key={id}
              direction={idx % 2 === 0 ? "left" : "right"}
              delay={idx * 0.1}
            >
              <motion.div
                onClick={() => handleInteraction(id, true)}
                onMouseEnter={() => handleInteraction(id, false)}
                onMouseLeave={() => setActiveId(null)}
                animate={{
                  borderColor: isActive
                    ? "rgba(182, 139, 76, 0.35)"
                    : "rgba(31, 31, 31, 0.08)",
                  y: isActive ? -8 : 0,
                  backgroundColor: isActive
                    ? "rgba(255,255,255,0.95)"
                    : "rgba(255,255,255,0.78)",
                  boxShadow: isActive
                    ? "0 30px 60px rgba(0,0,0,0.08)"
                    : "0 10px 30px rgba(0,0,0,0.04)",
                }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="rounded-[3rem] p-10 md:p-16 border backdrop-blur-xl relative overflow-hidden cursor-pointer"
              >
                {/* subtle glow */}
                <motion.div
                  animate={{
                    opacity: isActive ? 1 : 0.5,
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-[#f8efe2]/70 via-transparent to-[#f3e7d4]/40 pointer-events-none"
                />

                <div className="flex flex-col items-start gap-2 mb-10 relative z-10">
                  <h3 className="text-2xl md:text-3xl font-serif text-[#1f1f1f]">
                    {review.name}
                  </h3>

                  <motion.p
                    animate={{
                      color: isActive ? "#b68b4c" : "#c29a5c",
                    }}
                    className="text-[10px] uppercase tracking-[0.3em] font-semibold"
                  >
                    Bespoke Celebration
                  </motion.p>
                </div>

                <motion.p
                  animate={{
                    color: isActive ? "#2f2f2f" : "#5f5f5f",
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-xl md:text-2xl italic font-serif leading-relaxed relative z-10"
                >
                  "{review.quote}"
                </motion.p>

                {/* Decorative Quote SVG */}
                <motion.div
                  animate={{
                    opacity: isActive ? 0.08 : 0.04,
                    scale: isActive ? 1 : 0.9,
                    rotate: isActive ? 0 : -5,
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute -bottom-10 -right-10 text-[#b68b4c] pointer-events-none"
                >
                  <svg
                    width="220"
                    height="220"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H12.017V21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H7.017C6.46472 8 6.017 8.44772 6.017 9V12C6.017 12.5523 5.56929 13 5.017 13H3.017V21H5.017Z" />
                  </svg>
                </motion.div>
              </motion.div>
            </SectionWrapper>
          );
        })}
      </div>
    </section>
  );
}