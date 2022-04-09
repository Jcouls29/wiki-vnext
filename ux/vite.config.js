import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),

    vueI18n({
      compositionOnly: false,
      runtimeOnly: false,
      include: path.resolve(__dirname, './i18n/locales/**')
    }),

    quasar({
      autoImportComponentCase: 'combined',
      sassVariables: 'css/quasar.variables.scss'
    })
  ],
  server: {
    port: 8080,
    proxy: {
      '^/_github/.*': 'http://localhost:11511',
      '/_graphql': 'http://localhost:11511'
    },
    fs: {
      allow: [
        process.cwd()
      ]
    }
    // hmr: {
    //   clientPort: 443
    // }
  },
  optimizeDeps: {
    include: [
      '@codemirror/state',
      '@codemirror/view'
    ]
  }
})
