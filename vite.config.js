import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
    watch: {
      ignored: ['**/public/assets/**', '**/*.MOV', '**/*.mov', '**/*.mp4', '**/*.png', '**/*.jpg'],
    },
  },
});
