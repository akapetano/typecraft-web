import { Box } from "styled-system/jsx";
import { Button } from "@/components/core/Button/Button";
import { Layout } from "@/components/shared/Layout/Layout";

export default function Home() {
  return (
    <Layout className="page">
      <Box bgColor="error" w="full">
        <h1>Hello World</h1>
        <Button>Click me</Button>
      </Box>
    </Layout>
  );
}
