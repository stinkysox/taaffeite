"use client";

import React from "react";
import { SectionWrapper } from "../../components/SectionWrapper";

export default function TermsOfService() {
  return (
    <div className="pt-32 pb-24 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <SectionWrapper className="mb-16">
          <h1 className="text-6xl font-serif mb-6 italic">Terms of Service</h1>
          <p className="text-gray-500 uppercase tracking-widest text-sm">
            Last Updated: February 4, 2026
          </p>
        </SectionWrapper>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8 text-gray-600 dark:text-gray-400 font-light leading-relaxed">
          <section>
            <h2 className="text-2xl font-serif text-gray-900 dark:text-[#1a1a1a] mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Taaffeite Events website, you agree to comply with and be bound by these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gray-900 dark:text-[#1a1a1a] mb-4">2. Services</h2>
            <p>
              Taaffeite Events provides premium wedding planning, event styling, and celebration curation services. Details of specific commissions are handled through individual contracts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gray-900 dark:text-[#1a1a1a] mb-4">3. Intellectual Property</h2>
            <p>
              All visual content, including photographs and videos displayed on this website, are the intellectual property of Taaffeite Events (or used with permission). Unauthorized use or reproduction is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gray-900 dark:text-[#1a1a1a] mb-4">4. Limitation of Liability</h2>
            <p>
              Taaffeite Events shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-gray-900 dark:text-[#1a1a1a] mb-4">5. Governing Law</h2>
            <p>
              These terms are governed by the laws of India and the jurisdiction of Bangalore, Karnataka.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
