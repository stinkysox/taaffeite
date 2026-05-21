"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { siteContent } from "../data/siteContent";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Watch for BubbleScroll signalling to hide the nav
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const val = document.documentElement.getAttribute("data-hide-nav");
      setHideNav(val === "true");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-hide-nav"] });
    return () => observer.disconnect();
  }, []);

  // Close on route change
  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <>
      <style>{`
        .nav-glass {
          background: rgba(255, 255, 255, 0.55);
          border: 1px solid rgba(255, 255, 255, 0.45);
          backdrop-filter: saturate(180%) blur(28px);
          -webkit-backdrop-filter: saturate(180%) blur(28px);
          transition: background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .nav-glass.scrolled {
          background: rgba(255, 255, 255, 0.72);
          border-color: rgba(255, 255, 255, 0.6);
          box-shadow:
            0 1px 0 rgba(255,255,255,0.8) inset,
            0 8px 32px rgba(0, 0, 0, 0.06),
            0 2px 8px rgba(0, 0, 0, 0.04);
        }
        .nav-link {
          position: relative;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 500;
          color: rgba(0,0,0,0.45);
          padding: 8px 18px;
          border-radius: 100px;
          transition: color 0.25s ease;
        }
        .nav-link:hover { color: rgba(0,0,0,0.82); }
        .nav-link.active { color: rgba(0,0,0,0.88); }
        .nav-pill {
          position: absolute;
          inset: 0;
          border-radius: 100px;
          background: rgba(0, 0, 0, 0.055);
          border: 1px solid rgba(0, 0, 0, 0.06);
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
        }
        .gold-btn {
          position: relative;
          overflow: hidden;
          border-radius: 100px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(212,175,55,0.9) 0%, rgba(232,207,132,0.95) 50%, rgba(198,167,105,0.9) 100%);
          box-shadow:
            0 1px 0 rgba(255,255,255,0.5) inset,
            0 4px 16px rgba(212,175,55,0.3);
          transition: box-shadow 0.3s ease, transform 0.2s ease;
        }
        .gold-btn:hover {
          box-shadow:
            0 1px 0 rgba(255,255,255,0.6) inset,
            0 6px 24px rgba(212,175,55,0.45);
          transform: translateY(-1px);
        }
        .gold-btn:active { transform: translateY(0); }
        .gold-btn-inner {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 22px;
          border-radius: 100px;
          background: linear-gradient(135deg, #d4af37 0%, #e8cf84 50%, #c6a769 100%);
        }
        .gold-btn span {
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          font-weight: 700;
          color: rgba(0,0,0,0.8);
        }
        .gold-icon {
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(0,0,0,0.12);
          transition: transform 0.3s ease;
        }
        .gold-btn:hover .gold-icon {
          transform: translate(2px, -2px);
        }

        /* Mobile menu glass */
        .mobile-glass {
          background: rgba(255, 255, 255, 0.78);
          border: 1px solid rgba(255, 255, 255, 0.55);
          backdrop-filter: saturate(200%) blur(40px);
          -webkit-backdrop-filter: saturate(200%) blur(40px);
          border-radius: 28px;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.9) inset,
            0 0 0 0.5px rgba(0,0,0,0.04),
            0 24px 64px rgba(0,0,0,0.1),
            0 8px 24px rgba(0,0,0,0.06);
        }
        .mobile-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 0;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          transition: opacity 0.2s ease;
        }
        .mobile-link:last-child { border-bottom: none; }
        .mobile-link-text {
          font-size: 22px;
          font-weight: 400;
          letter-spacing: -0.02em;
          color: rgba(0,0,0,0.78);
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
        }
        .mobile-link.active .mobile-link-text {
          color: rgba(0,0,0,0.92);
        }
        .mobile-link:active { opacity: 0.6; }

        /* Overlay blur */
        .overlay-blur {
          backdrop-filter: blur(16px) brightness(0.9);
          -webkit-backdrop-filter: blur(16px) brightness(0.9);
          background: rgba(0, 0, 0, 0.15);
        }

        /* Hamburger button */
        .menu-btn {
          width: 42px;
          height: 42px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.06);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          cursor: pointer;
          transition: background 0.2s ease, transform 0.15s ease;
        }
        .menu-btn:hover { background: rgba(0, 0, 0, 0.07); }
        .menu-btn:active { transform: scale(0.94); }
      `}</style>

      {/* ─── Main Nav ─── */}
      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={hideNav ? { y: -96, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "14px 20px",
          pointerEvents: hideNav ? "none" : "auto",
        }}
      >
        <div
          className={`nav-glass${scrolled ? " scrolled" : ""}`}
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            borderRadius: 100,
            padding: "6px 6px 6px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ flexShrink: 0 }}>
            <Image
              src="/tafflogo.png"
              alt="Taaffeite Events"
              width={90}
              height={90}
              priority
              style={{ width: 80, height: "auto", display: "block", objectFit: "contain" }}
            />
          </Link>

          {/* Desktop Links — centered absolutely */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              alignItems: "center",
              gap: 2,
            }}
            className="hidden lg:flex"
          >
            {siteContent.navbar.links.map((link) => {
              const active = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`nav-link${active ? " active" : ""}`}
                >
                  {active && (
                    <motion.div
                      layoutId="pill"
                      className="nav-pill"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span style={{ position: "relative", zIndex: 1 }}>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA + Mobile Toggle */}
          <div style={{ alignItems: "center", gap: 10, flexShrink: 0 }} className="flex">
            {/* CTA — desktop */}
            <div className="hidden lg:block">
              <Link href={siteContent.navbar.cta.path} className="gold-btn">
                <div className="gold-btn-inner">
                  <span>{siteContent.navbar.cta.text}</span>
                  <div className="gold-icon">
                    <ArrowUpRight size={13} color="rgba(0,0,0,0.7)" />
                  </div>
                </div>
              </Link>
            </div>

            {/* Hamburger — mobile */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="menu-btn flex lg:hidden"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.div
                    key="x"
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 45, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X size={18} color="rgba(0,0,0,0.7)" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -45, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu size={18} color="rgba(0,0,0,0.7)" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ─── Mobile Menu ─── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="overlay-blur"
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 90,
              }}
            />

            {/* Panel */}
            <motion.div
              key="panel"
              ref={menuRef}
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="mobile-glass lg:hidden"
              style={{
                position: "fixed",
                top: 90,
                left: 16,
                right: 16,
                zIndex: 95,
                padding: "28px 28px 24px",
              }}
            >
              {/* Subtle gold glow at top */}
              <div
                style={{
                  position: "absolute",
                  top: -40,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 200,
                  height: 120,
                  background: "radial-gradient(ellipse, rgba(212,175,55,0.18) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              {/* Label */}
              <p
                style={{
                  fontSize: 10,
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "rgba(0,0,0,0.3)",
                  marginBottom: 20,
                  fontWeight: 500,
                }}
              >
                Menu
              </p>

              {/* Links */}
              <nav>
                {siteContent.navbar.links.map((link, i) => {
                  const active = pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.055, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`mobile-link${active ? " active" : ""}`}
                      >
                        <span className="mobile-link-text">{link.name}</span>
                        <div
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: "50%",
                            border: "1px solid rgba(0,0,0,0.08)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            background: active ? "rgba(212,175,55,0.12)" : "transparent",
                            transition: "background 0.2s ease",
                          }}
                        >
                          <ArrowUpRight size={15} color={active ? "#c6a769" : "rgba(0,0,0,0.3)"} />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: siteContent.navbar.links.length * 0.055 + 0.05,
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ marginTop: 24 }}
              >
                <Link
                  href={siteContent.navbar.cta.path}
                  onClick={() => setIsOpen(false)}
                  className="gold-btn"
                  style={{ display: "block" }}
                >
                  <div
                    className="gold-btn-inner"
                    style={{ justifyContent: "space-between", padding: "14px 20px" }}
                  >
                    <span style={{ fontSize: 11 }}>{siteContent.navbar.cta.text}</span>
                    <div className="gold-icon" style={{ width: 32, height: 32 }}>
                      <ArrowUpRight size={15} color="rgba(0,0,0,0.7)" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};