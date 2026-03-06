import "./globals.css";
import type { Metadata } from "next";
import { AppLayout } from "@/components/shared/AppLayout/AppLayout";
import { RootShell } from "@/components/shared/RootShell/RootShell";
import { ThemeInitScript } from "@/components/shared/ThemeInitScript/ThemeInitScript";
import { APP_DESCRIPTION, APP_NAME, ICONS } from "@/constants/metadata";
import { getSavedColorMode } from "@/utils/colorMode.server";
import { getSavedTheme } from "@/utils/theme.server";

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
  const theme = await getSavedTheme();

  return (
    <RootShell colorMode={colorMode} theme={theme}>
      <ThemeInitScript defaultTheme={theme} />
      <AppLayout colorMode={colorMode} theme={theme}>
        {children}
      </AppLayout>
    </RootShell>
  );
}
