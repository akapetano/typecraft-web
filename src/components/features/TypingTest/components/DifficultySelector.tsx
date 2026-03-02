import { Flex } from "styled-system/jsx";
import { Button } from "@/components/core/Button/Button";
import { DIFFICULTIES } from "@/components/features/TypingTest/TypingTest.constants";
import type { Difficulty } from "@/components/features/TypingTest/TypingTest.types";

interface DifficultySelectorProps {
  difficulty: Difficulty;
  handleDifficultyChange: (difficulty: Difficulty) => void;
}

export function DifficultySelector({
  difficulty,
  handleDifficultyChange,
}: DifficultySelectorProps) {
  return (
    <Flex justifyContent="center" alignItems="center" gap="2">
      {DIFFICULTIES.map((diff) => (
        <Button
          key={diff}
          variant={difficulty === diff ? "solid" : "outline"}
          tone="secondary"
          size="sm"
          className="capitalize"
          onClick={() => handleDifficultyChange(diff)}
        >
          {diff}
        </Button>
      ))}
    </Flex>
  );
}
