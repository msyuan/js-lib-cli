import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.js", "tests/**/*.spec.js"],
    root: fileURLToPath(new URL("./", import.meta.url)),
    // 提供全局 API
    globals: true,
    coverage: {
      reporter: ["json", "html"],
      // 设置代码覆盖率阈值
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
      open: true,
    },
  },
});
