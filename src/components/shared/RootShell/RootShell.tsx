import { geistMono, spaceGrotesk } from "@/theme/nextFonts";
import type { ColorMode } from "@/types/theme/colorMode";

interface RootShellProps {
  children: React.ReactNode;
  lang?: string;
  colorMode?: ColorMode;
}

export const RootShell = ({
  children,
  lang = "en",
  colorMode,
}: RootShellProps) => {
  return (
    <html
      lang={lang}
      data-color-mode={colorMode}
      className={`${spaceGrotesk.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
};
