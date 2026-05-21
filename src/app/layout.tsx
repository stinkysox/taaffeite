import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.taaffeite.com'),
  title: "Taaffeite Events | Luxury Wedding Planning & Event Curation",
  description: "Taaffeite Events curates bespoke celebrations, luxury weddings, and emotionally resonant events in Bangalore, India, and worldwide.",
  keywords: "luxury wedding planner, wedding planner Bangalore, bespoke celebrations, destination wedding planner India, premium event curation, Taaffeite Events",
  authors: [{ name: "Taaffeite Events" }],
  robots: "index, follow",
  verification: {
    google: "b0fe91c686917fde",
  },
  alternates: {
    canonical: "https://www.taaffeite.com",
  },
  openGraph: {
    title: "Taaffeite Events | Luxury Wedding Planning",
    description: "Thoughtfully curated celebrations shaped by emotion, elegance, and intentional design in Bangalore and beyond.",
    type: "website",
    url: "https://www.taaffeite.com",
    siteName: "Taaffeite Events",
    images: [
      {
        url: "https://i.pinimg.com/736x/a9/9a/d5/a99ad5c52f71c7d54a4d21d724d2e079.jpg",
        width: 1200,
        height: 630,
        alt: "Taaffeite Events — Luxury Weddings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taaffeite Events | Luxury Wedding Planning",
    description: "Thoughtfully curated celebrations shaped by emotion, elegance, and intentional design.",
    images: ["https://i.pinimg.com/736x/a9/9a/d5/a99ad5c52f71c7d54a4d21d724d2e079.jpg"],
  },
};

import { CustomCursor } from "../components/CustomCursor";
import { CookieConsent } from "../components/CookieConsent";
import { VinylPlayer } from "../components/VinylPlayer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EventPlanningBusiness",
    "name": "Taaffeite Events",
    "image": "https://i.pinimg.com/736x/a9/9a/d5/a99ad5c52f71c7d54a4d21d724d2e079.jpg",
    "@id": "https://www.taaffeite.com",
    "url": "https://www.taaffeite.com",
    "telephone": "+919148990266",
    "description": "Luxury wedding planning & bespoke celebrations crafted with warmth, elegance, and intention.",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bangalore",
      "addressRegion": "Karnataka",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 12.97,
      "longitude": 77.59
    },
    "areaServed": "Worldwide",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
      ],
      "opens": "10:00",
      "closes": "20:00"
    },
    "sameAs": [
      "https://www.instagram.com/taaffeiteevents/",
      "https://www.linkedin.com/company/taaffeiteevents/",
      "https://www.youtube.com/@Taaffeiteevents"
    ]
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link
          rel="icon"
          type="image/jpeg"
          href="https://i.pinimg.com/736x/ad/42/2d/ad422d9d993dfb6697b437b06dcd0cb3.jpg"
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased selection:bg-gold-600/30 font-sans`}
        suppressHydrationWarning
      >
        <CustomCursor />
        <VinylPlayer />
        <div className="flex flex-col min-h-screen relative">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <CookieConsent />
      </body>
    </html>
  );
}
