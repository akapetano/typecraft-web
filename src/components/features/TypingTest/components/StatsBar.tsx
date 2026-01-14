import { Box, Flex } from "styled-system/jsx";
import { Span } from "@/components/core/Span/Span";

export interface StatsBarProps {
  wpm: number;
  accuracy: number;
  timeElapsed: number;
}

export function StatsBar({ wpm, accuracy, timeElapsed }: StatsBarProps) {
  return (
    <Flex justifyContent="center" alignItems="center" gap="8" py="4">
      <Flex flexDirection="column" alignItems="center">
        <Span fontSize="3xl" fontWeight="bold" color="fg.default">
          {wpm}
        </Span>
        <Span fontSize="sm" color="fg.muted">
          WPM
        </Span>
      </Flex>
      <Box h="10" w="px" bg="border" />
      <Flex flexDirection="column" alignItems="center">
        <Span fontSize="3xl" fontWeight="bold" color="fg.default">
          {accuracy}%
        </Span>
        <Span fontSize="sm" color="fg.muted">
          Accuracy
        </Span>
      </Flex>
      <Box h="10" w="px" bg="border" />
      <Flex flexDirection="column" alignItems="center">
        <Span fontSize="3xl" fontWeight="bold" color="fg.default">
          {timeElapsed}s
        </Span>
        <Span fontSize="sm" color="fg.muted">
          Time
        </Span>
      </Flex>
    </Flex>
  );
}
