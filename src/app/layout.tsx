import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CustomCursor } from "../components/CustomCursor";
import { CookieConsent } from "../components/CookieConsent";
import { VinylPlayer } from "../components/VinylPlayer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const OG_IMAGE = `${SITE_URL}/tafflogo.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: "Taaffeite Events | Luxury Wedding Planning & Event Curation",
  description:
    "Taaffeite Events curates bespoke celebrations, luxury weddings, and emotionally resonant events in Bangalore, India, and worldwide.",

  keywords:
    "luxury wedding planner, wedding planner Bangalore, bespoke celebrations, destination wedding planner India, premium event curation, Taaffeite Events",

  authors: [{ name: "Taaffeite Events" }],

  robots: "index, follow",

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    title: "Taaffeite Events | Luxury Wedding Planning",
    description:
      "Thoughtfully curated celebrations shaped by emotion, elegance, and intentional design.",
    type: "website",
    url: SITE_URL,
    siteName: "Taaffeite Events",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Taaffeite Events — Luxury Weddings",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Taaffeite Events | Luxury Wedding Planning",
    description:
      "Thoughtfully curated celebrations shaped by emotion, elegance, and intentional design.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EventPlanningBusiness"],
    name: "Taaffeite Events",
    image: OG_IMAGE,
    "@id": SITE_URL,
    url: SITE_URL,
    telephone: "+919148990266",
    description:
      "Luxury wedding planning & bespoke celebrations crafted with warmth, elegance, and intention.",
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bangalore",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 12.97,
      longitude: 77.59,
    },
    areaServed: ["India", "Worldwide"],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "10:00",
      closes: "20:00",
    },
    sameAs: [
      "https://www.instagram.com/taaffeiteevents/",
      "https://www.linkedin.com/company/taaffeiteevents/",
      "https://www.youtube.com/@Taaffeiteevents",
    ],
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Fallback OG tags (IMPORTANT for WhatsApp / iMessage) */}
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        {/* Favicon */}
        <link rel="icon" type="image/png" href="/tafflogo.png" />
      </head>

      <body
        className={`${inter.variable} ${playfair.variable} antialiased selection:bg-gold-600/30 font-sans`}
        suppressHydrationWarning
      >
        <CustomCursor />
        <VinylPlayer />

        <div className="flex flex-col min-h-screen relative">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>

        <CookieConsent />
      </body>
    </html>
  );
}