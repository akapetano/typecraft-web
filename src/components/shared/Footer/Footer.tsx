import { Box, Container, Flex } from "styled-system/jsx";
import { Text } from "@/components/core/Text/Text";

export const Footer = () => {
  return (
    <Box
      as="footer"
      w="full"
      bg="bg.subtle"
      borderTop="1px solid"
      borderColor="border"
      py="6"
      mt="auto"
    >
      <Container maxWidth="breakpoint-xl">
        <Flex justify="space-between" align="center" gap={4}>
          <Text fontSize="sm" color="fg.muted">
            © {new Date().getFullYear()} Typecraft
          </Text>

          <Flex gap="4">
            <Text fontSize="sm" color="fg.muted">
              Privacy Policy
            </Text>
            <Text fontSize="sm" color="fg.muted">
              Terms of Service
            </Text>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
