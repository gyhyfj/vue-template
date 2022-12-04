import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import icons from 'unplugin-icons/vite'
import iconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    autoImport({
      imports: ['vue', '@vueuse/core', 'pinia', 'vue-router'],
      dirs: ['./composables/**', './directives/**'],
      vueTemplate: true,
      vueDirectives: {
        isDirective(normalizeImportFrom, _importEntry) {
          return normalizeImportFrom.includes('/directives/')
        },
      },
      dts: './src/types/auto-imports.d.ts',
    }),
    icons({
      compiler: 'vue3',
      autoInstall: true,
      customCollections: {
        custom: FileSystemIconLoader('src/assets/icon'),
      },
    }),
    components({
      dts: './src/types/auto-components.d.ts',
      resolvers: [
        iconsResolver({
          prefix: 'icon',
          customCollections: ['custom'],
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  envDir: 'env',
})
