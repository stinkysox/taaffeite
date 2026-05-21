import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Taaffeite Events",
  description: "Terms of Service and legal agreements for using the Taaffeite Events website and services.",
  robots: "noindex, follow",
  alternates: {
    canonical: "https://www.taaffeite.com/terms-of-service",
  },
};

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
