"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { siteContent } from "../data/siteContent";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const val = document.documentElement.getAttribute("data-hide-nav");
      setHideNav(val === "true");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-hide-nav"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

        .nav-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 18px 24px;
        }

        .nav-inner {
          max-width: 1240px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }

        /* The pill container — lives below the full-width bar */
        .nav-pill {
          border-radius: 999px;
          padding: 6px 10px 6px 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0;
          transition: background 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease;
          background: rgba(250, 249, 247, 0.0);
          border: 1px solid rgba(0,0,0,0.0);
        }

        .nav-pill.scrolled {
          background: rgba(250, 249, 247, 0.82);
          border: 1px solid rgba(198, 167, 105, 0.14);
          box-shadow:
            0 1px 0 rgba(255,255,255,0.9) inset,
            0 12px 40px rgba(0,0,0,0.07),
            0 2px 8px rgba(0,0,0,0.04);
          backdrop-filter: blur(28px) saturate(160%);
          -webkit-backdrop-filter: blur(28px) saturate(160%);
        }

        /* Desktop nav links — Cormorant Garamond */
        .nav-link {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 15px;
          font-weight: 300;
          font-style: italic;
          letter-spacing: 0.04em;
          color: rgba(17, 17, 17, 0.42);
          padding: 6px 18px;
          border-radius: 999px;
          transition: color 0.3s ease, background 0.3s ease;
          text-decoration: none;
          position: relative;
        }

        .nav-link:hover {
          color: rgba(17, 17, 17, 0.85);
        }

        .nav-link.active {
          color: #C6A769;
        }

        /* Active underline dot */
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #C6A769;
        }

        /* CTA */
        .nav-cta {
          font-family: sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          color: #111;
          padding: 9px 22px;
          border-radius: 999px;
          border: 1px solid rgba(17,17,17,0.14);
          transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
          text-decoration: none;
          white-space: nowrap;
        }

        .nav-cta:hover {
          background: #111;
          color: #fff;
          border-color: #111;
        }

        /* Mobile menu button */
        .menu-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: transparent;
          border: 1px solid rgba(17,17,17,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.25s ease;
        }

        .menu-btn:hover {
          background: rgba(17,17,17,0.04);
        }

        /* Mobile drawer */
        .mobile-drawer {
          position: fixed;
          top: 88px;
          left: 16px;
          right: 16px;
          z-index: 95;
          background: rgba(250, 249, 247, 0.94);
          backdrop-filter: blur(32px) saturate(180%);
          -webkit-backdrop-filter: blur(32px) saturate(180%);
          border: 1px solid rgba(198, 167, 105, 0.15);
          border-radius: 24px;
          padding: 28px 32px 32px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.1);
        }

        .mobile-link {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 28px;
          font-weight: 300;
          font-style: italic;
          letter-spacing: 0.02em;
          color: rgba(17,17,17,0.55);
          text-decoration: none;
          display: block;
          transition: color 0.25s ease;
        }

        .mobile-link:hover,
        .mobile-link.active {
          color: #C6A769;
        }

        .mobile-divider {
          width: 100%;
          height: 1px;
          background: rgba(198, 167, 105, 0.15);
          margin: 6px 0;
        }
      `}</style>

      {/* NAV */}
      <motion.nav
        className="nav-root"
        initial={{ y: -20, opacity: 0 }}
        animate={hideNav ? { y: -80, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={`nav-pill${scrolled ? " scrolled" : ""}`}>
          {/* Logo */}
          <Link href="/" style={{ flexShrink: 0, lineHeight: 0 }}>
            <Image
              src="/tafflogo.png"
              alt="Taaffeite"
              width={62}
              height={62}
              style={{ objectFit: "contain" }}
            />
          </Link>

          {/* Desktop links — centered absolutely */}
          <div
            className="hidden lg:flex items-center gap-1"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {siteContent.navbar.links.map((link) => {
              const active = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`nav-link${active ? " active" : ""}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile brand name */}
          <div
            className="lg:hidden absolute"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "13px",
              fontStyle: "italic",
              fontWeight: 300,
              letterSpacing: "0.12em",
              color: "rgba(17,17,17,0.5)",
              whiteSpace: "nowrap",
            }}
          >
            Taaffeite Events
          </div>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Desktop CTA */}
            <Link
              href={siteContent.navbar.cta.path}
              className="nav-cta hidden lg:inline-block"
            >
              {siteContent.navbar.cta.text}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="menu-btn lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <motion.div
                animate={isOpen ? "open" : "closed"}
                style={{ width: 18, height: 12, position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              >
                {/* Top bar */}
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 6 },
                  }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: "block", height: "1px", background: "#111", transformOrigin: "center", borderRadius: 1 }}
                />
                {/* Middle bar */}
                <motion.span
                  variants={{
                    closed: { opacity: 1, scaleX: 1 },
                    open: { opacity: 0, scaleX: 0 },
                  }}
                  transition={{ duration: 0.2 }}
                  style={{ display: "block", height: "1px", background: "#111", borderRadius: 1 }}
                />
                {/* Bottom bar */}
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -6 },
                  }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: "block", height: "1px", background: "#111", transformOrigin: "center", borderRadius: 1 }}
                />
              </motion.div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-drawer"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Atelier label */}
            <p style={{
              fontFamily: "sans-serif",
              fontSize: "8px",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: "#C6A769",
              marginBottom: "20px",
              fontWeight: 500,
            }}>
              Taaffeite Events
            </p>

            <nav style={{ display: "flex", flexDirection: "column" }}>
              {siteContent.navbar.links.map((link, i) => (
                <React.Fragment key={link.path}>
                  <Link
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`mobile-link${pathname === link.path ? " active" : ""}`}
                  >
                    {link.name}
                  </Link>
                  {i < siteContent.navbar.links.length - 1 && (
                    <div className="mobile-divider" />
                  )}
                </React.Fragment>
              ))}
            </nav>

            {/* Mobile CTA */}
            <div style={{ marginTop: "28px", paddingTop: "20px", borderTop: "1px solid rgba(198,167,105,0.15)" }}>
              <Link
                href={siteContent.navbar.cta.path}
                onClick={() => setIsOpen(false)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  fontFamily: "sans-serif",
                  fontSize: "9px",
                  letterSpacing: "0.45em",
                  textTransform: "uppercase",
                  color: "#111",
                  textDecoration: "none",
                }}
              >
                <span style={{ display: "block", width: "24px", height: "1px", background: "#111" }} />
                {siteContent.navbar.cta.text}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};