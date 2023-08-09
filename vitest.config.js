import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    // 提供全局 API
    globals: true,
    coverage: {
      reporter: ["json", "html"],
      // 设置代码覆盖率阈值
      lines: 75,
      functions: 75,
      branches: 75,
      statements: 75,
      open: true,
    },
    include: ["tests/**/*.test.js"],
  },
  resolve: {
    alias: {
      "@utils": path.resolve(__dirname, "./utils"),
    },
  },
});
