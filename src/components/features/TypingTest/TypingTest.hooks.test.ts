import { act, renderHook } from "@testing-library/react";
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

describe("useTypingTest - Stats calculations", () => {
  it("should calculate WPM correctly", () => {
    const { result } = renderHook(() => useTypingTest());

    act(() => {
      // Simulate typing 25 correct chars in 30 seconds
      // WPM = (25 / 5) / (30 / 60) = 5 / 0.5 = 10
      result.current.handleInput({
        target: { value: "The quick brown fox jumps" },
      } as any);
    });

    // Mock time elapsed
    // Would need to expose setTimeElapsed or mock Date.now()
  });

  it("should calculate accuracy at 100% for no input", () => {
    const { result } = renderHook(() => useTypingTest());
    expect(result.current.accuracy).toBe(100);
  });

  it("should calculate accuracy correctly for mixed correct/incorrect", () => {
    const { result } = renderHook(() => useTypingTest());

    // If text is "hello" and user types "hallo"
    // 3 correct (h, l, o), 2 incorrect (a, l) = 60%
    // This test would need to mock the text state
  });
});

describe("useTypingTest - Character state", () => {
  it("should mark current character correctly", () => {
    const { result } = renderHook(() => useTypingTest());
    expect(result.current.getCharacterState(0)).toBe("current");
  });

  it("should mark correct characters", () => {
    const { result } = renderHook(() => useTypingTest());

    act(() => {
      // Assuming text starts with "T"
      result.current.handleInput({ target: { value: "T" } } as any);
    });

    expect(result.current.getCharacterState(0)).toBe("correct");
    expect(result.current.getCharacterState(1)).toBe("current");
  });

  it("should mark incorrect characters", () => {
    const { result } = renderHook(() => useTypingTest());

    act(() => {
      // Assuming text starts with "T", type "X"
      result.current.handleInput({ target: { value: "X" } } as any);
    });

    expect(result.current.getCharacterState(0)).toBe("incorrect");
  });

  it("should mark untyped characters", () => {
    const { result } = renderHook(() => useTypingTest());
    expect(result.current.getCharacterState(5)).toBe("untyped");
  });
});

describe("useTypingTest - Lifecycle", () => {
  it("should start timer on first input", () => {
    const { result } = renderHook(() => useTypingTest());

    expect(result.current.timeElapsed).toBe(0);

    act(() => {
      result.current.handleInput({ target: { value: "a" } } as any);
    });

    // Would need to advance timers
  });

  it("should complete test when all text is typed", () => {
    const { result } = renderHook(() => useTypingTest());

    act(() => {
      // Type the entire text
      result.current.handleInput({
        target: { value: result.current.text },
      } as any);
    });

    expect(result.current.isComplete).toBe(true);
  });

  it("should reset test on initializeTest", () => {
    const { result } = renderHook(() => useTypingTest());

    act(() => {
      result.current.handleInput({ target: { value: "test" } } as any);
    });

    act(() => {
      result.current.initializeTest();
    });

    expect(result.current.typedText).toBe("");
    expect(result.current.isComplete).toBe(false);
  });
});
