import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Consultation | Taaffeite Events",
  description: "Reserve your date and start planning your bespoke celebration. Thoughtfully planned events begin with meaningful conversations.",
  openGraph: {
    title: "Book Consultation | Taaffeite Events",
    description: "Reserve your date and start planning your bespoke celebration. Thoughtfully planned events begin with meaningful conversations.",
    url: "https://www.taaffeite.com/book",
  },
  alternates: {
    canonical: "https://www.taaffeite.com/book",
  },
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
