"use client";

import { useEffect, useState } from "react";
import {
  AUDIO_SETTINGS_EVENT,
  DEFAULT_AUDIO_SETTINGS,
} from "@/constants/audioSettings";
import type { AudioSettings } from "@/types/audio/audioSettings";
import {
  normalizeAudioSettings,
  readAudioSettings,
  writeAudioSettings,
} from "@/utils/audioSettings";

/**
 * Read/update the persisted audio feedback settings.
 *
 * Persistence is localStorage; changes are broadcast on {@link AUDIO_SETTINGS_EVENT}
 * so every mounted instance (e.g. header menu + future in-test indicator) stays
 * in sync within the document — mirroring `useTheme` / `useColorMode`.
 *
 * State starts from {@link DEFAULT_AUDIO_SETTINGS} and hydrates from storage
 * after mount: localStorage is unavailable during SSR, so deferring the read
 * keeps the server markup and the first client render identical (no hydration
 * mismatch on the trigger icon).
 */
export function useAudioSettings() {
  const [settings, setSettings] = useState<AudioSettings>(
    DEFAULT_AUDIO_SETTINGS,
  );

  // Hydrate from storage once mounted.
  useEffect(() => {
    setSettings(readAudioSettings());
  }, []);

  // Stay in sync with changes made by other mounted instances.
  useEffect(() => {
    const handler = (e: Event) => {
      const next = (e as CustomEvent<AudioSettings>).detail;
      setSettings(next ?? readAudioSettings());
    };

    window.addEventListener(AUDIO_SETTINGS_EVENT, handler as EventListener);
    return () =>
      window.removeEventListener(
        AUDIO_SETTINGS_EVENT,
        handler as EventListener,
      );
  }, []);

  function update(partial: Partial<AudioSettings>) {
    const next = normalizeAudioSettings({ ...settings, ...partial });
    setSettings(next);
    writeAudioSettings(next);
    window.dispatchEvent(
      new CustomEvent<AudioSettings>(AUDIO_SETTINGS_EVENT, { detail: next }),
    );
  }

  return {
    settings,
    update,
    toggleEnabled: () => update({ enabled: !settings.enabled }),
    toggleKeypress: () => update({ keypress: !settings.keypress }),
    toggleMistype: () => update({ mistype: !settings.mistype }),
    setVolume: (volume: number) => update({ volume }),
  };
}
