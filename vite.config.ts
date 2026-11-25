import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages serves this project from /Netaji-Defence-Academy/.
// Keep the root path for local development and other hosting providers.
const publicBase = (process.env.PUBLIC_BASE || '/').replace(/\/?$/, '/');

export default defineConfig({
  base: publicBase,
  plugins: [react(), tailwindcss()],
});
