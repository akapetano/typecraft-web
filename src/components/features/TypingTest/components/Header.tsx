import { Box, Flex } from "styled-system/jsx";
import { Heading } from "@/components/core/Heading/Heading";
import { Icon } from "@/components/core/Icon/Icon";
import { LucideIcon } from "@/components/core/LucideIcon/LucideIcon";
import { Text } from "@/components/core/Text/Text";

export function Header() {
  return (
    <Box textAlign="center" spaceY="2">
      <Flex alignItems="center" justifyContent="center" gap="3">
        <Icon size="xl" color="accent.primary.10">
          <LucideIcon name="Keyboard" />
        </Icon>
        <Heading as="h2" color="fg.default">
          Typing Test
        </Heading>
      </Flex>
      <Text color="fg.muted">Test your typing speed and accuracy</Text>
    </Box>
  );
}
