import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
                            VitePWA({
                              registerType: 'autoUpdate',
                              includeAssets: ['favicon.ico'],
                              manifest: {
                                name: 'Project Paw',
                                short_name: 'Paw',
                                description: 'App dedicata agli amici a quattro zampe',
                                theme_color: '#42b983',
                                icons: [
                                  {
                                    src: 'pwa-192x192.png',
                                    sizes: '192x192',
                                    type: 'image/png'
                                  },
                                  {
                                    src: 'pwa-512x512.png',
                                    sizes: '512x512',
                                    type: 'image/png'
                                  }
                                ]
                              }
                            })
  ]
})
