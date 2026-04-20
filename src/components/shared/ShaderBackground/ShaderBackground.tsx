import type { BoxProps } from "styled-system/jsx";
import { Box } from "styled-system/jsx";

export const ShaderBackground = (props: BoxProps) => (
  <Box
    minH="100vh"
    display="flex"
    flexDirection="column"
    bg="bg.default"
    bgGradient="shader"
    {...props}
  />
);
