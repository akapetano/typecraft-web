import { Box, Container, HStack } from "styled-system/jsx";
import { Logo } from "@/components/core/Logo/Logo";
import { ColorModeButton } from "@/components/shared/ColorModeButton/ColorModeButton";
import type { ColorMode } from "@/types/theme/colorMode";

interface HeaderProps {
  colorMode?: ColorMode;
}

export const Header = ({ colorMode }: HeaderProps) => {
  return (
    <Box as="header" w="full" shadow="md" py="2">
      <Container maxWidth="breakpoint-xl">
        <HStack justifyContent="space-between" alignItems="center">
          <Logo />
          <ColorModeButton colorMode={colorMode} />
        </HStack>
      </Container>
    </Box>
  );
};
