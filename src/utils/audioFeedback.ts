import type {
  AudioCue,
  AudioSettings,
  TypingSoundEvent,
} from "@/types/audio/audioSettings";

/**
 * Audio feedback rules (TYP-16). Given the current settings and a typing event,
 * decide which sound — if any — should play. This is the single source of truth
 * for *when* sounds trigger; the playback layer (TYP-17) only renders the cue.
 *
 * Rules:
 * - Master `enabled` off → always silent (no autoplay, honours user intent).
 * - `correct` (valid keypress) → keypress cue, only if `keypress` is on.
 * - `incorrect` (wrong character) → mistype cue, only if `mistype` is on.
 * - `backspace` → always silent (corrections should not be noisy).
 */
export function resolveAudioCue(
  settings: AudioSettings,
  event: TypingSoundEvent,
): AudioCue {
  if (!settings.enabled) return null;

  switch (event) {
    case "correct":
      return settings.keypress ? "keypress" : null;
    case "incorrect":
      return settings.mistype ? "mistype" : null;
    default:
      return null;
  }
}
