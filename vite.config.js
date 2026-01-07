import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  // Carga variables del .env según el modo (dev / prod)
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue()],
    base: '/', // fallback seguro
  }
})