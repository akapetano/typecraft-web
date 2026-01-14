import { Span } from "@/components/core/Span/Span";
import { Characters } from "@/components/features/TypingTest/components/Characters";
import type { CharacterState } from "@/components/features/TypingTest/TypingTest.types";

interface WordsProps {
  words: { word: string; startIndex: number }[];
  getCharacterState: (index: number) => CharacterState;
}
export function Words({ words, getCharacterState }: WordsProps) {
  return words.map(({ word, startIndex }) => (
    <Span
      key={startIndex}
      display="inline-block"
      whiteSpace="pre"
      marginEnd="2"
    >
      <Characters
        word={word}
        startIndex={startIndex}
        getCharacterState={getCharacterState}
      />
    </Span>
  ));
}
