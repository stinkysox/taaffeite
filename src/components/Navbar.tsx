"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";
import { siteContent } from "../data/siteContent";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-8 pt-4"
      >
        <div
          className={`mx-auto max-w-7xl transition-all duration-500 ${scrolled
            ? "bg-white/70 border border-black/5 shadow-[0_8px_40px_rgba(0,0,0,0.08)] backdrop-blur-2xl"
            : "bg-white/40 border border-white/20 backdrop-blur-xl"
            } rounded-[2rem]`}
        >
          <div className="relative flex items-center justify-between px-5 md:px-8 py-4">
            {/* Glow */}
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none">
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[300px] h-[120px] bg-[#d4af37]/10 blur-3xl" />
            </div>

            {/* Logo */}
            <Link
              href="/"
              className="relative z-10 flex flex-col leading-none group"
            >
              <span className="text-[1.35rem] md:text-[1.55rem] font-serif tracking-tight text-[#111]">
                {siteContent.brand.name}
                <span className="text-[#c6a769]">.</span>
              </span>

              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.35em] text-zinc-500 mt-1 group-hover:text-[#111] transition-colors">
                Rare Celebrations
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
              {siteContent.navbar.links.map((link) => {
                const active = pathname === link.path;

                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className="relative group"
                  >
                    <div
                      className={`relative px-5 py-2.5 rounded-full overflow-hidden transition-all duration-300 ${active
                        ? "text-[#111]"
                        : "text-zinc-500 hover:text-[#111]"
                        }`}
                    >
                      {/* Active pill */}
                      {active && (
                        <motion.div
                          layoutId="navbar-pill"
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                          }}
                          className="absolute inset-0 bg-black/[0.045] border border-black/5 rounded-full"
                        />
                      )}

                      {/* Hover background */}
                      <div className="absolute inset-0 rounded-full bg-black/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <span className="relative z-10 text-[11px] uppercase tracking-[0.25em] font-medium">
                        {link.name}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3 relative z-10">
              <Link
                href={siteContent.navbar.cta.path}
                className="group relative overflow-hidden rounded-full"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37] via-[#e8cf84] to-[#c6a769]" />

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.45),transparent_60%)]" />

                <div className="relative flex items-center gap-2 px-6 py-3">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-black font-semibold">
                    {siteContent.navbar.cta.text}
                  </span>

                  <div className="w-7 h-7 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                    <ArrowUpRight size={14} className="text-black" />
                  </div>
                </div>
              </Link>
            </div>

            {/* Mobile Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative z-20 w-12 h-12 rounded-full bg-black/[0.04] border border-black/5 flex items-center justify-center text-[#111]"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-md z-[90]"
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.96 }}
              transition={{
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="fixed top-24 left-4 right-4 z-[95] lg:hidden"
            >
              <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/75 backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,0.12)]">
                {/* Background Glow */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[240px] h-[240px] bg-[#d4af37]/10 blur-3xl" />

                <div className="relative px-7 py-8 flex flex-col">
                  <div className="mb-8">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-zinc-400 mb-2">
                      Navigation
                    </p>

                    <h2 className="text-3xl font-serif text-[#111] leading-tight">
                      Crafted
                      <br />
                      Experiences.
                    </h2>
                  </div>

                  <div className="flex flex-col">
                    {siteContent.navbar.links.map((link, index) => {
                      const active = pathname === link.path;

                      return (
                        <motion.div
                          key={link.path}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: index * 0.06,
                          }}
                        >
                          <Link
                            href={link.path}
                            onClick={() => setIsOpen(false)}
                            className={`group flex items-center justify-between py-5 border-b border-black/5 transition-all duration-300 ${active
                              ? "text-[#111]"
                              : "text-zinc-500 hover:text-[#111]"
                              }`}
                          >
                            <span className="text-xl uppercase tracking-[0.18em] font-medium">
                              {link.name}
                            </span>

                            <ArrowUpRight
                              size={18}
                              className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                            />
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>

                  <Link
                    href={siteContent.navbar.cta.path}
                    onClick={() => setIsOpen(false)}
                    className="group mt-8 relative overflow-hidden rounded-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37] via-[#e8cf84] to-[#c6a769]" />

                    <div className="relative flex items-center justify-between px-6 py-4">
                      <span className="text-[11px] uppercase tracking-[0.3em] text-black font-semibold">
                        {siteContent.navbar.cta.text}
                      </span>

                      <div className="w-9 h-9 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                        <ArrowUpRight size={16} className="text-black" />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};