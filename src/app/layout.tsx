import "./globals.css";
import type { Metadata } from "next";
import { AppLayout } from "@/components/shared/AppLayout/AppLayout";
import { RootShell } from "@/components/shared/RootShell/RootShell";

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
    <RootShell>
      <AppLayout>{children}</AppLayout>
    </RootShell>
  );
}
