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
        const name = 'theme';
        const themes = ${JSON.stringify(THEMES)};
        const raw = document.cookie.split(';').find(function(c) { return c.trim().startsWith(name + '='); });
        const stored = raw ? raw.split('=')[1].trim() : null;
        const isValid = stored && themes.includes(stored);
        const theme = isValid ? stored : '${defaultTheme}';
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.dataset.pandaTheme = theme;
      } catch (_) {}
    })();
  `}</Script>
);
