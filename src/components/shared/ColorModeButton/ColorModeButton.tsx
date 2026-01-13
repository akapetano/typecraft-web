"use client";

import { Icon } from "@/components/core/Icon/Icon";
import { IconButton } from "@/components/core/IconButton/IconButton";
import { LucideIcon } from "@/components/core/LucideIcon/LucideIcon";
import { useColorMode } from "@/hooks/useColorMode";
import type { ColorMode } from "@/types/theme/colorMode";

const iconNameMap = {
  light: "Sun",
  dark: "Moon",
} as const;

interface ColorModeButtonProps {
  colorMode?: ColorMode;
}

export const ColorModeButton = ({
  colorMode: initialColorMode,
}: ColorModeButtonProps) => {
  const { colorMode, toggleColorMode } = useColorMode(initialColorMode);
  const colorModeIcon = <LucideIcon name={iconNameMap[colorMode]} />;

  return (
    <IconButton
      aria-label="Color mode toggler"
      onClick={toggleColorMode}
      rounded="full"
      variant="subtle"
    >
      <Icon>{colorModeIcon}</Icon>
    </IconButton>
  );
};
