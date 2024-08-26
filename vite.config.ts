import { defineConfig } from 'vite';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,jpg,png,svg,pdf,webmanifest}'],
      },
      includeAssets: ['**/*.{js,css,html,ico,jpg,png,svg,pdf,webmanifest}'],
      manifest: {
        background_color: '#f0f0f0',
        description: 'My portfolio where I share all my experiences with you.',
        dir: 'ltr',
        display: 'standalone',
        id: '/',
        name: 'LEO',
        orientation: 'portrait',
        scope: '/',
        short_name: 'LEO',
        start_url: '/',
        theme_color: '#f0f0f0',
        categories: ['portfolio', 'experiences', 'blog', 'software', 'development'],
        shortcuts: [],
        lang: 'en',
      },
    }),
    TanStackRouterVite(),
    {
      name: 'markdown-loader',
      transform(code, id) {
        if (id.slice(-3) === '.md') {
          // For .md files, get the raw content
          return `export default ${JSON.stringify(code)};`;
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@services': path.resolve(__dirname, './src/services'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@': path.resolve(__dirname, './src'),
    },
  },
});
