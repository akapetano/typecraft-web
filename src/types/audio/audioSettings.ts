/**
 * User-configurable audio feedback preferences for the typing experience.
 *
 * This is the persisted settings model consumed by the playback layer (TYP-17).
 * `enabled` is the master switch; the per-cue toggles and `volume` only take
 * effect while `enabled` is true.
 */
export interface AudioSettings {
  /** Master switch. When false, no typing sound ever plays. Defaults to off. */
  enabled: boolean;
  /** Play a sound on a valid keypress (correct character input). */
  keypress: boolean;
  /** Play a sound when the typed character is incorrect. */
  mistype: boolean;
  /** Playback volume in the inclusive range 0..1. */
  volume: number;
}

/** A concrete sound to play, or `null` when a typing event should stay silent. */
export type AudioCue = "keypress" | "mistype" | null;

/**
 * Typing events that can produce audio feedback. `backspace` is modelled so the
 * rules can explicitly stay silent for it (see `resolveAudioCue`).
 */
export type TypingSoundEvent = "correct" | "incorrect" | "backspace";
