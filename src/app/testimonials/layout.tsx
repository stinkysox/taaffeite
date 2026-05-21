import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials | Taaffeite Events",
  description: "Read reflections and kind words from our couples. Every celebration is deeply personal, and so are the experiences shared by the people we create them for.",
  openGraph: {
    title: "Testimonials | Taaffeite Events",
    description: "Read reflections and kind words from our couples. Every celebration is deeply personal, and so are the experiences shared by the people we create them for.",
    url: "https://www.taaffeite.com/testimonials",
  },
  alternates: {
    canonical: "https://www.taaffeite.com/testimonials",
  },
};

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
