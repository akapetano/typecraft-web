"use client";

import { useEffect, useRef } from "react";
import type { AudioCue } from "@/types/audio/audioSettings";

/**
 * Base frequency (Hz) per cue. Keypress is a short, bright blip; mistype is a
 * lower, buzzier tone so the two are easy to tell apart by ear.
 */
const CUE_TONE: Record<
  Exclude<AudioCue, null>,
  { frequency: number; type: OscillatorType }
> = {
  keypress: { frequency: 660, type: "sine" },
  mistype: { frequency: 180, type: "sawtooth" },
};

type AudioContextCtor = typeof AudioContext;

function getAudioContextCtor(): AudioContextCtor | undefined {
  if (typeof window === "undefined") return undefined;
  return (
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: AudioContextCtor })
      .webkitAudioContext
  );
}

/**
 * Returns a `play(cue, volume)` function that synthesizes a short preview tone
 * for a given audio cue via the Web Audio API.
 *
 * This is an interim, asset-free preview so users can hear a cue while choosing
 * settings — before the real low-latency playback (TYP-17) and sound assets
 * (TYP-19) land. It only ever runs in response to an explicit user interaction
 * (highlighting a menu item), so it never violates browser autoplay policies.
 *
 * The `AudioContext` is created lazily on first use and reused, then closed on
 * unmount.
 */
export function useSoundPreview() {
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    return () => {
      void ctxRef.current?.close();
      ctxRef.current = null;
    };
  }, []);

  return function play(cue: AudioCue, volume: number) {
    if (!cue) return;

    const Ctor = getAudioContextCtor();
    if (!Ctor) return;

    // The preview is best-effort: never let a Web Audio failure (blocked
    // context, exhausted hardware contexts, etc.) surface to the caller.
    try {
      ctxRef.current ??= new Ctor();
      const ctx = ctxRef.current;
      // Highlighting is a user gesture, so a suspended context can resume here.
      if (ctx.state === "suspended") void ctx.resume();

      const { frequency, type } = CUE_TONE[cue];
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.value = frequency;

      // Keep the preview gentle and clamp volume defensively.
      const peak = Math.max(0, Math.min(1, volume)) * 0.15;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(peak, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.13);
    } catch {
      // Ignore — a missing preview tone must not break the UI.
    }
  };
}
