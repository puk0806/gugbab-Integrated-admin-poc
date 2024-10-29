import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin(), tsconfigPaths(), dts({ insertTypesEntry: true })],
  build: {
    outDir: './dist',
    lib: {
      entry: './src/index.ts',
      name: 'ui',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        assetFileNames: assetInfo => {
          if (assetInfo.name === 'style.css') {
            return 'index.css';
          }
          return assetInfo.name as string;
        },
      },
    },
  },
});
