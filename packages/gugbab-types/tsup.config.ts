import { defineConfig } from 'tsup';

export default defineConfig({
  splitting: true,
  sourcemap: true,
  clean: true,
  dts: {
    entry: './src/index.ts',
  },
  format: ['esm'],
  minify: true,
  bundle: false,
  target: 'es2015',
  outDir: 'dist',
  entry: ['src/**/*.ts'],
});
