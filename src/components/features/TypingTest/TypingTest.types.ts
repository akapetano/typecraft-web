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
 * Per-character state for the typing test.
 * See CHAR_STATE_MODEL.md for full state machine and transitions.
 *
 * - **pending** – Not typed yet. Visual only (muted).
 * - **current** – Next character to type (cursor position). Visual only; semantically pending.
 * - **correctFirstTry** – Typed correctly on first try. Counts as correct for accuracy.
 * - **incorrect** – Currently wrong (user has not fixed it). Counts as incorrect for accuracy.
 * - **incorrectRemedied** – Was wrong, then user fixed it (e.g. backspace + retype). Counts as correct for accuracy; visual same as correct.
 */
export type CharacterState =
  | "pending"
  | "current"
  | "correctFirstTry"
  | "incorrect"
  | "incorrectRemedied";

/** State for a character that has been typed (stored in buffer). Used internally by the hook. */
export type TypedCharacterState =
  | "correctFirstTry"
  | "incorrect"
  | "incorrectRemedied";
