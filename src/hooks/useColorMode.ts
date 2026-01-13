// hooks/useColorMode.ts
"use client";

import { useEffect, useState } from "react";
import {
  COLOR_MODE_ATTRIBUTE_NAME,
  COLOR_MODE_COOKIE_NAME,
  COLOR_MODE_EVENT,
  COLOR_MODE_MAP,
} from "@/constants/colorMode";
import { Time } from "@/constants/time";
import type { ColorMode } from "@/types/theme/colorMode";
import { readColorMode } from "@/utils/colorMode";
import { getCookie, setCookie } from "@/utils/cookies";

export function useColorMode(externalColorMode?: ColorMode) {
  const [colorMode, setColorMode] = useState<ColorMode>(
    () => externalColorMode ?? readColorMode(),
  );

  // Sync with external color mode prop
  useEffect(() => {
    if (externalColorMode) setColorMode(externalColorMode);
  }, [externalColorMode]);

  // Listen for color mode changes from other components
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = (e: MediaQueryListEvent) => {
      // Only auto-update if user hasn't set explicit preference
      const hasSavedPreference = getCookie(COLOR_MODE_COOKIE_NAME);

      if (!hasSavedPreference) {
        const systemColorMode = e.matches
          ? COLOR_MODE_MAP.dark
          : COLOR_MODE_MAP.light;
        setColorMode(systemColorMode);

        // Update DOM attribute
        document.documentElement.setAttribute(
          COLOR_MODE_ATTRIBUTE_NAME,
          systemColorMode,
        );

        // Notify other components
        window.dispatchEvent(
          new CustomEvent<ColorMode>(COLOR_MODE_EVENT, {
            detail: systemColorMode,
          }),
        );
      }
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Listen for color mode changes from other components
  useEffect(() => {
    const handler = (e: Event) => {
      const next = (e as CustomEvent<ColorMode>).detail;
      if (next === COLOR_MODE_MAP.light || next === COLOR_MODE_MAP.dark) {
        setColorMode(next);
      } else {
        setColorMode(readColorMode());
      }
    };

    window.addEventListener(COLOR_MODE_EVENT, handler as EventListener);
    return () =>
      window.removeEventListener(COLOR_MODE_EVENT, handler as EventListener);
  }, []);

  const isDarkColorMode = colorMode === COLOR_MODE_MAP.dark;

  function toggleColorMode() {
    const nextColorMode: ColorMode = isDarkColorMode
      ? COLOR_MODE_MAP.light
      : COLOR_MODE_MAP.dark;

    setColorMode(nextColorMode);

    setCookie(COLOR_MODE_COOKIE_NAME, nextColorMode, Time.YEARS_1);

    document.documentElement.setAttribute(
      COLOR_MODE_ATTRIBUTE_NAME,
      nextColorMode,
    );

    window.dispatchEvent(
      new CustomEvent<ColorMode>(COLOR_MODE_EVENT, { detail: nextColorMode }),
    );
  }

  return { colorMode, isDarkColorMode, toggleColorMode };
}
