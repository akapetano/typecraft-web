"use client";

import { CompleteState } from "@/components/features/TypingTest/components/CompleteState";
import { Controls } from "@/components/features/TypingTest/components/Controls";
import { DifficultySelector } from "@/components/features/TypingTest/components/DifficultySelector";
import { Header } from "@/components/features/TypingTest/components/Header";
import { HiddenInput } from "@/components/features/TypingTest/components/HiddenInput";
import { Root } from "@/components/features/TypingTest/components/Root";
import { StatsBar } from "@/components/features/TypingTest/components/StatsBar";
import { TypingArea } from "@/components/features/TypingTest/components/TypingArea";
import { TypingText } from "@/components/features/TypingTest/components/TypingText";
import { useTypingTest } from "@/components/features/TypingTest/TypingTest.hooks";

export function TypingTest() {
  const {
    difficulty,
    text,
    typedText,
    isComplete,
    inputRef,
    wpm,
    accuracy,
    timeElapsed,
    totalChars,
    handleInput,
    handleContainerClick,
    handleDifficultyChange,
    initializeTest,
    getCharacterState,
  } = useTypingTest();

  if (isComplete) {
    return (
      <CompleteState
        wpm={wpm}
        accuracy={accuracy}
        totalChars={totalChars}
        onRestart={initializeTest}
      />
    );
  }

  return (
    <Root>
      <Header />
      <DifficultySelector
        difficulty={difficulty}
        handleDifficultyChange={handleDifficultyChange}
      />
      <TypingArea
        onClick={handleContainerClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleContainerClick();
        }}
      >
        <TypingText text={text} getCharacterState={getCharacterState} />
        <HiddenInput ref={inputRef} value={typedText} onChange={handleInput} />
      </TypingArea>
      <StatsBar wpm={wpm} accuracy={accuracy} timeElapsed={timeElapsed} />
      <Controls initializeTest={initializeTest} />
    </Root>
  );
}
