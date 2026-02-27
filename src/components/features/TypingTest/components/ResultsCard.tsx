import { Flex, Grid } from "styled-system/jsx";
import { Button } from "@/components/core/Button/Button";
import { Card } from "@/components/core/Card/Card";
import { Heading } from "@/components/core/Heading/Heading";
import { Icon } from "@/components/core/Icon/Icon";
import { LucideIcon } from "@/components/core/LucideIcon/LucideIcon";
import { Span } from "@/components/core/Span/Span";

export interface ResultsCardProps {
  wpm: number;
  accuracy: number;
  totalChars: number;
  onRestart: () => void;
}

export function ResultsCard({
  wpm,
  accuracy,
  totalChars,
  onRestart,
}: ResultsCardProps) {
  return (
    <Card.Root
      variant="elevated"
      _hover={{ borderColor: "accent.primary.solid.bg.hover" }}
      transition="colors"
    >
      <Card.Body p="8" textAlign="center">
        <Heading as="h3" fontSize="2xl" color="fg.default" mb="6">
          Test Complete!
        </Heading>
        <Grid columns={3} gap="6" mb="8">
          <Flex
            flexDirection="column"
            alignItems="center"
            p="4"
            bg="secondary/50"
            rounded="lg"
          >
            <Span
              fontSize="4xl"
              fontWeight="bold"
              color="accent.primary.plain.fg"
            >
              {wpm}
            </Span>
            <Span fontSize="sm" color="fg.muted">
              Words per Minute
            </Span>
          </Flex>
          <Flex
            flexDirection="column"
            alignItems="center"
            p="4"
            bg="secondary/50"
            rounded="lg"
          >
            <Span fontSize="4xl" fontWeight="bold" color="success">
              {accuracy}%
            </Span>
            <Span fontSize="sm" color="fg.muted">
              Accuracy
            </Span>
          </Flex>
          <Flex
            flexDirection="column"
            alignItems="center"
            p="4"
            bg="secondary/50"
            rounded="lg"
          >
            <Span fontSize="4xl" fontWeight="bold" color="fg.default">
              {totalChars}
            </Span>
            <Span fontSize="sm" color="fg.muted">
              Characters
            </Span>
          </Flex>
        </Grid>
        <Button onClick={onRestart} size="lg" gap="2">
          <Icon h="4" w="4">
            <LucideIcon name="RotateCcw" />
          </Icon>
          Try Again
        </Button>
      </Card.Body>
    </Card.Root>
  );
}
