import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['dist/**', 'src/index.ts', 'src/server/server.ts', 'vitest.config.ts'],
    },
  },
});
