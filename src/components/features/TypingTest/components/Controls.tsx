import { Flex } from "styled-system/jsx";
import { Button } from "@/components/core/Button/Button";
import { Icon } from "@/components/core/Icon/Icon";
import { LucideIcon } from "@/components/core/LucideIcon/LucideIcon";

interface ControlsProps {
  initializeTest: () => void;
}

export function Controls({ initializeTest }: ControlsProps) {
  return (
    <Flex justifyContent="center">
      <Button
        onClick={initializeTest}
        variant="outline"
        size="lg"
        className="gap-2 bg-transparent"
      >
        <Icon h="4" w="4">
          <LucideIcon name="RotateCcw" />
        </Icon>
        Restart Test
      </Button>
    </Flex>
  );
}
