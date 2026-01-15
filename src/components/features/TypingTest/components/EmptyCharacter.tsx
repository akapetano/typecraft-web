import {
  Character,
  type CharacterProps,
} from "@/components/features/TypingTest/components/Character";

export interface EmptyCharacterProps extends Omit<CharacterProps, "char"> {}

export function EmptyCharacter(props: EmptyCharacterProps) {
  return <Character char=" " {...props} />;
}
