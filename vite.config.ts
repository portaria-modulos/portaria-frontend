import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      // Essa opção ajuda o PWA a registrar mesmo em ambientes de teste
      devOptions: {
        enabled: true,
        type: 'module'
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        cleanupOutdatedCaches: true,
      },
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png', 'ptcontroleBanner.png'],
      manifest: {
        name: 'Portaria CD',
        short_name: 'Portaria',
        description: 'Sistema de Portaria Rodando PWA',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#26a69a',
        icons: [
          {
            src: 'ptcontroleBanner.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'ptcontroleBanner.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material']
        }
      }
    }
  },
  server: {
    host: true,
    port: 5173, // Alterado para porta 80
    strictPort: true, // Força a usar a 80 ou dar erro se estiver ocupada
  },
  preview: {
    host: true,
    port: 80 // Preview também na 80
  }
})