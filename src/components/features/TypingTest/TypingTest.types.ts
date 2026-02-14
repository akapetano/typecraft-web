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
 * - **correct-first-try** – Typed correctly on first try. Counts as correct for accuracy.
 * - **incorrect** – Currently wrong (user has not fixed it). Counts as incorrect for accuracy.
 * - **incorrect-remedied** – Was wrong, then user fixed it (e.g. backspace + retype). Counts as correct for accuracy; visual same as correct.
 */
export type CharacterState =
  | "pending"
  | "current"
  | "correct-first-try"
  | "incorrect"
  | "incorrect-remedied";

/** State for a character that has been typed (stored in buffer). Used internally by the hook. */
export type TypedCharacterState =
  | "correct-first-try"
  | "incorrect"
  | "incorrect-remedied";
