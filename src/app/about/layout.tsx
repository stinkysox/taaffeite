import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Taaffeite Events",
  description: "Learn about the story and philosophy behind Taaffeite Events. We design weddings and celebrations that feel deeply personal, naturally elegant, and emotionally connected.",
  openGraph: {
    title: "About | Taaffeite Events",
    description: "Learn about the story and philosophy behind Taaffeite Events. We design weddings and celebrations that feel deeply personal, naturally elegant, and emotionally connected.",
    url: "https://www.taaffeite.com/about",
  },
  alternates: {
    canonical: "https://www.taaffeite.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
