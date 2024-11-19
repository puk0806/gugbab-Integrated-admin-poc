import { defineConfig } from 'tsup';

export default defineConfig({
  splitting: true,
  loader: {
    '.png': 'copy',
    '.gif': 'copy',
    '.svg': 'copy',
    '.jpg': 'copy',
  },
  sourcemap: true, // source map is only available in prod
  clean: true, // rimraf disr
  dts: {
    entry: './src/index.ts',
  },
  format: ['esm'], // generate cjs and esm files
  minify: true,
  bundle: false,
  target: 'es2015',
  outDir: 'dist',
  entry: ['src/**/*.ts'],
});
