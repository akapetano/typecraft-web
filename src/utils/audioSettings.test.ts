import { afterEach, describe, expect, it } from "vitest";
import {
  AUDIO_SETTINGS_STORAGE_KEY,
  DEFAULT_AUDIO_SETTINGS,
} from "@/constants/audioSettings";
import {
  normalizeAudioSettings,
  readAudioSettings,
  writeAudioSettings,
} from "@/utils/audioSettings";

afterEach(() => {
  window.localStorage.clear();
});

describe("normalizeAudioSettings", () => {
  it("fills missing fields from defaults", () => {
    expect(normalizeAudioSettings({})).toEqual(DEFAULT_AUDIO_SETTINGS);
    expect(normalizeAudioSettings(null)).toEqual(DEFAULT_AUDIO_SETTINGS);
    expect(normalizeAudioSettings(undefined)).toEqual(DEFAULT_AUDIO_SETTINGS);
  });

  it("clamps volume into the 0..1 range", () => {
    expect(normalizeAudioSettings({ volume: 5 }).volume).toBe(1);
    expect(normalizeAudioSettings({ volume: -2 }).volume).toBe(0);
    expect(normalizeAudioSettings({ volume: 0.3 }).volume).toBe(0.3);
  });

  it("falls back to default volume for non-finite values", () => {
    expect(normalizeAudioSettings({ volume: NaN }).volume).toBe(
      DEFAULT_AUDIO_SETTINGS.volume,
    );
    expect(
      normalizeAudioSettings({ volume: "loud" as unknown as number }).volume,
    ).toBe(DEFAULT_AUDIO_SETTINGS.volume);
  });

  it("coerces non-boolean toggles to their defaults", () => {
    const result = normalizeAudioSettings({
      enabled: "yes" as unknown as boolean,
      keypress: 0 as unknown as boolean,
    });
    expect(result.enabled).toBe(DEFAULT_AUDIO_SETTINGS.enabled);
    expect(result.keypress).toBe(DEFAULT_AUDIO_SETTINGS.keypress);
  });

  it("preserves valid values", () => {
    const settings = {
      enabled: true,
      keypress: false,
      mistype: true,
      volume: 0.75,
    };
    expect(normalizeAudioSettings(settings)).toEqual(settings);
  });
});

describe("readAudioSettings / writeAudioSettings", () => {
  it("returns defaults when nothing is stored", () => {
    expect(readAudioSettings()).toEqual(DEFAULT_AUDIO_SETTINGS);
  });

  it("round-trips persisted settings", () => {
    const settings = {
      enabled: true,
      keypress: false,
      mistype: true,
      volume: 0.2,
    };
    writeAudioSettings(settings);
    expect(readAudioSettings()).toEqual(settings);
  });

  it("returns defaults for malformed stored JSON", () => {
    window.localStorage.setItem(AUDIO_SETTINGS_STORAGE_KEY, "{not json");
    expect(readAudioSettings()).toEqual(DEFAULT_AUDIO_SETTINGS);
  });

  it("normalizes partial/legacy stored data", () => {
    window.localStorage.setItem(
      AUDIO_SETTINGS_STORAGE_KEY,
      JSON.stringify({ enabled: true }),
    );
    expect(readAudioSettings()).toEqual({
      ...DEFAULT_AUDIO_SETTINGS,
      enabled: true,
    });
  });
});
