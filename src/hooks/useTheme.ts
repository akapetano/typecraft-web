"use client";

import { useEffect, useState } from "react";
import { THEME_EVENT } from "@/constants/theme";
import type { Theme } from "@/types/theme/theme";
import { readTheme, setTheme as setThemeInStorage } from "@/utils/theme";

export function useTheme(externalTheme?: Theme) {
  const [theme, setThemeState] = useState<Theme>(
    () => externalTheme ?? readTheme(),
  );

  useEffect(() => {
    if (externalTheme) setThemeState(externalTheme);
  }, [externalTheme]);

  useEffect(() => {
    const handler = (e: Event) => {
      const next = (e as CustomEvent<Theme>).detail;
      if (next) setThemeState(next);
      else setThemeState(readTheme());
    };

    window.addEventListener(THEME_EVENT, handler as EventListener);
    return () =>
      window.removeEventListener(THEME_EVENT, handler as EventListener);
  }, []);

  function handleThemeChange(nextTheme: Theme) {
    setThemeState(nextTheme);
    setThemeInStorage(nextTheme);
    window.dispatchEvent(
      new CustomEvent<Theme>(THEME_EVENT, { detail: nextTheme }),
    );
  }

  return { theme, handleThemeChange };
}
