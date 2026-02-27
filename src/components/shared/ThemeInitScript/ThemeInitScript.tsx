import Script from "next/script";
import type { Theme } from "@/types/theme/theme";
import { THEMES } from "@/types/theme/theme";

interface IThemeInitScriptProps {
  defaultTheme: Theme;
}

export const ThemeInitScript = ({
  defaultTheme = "aurora",
}: IThemeInitScriptProps) => (
  <Script id="theme-init" strategy="beforeInteractive">{`
    (function() {
      try {
        const stored = localStorage.getItem('theme');
        const themes = ${JSON.stringify(THEMES)};
        const isValid = stored && themes.includes(stored);
        const theme = isValid ? stored : '${defaultTheme}';
        document.documentElement.dataset.theme = theme;
      } catch (_) {}
    })();
  `}</Script>
);
