"use client";

import { CompleteState } from "@/components/features/TypingTest/components/CompleteState";
import { Controls } from "@/components/features/TypingTest/components/Controls";
import { DifficultySelector } from "@/components/features/TypingTest/components/DifficultySelector";
import { Header } from "@/components/features/TypingTest/components/Header";
import { HiddenInput } from "@/components/features/TypingTest/components/HiddenInput";
import { PausedOverlay } from "@/components/features/TypingTest/components/PausedOverlay";
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
    isPaused,
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
    resume,
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
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleContainerClick();
        }}
        onClick={handleContainerClick}
      >
        <TypingText text={text} getCharacterState={getCharacterState} />
        <HiddenInput ref={inputRef} value={typedText} onChange={handleInput} />
        {isPaused && <PausedOverlay onResume={resume} />}
      </TypingArea>
      <StatsBar wpm={wpm} accuracy={accuracy} timeElapsed={timeElapsed} />
      <Controls initializeTest={initializeTest} />
    </Root>
  );
}
