import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync } from 'fs';
import { resolve } from 'path';

/** GitHub Pages SPA fallback: serve index.html for unknown paths via 404.html */
function spaFallback() {
  return {
    name: 'spa-github-pages-fallback',
    closeBundle() {
      const index = resolve(__dirname, 'dist/index.html');
      const fallback = resolve(__dirname, 'dist/404.html');
      if (existsSync(index)) {
        copyFileSync(index, fallback);
      }
    },
  };
}

export default defineConfig({
  base: '/',
  plugins: [react(), spaFallback()],
});
