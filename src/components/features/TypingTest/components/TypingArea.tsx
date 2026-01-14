import {
  Card,
  type RootProps as CardRootProps,
} from "@/components/core/Card/Card";

export function TypingArea({ children, ...props }: CardRootProps) {
  return (
    <Card.Root
      cursor="text"
      variant="elevated"
      borderWidth="2"
      _hover={{ borderColor: "brand.solid.bg.hover" }}
      _focus={{
        outline: "none",
      }}
      _focusVisible={{
        outline: "none",
        boxShadow: "0 0 8px 2px var(--colors-brand-solid-bg-hover)",
      }}
      transition="colors"
      tabIndex={0}
      {...props}
    >
      {children}
    </Card.Root>
  );
}
