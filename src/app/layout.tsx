import type { Metadata } from "next";

import "./globals.css";

import { Footer } from "@/components/Footer";
import { Header } from "@/entities/Header";
import { FrankRuhlLibre, Manrope } from "@/fonts";
import { clsx } from "clsx";
import { TooltipProvider } from "@/entities/TooltipProvider";
import { CompareProvider } from "@/entities/compare/context";

export const metadata: Metadata = {
  title: "Semi Liquids",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(FrankRuhlLibre.variable, Manrope.variable)}>
        <CompareProvider>
          <TooltipProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </TooltipProvider>
        </CompareProvider>
      </body>
    </html>
  );
}
