import type { AudioSettings } from "@/types/audio/audioSettings";

/** localStorage key under which audio settings are persisted. */
export const AUDIO_SETTINGS_STORAGE_KEY = "audio-settings";

/** Same-document event used to sync audio settings across mounted hooks. */
export const AUDIO_SETTINGS_EVENT = "audio-settings-change";

export const AUDIO_VOLUME_MIN = 0;
export const AUDIO_VOLUME_MAX = 1;
export const AUDIO_VOLUME_STEP = 0.05;

/**
 * Defaults for a first-time user.
 *
 * Sound is **off** by default: it respects user intent and avoids browser
 * autoplay violations / unexpected noise before the user opts in (TYP-18). The
 * per-cue toggles default on so enabling the master switch gives full feedback
 * immediately.
 */
export const DEFAULT_AUDIO_SETTINGS: AudioSettings = {
  enabled: false,
  keypress: true,
  mistype: true,
  volume: 0.5,
};
