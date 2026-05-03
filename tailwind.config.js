/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0A0E1A', 2: '#0F1421', 3: '#1A2030' },
        bone: { DEFAULT: '#F1F5F9', 2: '#94A3B8', 3: '#64748B' },
        ru: '#14B8A6',
        cis: '#F59E0B',
        edge: { soft: '#1F2937', mid: '#334155' },
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
