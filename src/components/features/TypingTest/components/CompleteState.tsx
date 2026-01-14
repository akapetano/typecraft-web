import { Box, Flex } from "styled-system/jsx";
import { ResultsCard } from "./ResultsCard";

interface CompleteStateProps {
  wpm: number;
  accuracy: number;
  totalChars: number;
  onRestart: () => void;
}

export function CompleteState({
  wpm,
  accuracy,
  totalChars,
  onRestart,
}: CompleteStateProps) {
  return (
    <Flex bg="bg.default" justifyContent="center" alignItems="center" p="4">
      <Box w="full" maxW="2xl">
        <ResultsCard
          wpm={wpm}
          accuracy={accuracy}
          totalChars={totalChars}
          onRestart={onRestart}
        />
      </Box>
    </Flex>
  );
}
