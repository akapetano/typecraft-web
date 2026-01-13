import "./globals.css";
import type { Metadata } from "next";
import { AppLayout } from "@/components/shared/AppLayout/AppLayout";
import { RootShell } from "@/components/shared/RootShell/RootShell";
import { getSavedColorMode } from "@/utils/colorMode.server";

export const metadata: Metadata = {
  title: "Typecraft",
  description: "Typecraft is a platform for typing practice",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const colorMode = await getSavedColorMode();

  return (
    <RootShell colorMode={colorMode}>
      <AppLayout colorMode={colorMode}>{children}</AppLayout>
    </RootShell>
  );
}
