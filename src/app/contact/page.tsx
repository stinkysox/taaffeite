"use client";

import React from "react";
import { SectionWrapper } from "../../components/SectionWrapper";
import { siteContent } from "../../data/siteContent";

export default function Contact() {
  const { contact } = siteContent;

  return (
    <div className="pt-32 pb-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <SectionWrapper className="mb-24">
          <span className="premium-label mb-4 block">
            {contact.hero.label}
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-9xl font-serif mb-6 italic leading-none tracking-tighter text-[#1a1a1a]">
            {contact.hero.title}
          </h1>
          <p className="premium-para text-lg md:text-xl max-w-2xl">
            {contact.hero.description}
          </p>
        </SectionWrapper>

        <div className="grid md:grid-cols-2 gap-20">
          <SectionWrapper direction="left">
            <div className="space-y-16">
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.4em] text-gold-600 font-bold mb-6">
                  {contact.info.studio.title}
                </h3>
                <p className="text-2xl md:text-3xl font-serif leading-snug text-[#1a1a1a]">
                  {contact.info.studio.details.map((detail, i) => (
                    <React.Fragment key={i}>
                      {detail}
                      {i < contact.info.studio.details.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
              </div>
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.4em] text-gold-600 font-bold mb-6">
                  {contact.info.communication.title}
                </h3>
                <p className="text-2xl md:text-3xl font-serif leading-snug italic break-words text-[#1a1a1a]">
                  {contact.info.communication.email}
                  <br />
                  {contact.info.communication.phone}
                </p>
              </div>
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.4em] text-gold-600 font-bold mb-6">
                  {contact.info.social.title}
                </h3>
                <div className="flex flex-wrap gap-6 md:gap-12 text-xl md:text-2xl font-serif italic text-[#1a1a1a]">
                  {contact.info.social.links.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      className="hover:text-gold-600 transition-all duration-500 border-b border-transparent hover:border-gold-600/30"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </SectionWrapper>

          <SectionWrapper direction="right">
            <div className="glass p-8 md:p-16 rounded-[3rem] md:rounded-[4rem] border border-black/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-600/5 rounded-full blur-3xl group-hover:bg-gold-600/10 transition-colors duration-1000"></div>

              <form className="space-y-10 relative z-10">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[8px] uppercase tracking-[0.3em] font-bold text-gray-400">
                      {contact.form.firstName}
                    </label>
                    <input
                      type="text"
                      placeholder="Arjun"
                      className="w-full bg-transparent border-b border-black/10 py-3 outline-none focus:border-gold-600 transition-colors placeholder:text-gray-700 text-[#1a1a1a]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[8px] uppercase tracking-[0.3em] font-bold text-gray-400">
                      {contact.form.lastName}
                    </label>
                    <input
                      type="text"
                      placeholder="Reddy"
                      className="w-full bg-transparent border-b border-black/10 py-3 outline-none focus:border-gold-600 transition-colors placeholder:text-gray-700 text-[#1a1a1a]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[8px] uppercase tracking-[0.3em] font-bold text-gray-400">
                    {contact.form.email}
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="w-full bg-transparent border-b border-black/10 py-3 outline-none focus:border-gold-600 transition-colors placeholder:text-gray-700 text-[#1a1a1a]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[8px] uppercase tracking-[0.3em] font-bold text-gray-400">
                    {contact.form.message}
                  </label>
                  <textarea
                    placeholder="Tell us about the celebration..."
                    className="w-full bg-transparent border-b border-black/10 py-3 h-32 outline-none focus:border-gold-600 transition-colors resize-none placeholder:text-gray-700 text-[#1a1a1a]"
                  />
                </div>

                <div className="flex items-start gap-4 text-[10px] text-gray-500 dark:text-gray-400">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 w-4 h-4 rounded border-black/10 accent-gold-600"
                  />
                  <p className="leading-relaxed">
                    I agree to the collection and processing of my personal data as outlined in the{" "}
                    <a href="/privacy-policy" className="text-gold-600 underline">Privacy Policy</a> and{" "}
                    <a href="/terms-of-service" className="text-gold-600 underline">Terms of Service</a>.
                  </p>
                </div>

                <button className="w-full py-6 rounded-full bg-white text-black uppercase tracking-[0.4em] font-bold text-[10px] hover:scale-[1.02] transition-transform shadow-2xl glow-button">
                  {contact.form.submit}
                </button>
              </form>
            </div>
          </SectionWrapper>
        </div>
      </div>
    </div>
  );
}
