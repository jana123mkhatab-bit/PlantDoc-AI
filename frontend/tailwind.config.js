/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        botanic: {
          50: '#f2f7f3',
          100: '#e1ede3',
          200: '#c5ddca',
          300: '#9bc4a3',
          400: '#6ea678',
          500: '#4c8a57',
          600: '#3a6f43',
          700: '#2f5837',
          800: '#28462e',
          900: '#223a27',
          950: '#0e1f12',
        },
        forest: {
          850: '#141e17',
          900: '#0f1712',
          950: '#080d0a',
        },
        sage: {
          50: '#f6f7f5',
          100: '#ebeee9',
          200: '#d7ded4',
          300: '#b9c6b4',
          400: '#96aa8f',
          500: '#778d6f',
        },
        earth: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'scan-line': 'scan 2.4s ease-in-out infinite alternate',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.35s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(98%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
