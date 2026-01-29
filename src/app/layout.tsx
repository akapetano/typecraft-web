import "./globals.css";
import type { Metadata } from "next";
import { AppLayout } from "@/components/shared/AppLayout/AppLayout";
import { RootShell } from "@/components/shared/RootShell/RootShell";
import { APP_DESCRIPTION, APP_NAME, ICONS } from "@/constants/metadata";
import { getSavedColorMode } from "@/utils/colorMode.server";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  icons: ICONS,
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
