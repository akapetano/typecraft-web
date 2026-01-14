import { Flex, type FlexProps } from "styled-system/jsx";
import { Words } from "@/components/features/TypingTest/components/Words";
import type { CharacterState } from "@/components/features/TypingTest/TypingTest.types";
import { splitTextToWords } from "@/components/features/TypingTest/TypingTest.utils";

interface TypingTextProps extends FlexProps {
  text: string;
  getCharacterState: (index: number) => CharacterState;
}

export function TypingText({
  text,
  getCharacterState,
  ...props
}: TypingTextProps) {
  const words = splitTextToWords(text);

  return (
    <Flex flexWrap="wrap" lineHeight="relaxed" p="5" {...props}>
      <Words words={words} getCharacterState={getCharacterState} />
    </Flex>
  );
}
