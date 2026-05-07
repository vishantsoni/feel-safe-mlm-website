import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/componants/navbar/Navbar";
import Footer from "@/componants/footer/Footer";
import Script from "next/script";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { CartProvider } from "@/lib/contexts/CartContext";
import { ToastProvider } from "@/lib/contexts/ToastContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://feelsafeco.in/"),
  title: {
    default: "Feel Safe | Premium Hygiene & Personal Care Products",
    template: "%s | Hamara Prayas, Aapki Suraksha | Feel Safe Private Limited",
  },
  description:
    "India's trusted manufacturer of Feel™ brand Sanitary Napkins, Baby Diapers, and Adult Care. BIS 5405:2019 certified, rash-free, and high-absorbency hygiene solutions. Wholesale & bulk suppliers for NGOs, distributors, and Sakhi Yojana PAN India.",
  keywords: [
    "Feel Safe Private Limited",
    "Sanitary Napkin Manufacturer India",
    "Feel Baby Diapers",
    "Adult Diapers India",
    "Wholesale Sanitary Pads",
    "BIS Certified Pads",
    "NGO Hygiene Supplier",
    "Rash-free Sanitary Napkins",
  ],
  icons: {
    icon: "https://feelsafeco.in/favicon.ico?favicon.0roezpub-jmq0.ico",
    shortcut: "https://feelsafeco.in/favicon.ico?favicon.0roezpub-jmq0.ico",
    apple: "https://feelsafeco.in/favicon.ico?favicon.0roezpub-jmq0.ico",
  },
  openGraph: {
    title: "Feel Safe Private Limited | Quality Personal Care Products",
    description: "Shop premium Sanitary Pads, Baby Diapers, and Adult Care products by Feel Safe. Quality you can trust, comfort you can feel.",
    url: "https://feelsafeco.in/",
    siteName: "Feel Safe",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" type="text/css" href="/assets/css/vendor.css" />
        <link rel="stylesheet" type="text/css" href="/style.css" />
        <link rel="stylesheet" type="text/css" href="/mobile.css" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <CartProvider>
            <ToastProvider>
              <Navbar />
              {children}
              <Footer />
            </ToastProvider>
          </CartProvider>
        </AuthProvider>


        <Script src="/assets/js/jquery-1.11.0.min.js" />
        <Script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js"></Script>
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe"
          crossOrigin="anonymous"
        ></Script>
        <Script src="/assets/js/plugins.js"></Script>
        <Script src="/assets/js/script.js"></Script>
      </body>
    </html>
  );
}
