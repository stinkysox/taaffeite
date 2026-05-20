"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    const consentGiven = localStorage.getItem("cookieConsent");
    
    if (!consentGiven) {
      setTimeout(() => {
        setShowBanner(true);
        setTimeout(() => setIsVisible(true), 100);
      }, 1500);
    }
  }, []);

  const handleToggle = () => {
    setAccepted(!accepted);
  };

  const handleConfirm = () => {
    localStorage.setItem("cookieConsent", accepted ? "accepted" : "declined");
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 400);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Subtle backdrop */}
      <div
        className={`fixed inset-0 bg-black/15 z-[9998] transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleConfirm}
      />
      
      {/* Ultra-compact cookie card */}
      <div
        className={`fixed bottom-5 right-5 z-[9999] w-[85%] max-w-xs transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="relative bg-black/95 dark:bg-zinc-950/95 backdrop-blur-xl rounded-xl shadow-2xl border border-zinc-200/50 dark:border-zinc-800/50">
          <div className="p-4">
            {/* Compact header */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gold-600/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h4 className="text-sm font-serif italic text-zinc-900 dark:text-[#1a1a1a]">
                Cookie Preferences
              </h4>
            </div>

            {/* Compact text */}
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
              We use cookies to improve your experience.{" "}
              <Link
                href="/privacy-policy"
                className="text-gold-600 hover:text-gold-500 font-medium underline decoration-gold-600/30 underline-offset-2"
              >
                Learn more
              </Link>
            </p>

            {/* Premium toggle slider */}
            <div className="flex items-center justify-between gap-3 mb-3">
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-600">
                {accepted ? "Accept Cookies" : "Decline Cookies"}
              </span>
              
              <button
                onClick={handleToggle}
                className={`relative w-11 h-6 rounded-full transition-all duration-300 ${
                  accepted 
                    ? "bg-gradient-to-r from-gold-600 to-gold-500 shadow-lg shadow-gold-600/20" 
                    : "bg-zinc-300 dark:bg-zinc-700"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    accepted ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Confirm button */}
            <button
              onClick={handleConfirm}
              className="w-full py-2 rounded-lg bg-zinc-900 dark:bg-white text-[#1a1a1a] dark:text-zinc-900 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
            >
              Confirm Choice
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
