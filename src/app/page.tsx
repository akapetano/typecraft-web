import { Button } from "@/components/core/Button/Button";
import { Layout } from "@/components/shared/Layout/Layout";
import { Box } from "styled-system/jsx";

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
