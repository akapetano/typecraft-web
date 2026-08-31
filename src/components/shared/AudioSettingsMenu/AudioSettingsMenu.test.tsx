import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AudioSettingsMenu } from "@/components/shared/AudioSettingsMenu/AudioSettingsMenu";
import { readAudioSettings } from "@/utils/audioSettings";

const oscStart = vi.fn();

class FakeOscillator {
  type = "sine";
  frequency = { value: 0 };
  connect = (node: unknown) => node;
  start = oscStart;
  stop = vi.fn();
}

class FakeGain {
  gain = {
    setValueAtTime: vi.fn(),
    linearRampToValueAtTime: vi.fn(),
    exponentialRampToValueAtTime: vi.fn(),
  };
  connect = (node: unknown) => node;
}

class FakeAudioContext {
  currentTime = 0;
  state = "running";
  destination = {};
  createOscillator = () => new FakeOscillator();
  createGain = () => new FakeGain();
  resume = vi.fn();
  close = vi.fn();
}

afterEach(() => {
  window.localStorage.clear();
  oscStart.mockClear();
  vi.unstubAllGlobals();
});

const openMenu = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole("button", { name: "Audio settings" }));
  return screen.findByRole("checkbox", { name: "Sound" });
};

describe("AudioSettingsMenu", () => {
  it("renders an accessible trigger", () => {
    render(<AudioSettingsMenu />);
    expect(
      screen.getByRole("button", { name: "Audio settings" }),
    ).toBeInTheDocument();
  });

  it("exposes the sound toggles and volume control when opened", async () => {
    const user = userEvent.setup();
    render(<AudioSettingsMenu />);

    await openMenu(user);

    expect(screen.getByRole("checkbox", { name: "Sound" })).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: "Keypress" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: "Mistype" }),
    ).toBeInTheDocument();

    // Volume is disabled while sound is off (the default).
    expect(
      screen.getByRole("slider", { name: "Sound volume" }),
    ).toHaveAttribute("data-disabled");
  });

  it("keeps the cue toggles reachable (not disabled) while sound is off", async () => {
    const user = userEvent.setup();
    render(<AudioSettingsMenu />);

    await openMenu(user);

    // Cue rows stay in the tab order so keyboard users can reach them; they are
    // dimmed, not disabled.
    expect(screen.getByRole("checkbox", { name: "Keypress" })).toBeEnabled();
    expect(screen.getByRole("checkbox", { name: "Mistype" })).toBeEnabled();
  });

  it("stays silent when a cue is hovered while sound is off", async () => {
    vi.stubGlobal("AudioContext", FakeAudioContext);
    const user = userEvent.setup();
    render(<AudioSettingsMenu />);

    await openMenu(user);
    await user.hover(screen.getByRole("checkbox", { name: "Keypress" }));

    expect(oscStart).not.toHaveBeenCalled();
  });

  it("enables sound and persists the choice", async () => {
    const user = userEvent.setup();
    render(<AudioSettingsMenu />);

    const soundToggle = await openMenu(user);
    await user.click(soundToggle);

    expect(readAudioSettings().enabled).toBe(true);
    expect(
      screen.getByRole("slider", { name: "Sound volume" }),
    ).not.toHaveAttribute("data-disabled");
  });

  it("previews a cue when it is hovered (sound enabled)", async () => {
    vi.stubGlobal("AudioContext", FakeAudioContext);
    const user = userEvent.setup();
    render(<AudioSettingsMenu />);

    const soundToggle = await openMenu(user);
    await user.click(soundToggle);
    oscStart.mockClear();

    await user.hover(screen.getByRole("checkbox", { name: "Keypress" }));

    expect(oscStart).toHaveBeenCalled();
  });
});
