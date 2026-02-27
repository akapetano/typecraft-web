import { geistMono, spaceGrotesk } from "@/theme/nextFonts";
import type { ColorMode } from "@/types/theme/colorMode";
import type { Theme } from "@/types/theme/theme";

interface RootShellProps {
  children: React.ReactNode;
  lang?: string;
  colorMode: ColorMode;
  theme: Theme;
}

export const RootShell = ({
  children,
  lang = "en",
  colorMode,
  theme,
}: RootShellProps) => {
  return (
    <html
      lang={lang}
      data-color-mode={colorMode}
      data-theme={theme}
      className={`${spaceGrotesk.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
};
