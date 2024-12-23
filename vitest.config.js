import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/__tests__/setupTests.ts"],
  },
  resolve: {
    alias: {
      // root
      "~/": new URL("./src/", import.meta.url).pathname,
      // components
      "@components/": new URL("./src/app/_components/", import.meta.url)
        .pathname,
      // design system
      "@designsystem/": new URL(
        "./src/app/_components/design-system/",
        import.meta.url,
      ).pathname,
    },
  },
});
