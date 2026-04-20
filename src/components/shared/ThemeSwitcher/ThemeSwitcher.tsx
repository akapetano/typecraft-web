"use client";

import type {
  MenuHighlightChangeDetails,
  MenuOpenChangeDetails,
  MenuValueChangeDetails,
} from "@ark-ui/react";
import { useRef } from "react";
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
  const committedTheme = useRef(theme);

  const onOpenChange = ({ open }: MenuOpenChangeDetails) => {
    if (!open) handleThemeChange(committedTheme.current);
  };

  const onHighlightChange = ({
    highlightedValue,
  }: MenuHighlightChangeDetails) => {
    handleThemeChange((highlightedValue ?? committedTheme.current) as Theme);
  };

  const onMouseLeave = () => handleThemeChange(committedTheme.current);

  const onValueChange = ({ value }: MenuValueChangeDetails) => {
    committedTheme.current = value as Theme;
    handleThemeChange(value as Theme);
  };

  return (
    <Menu.Root
      aria-label="Theme switcher"
      closeOnSelect
      defaultHighlightedValue={theme}
      onOpenChange={onOpenChange}
      onHighlightChange={onHighlightChange}
    >
      <Menu.Trigger asChild>
        <IconButton aria-label="Theme switcher" rounded="full" variant="plain">
          {theme && <ThemeMarble theme={theme} />}
        </IconButton>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content onMouseLeave={onMouseLeave}>
          <Menu.RadioItemGroup value={theme} onValueChange={onValueChange}>
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
