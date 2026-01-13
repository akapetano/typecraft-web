import { Box, Container } from "styled-system/jsx";
import { Logo } from "@/components/core/Logo/Logo";

export const Header = () => {
  return (
    <Box as="header" w="full" bg="bg.subtle" shadow="md" py="2">
      <Container maxWidth="breakpoint-xl">
        <Logo />
      </Container>
    </Box>
  );
};
