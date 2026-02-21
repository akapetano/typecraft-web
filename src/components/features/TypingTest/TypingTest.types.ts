export type Mode = "general" | "developer";
export type DevLang =
  | "javascript"
  | "typescript"
  | "react"
  | "html"
  | "css"
  | "go";

export type Difficulty = "short" | "medium" | "long";

/**
 * Derived (UI) per-character state for the typing test.
 *
 * Notes:
 * - `pending` and `current` are **visual-only** (derived at render time).
 * - The hook/store should persist only `TypedCharEntry` (which includes `TypedCharacterState` + `CharacterHistory`).
 *
 * See CHAR_STATE_MODEL.md for the full state machine and transitions.
 *
 * - **pending** – Not typed yet. Visual only (muted).
 * - **current** – Next character to type (cursor position). Visual only; semantically `pending`.
 * - **correctFirstTry** – Typed correctly on first try. Counts as correct for accuracy.
 * - **incorrect** – Currently wrong (user has not fixed it yet). Counts as incorrect for accuracy.
 * - **incorrectRemedied** – Not first try OR was wrong at least once and is now correct (e.g. backspace + retype).
 *   Counts as correct for accuracy; visual may match correct.
 */
export type DerivedCharacterState =
  | "pending"
  | "current"
  | "correctFirstTry"
  | "incorrect"
  | "incorrectRemedied";

/**
 * Semantic states that can be persisted in the typed buffer.
 * Visual-only states like `pending`/`current` should not be stored.
 */
export type TypedCharacterState =
  | "correctFirstTry"
  | "incorrect"
  | "incorrectRemedied";

/**
 * Per-character history used to derive `correctFirstTry` vs `incorrectRemedied`.
 *
 * - `attempts` increments when the user types at an index after it was empty (including after backspace).
 * - `everWrong` becomes true the first time the user types an incorrect character at that index.
 */
export type CharacterHistory = {
  attempts: number;
  everWrong: boolean;
};

/** A tiny persisted entry for one character index. */
export type TypedCharEntry = {
  value: string | null;
  state: TypedCharacterState | null;
  history: CharacterHistory;
};
