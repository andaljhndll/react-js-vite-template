/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  // Uncomment if you want your application to run on a custom port
  // server: {port: },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
  resolve: {
    alias: {
      "@customTypes/*": path.resolve(__dirname, "./src/types"),
      "@configs/*": path.resolve(__dirname, "./src/configs"),
    },
  },
});
