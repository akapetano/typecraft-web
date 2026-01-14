import { useCallback, useEffect, useRef, useState } from "react";
import { sampleTexts } from "@/components/features/TypingTest/TypingTest.data";
import type {
  CharacterState,
  Difficulty,
} from "@/components/features/TypingTest/TypingTest.types";

export function useTypingTest() {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [text, setText] = useState("");
  const [typedText, setTypedText] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const getRandomText = useCallback((diff: Difficulty) => {
    const texts = sampleTexts[diff];
    return texts[Math.floor(Math.random() * texts.length)];
  }, []);

  const initializeTest = useCallback(() => {
    setText(getRandomText(difficulty));
    setTypedText("");
    setIsStarted(false);
    setIsComplete(false);
    setStartTime(null);
    setTimeElapsed(0);
    inputRef.current?.focus();
  }, [difficulty, getRandomText]);

  useEffect(() => {
    initializeTest();
  }, [initializeTest]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStarted && !isComplete && startTime) {
      interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isStarted, isComplete, startTime]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!isStarted && value.length > 0) {
      setIsStarted(true);
      setStartTime(Date.now());
    }

    if (value.length <= text.length) {
      setTypedText(value);

      if (value.length === text.length) {
        setIsComplete(true);
      }
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handleDifficultyChange = (diff: Difficulty) => {
    setDifficulty(diff);
  };

  const correctChars = typedText
    .split("")
    .filter((char, i) => char === text[i]).length;
  const accuracy =
    typedText.length > 0
      ? Math.round((correctChars / typedText.length) * 100)
      : 100;
  const wpm =
    timeElapsed > 0 ? Math.round(correctChars / 5 / (timeElapsed / 60)) : 0;

  const getCharacterState = (index: number): CharacterState => {
    if (index === typedText.length) return "current";
    if (index < typedText.length) {
      return typedText[index] === text[index] ? "correct" : "incorrect";
    }
    return "untyped";
  };

  return {
    // State
    difficulty,
    text,
    typedText,
    isComplete,
    inputRef,

    // Stats
    wpm,
    accuracy,
    timeElapsed,
    totalChars: text.length,

    // Handlers
    handleInput,
    handleContainerClick,
    handleDifficultyChange,
    initializeTest,
    getCharacterState,
  };
}
