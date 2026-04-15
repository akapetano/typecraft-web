import { token } from "styled-system/tokens";
import {
  Card,
  type RootProps as CardRootProps,
} from "@/components/core/Card/Card";
import { interactiveTransition } from "@/theme/motion/transitions";

export function TypingArea({ children, ...props }: CardRootProps) {
  return (
    <Card.Root
      cursor="text"
      variant="elevated"
      borderWidth="2"
      _hover={{ borderColor: "accent.primary.solid.bg.hover" }}
      _focus={{
        outline: "none",
      }}
      _focusVisible={{
        outline: "none",
        boxShadow: `0 0 8px 2px ${token("colors.accent.primary.solid.bg.hover")}`,
      }}
      tabIndex={0}
      backgroundColor="bg.default"
      css={{ ...interactiveTransition }}
      {...props}
    >
      {children}
    </Card.Root>
  );
}
