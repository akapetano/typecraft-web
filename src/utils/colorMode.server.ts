import { cookies } from "next/headers";
import { COLOR_MODE_MAP } from "@/constants/colorMode";
import type { ColorMode } from "@/types/theme/colorMode";

export async function getSavedColorMode(): Promise<ColorMode> {
  const cookieStore = await cookies();
  const savedColorMode = cookieStore.get("color-mode");

  if (
    savedColorMode?.value === COLOR_MODE_MAP.light ||
    savedColorMode?.value === COLOR_MODE_MAP.dark
  ) {
    return savedColorMode.value as ColorMode;
  }

  return COLOR_MODE_MAP.light;
}
