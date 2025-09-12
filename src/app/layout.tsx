import React from "react";
import type { Metadata } from "next";
import { Noto_Serif } from "next/font/google";

import Header from "@/components/Header";

import "@/styles/reset.scss"; //resetting styles
import "@/styles/index.scss"; //for root classes

const notoSerif = Noto_Serif({
  variable: "--font-notoSerif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap", // better loading...
});

export const metadata: Metadata = {
  title: "Landscape Design & Hardscaping in Front Range Metro | Autumn Gold Landscapes",
  description:
    "Autumn Gold Landscapes provides expert landscaping, landscape design, hardscaping, and retaining wall services in the Front Range Metro Area. With over 60 years of combined experience, our team delivers sustainable solutions for your outdoor space. Get a free consultation today!",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16" },
      { url: "/favicons/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/favicons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /**
   * notoSerif.variable - it gives the variable of the font-family in to the context
   * notoSerif.className - it applies the font-family
   */
  //! giving css variable of notoSerif in to the context without applying the font-family
  return (
    <html lang="en">
      <body className={`${notoSerif.variable}`}>
        <div className="total-wrapper">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
