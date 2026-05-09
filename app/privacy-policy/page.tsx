
import React from "react";

import PrivacyCompo from "@/componants/PrivacyCompo";

export const metadata = {
  title: "Privacy Policy | Feel Safe",
  description:
    "Read Feel Safe Private Limited privacy policy to understand how we collect, use, and protect your personal information.",
  alternates: {
    canonical: "https://feelsafeco.in/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Feel Safe",
    description:
      "Read Feel Safe Private Limited privacy policy to understand how we collect, use, and protect your personal information.",
    url: "https://feelsafeco.in/privacy-policy",
    siteName: "Feel Safe",
    type: "website",
    images: [
      {
        url: "https://feelsafeco.in/og-feelsafe-hygiene.jpg",
        width: 1200,
        height: 630,
        alt: "Feel Safe Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Feel Safe",
    description:
      "Read Feel Safe Private Limited privacy policy to understand how we collect, use, and protect your personal information.",
    images: ["https://feelsafeco.in/og-feelsafe-hygiene.jpg"],
  },
};

const PrivacyPolicy = () => {


  return (
    <PrivacyCompo />
  );
};

const Info = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

export default PrivacyPolicy;

