import type { SliderValueChangeDetails } from "@ark-ui/react";
import { Box, Flex } from "styled-system/jsx";
import { Slider } from "@/components/core/Slider/Slider";
import { Text } from "@/components/core/Text/Text";
import { VolumeIcon } from "@/components/shared/AudioSettingsMenu/components/VolumeIcon";
import {
  AUDIO_VOLUME_MAX,
  AUDIO_VOLUME_MIN,
  AUDIO_VOLUME_STEP,
} from "@/constants/audioSettings";
import type { AudioSettings } from "@/types/audio/audioSettings";

type VolumeSliderProps = {
  settings: AudioSettings;
  onValueChange?: ((details: SliderValueChangeDetails) => void) | undefined;
};

export const VolumeSlider = ({
  settings,
  onValueChange,
}: VolumeSliderProps) => (
  <Box px="3" py="2">
    <Flex align="center" gap="2">
      <VolumeIcon
        enabled={settings.enabled}
        volume={settings.volume}
        opacity={settings.enabled ? 1 : 0.5}
        color="accent.secondary.solid.bg"
      />

      <Slider.Root
        flex="1"
        aria-label={["Sound volume"]}
        min={AUDIO_VOLUME_MIN}
        max={AUDIO_VOLUME_MAX}
        step={AUDIO_VOLUME_STEP}
        value={[settings.volume]}
        disabled={!settings.enabled}
        onValueChange={onValueChange}
      >
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.Root>
      <Text
        fontSize="xs"
        color="accent.secondary.solid.bg"
        minW="8"
        textAlign="right"
      >
        {Math.round(settings.volume * 100)}%
      </Text>
    </Flex>
  </Box>
);
