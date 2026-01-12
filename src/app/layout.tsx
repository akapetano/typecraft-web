import "./globals.css";
import type { Metadata } from "next";
import { spaceGrotesk, geistMono } from "@/theme/nextFonts";

export const metadata: Metadata = {
  title: "Typecraft",
  description: "Typecraft is a platform for typing practice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
