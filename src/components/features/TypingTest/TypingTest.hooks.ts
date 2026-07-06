"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { sampleTexts } from "@/components/features/TypingTest/TypingTest.data";
import type {
  DerivedCharacterState,
  Difficulty,
  TypedCharacterState,
  TypedCharEntry,
} from "@/components/features/TypingTest/TypingTest.types";

/**
 * Wall-clock typing timer that can be paused and resumed without losing elapsed
 * time. Elapsed time is the sum of already-banked run segments (`accumulatedMs`)
 * plus the currently-running segment (`Date.now() - segmentStart`). Pausing
 * banks the running segment; resuming opens a new one. This keeps a paused test
 * (e.g. while the tab is hidden) from unfairly inflating the time behind WPM.
 * See TYP-15.
 */
export function useTypingTimer() {
  // Elapsed ms banked from previously-completed run segments.
  const accumulatedMsRef = useRef(0);
  // Timestamp when the current run segment began, or null when idle/paused.
  const segmentStartRef = useRef<number | null>(null);
  // Drives the ticking interval; state (not a ref) so the effect re-subscribes.
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // The pause/resume state lives in refs and is only ever mutated from event
  // handlers and the interval — never from render or a setState updater. This
  // keeps the transitions StrictMode-safe: mutating a ref inside a setState
  // updater would be double-applied in dev and inflate the elapsed time.

  // Open a run segment if one is not already open. Idempotent, so it serves both
  // the initial start (first keystroke) and resuming after a pause.
  const openSegment = () => {
    if (segmentStartRef.current === null) {
      segmentStartRef.current = Date.now();
      setIsRunning(true);
    }
  };

  // Bank the running segment (if any) into the accumulator and stop counting.
  const bankSegment = () => {
    if (segmentStartRef.current !== null) {
      accumulatedMsRef.current += Date.now() - segmentStartRef.current;
      segmentStartRef.current = null;
      setIsRunning(false);
      setTimeElapsed(Math.floor(accumulatedMsRef.current / 1000));
    }
  };

  const reset = () => {
    accumulatedMsRef.current = 0;
    segmentStartRef.current = null;
    setIsRunning(false);
    setTimeElapsed(0);
  };

  useEffect(() => {
    if (!isRunning) return;

    const tick = () => {
      const running =
        segmentStartRef.current !== null
          ? Date.now() - segmentStartRef.current
          : 0;
      setTimeElapsed(Math.floor((accumulatedMsRef.current + running) / 1000));
    };

    tick(); // reflect resume immediately, don't wait for the first tick
    const interval = setInterval(tick, 100);

    return () => clearInterval(interval);
  }, [isRunning]);

  return {
    timeElapsed,
    // start and resume share mechanics (open a segment); named apart for clarity.
    start: openSegment,
    resume: openSegment,
    // pause and stop both bank the running segment, preserving elapsed time.
    pause: bankSegment,
    stop: bankSegment,
    reset,
  };
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

export interface UsePauseOnFocusLossArgs {
  /** Whether a test is in progress (started, not complete, not already paused). */
  enabled: boolean;
  /** Called when the tab is hidden or the window loses focus. */
  onPause: () => void;
}

/**
 * Auto-pauses an in-progress test when the browser tab/window loses focus so
 * the wall-clock timer does not keep penalizing the user while they are away
 * (TYP-15). Resuming is intentionally a user action (handled by the engine), so
 * there is deliberately no auto-resume on window `focus` / visibility `visible`.
 *
 * - `visibilitychange` → hidden covers tab switches and minimizing/backgrounding
 *   (the only reliable signal on mobile).
 * - `blur` covers switching to another window or application while the tab stays
 *   visible (e.g. Alt/Cmd-Tab).
 */
export function usePauseOnFocusLoss({
  enabled,
  onPause,
}: UsePauseOnFocusLossArgs) {
  // Hold latest values in refs so the listeners are bound once and never
  // re-attached as `enabled` / `onPause` change between renders.
  const enabledRef = useRef(enabled);
  const onPauseRef = useRef(onPause);

  useEffect(() => {
    enabledRef.current = enabled;
    onPauseRef.current = onPause;
  }, [enabled, onPause]);

  useEffect(() => {
    const pauseIfEnabled = () => {
      if (enabledRef.current) onPauseRef.current();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") pauseIfEnabled();
    };

    window.addEventListener("blur", pauseIfEnabled);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("blur", pauseIfEnabled);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
}

export interface UseTypingEngineArgs {
  difficulty: Difficulty;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
}

export function useTypingEngine({
  difficulty,
  onStart,
  onPause,
  onResume,
}: UseTypingEngineArgs) {
  const [text, setText] = useState("");
  const [typedText, setTypedText] = useState("");
  const [typedEntries, setTypedEntries] = useState<TypedCharEntry[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  // Mirror of `isPaused` so the pause/resume handlers stay idempotent without
  // depending on a possibly-stale closure over state.
  const isPausedRef = useRef(false);

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
    setIsPaused(false);
    isPausedRef.current = false;

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

  // Freeze the test when the tab/window loses focus; the timer is paused via
  // `onPause` and typing is blocked (input blurred + focus lock disabled below).
  const pause = () => {
    if (isPausedRef.current) return;
    isPausedRef.current = true;
    setIsPaused(true);
    inputRef.current?.blur();
    onPause();
  };

  // Resuming is an explicit user action (overlay click or any key press).
  const resume = () => {
    if (!isPausedRef.current) return;
    isPausedRef.current = false;
    setIsPaused(false);
    onResume();
    inputRef.current?.focus({ preventScroll: true });
  };

  // Latest-ref for `resume` so the paused keydown listener reads the current
  // handler without taking it as an effect dependency (which would re-bind the
  // listener every render). Mirrors the ref pattern in `useFocusLock`.
  const resumeRef = useRef(resume);
  resumeRef.current = resume;

  usePauseOnFocusLoss({
    enabled: isStarted && !isComplete && !isPaused,
    onPause: pause,
  });

  // While paused, any key press (other than a lone modifier, so returning via
  // Alt/Cmd-Tab doesn't auto-resume) resumes the test. The key is swallowed so
  // it does not also register as a typed character.
  useEffect(() => {
    if (!isPaused) return;

    const handleResumeKey = (e: KeyboardEvent) => {
      if (
        e.key === "Shift" ||
        e.key === "Control" ||
        e.key === "Alt" ||
        e.key === "Meta"
      ) {
        return;
      }
      e.preventDefault();
      resumeRef.current();
    };

    document.addEventListener("keydown", handleResumeKey);
    return () => document.removeEventListener("keydown", handleResumeKey);
  }, [isPaused]);

  useFocusLock({
    inputRef,
    enabled: Boolean(text) && !isComplete && !isPaused,
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
    isPaused,
    inputRef,

    // Handlers
    handleInput,
    handleContainerClick,
    initializeTest,
    getCharacterState,
    resume,
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
    onPause: () => {
      timer.pause();
    },
    onResume: () => {
      timer.resume();
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
    isPaused: engine.isPaused,
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
    resume: engine.resume,
  };
}
