import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Taaffeite Events",
  description: "We would love to hear your story and thoughtfully craft an experience around it. Contact our studio in Bangalore to begin planning your celebration.",
  openGraph: {
    title: "Contact | Taaffeite Events",
    description: "We would love to hear your story and thoughtfully craft an experience around it. Contact our studio in Bangalore to begin planning your celebration.",
    url: "https://www.taaffeite.com/contact",
  },
  alternates: {
    canonical: "https://www.taaffeite.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
