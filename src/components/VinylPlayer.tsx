"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const VinylPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDimmed, setIsDimmed] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inactivityTimer = useRef<NodeJS.Timeout>(null);

  // Auto-dim logic
  useEffect(() => {
    const resetTimer = () => {
      setIsDimmed(false);
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      inactivityTimer.current = setTimeout(() => setIsDimmed(true), 3000); // Dim after 3s
    };

    // Initial timer
    resetTimer();

    // Event listeners
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mouseenter", resetTimer);
      container.addEventListener("mousemove", resetTimer);
      container.addEventListener("click", resetTimer);
    }

    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      if (container) {
        container.removeEventListener("mouseenter", resetTimer);
        container.removeEventListener("mousemove", resetTimer);
        container.removeEventListener("click", resetTimer);
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ y: 200, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: isDimmed ? 0.3 : 1, 
      }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        opacity: { duration: 0.8, ease: "easeInOut" }
      }}
      className="fixed bottom-6 right-6 z-50 cursor-pointer group"
      onClick={togglePlay}
    >
      {/* Container to hold the disc and tonearm */}
      <div className="relative w-32 h-32 md:w-36 md:h-36 flex items-center justify-center">
        
        {/* Vinyl Disc */}
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ 
            ease: "linear", 
            duration: 1.8,  // 33 1/3 RPM approx
            repeat: Infinity,
            repeatType: "loop"
          }}
          className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#111] shadow-2xl flex items-center justify-center overflow-hidden z-10"
          style={{
            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.1)"
          }}
        >
          {/* Realistic Grooves */}
          <div 
            className="absolute inset-0 rounded-full opacity-60"
            style={{
              background: `
                repeating-radial-gradient(
                  #111 0, 
                  #111 2px, 
                  #222 3px, 
                  #111 4px
                )
              `
            }}
          />

          {/* Light Reflection */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/5 to-transparent pointer-events-none mix-blend-overlay" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-bl from-white/5 to-transparent pointer-events-none mix-blend-overlay" />

          {/* Label */}
          <div className="absolute w-1/3 h-1/3 bg-gold-600 rounded-full flex items-center justify-center shadow-lg border border-gold-700/50">
             <div className="w-1.5 h-1.5 bg-black rounded-full" />
             <div className="absolute inset-0 rounded-full border border-black/10" />
             <span className="text-[4px] text-black/60 font-serif uppercase tracking-widest absolute bottom-2">Side A</span>
          </div>
        </motion.div>

        {/* Tonearm (The Hand) */}
        <motion.div
           animate={{ rotate: isPlaying ? 25 : 0 }}
           transition={{ duration: 0.8, ease: "easeInOut" }}
           className="absolute top-0 right-0 w-16 h-24 pointer-events-none z-20 origin-top-right"
           style={{ transformOrigin: "85% 15%" }}
        >
          {/* Pivot Base */}
          <div className="absolute top-[10%] right-[10%] w-4 h-4 bg-zinc-400 rounded-full shadow-md border border-zinc-500" />
          
          {/* Arm */}
          <svg className="w-full h-full drop-shadow-xl" viewBox="0 0 100 150">
             <path 
                d="M85 20 L40 100 L25 95 L40 100 L45 110" 
                fill="none" 
                stroke="#d4d4d8" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round"
             />
             {/* Headhell / Needle Cartridge */}
             <path
                d="M40 100 L20 105 L25 120 L45 115 Z"
                fill="#27272a"
                stroke="none"
             />
          </svg>
        </motion.div>

        {/* Play/Pause Icon Overlay (Appears on Hover) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
             <div className="bg-black/20 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="none">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="none" className="ml-1">
                    <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                )}
             </div>
        </div>
      </div>

      {/* Audio Source */}
      <audio ref={audioRef} src="/19 - Phone Call (1).mp3" loop />
    </motion.div>
  );
};
