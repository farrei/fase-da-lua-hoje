/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          black: '#050505',
          dark: '#0a0a0a',
          card: '#111111',
          border: '#1a1a1a',
        },
        neon: {
          green: '#43ff64',
          glow: '#43ff6480',
          soft: '#43ff6433',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Orbitron', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 20px #43ff6480, 0 0 40px #43ff6440',
        'neon-sm': '0 0 10px #43ff6480',
        'neon-lg': '0 0 30px #43ff64aa, 0 0 60px #43ff6440',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 15px #43ff6480' },
          '100%': { boxShadow: '0 0 30px #43ff64aa, 0 0 50px #43ff6440' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
