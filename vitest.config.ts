import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/vitest.setup.ts",

    include: [
      "src/**/*.test.{ts,tsx}", // Unit tests
      "src/__tests__/**/*.test.{ts,tsx}", // Integration tests
    ],
  },
});
