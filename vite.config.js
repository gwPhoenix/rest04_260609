import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// command === 'build' 일 때만 GitHub Pages 경로 적용 (더 안정적)
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/rest04_260609/' : '/',
}))
