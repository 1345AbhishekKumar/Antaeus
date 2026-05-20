import type { Metadata } from "next";
import type React from "react";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Antaeus Travel Group",
  description:
    "A family-run global travel management company with a 35-year long presence and expertise. Marine, Corporate & Leisure travel worldwide.",
  keywords: ["travel management", "marine travel", "corporate travel", "MICE", "DMC"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
