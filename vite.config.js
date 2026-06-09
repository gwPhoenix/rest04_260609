import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 로컬 개발은 '/', GitHub Pages 배포 시에만 저장소명 경로 적용
  base: process.env.NODE_ENV === 'production' ? '/rest04_260609/' : '/',
})
