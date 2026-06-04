// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // enable class‑based dark mode toggle
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm, comforting palette (soft teal & amber)
        primary: {
          50: '#f0fdfa', // very light teal
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eedda',
          400: '#2de2cf',
          500: '#00d8c4', // main accent
          600: '#00b9a8',
          700: '#009c8d',
          800: '#007e71',
          900: '#005e53',
        },
        warm: {
          50: '#fff8e1',
          100: '#ffecb3',
          200: '#ffe082',
          300: '#ffd54f',
          400: '#ffca28',
          500: '#ffc107', // amber accent
          600: '#ffb300',
          700: '#ffa000',
          800: '#ff8f00',
          900: '#ff6f00',
        },
        // Glass‑morphism background utility (translucent white)
        glass: 'rgba(255, 255, 255, 0.15)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [],
};
