"use client";

import { Portal } from "@ark-ui/react/portal";
import { Box, Divider } from "styled-system/jsx";
import { IconButton } from "@/components/core/IconButton/IconButton";
import { Popover } from "@/components/core/Popover/Popover";
import { Text } from "@/components/core/Text/Text";
import { useAudioSettings } from "@/hooks/useAudioSettings";
import { useSoundPreview } from "@/hooks/useSoundPreview";
import type { AudioCue } from "@/types/audio/audioSettings";
import { SettingToggle } from "./components/SettingToggle";
import { VolumeIcon } from "./components/VolumeIcon";
import { VolumeSlider } from "./components/VolumeSlider";

export const AudioSettingsMenu = () => {
  const { settings, toggleEnabled, toggleKeypress, toggleMistype, setVolume } =
    useAudioSettings();
  const playPreview = useSoundPreview();

  // Preview a cue as its row gains focus (keyboard) or is hovered (pointer),
  // gated on the master toggle so it stays silent while sound is off.
  const previewCue = (cue: Exclude<AudioCue, null>) => {
    if (settings.enabled) playPreview(cue, settings.volume);
  };

  return (
    <Popover.Root positioning={{ placement: "bottom-end" }}>
      <Popover.Trigger asChild>
        <IconButton aria-label="Audio settings" rounded="full" variant="subtle">
          <VolumeIcon enabled={settings.enabled} volume={settings.volume} />
        </IconButton>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content w="64" aria-label="Audio settings">
            <Box display="flex" flexDirection="column" gap="0.5" p="1">
              <Text
                px="2"
                py="1"
                fontSize="md"
                fontWeight="medium"
                color="fg.subtle"
              >
                Sound
              </Text>
              <Divider />

              <SettingToggle
                label="Sound"
                checked={settings.enabled}
                onCheckedChange={toggleEnabled}
              />
              <SettingToggle
                label="Keypress"
                checked={settings.keypress}
                onCheckedChange={toggleKeypress}
                dimmed={!settings.enabled}
                onFocus={() => previewCue("keypress")}
                onPointerEnter={() => previewCue("keypress")}
              />
              <SettingToggle
                label="Mistype"
                checked={settings.mistype}
                onCheckedChange={toggleMistype}
                dimmed={!settings.enabled}
                onFocus={() => previewCue("mistype")}
                onPointerEnter={() => previewCue("mistype")}
              />

              <Divider my="1" />

              <VolumeSlider
                settings={settings}
                onValueChange={({ value }) => setVolume(value[0])}
              />
            </Box>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};
