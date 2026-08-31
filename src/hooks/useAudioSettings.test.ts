import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { DEFAULT_AUDIO_SETTINGS } from "@/constants/audioSettings";
import { useAudioSettings } from "@/hooks/useAudioSettings";
import { readAudioSettings } from "@/utils/audioSettings";

afterEach(() => {
  window.localStorage.clear();
});

describe("useAudioSettings", () => {
  it("hydrates from defaults (sound off) when nothing is stored", () => {
    const { result } = renderHook(() => useAudioSettings());
    expect(result.current.settings).toEqual(DEFAULT_AUDIO_SETTINGS);
    expect(result.current.settings.enabled).toBe(false);
  });

  it("toggles the master switch and persists it", () => {
    const { result } = renderHook(() => useAudioSettings());

    act(() => result.current.toggleEnabled());

    expect(result.current.settings.enabled).toBe(true);
    expect(readAudioSettings().enabled).toBe(true);

    act(() => result.current.toggleEnabled());

    expect(result.current.settings.enabled).toBe(false);
    expect(readAudioSettings().enabled).toBe(false);
  });

  it("updates and clamps volume through setVolume", () => {
    const { result } = renderHook(() => useAudioSettings());

    act(() => result.current.setVolume(0.8));
    expect(result.current.settings.volume).toBe(0.8);

    act(() => result.current.setVolume(2));
    expect(result.current.settings.volume).toBe(1);
    expect(readAudioSettings().volume).toBe(1);
  });

  it("toggles per-cue settings independently", () => {
    const { result } = renderHook(() => useAudioSettings());

    act(() => result.current.toggleKeypress());
    expect(result.current.settings.keypress).toBe(false);
    expect(result.current.settings.mistype).toBe(true);
  });

  it("keeps separate mounted instances in sync", () => {
    const a = renderHook(() => useAudioSettings());
    const b = renderHook(() => useAudioSettings());

    act(() => a.result.current.toggleEnabled());

    expect(a.result.current.settings.enabled).toBe(true);
    expect(b.result.current.settings.enabled).toBe(true);
  });
});
