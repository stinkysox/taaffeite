import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Taaffeite Events",
  description: "A glimpse into celebrations shaped with emotion, elegance, and timeless detail. Explore our curated visual narratives of luxury weddings and bespoke events.",
  openGraph: {
    title: "Gallery | Taaffeite Events",
    description: "A glimpse into celebrations shaped with emotion, elegance, and timeless detail. Explore our curated visual narratives of luxury weddings and bespoke events.",
    url: "https://www.taaffeite.com/gallery",
  },
  alternates: {
    canonical: "https://www.taaffeite.com/gallery",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
