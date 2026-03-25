import { defineConfig } from 'vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: path.resolve(dirname, 'src/tokens-entry.css'),
      output: {
        dir: 'dist',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) return 'tokens.css';
          return '[name]-[hash][extname]';
        },
      },
    },
  },
});
