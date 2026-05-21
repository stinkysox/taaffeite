import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Taaffeite Events",
  description: "Privacy policy for Taaffeite Events detailing how we collect, use, and safeguard your personal information.",
  robots: "noindex, follow",
  alternates: {
    canonical: "https://www.taaffeite.com/privacy-policy",
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
