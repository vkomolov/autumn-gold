import type { Metadata } from "next";
import { Noto_Serif } from "next/font/google";
import React from "react";

import Header from "@/components/Header";

import "@/styles/index.scss"; //for root classes
import "@/styles/reset.scss"; //resetting styles

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
  manifest: "/manifest.json",
  other: {
    "apple-mobile-web-app-title": "AGL",
    "apple-mobile-web-app-capable": "yes",
    "mask-icon": "/favicons/safari-pinned-tab.svg",
    "theme-color": "#F1881C",
  },
  icons: {
    icon: [
      {
        //rel: "icon",
        url: "/favicons/icon.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        //rel: "icon",
        url: "/favicons/icon.svg",
        type: "image/svg+xml",
        sizes: "any",
      },
    ],
    apple: [
      {
        //rel: "apple-touch-icon",
        url: "/favicons/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
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
