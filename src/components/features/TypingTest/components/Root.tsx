import { Box, Flex, type FlexProps } from "styled-system/jsx";

interface RootProps extends FlexProps {
  children: React.ReactNode;
}

export function Root({ children, ...props }: RootProps) {
  return (
    <Flex
      bg="bg.default"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p="4"
      {...props}
    >
      <Box w="full" maxW="3xl" spaceY="8">
        {children}
      </Box>
    </Flex>
  );
}
