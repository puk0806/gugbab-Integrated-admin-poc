import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/components/**/*.{ts,tsx}'],
    splitting: true,
    format: ['esm'],
    clean: true,
    minify: true,
    bundle: true,
    dts: {
      entry: ['src/components/index.ts'],
    },
    target: 'es2015',
    outDir: 'dist',
    banner: {
      js: `'use client';`,
    },
    external: ['react', 'react-dom'],
    tsconfig: './tsconfig.json',
  },
]);
