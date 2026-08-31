import { describe, expect, it } from "vitest";
import type { AudioSettings } from "@/types/audio/audioSettings";
import { resolveAudioCue } from "@/utils/audioFeedback";

const enabled: AudioSettings = {
  enabled: true,
  keypress: true,
  mistype: true,
  volume: 0.5,
};

describe("resolveAudioCue", () => {
  it("stays silent for every event when sound is disabled", () => {
    const off: AudioSettings = { ...enabled, enabled: false };
    expect(resolveAudioCue(off, "correct")).toBeNull();
    expect(resolveAudioCue(off, "incorrect")).toBeNull();
    expect(resolveAudioCue(off, "backspace")).toBeNull();
  });

  it("plays the keypress cue on a correct character", () => {
    expect(resolveAudioCue(enabled, "correct")).toBe("keypress");
  });

  it("plays the mistype cue on an incorrect character", () => {
    expect(resolveAudioCue(enabled, "incorrect")).toBe("mistype");
  });

  it("never plays on backspace", () => {
    expect(resolveAudioCue(enabled, "backspace")).toBeNull();
  });

  it("respects the keypress toggle independently", () => {
    const settings: AudioSettings = { ...enabled, keypress: false };
    expect(resolveAudioCue(settings, "correct")).toBeNull();
    expect(resolveAudioCue(settings, "incorrect")).toBe("mistype");
  });

  it("respects the mistype toggle independently", () => {
    const settings: AudioSettings = { ...enabled, mistype: false };
    expect(resolveAudioCue(settings, "incorrect")).toBeNull();
    expect(resolveAudioCue(settings, "correct")).toBe("keypress");
  });
});
