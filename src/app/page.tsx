import { TypingTest } from "@/components/features/TypingTest/TypingTest";
import { Layout } from "@/components/shared/Layout/Layout";

export default function Home() {
  return (
    <Layout pt="6" gap="2.5">
      <TypingTest />
    </Layout>
  );
}
