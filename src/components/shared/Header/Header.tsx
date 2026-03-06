import { Box, Container, HStack } from "styled-system/jsx";
import { Logo } from "@/components/core/Logo/Logo";
import { ColorModeSwitcher } from "@/components/shared/ColorModeSwitcher/ColorModeSwitcher";
import { ThemeSwitcher } from "@/components/shared/ThemeSwitcher/ThemeSwitcher";
import type { ColorMode } from "@/types/theme/colorMode";
import type { Theme } from "@/types/theme/theme";

interface HeaderProps {
  colorMode?: ColorMode;
  theme?: Theme;
}

export const Header = ({ colorMode, theme }: HeaderProps) => {
  return (
    <Box as="header" w="full" shadow="md" py="2">
      <Container maxWidth="breakpoint-xl">
        <HStack justifyContent="space-between" alignItems="center">
          <Logo />
          <HStack gap="2">
            <ThemeSwitcher theme={theme} />
            <ColorModeSwitcher colorMode={colorMode} />
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};
