import { Button } from "@/components/core/Button/Button";
import { Heading } from "@/components/core/Heading/Heading";
import { Icon } from "@/components/core/Icon/Icon";
import { LucideIcon } from "@/components/core/LucideIcon/LucideIcon";
import { Layout } from "@/components/shared/Layout/Layout";

export default function Home() {
  return (
    <Layout pt="6" gap="2.5">
      <Heading as="h1">Hello Typecraft</Heading>
      <Button>
        Learn More
        <Icon>
          <LucideIcon name="Keyboard" />
        </Icon>
      </Button>
    </Layout>
  );
}
