/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3f4ff',
          100: '#ebe9fe',
          200: '#d9d6fe',
          300: '#bfb6fc',
          400: '#a08df8',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        secondary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        background: {
          primary: '#0a0a0f',
          secondary: '#1e1b4b',
          tertiary: '#312e81',
        },
        glass: {
          light: 'rgba(139, 92, 246, 0.1)',
          medium: 'rgba(139, 92, 246, 0.2)',
          dark: 'rgba(139, 92, 246, 0.3)',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
        'gradient-purple': 'linear-gradient(135deg, #8b5cf6, #a855f7)',
        'gradient-purple-light': 'linear-gradient(135deg, #a855f7, #c084fc)',
        'gradient-card': 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(168, 85, 247, 0.05))',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'pulse-purple': 'pulse-purple 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(139, 92, 246, 0.3)',
        'neon-strong': '0 0 30px rgba(139, 92, 246, 0.5)',
        'purple': '0 10px 25px rgba(139, 92, 246, 0.4)',
        'glass': '0 8px 32px rgba(139, 92, 246, 0.15)',
      },
      borderColor: {
        'glass': 'rgba(139, 92, 246, 0.2)',
        'glass-strong': 'rgba(139, 92, 246, 0.3)',
      }
    },
  },
  plugins: [],
} 