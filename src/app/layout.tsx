import { type Metadata } from "next";
import { Noto_Serif } from "next/font/google";
import React from "react";

import Header from "@/components/Header";

import { cmsPageMetaDefault, metaHandlers, normalizeCMSPageMeta } from "@/lib/data";

import "@/styles/reset.scss"; //resetting styles
import "@/styles/index.scss"; //for root classes

const notoSerif = Noto_Serif({
  variable: "--font-notoSerif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap", // better loading...
});

export const metadata: Metadata = {
  ...normalizeCMSPageMeta(cmsPageMetaDefault, metaHandlers),
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
