import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['calculator.test.js'],
    environment: 'node',
  },
});
