"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { siteContent } from "../data/siteContent";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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

  // Close drawer on route change
  useEffect(() => setIsOpen(false), [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Montserrat:wght@200;300;400;500&display=swap');

        /* ─── Root ───────────────────────────────────────────────── */
        .nav-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 28px 48px;
          transition: padding 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                      background 0.6s ease,
                      box-shadow 0.6s ease;
        }

        .nav-root.scrolled {
          padding: 16px 48px;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(198, 167, 105, 0.15);
          box-shadow: 0 4px 40px rgba(0, 0, 0, 0.04);
        }

        .nav-container {
          max-width: 1440px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* ─── Logo ───────────────────────────────────────────────── */
        .nav-logo {
          display: block;
          line-height: 0;
          flex-shrink: 0;
          text-decoration: none;
        }

        .nav-logo img {
          width: 56px;
          height: 56px;
          object-fit: contain;
          transition: opacity 0.3s ease;
        }

        .nav-logo:hover img {
          opacity: 0.75;
        }

        /* ─── Desktop Links ──────────────────────────────────────── */
        .nav-desktop-links {
          display: flex;
          align-items: center;
          gap: 40px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-desktop-link {
          font-family: 'Montserrat', sans-serif;
          font-size: 10.5px;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #111111;
          text-decoration: none;
          position: relative;
          padding-bottom: 3px;
          transition: color 0.3s ease;
        }

        /* Animated underline */
        .nav-desktop-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: #C6A769;
          transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-desktop-link:hover,
        .nav-desktop-link.active {
          color: #C6A769;
        }

        .nav-desktop-link:hover::after,
        .nav-desktop-link.active::after {
          width: 100%;
        }

        /* ─── Hamburger (mobile only) ────────────────────────────── */
        .luxury-burger {
          display: none;           /* hidden on desktop */
          background: transparent;
          border: none;
          cursor: pointer;
          flex-direction: column;
          gap: 6px;
          padding: 8px;
          z-index: 101;
        }

        .luxury-burger span {
          display: block;
          height: 1px;
          background: #111111;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      width 0.4s ease,
                      opacity 0.3s ease;
        }

        /* ─── Mobile breakpoint ──────────────────────────────────── */
        @media (max-width: 767px) {
          .nav-root {
            padding: 24px 24px;
          }

          .nav-root.scrolled {
            padding: 14px 24px;
          }

          .nav-desktop-links {
            display: none;          /* hide desktop links on mobile */
          }

          .luxury-burger {
            display: flex;          /* show hamburger on mobile */
          }
        }

        /* ─── Tablet tweaks ──────────────────────────────────────── */
        @media (min-width: 768px) and (max-width: 1024px) {
          .nav-root {
            padding: 24px 32px;
          }

          .nav-root.scrolled {
            padding: 14px 32px;
          }

          .nav-desktop-links {
            gap: 28px;
          }

          .nav-desktop-link {
            font-size: 10px;
          }
        }

        /* ─── Mobile Drawer Backdrop ─────────────────────────────── */
        .magazine-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          z-index: 90;
        }

        /* ─── Mobile Drawer Panel ────────────────────────────────── */
        .magazine-overlay {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: min(90vw, 420px); /* Increased container flexibility for tighter viewports */
          background: #F4F3EF;
          z-index: 95;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 80px 32px;      /* Slightly optimized padding to expand internal horizontal safety area */
          box-shadow: -20px 0 80px rgba(0, 0, 0, 0.06);
        }

        .magazine-menu-wrapper {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 24px;
          width: 100%;             /* Allow children to accurately respond to bounds */
        }

        .magazine-mobile-item {
          display: inline-flex;
          align-items: baseline;
          text-decoration: none;
          max-width: 100%;
        }

        .magazine-counter {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 13px;
          font-weight: 400;
          font-style: italic;
          color: #111111;
          opacity: 0.5;
          margin-right: 12px;
          user-select: none;
          width: 20px;
          flex-shrink: 0;
        }

        .magazine-mobile-link {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 8.5vw;       /* Responsive fluid sizing basis */
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #111111;
          transition: color 0.3s ease;
          line-height: 1.1;
          white-space: nowrap;    
        }

        /* Cap font scale max limit on slightly larger devices/tablets so it doesn't get overly massive */
        @media (min-width: 400px) {
          .magazine-mobile-link {
            font-size: 32px;
          }
        }

        .magazine-mobile-item:hover .magazine-mobile-link,
        .magazine-mobile-item.active .magazine-mobile-link {
          color: #C6A769;
        }

        .magazine-mobile-item:hover .magazine-counter,
        .magazine-mobile-item.active .magazine-counter {
          opacity: 1;
          color: #C6A769;
        }
      `}</style>

      {/* ── NAVIGATION BAR ─────────────────────────────────────────── */}
      <motion.nav
        className={`nav-root${scrolled ? " scrolled" : ""}`}
        initial={{ y: -20, opacity: 0 }}
        animate={hideNav ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="nav-container">

          {/* Logo */}
          <Link href="/" className="nav-logo" aria-label="Taaffeite Home">
            <img src="/tafflogo.png" alt="Taaffeite" width={56} height={56} />
          </Link>

          {/* Desktop horizontal nav links */}
          <ul className="nav-desktop-links" role="list">
            {siteContent.navbar.links.map((link) => {
              const isActive = pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={`nav-desktop-link${isActive ? " active" : ""}`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Hamburger — mobile only (hidden via CSS on desktop) */}
          <button
            className="luxury-burger"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isOpen}
          >
            <span
              style={{
                width: isOpen ? "24px" : "28px",
                transform: isOpen ? "rotate(45deg) translateY(7px)" : "none",
              }}
            />
            <span style={{ width: "20px", opacity: isOpen ? 0 : 1 }} />
            <span
              style={{
                width: isOpen ? "24px" : "28px",
                transform: isOpen ? "rotate(-45deg) translateY(-7px)" : "none",
              }}
            />
          </button>

        </div>
      </motion.nav>

      {/* ── MOBILE SLIDE DRAWER ─────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="magazine-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              className="magazine-overlay"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.nav
                className="magazine-menu-wrapper"
                initial={{ x: 24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.18, duration: 0.45 }}
                aria-label="Mobile Navigation"
              >
                {siteContent.navbar.links.map((link, index) => {
                  const isActive = pathname === link.path;
                  const counter = String(index + 1).padStart(2, "0");

                  return (
                    <Link
                      key={link.path}
                      href={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`magazine-mobile-item${isActive ? " active" : ""}`}
                    >
                      <span className="magazine-counter">{counter}</span>
                      <span className="magazine-mobile-link">{link.name}</span>
                    </Link>
                  );
                })}
              </motion.nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;