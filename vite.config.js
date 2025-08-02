import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    react(),
    eslint({
      overrideConfig: {
        extends: ['eslint-config-react-app'], // 使用 React 官方规则
      },
    }),
  ],
  server: {
    allowedHosts: ['localhost', 'transition-ln-speaker-certain.trycloudflare.com'],
  },
});
