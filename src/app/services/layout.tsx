import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Taaffeite Events",
  description: "From intimate gatherings to grand destination weddings, Taaffeite offers complete planning, styling, and coordination services tailored to your story.",
  openGraph: {
    title: "Services | Taaffeite Events",
    description: "From intimate gatherings to grand destination weddings, Taaffeite offers complete planning, styling, and coordination services tailored to your story.",
    url: "https://www.taaffeite.com/services",
  },
  alternates: {
    canonical: "https://www.taaffeite.com/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
