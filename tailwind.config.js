/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ── 5가지 브랜드 컬러 팔레트 ──────────────────────────
        // 1. Deep Navy   #0A1628  (다크 배경/최강조)
        // 2. Royal Blue  #1E3A8A  (브랜드 메인)
        // 3. Cobalt Blue #3B6CF6  (인터랙티브/액센트)
        // 4. Sky Blue    #0EA5E9  (보조 액센트)
        // 5. Amber Gold  #F59E0B  (CTA/포인트)
        brand: {
          50:  '#EEF4FF',
          100: '#DBE8FF',
          200: '#BFCFFE',
          300: '#93AFFD',
          400: '#6089FA',
          500: '#3B6CF6',   // Cobalt Blue
          600: '#2952E8',
          700: '#1F3FD4',
          800: '#1E3A8A',   // Royal Blue
          900: '#1A2E6A',
          950: '#0A1628',   // Deep Navy
        },
        'sky-ai': '#0EA5E9',   // Sky Blue
        'gold-ai': '#F59E0B',  // Amber Gold
        dark: {
          DEFAULT: '#080E1E',
          surface: '#0D1B36',
          card:    '#112040',
          border:  '#1E3A6A',
          text:    '#CBD5E1',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        container: '1400px',
      },
    },
  },
  plugins: [],
}
