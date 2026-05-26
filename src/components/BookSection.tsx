"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";
import { siteContent } from "../data/siteContent";

export default function Book() {
  const [submitted, setSubmitted] = useState(false);
  const { book } = siteContent;

  // ✅ FORM STATE
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    type: "",
    vision: "",
  });

  // ✅ WHATSAPP SUBMIT HANDLER
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const phoneNumber = "919148990266";

    const message = encodeURIComponent(
      `📸 New Booking Request

Name: ${formData.name}
Email: ${formData.email}
Date: ${formData.date}
Event Type: ${formData.type}
Vision: ${formData.vision}

Sent from website booking form`
    );

    setTimeout(() => {
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    }, 700);
  };

  return (
    <div className="relative pt-32 pb-24 px-6 overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full" />

      <div className="max-w-4xl mx-auto relative z-10">
        <SectionWrapper direction="up" className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-serif mb-6 text-[#1a1a1a]">
            {book.hero.title}
          </h1>
          <p className="premium-label italic">{book.hero.subtitle}</p>
        </SectionWrapper>

        <SectionWrapper direction="up" delay={0.2}>
          <div className="glass rounded-[2rem] p-8 md:p-16 border border-black/10 shadow-2xl">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  {/* NAME + EMAIL */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest opacity-60">
                        {book.form.name}
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full bg-transparent border-b border-black/20 py-4 focus:border-gold-600 outline-none transition-colors text-[#1a1a1a] placeholder:text-gray-700"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest opacity-60">
                        {book.form.email}
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full bg-transparent border-b border-black/20 py-4 focus:border-gold-600 outline-none transition-colors text-[#1a1a1a] placeholder:text-gray-700"
                      />
                    </div>
                  </div>

                  {/* DATE + TYPE */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest opacity-60">
                        {book.form.date}
                      </label>
                      <input
                        required
                        type="date"
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                        className="w-full bg-transparent border-b border-black/20 py-4 focus:border-gold-600 outline-none transition-colors text-[#1a1a1a] [color-scheme:dark]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest opacity-60">
                        {book.form.type}
                      </label>

                      <select
                        value={formData.type}
                        onChange={(e) =>
                          setFormData({ ...formData, type: e.target.value })
                        }
                        className="w-full bg-black/20 border-b border-black/20 py-4 px-4 focus:border-gold-600 outline-none transition-colors appearance-none cursor-pointer text-[#1a1a1a] rounded-t-lg backdrop-blur-sm"
                      >
                        <option value="">Select Event Type</option>
                        {book.eventTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* VISION */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest opacity-60">
                      {book.form.vision}
                    </label>
                    <textarea
                      placeholder="Describe the mood, location, and your story..."
                      value={formData.vision}
                      onChange={(e) =>
                        setFormData({ ...formData, vision: e.target.value })
                      }
                      className="w-full bg-transparent border-b border-black/20 py-4 h-32 focus:border-gold-600 outline-none transition-colors resize-none text-[#1a1a1a] placeholder:text-gray-700"
                    />
                  </div>

                  {/* TERMS */}
                  <div className="flex items-start gap-4 py-4 text-xs text-gray-500">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 w-4 h-4 rounded border-black/20 accent-gold-600"
                    />
                    <p className="leading-relaxed">
                      I agree to the processing of my details as per the{" "}
                      <a
                        href="/privacy-policy"
                        className="text-gold-600 underline"
                      >
                        Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a
                        href="/terms-of-service"
                        className="text-gold-600 underline"
                      >
                        Terms of Service
                      </a>
                      .
                    </p>
                  </div>

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    className="w-full py-5 rounded-full bg-gold-600 text-[#1a1a1a] uppercase tracking-[0.2em] font-bold text-sm transition-all hover:bg-gold-500"
                  >
                    {book.form.submit}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-gold-600 rounded-full flex items-center justify-center mx-auto mb-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>

                  <h2 className="text-4xl font-serif mb-4 text-[#1a1a1a]">
                    {book.form.successTitle}
                  </h2>

                  <p className="max-w-sm mx-auto text-zinc-500">
                    {book.form.successMessage}
                  </p>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-sm uppercase tracking-widest underline underline-offset-8 hover:text-gold-600 transition-colors"
                  >
                    Send another request
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
}