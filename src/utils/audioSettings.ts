import {
  AUDIO_SETTINGS_STORAGE_KEY,
  AUDIO_VOLUME_MAX,
  AUDIO_VOLUME_MIN,
  DEFAULT_AUDIO_SETTINGS,
} from "@/constants/audioSettings";
import type { AudioSettings } from "@/types/audio/audioSettings";

function clampVolume(value: unknown): number {
  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(num)) return DEFAULT_AUDIO_SETTINGS.volume;
  return Math.min(AUDIO_VOLUME_MAX, Math.max(AUDIO_VOLUME_MIN, num));
}

function coerceBoolean(value: unknown, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}

/**
 * Coerce arbitrary (possibly partial or corrupt) input into a valid
 * `AudioSettings`, filling any missing/invalid field from the defaults and
 * clamping volume into range. Guarantees the rest of the app only ever handles
 * a well-formed settings object.
 */
export function normalizeAudioSettings(value: unknown): AudioSettings {
  const raw = (value ?? {}) as Partial<AudioSettings>;
  return {
    enabled: coerceBoolean(raw.enabled, DEFAULT_AUDIO_SETTINGS.enabled),
    keypress: coerceBoolean(raw.keypress, DEFAULT_AUDIO_SETTINGS.keypress),
    mistype: coerceBoolean(raw.mistype, DEFAULT_AUDIO_SETTINGS.mistype),
    volume: clampVolume(raw.volume),
  };
}

/**
 * Read persisted audio settings from localStorage. SSR-safe (returns defaults
 * when `window` is unavailable) and resilient to malformed/legacy values.
 */
export function readAudioSettings(): AudioSettings {
  if (typeof window === "undefined") return DEFAULT_AUDIO_SETTINGS;

  try {
    const raw = window.localStorage.getItem(AUDIO_SETTINGS_STORAGE_KEY);
    if (!raw) return DEFAULT_AUDIO_SETTINGS;
    return normalizeAudioSettings(JSON.parse(raw));
  } catch {
    return DEFAULT_AUDIO_SETTINGS;
  }
}

/** Persist audio settings to localStorage. No-op during SSR or on write failure. */
export function writeAudioSettings(settings: AudioSettings): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      AUDIO_SETTINGS_STORAGE_KEY,
      JSON.stringify(settings),
    );
  } catch {
    // Ignore quota / privacy-mode write failures — settings simply won't persist.
  }
}
