import { cookies } from "next/headers";
import { THEME_COOKIE_NAME } from "@/constants/theme";
import type { Theme } from "@/types/theme/theme";
import { THEMES } from "@/types/theme/theme";
import { isTheme } from "@/utils/theme";

export async function getSavedTheme(): Promise<Theme> {
  const cookieStore = await cookies();
  const savedTheme = cookieStore.get(THEME_COOKIE_NAME);

  if (savedTheme?.value && isTheme(savedTheme.value)) {
    return savedTheme.value;
  }

  return THEMES[0];
}
