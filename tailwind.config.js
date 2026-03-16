/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0A0710',
          card: '#0d1117',
          green: '#4ADE80',
          purple: '#9333EA',
          cyan: '#06B6D4',
          orange: '#f47215',
          blue: '#58a6ff',
          pink: '#EC4899',
          amber: '#f59e0b',
          muted: '#8b949e',
          text: '#e6edf3',
          subtle: '#9ca3af',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(74, 222, 128, 0.15)',
      },
    },
  },
  plugins: [],
}
