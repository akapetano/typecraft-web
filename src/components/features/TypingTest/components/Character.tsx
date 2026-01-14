import { Span } from "@/components/core/Span/Span";
import { characterStyles } from "@/components/features/TypingTest/components/Character.styles";
import type { CharacterState } from "@/components/features/TypingTest/TypingTest.types";

export interface CharacterProps {
  char: string;
  state: CharacterState;
}

export function Character({ char, state }: CharacterProps) {
  const isPunctuation = /[.,!?;:'"\-—()[\]{}]/.test(char);
  return (
    <Span
      className={characterStyles({ state, punctuation: isPunctuation })}
      lineHeight="relaxed"
    >
      {char === " " ? "\u00A0" : char}
    </Span>
  );
}
