import { Character } from "@/components/features/TypingTest/components/Character";
import type { CharacterState } from "@/components/features/TypingTest/TypingTest.types";

interface CharactersProps {
  word: string;
  startIndex: number;
  getCharacterState: (index: number) => CharacterState;
}

export function Characters({
  word,
  startIndex,
  getCharacterState,
}: CharactersProps) {
  return word.split("").map((char, charIndex) => {
    const index = startIndex + charIndex;
    return (
      <Character key={index} char={char} state={getCharacterState(index)} />
    );
  });
}
