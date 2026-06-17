import { Input, type InputProps } from "@/components/core/Input/Input";

export function HiddenInput(props: InputProps) {
  return (
    <Input
      type="text"
      aria-label="Typing input"
      autoFocus
      tabIndex={-1}
      autoComplete="off"
      autoCapitalize="off"
      autoCorrect="off"
      spellCheck={false}
      position="absolute"
      opacity="0"
      pointerEvents="none"
      {...props}
    />
  );
}
