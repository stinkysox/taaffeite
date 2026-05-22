"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [cursorType, setCursorType] = useState<"default" | "hover" | "image">("default");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide on mobile/touch
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, .magnetic-target")) {
        setCursorType("hover");
      } else if (target.closest("img, .gallery-item")) {
        setCursorType("image");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-gold-600 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      
      {/* Expanding Ring */}
      <motion.div
        className="fixed top-0 left-0 border border-gold-600/50 rounded-full pointer-events-none z-[9998]"
        animate={{
          width: cursorType === "hover" ? 60 : cursorType === "image" ? 100 : 30,
          height: cursorType === "hover" ? 60 : cursorType === "image" ? 100 : 30,
          opacity: cursorType === "default" ? 0.4 : 0.8,
          backgroundColor: cursorType === "image" ? "rgba(202, 138, 4, 0.1)" : "rgba(0, 0, 0, 0)",
        }}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 25 }}
      />

      {/* Label for images */}
      {cursorType === "image" && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed top-0 left-0 text-[10px] uppercase tracking-widest text-gold-600 font-bold pointer-events-none z-[10000]"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "100%",
            translateY: "-100%",
          }}
        >
          View
        </motion.span>
      )}
    </>
  );
};
