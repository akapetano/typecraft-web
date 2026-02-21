import { act, renderHook } from "@testing-library/react";
import type React from "react";
import { describe, expect, it, vi } from "vitest";
import { useTypingTest } from "@/components/features/TypingTest/TypingTest.hooks";

// Mock the sample texts for predictable testing
vi.mock("@/components/features/TypingTest/TypingTest.data", () => ({
  sampleTexts: {
    short: ["Test text"],
    medium: ["Test text for medium difficulty"],
    long: ["Test text for long difficulty with more characters"],
  },
}));

function makeChangeEvent(value: string): React.ChangeEvent<HTMLInputElement> {
  return {
    target: { value },
    currentTarget: { value },
  } as unknown as React.ChangeEvent<HTMLInputElement>;
}

describe("useTypingTest - Stats", () => {
  it("should calculate accuracy at 100% for no input", () => {
    const { result } = renderHook(() => useTypingTest());
    expect(result.current.accuracy).toBe(100);
  });

  it("should start timer on first input and update timeElapsed", () => {
    vi.useFakeTimers();
    vi.setSystemTime(0);

    const { result } = renderHook(() => useTypingTest());

    expect(result.current.timeElapsed).toBe(0);

    act(() => {
      // Type the first expected character to start the timer.
      result.current.handleInput(makeChangeEvent(result.current.text[0] ?? ""));
    });

    act(() => {
      vi.advanceTimersByTime(3100);
    });

    expect(result.current.timeElapsed).toBe(3);

    vi.useRealTimers();
  });

  it("should calculate WPM based on correct chars and elapsed time", () => {
    vi.useFakeTimers();
    vi.setSystemTime(0);

    const { result } = renderHook(() => useTypingTest());

    // Type 5 correct characters immediately.
    const firstFive = result.current.text.slice(0, 5);

    act(() => {
      result.current.handleInput(makeChangeEvent(firstFive));
    });

    // Advance to 30 seconds elapsed.
    act(() => {
      vi.advanceTimersByTime(30_000);
    });

    // correctChars = 5 => (5/5)/(30/60) = 1 / 0.5 = 2
    expect(result.current.wpm).toBe(2);

    vi.useRealTimers();
  });
});

describe("useTypingTest - Character state", () => {
  it("should mark current character correctly", () => {
    const { result } = renderHook(() => useTypingTest());
    expect(result.current.getCharacterState(0)).toBe("current");
  });

  it("should mark correct first-try characters", () => {
    const { result } = renderHook(() => useTypingTest());

    const first = result.current.text[0] ?? "";

    act(() => {
      result.current.handleInput(makeChangeEvent(first));
    });

    expect(result.current.getCharacterState(0)).toBe("correctFirstTry");
    expect(result.current.getCharacterState(1)).toBe("current");
  });

  it("should mark incorrect characters", () => {
    const { result } = renderHook(() => useTypingTest());

    const expected0 = result.current.text[0] ?? "";
    const wrong0 = expected0.toLowerCase() === "x" ? "y" : "x";

    act(() => {
      result.current.handleInput(makeChangeEvent(wrong0));
    });

    expect(result.current.getCharacterState(0)).toBe("incorrect");
  });

  it("should mark pending (untyped) characters", () => {
    const { result } = renderHook(() => useTypingTest());
    expect(result.current.getCharacterState(5)).toBe("pending");
  });

  it("should mark incorrectRemedied when user backspaces wrong char and types correct", () => {
    const { result } = renderHook(() => useTypingTest());

    act(() => {
      result.current.handleInput(makeChangeEvent("X"));
    });
    expect(result.current.getCharacterState(0)).toBe("incorrect");

    act(() => {
      result.current.handleInput(makeChangeEvent(""));
    });
    expect(result.current.getCharacterState(0)).toBe("current");

    act(() => {
      const expected0 = result.current.text[0] ?? "";
      result.current.handleInput(makeChangeEvent(expected0));
    });
    expect(result.current.getCharacterState(0)).toBe("incorrectRemedied");
  });

  it("should mark all remedied when user types several wrong, backspaces all in one go, then types correct", () => {
    const { result } = renderHook(() => useTypingTest());
    // Text is "Test text"; type "XXX" (3 incorrect)
    act(() => {
      result.current.handleInput(makeChangeEvent("XXX"));
    });
    expect(result.current.getCharacterState(0)).toBe("incorrect");
    expect(result.current.getCharacterState(1)).toBe("incorrect");
    expect(result.current.getCharacterState(2)).toBe("incorrect");

    act(() => {
      result.current.handleInput(makeChangeEvent(""));
    });

    act(() => {
      result.current.handleInput(makeChangeEvent("Tes"));
    });
    expect(result.current.getCharacterState(0)).toBe("incorrectRemedied");
    expect(result.current.getCharacterState(1)).toBe("incorrectRemedied");
    expect(result.current.getCharacterState(2)).toBe("incorrectRemedied");
  });

  it("should mark all remedied when user types word wrong, backspaces one key at a time, then types word correct", () => {
    const { result } = renderHook(() => useTypingTest());
    // Mock text is "Test text" (9 chars). Type first word "Test" wrong: "xxxx"
    act(() => {
      result.current.handleInput(makeChangeEvent("xxxx"));
    });
    expect(result.current.getCharacterState(0)).toBe("incorrect");
    expect(result.current.getCharacterState(1)).toBe("incorrect");
    expect(result.current.getCharacterState(2)).toBe("incorrect");
    expect(result.current.getCharacterState(3)).toBe("incorrect");

    // Backspace 4 times (one key per event, like real typing)
    act(() => {
      result.current.handleInput(makeChangeEvent("xxx"));
    });
    act(() => {
      result.current.handleInput(makeChangeEvent("xx"));
    });
    act(() => {
      result.current.handleInput(makeChangeEvent("x"));
    });
    act(() => {
      result.current.handleInput(makeChangeEvent(""));
    });

    // Type "Test" correctly (one char per event or all at once)
    act(() => {
      result.current.handleInput(makeChangeEvent("Test"));
    });
    expect(result.current.getCharacterState(0)).toBe("incorrectRemedied");
    expect(result.current.getCharacterState(1)).toBe("incorrectRemedied");
    expect(result.current.getCharacterState(2)).toBe("incorrectRemedied");
    expect(result.current.getCharacterState(3)).toBe("incorrectRemedied");
  });

  it("should not mark collateral backspaced correct chars as remedied if they were never wrong", () => {
    const { result } = renderHook(() => useTypingTest());

    // Build a pattern: first 2 correct, next 3 wrong, last correct.
    const expected = result.current.text;
    if (expected.length < 6) {
      // If mock text is unexpectedly short, just skip the meaningful part.
      expect(true).toBe(true);
      return;
    }

    const correct2 = expected.slice(0, 2);
    const wrong3 = expected
      .slice(2, 5)
      .split("")
      .map((ch) => (ch.toLowerCase() === "x" ? "y" : "x"))
      .join("");
    const lastCorrect = expected[5];

    act(() => {
      result.current.handleInput(
        makeChangeEvent(`${correct2}${wrong3}${lastCorrect}`),
      );
    });

    // Ensure the last char (index 5) is correctFirstTry initially.
    expect(result.current.getCharacterState(5)).toBe("correctFirstTry");

    // Backspace all the way back to index 2 (leave only the first 2 correct chars)
    act(() => {
      result.current.handleInput(makeChangeEvent(correct2));
    });

    // Retype the remaining characters correctly (use expected text).
    act(() => {
      result.current.handleInput(makeChangeEvent(expected.slice(0, 6)));
    });

    // Indices 2-4 were ever wrong => remedied.
    expect(result.current.getCharacterState(2)).toBe("incorrectRemedied");
    expect(result.current.getCharacterState(3)).toBe("incorrectRemedied");
    expect(result.current.getCharacterState(4)).toBe("incorrectRemedied");

    // Index 5 was never wrong => should remain correctFirstTry, even after collateral backspace.
    expect(result.current.getCharacterState(5)).toBe("correctFirstTry");
  });
});

describe("useTypingTest - Lifecycle", () => {
  it("should complete test when all text is typed", () => {
    const { result } = renderHook(() => useTypingTest());

    act(() => {
      // Type the entire text
      result.current.handleInput(makeChangeEvent(result.current.text));
    });

    expect(result.current.isComplete).toBe(true);
  });

  it("should reset test on initializeTest", () => {
    const { result } = renderHook(() => useTypingTest());

    act(() => {
      result.current.handleInput(makeChangeEvent("test"));
    });

    act(() => {
      result.current.initializeTest();
    });

    expect(result.current.typedText).toBe("");
    expect(result.current.isComplete).toBe(false);
  });
});
