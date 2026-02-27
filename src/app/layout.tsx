import "./globals.css";
import type { Metadata } from "next";
import { AppLayout } from "@/components/shared/AppLayout/AppLayout";
import { RootShell } from "@/components/shared/RootShell/RootShell";
import { ThemeInitScript } from "@/components/shared/ThemeInitScript/ThemeInitScript";
import { APP_DESCRIPTION, APP_NAME, ICONS } from "@/constants/metadata";
import type { Theme } from "@/types/theme/theme";
import { THEMES } from "@/types/theme/theme";
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
  const defaultTheme: Theme = THEMES[0];

  return (
    <RootShell colorMode={colorMode} theme={defaultTheme}>
      <ThemeInitScript defaultTheme={defaultTheme} />
      <AppLayout colorMode={colorMode}>{children}</AppLayout>
    </RootShell>
  );
}
