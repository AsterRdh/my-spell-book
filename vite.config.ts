import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),svgr(),],
//根网页路径是SpellBook
  base: '/SpellBook/',
  assetsInclude: ['**/*.ttf', '**/*.woff', '**/*.woff2', '**/*.eot','**/*.svg'],
  server: {
    proxy: {
      '/SpellBook/dnd': {
        target: 'https://cyberaster.space/SpellBook/dnd/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/SpellBook\/dnd/, ''),
      },
    },
  },
})
