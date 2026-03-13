"use client";

import { IconButton } from "@/components/core/IconButton/IconButton";
import { Menu } from "@/components/core/Menu/Menu";
import { ThemeMarble } from "@/components/shared/ThemeSwitcher/components/ThemeMarble";
import { useTheme } from "@/hooks/useTheme";
import { THEME_OPTIONS } from "@/theme/themes/meta";
import type { Theme } from "@/types/theme/theme";

interface ThemeSwitcherProps {
  theme?: Theme;
}

export const ThemeSwitcher = ({ theme: initialTheme }: ThemeSwitcherProps) => {
  const { theme, handleThemeChange } = useTheme(initialTheme);

  return (
    <Menu.Root closeOnSelect>
      <Menu.Trigger asChild>
        <IconButton aria-label="Theme switcher" rounded="full" variant="plain">
          {theme && <ThemeMarble theme={theme} />}
        </IconButton>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.RadioItemGroup
            value={theme}
            onValueChange={(e) => handleThemeChange(e.value as Theme)}
          >
            <Menu.ItemGroupLabel>Theme</Menu.ItemGroupLabel>
            {THEME_OPTIONS.map((themeOption) => (
              <Menu.RadioItem
                key={themeOption.value}
                value={themeOption.value}
                justifyContent="space-between"
                bgColor={
                  themeOption.value === theme
                    ? "accent.primary.subtle.bg"
                    : "bg.default"
                }
                _hover={{ bgColor: "accent.primary.subtle.bg.hover" }}
              >
                {themeOption.label}
                <ThemeMarble theme={themeOption.value} />
              </Menu.RadioItem>
            ))}
          </Menu.RadioItemGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};
