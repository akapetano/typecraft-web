import { Fragment } from "react";
import { Span } from "@/components/core/Span/Span";
import { Characters } from "@/components/features/TypingTest/components/Characters";
import { EmptyCharacter } from "@/components/features/TypingTest/components/EmptyCharacter";
import type { CharacterState } from "@/components/features/TypingTest/TypingTest.types";

interface WordsProps {
  words: { word: string; startIndex: number }[];
  getCharacterState: (index: number) => CharacterState;
}
export function Words({ words, getCharacterState }: WordsProps) {
  return words.map(({ word, startIndex }, index) => (
    <Fragment key={startIndex}>
      <Span
        display="inline-block"
        whiteSpace="pre"
        spaceX="0.5"
        marginEnd="0.5"
      >
        <Characters
          word={word}
          startIndex={startIndex}
          getCharacterState={getCharacterState}
        />
        {index < words.length - 1 && (
          <EmptyCharacter state={getCharacterState(startIndex + word.length)} />
        )}
      </Span>
    </Fragment>
  ));
}
