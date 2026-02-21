# Per-character state model (TypingTest)

This document defines the per-character states and transitions used by the
typing test. It is the source of truth for behavior (stats, visuals, replay,
strict mode, analytics, etc.).

This reflects the **current implementation**, where a character is considered
**remedied** only if it was **ever typed incorrectly at least once**.

---

## States

| State                 | Description                                                       | Affects accuracy?              | Visual (current UI)            |
| --------------------- | ----------------------------------------------------------------- | ------------------------------ | ------------------------------ |
| **pending**           | Not typed yet.                                                    | No (not in denominator).       | Muted / dimmed.                |
| **current**           | Next character to type (cursor position).                         | No (same as pending).          | Highlighted + underline.       |
| **correctFirstTry**   | User typed the right character and that position was never wrong. | Yes – counts as **correct**.   | Correct (success).             |
| **incorrect**         | User typed the wrong character and has not fixed it.              | Yes – counts as **incorrect**. | Incorrect (error).             |
| **incorrectRemedied** | This position was wrong at least once and is now correct.         | Yes – counts as **correct**.   | **Remedied** (distinct color). |

Notes:

- `pending` and `current` are **visual-only** states (derived at render time).
- `incorrectRemedied` intentionally has its **own visual styling** (not the same
  as `correctFirstTry`).

---

## Accuracy model

```
accuracy = (correctFirstTry + incorrectRemedied) / totalTyped
```

- `correctFirstTry` → correct
- `incorrectRemedied` → correct
- `incorrect` → incorrect
- `pending` / `current` → not included

Remedying an error improves accuracy.

---

## Internal rule (important)

A position is **remedied** if:

```
history.everWrong === true
```

Meaning:

- If a position was **never wrong**, it will always remain `correctFirstTry`
  even if the user backspaces over it and retypes it.
- Backspacing alone does **not** demote a correct character.
- We do **not** use number of attempts to determine remedied status.

This prevents collateral backspacing from incorrectly downgrading characters.

---

## Transitions

### 1) Typing a wrong character

At position `i` (current):

- User types a character that does **not** match expected.
- Character at `i` becomes **incorrect**.
- `history.everWrong = true`
- Cursor moves to `i+1`.

```
current → incorrect
```

---

### 2) Typing the correct character (never wrong)

At position `i` (current):

- User types the matching character.
- `history.everWrong === false`
- Character becomes **correctFirstTry**.
- Cursor moves to `i+1`.

```
current → correctFirstTry
```

---

### 3) Backspacing

User deletes the last typed character (position `i`).

- That character’s `value` and persisted `state` are cleared.
- **History is preserved** (including `everWrong`).
- Cursor moves back to position `i`.

Important:

- If `everWrong === true`, then typing the correct character later will produce
  **incorrectRemedied**.
- If `everWrong === false`, then typing the correct character later will produce
  **correctFirstTry**.

```
typed → backspace → current
```

---

### 4) Retyping a character after backspacing

After backspacing to position `i`:

- Type wrong → **incorrect** (everWrong remains true)
- Type correct and `everWrong === true` → **incorrectRemedied**
- Type correct and `everWrong === false` → **correctFirstTry**

---

## Collateral backspacing example

Example: `Sphinx`

1. `Sp` → correct
2. `hin` → wrong
3. `x` → correct (never wrong)
4. User backspaces to `p` (collateral deletes `x`)
5. User retypes forward correctly

Result:

- Positions 2–4 (which were wrong at least once) → `incorrectRemedied`
- Final `x` (never wrong) → remains `correctFirstTry`

This behavior is intentional.

---

## Design principles

- Accuracy reflects whether a position was ever wrong.
- Backspacing alone does not penalize a character.
- Persist minimal semantic data; derive UI states.
- Visual-only states (`pending`, `current`) never affect metrics.

Future features (strict mode, first-try-only accuracy, replay, analytics,
heatmaps, etc.) should build on this model.
