/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ── 5가지 팔레트 — CSS 변수로 런타임 전환 ──────────────
        brand: {
          50:  'var(--brand-50)',
          100: 'var(--brand-100)',
          200: 'var(--brand-200)',
          300: 'var(--brand-300)',
          400: 'var(--brand-400)',
          500: 'var(--brand-500)',
          600: 'var(--brand-600)',
          700: 'var(--brand-700)',
          800: 'var(--brand-800)',
          900: 'var(--brand-900)',
          950: 'var(--brand-950)',
        },
        'sky-ai':  'var(--sky-ai)',
        'gold-ai': 'var(--gold-ai)',
        dark: {
          DEFAULT: 'var(--dark-bg)',
          surface: 'var(--dark-surface)',
          card:    'var(--dark-card)',
          border:  'var(--dark-border)',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        container: '1600px',
      },
    },
  },
  plugins: [],
}
