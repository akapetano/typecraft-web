"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { sampleTexts } from "@/components/features/TypingTest/TypingTest.data";
import type {
  DerivedCharacterState,
  Difficulty,
  TypedCharacterState,
  TypedCharEntry,
} from "@/components/features/TypingTest/TypingTest.types";

export function useTypingTimer() {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Start the timer exactly once when typing begins.
  const start = useCallback(() => {
    setStartTime((prev) => prev ?? Date.now());
  }, []);

  const stop = useCallback(() => {
    setStartTime(null);
  }, []);

  // Reset timer (e.g. when re-initializing a test).
  const reset = useCallback(() => {
    setStartTime(null);
    setTimeElapsed(0);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (startTime !== null) {
      interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [startTime]);

  return { timeElapsed, start, stop, reset };
}

export function useTypingStats(
  typedEntries: TypedCharEntry[],
  cursor: number,
  timeElapsed: number,
) {
  const correctChars = useMemo(() => {
    return typedEntries
      .slice(0, cursor)
      .filter(
        (e) => e.state === "correctFirstTry" || e.state === "incorrectRemedied",
      ).length;
  }, [typedEntries, cursor]);

  const accuracy = useMemo(() => {
    return cursor > 0 ? Math.round((correctChars / cursor) * 100) : 100;
  }, [cursor, correctChars]);

  const wpm = useMemo(() => {
    return timeElapsed > 0
      ? Math.round(correctChars / 5 / (timeElapsed / 60))
      : 0;
  }, [timeElapsed, correctChars]);

  return { correctChars, accuracy, wpm };
}

/**
 * Selector for elements that represent *intentional* interaction. A click
 * inside any of these must NOT steal focus back to the typing input
 * (e.g. Restart, a future Pause / Settings control, or an open dialog).
 *
 * To opt a future control out of focus recovery, add `data-focus-exempt` to it.
 */
const FOCUS_EXEMPT_SELECTOR =
  'button, a[href], input, textarea, select, [role="button"], [role="menuitem"], [role="dialog"], [data-focus-exempt]';

export interface UseFocusLockArgs {
  inputRef: React.RefObject<HTMLInputElement | null>;
  /** Whether focus recovery is active (typing test mounted and not complete). */
  enabled: boolean;
  /** Register a character that arrived while the input was not focused. */
  insertChar: (char: string) => void;
}

/**
 * Keeps focus on the hidden typing input while a test is active, without
 * trapping the user or fighting screen readers (WCAG 2.1.2):
 *
 * - A click on a non-interactive area recovers focus; clicks on interactive /
 *   `data-focus-exempt` elements are treated as intentional. We listen on
 *   `click` (not `pointerdown`) so the browser's native focus shift to the
 *   clicked element has already settled — refocusing on pointerdown loses that
 *   race — and so we never `preventDefault` a pointer event (which would block
 *   touch scrolling on mobile).
 * - A printable keypress while the input is unfocused recovers focus AND
 *   registers the character (it is not lost).
 * - `Escape` releases focus so the user can Tab to controls.
 * - There is deliberately no `blur` handler — focus is never force-restored on
 *   blur, so the screen-reader virtual cursor and Tab-away keep working.
 *
 * Window/tab focus loss is intentionally out of scope (handled separately).
 */
export function useFocusLock({
  inputRef,
  enabled,
  insertChar,
}: UseFocusLockArgs) {
  // Hold latest values in refs so the document listeners can be attached once
  // and never re-bound as `enabled` / `insertChar` change between keystrokes.
  const enabledRef = useRef(enabled);
  const insertCharRef = useRef(insertChar);

  useEffect(() => {
    enabledRef.current = enabled;
    insertCharRef.current = insertChar;
  }, [enabled, insertChar]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!enabledRef.current) return;
      const target = e.target as Element | null;
      // Intentional interaction with a control / dialog → leave focus alone.
      if (target?.closest(FOCUS_EXEMPT_SELECTOR)) return;
      inputRef.current?.focus({ preventScroll: true });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!enabledRef.current) return;

      if (e.key === "Escape") {
        // Release focus so the user can Tab to controls (no keyboard trap).
        inputRef.current?.blur();
        return;
      }

      // Only recover on a single printable character with no modifier, and only
      // when the input is not already focused (otherwise the native input
      // handles it and `onChange` fires — we must not double-register).
      const isPrintable =
        e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
      if (!isPrintable || e.isComposing) return;
      if (document.activeElement === inputRef.current) return;

      e.preventDefault();
      inputRef.current?.focus({ preventScroll: true });
      insertCharRef.current(e.key);
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputRef]);
}

export interface UseTypingEngineArgs {
  difficulty: Difficulty;
  onStart: () => void;
}

export function useTypingEngine({ difficulty, onStart }: UseTypingEngineArgs) {
  const [text, setText] = useState("");
  const [typedText, setTypedText] = useState("");
  const [typedEntries, setTypedEntries] = useState<TypedCharEntry[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Cursor is derived from typedText length (input value is the source of truth for position).
  const cursor = typedText.length;

  const getRandomText = useCallback((diff: Difficulty) => {
    const texts = sampleTexts[diff];
    return texts[Math.floor(Math.random() * texts.length)];
  }, []);

  const deriveTypedState = useCallback(
    (
      expected: string,
      actual: string,
      entry: TypedCharEntry,
    ): TypedCharacterState => {
      if (actual !== expected) return "incorrect";

      // actual === expected
      // A position is only considered "remedied" if it was ever typed incorrectly at least once.
      // If the user backspaces over a previously-correct character as collateral while fixing earlier mistakes,
      // retyping it correctly should still count as `correctFirstTry`.
      if (entry.history.everWrong) return "incorrectRemedied";
      return "correctFirstTry";
    },
    [],
  );

  const createFreshEntriesFromValue = useCallback(
    (value: string, expectedText: string) => {
      return Array.from(
        { length: expectedText.length },
        (_, i): TypedCharEntry => {
          const actual = i < value.length ? value[i] : null;
          if (actual == null) {
            return {
              value: null,
              state: null,
              history: { attempts: 0, everWrong: false },
            };
          }
          const expected = expectedText[i];
          const everWrong = actual !== expected;
          const state: TypedCharacterState =
            actual === expected ? "correctFirstTry" : "incorrect";
          return {
            value: actual,
            state,
            history: { attempts: 1, everWrong },
          };
        },
      );
    },
    [],
  );

  const initializeTest = useCallback(() => {
    const nextText = getRandomText(difficulty);
    setText(nextText);

    setTypedText("");
    setTypedEntries(
      Array.from({ length: nextText.length }, () => ({
        value: null,
        state: null,
        history: { attempts: 0, everWrong: false },
      })),
    );

    setIsStarted(false);
    setIsComplete(false);

    inputRef.current?.focus({ preventScroll: true });
  }, [difficulty, getRandomText]);

  useEffect(() => {
    initializeTest();
  }, [initializeTest]);

  const applyValue = useCallback(
    (raw: string) => {
      const value = raw.slice(0, text.length);

      if (!isStarted && value.length > 0) {
        setIsStarted(true);
        onStart();
      }

      if (value.length > typedText.length) {
        // Typed one or more characters (append)
        setTypedEntries((prev) => {
          const next = prev.slice();
          for (let i = typedText.length; i < value.length; i++) {
            const expected = text[i];
            const actual = value[i];
            const entry = next[i] ?? {
              value: null,
              state: null,
              history: { attempts: 0, everWrong: false },
            };

            // New attempt if the position was empty (including after backspace)
            if (entry.value == null) entry.history.attempts += 1;

            entry.value = actual;
            if (actual !== expected) entry.history.everWrong = true;
            entry.state = deriveTypedState(expected, actual, entry);

            next[i] = entry;
          }
          return next;
        });

        setTypedText(value);
      } else if (value.length < typedText.length) {
        // Backspace: clear last character(s) but keep history so retypes become remedied
        setTypedEntries((prev) => {
          const next = prev.slice();
          for (let i = value.length; i < typedText.length; i++) {
            const entry = next[i];
            if (!entry) continue;
            entry.value = null;
            entry.state = null;
            next[i] = entry;
          }
          return next;
        });

        setTypedText(value);
      } else if (value !== typedText) {
        // Replace/paste: reset to a fresh model derived from the current value (no remedied history)
        setTypedEntries(createFreshEntriesFromValue(value, text));
        setTypedText(value);
      }

      if (value.length === text.length) {
        setIsComplete(true);
      }
    },
    [
      createFreshEntriesFromValue,
      deriveTypedState,
      isStarted,
      onStart,
      text,
      typedText.length,
      typedText,
    ],
  );

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      applyValue(e.target.value);
    },
    [applyValue],
  );

  // Append a single character through the same pipeline as native input.
  // Used by the focus lock to register a keystroke that arrived while the
  // hidden input was not focused, so the keypress is not lost.
  const insertChar = useCallback(
    (char: string) => {
      applyValue(typedText + char);
    },
    [applyValue, typedText],
  );

  const handleContainerClick = useCallback(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  useFocusLock({
    inputRef,
    enabled: Boolean(text) && !isComplete,
    insertChar,
  });

  const getCharacterState = useCallback(
    (index: number): DerivedCharacterState => {
      if (index === cursor) return "current";
      if (index < cursor) {
        const entry = typedEntries[index];
        return (entry?.state ?? "pending") as DerivedCharacterState;
      }
      return "pending";
    },
    [cursor, typedEntries],
  );

  return {
    // State
    text,
    typedText,
    typedEntries,
    cursor,
    isStarted,
    isComplete,
    inputRef,

    // Handlers
    handleInput,
    handleContainerClick,
    initializeTest,
    getCharacterState,
  };
}

export function useTypingTest() {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");

  const timer = useTypingTimer();

  const engine = useTypingEngine({
    difficulty,
    onStart: () => {
      timer.start();
    },
  });

  useEffect(() => {
    if (engine.isComplete) {
      timer.stop();
    }
  }, [engine.isComplete, timer]);

  const { accuracy, wpm } = useTypingStats(
    engine.typedEntries,
    engine.cursor,
    timer.timeElapsed,
  );

  const handleDifficultyChange = useCallback((diff: Difficulty) => {
    setDifficulty(diff);
  }, []);

  const initializeTest = useCallback(() => {
    timer.reset();
    engine.initializeTest();
  }, [engine, timer]);

  return {
    // State
    difficulty,
    text: engine.text,
    typedText: engine.typedText,
    isComplete: engine.isComplete,
    inputRef: engine.inputRef,

    // Stats
    wpm,
    accuracy,
    timeElapsed: timer.timeElapsed,
    totalChars: engine.text.length,

    // Handlers
    handleInput: engine.handleInput,
    handleContainerClick: engine.handleContainerClick,
    handleDifficultyChange,
    initializeTest,
    getCharacterState: engine.getCharacterState,
  };
}
