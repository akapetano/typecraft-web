import {
  COLOR_MODE_ATTRIBUTE_NAME,
  COLOR_MODE_COOKIE_NAME,
  COLOR_MODE_MAP,
} from "@/constants/colorMode";
import type { ColorMode } from "@/types/theme/colorMode";
import { getCookie } from "@/utils/cookies";

export function getSystemColorMode(): ColorMode {
  if (typeof window === "undefined") return COLOR_MODE_MAP.light;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? COLOR_MODE_MAP.dark
    : COLOR_MODE_MAP.light;
}

export function readColorMode(): ColorMode {
  if (typeof document !== "undefined") {
    const attr = document.documentElement.getAttribute(
      COLOR_MODE_ATTRIBUTE_NAME,
    );
    if (attr === COLOR_MODE_MAP.light || attr === COLOR_MODE_MAP.dark)
      return attr;
  }

  const cookie = getCookie(COLOR_MODE_COOKIE_NAME);
  if (cookie === COLOR_MODE_MAP.light || cookie === COLOR_MODE_MAP.dark)
    return cookie;

  return getSystemColorMode();
}
