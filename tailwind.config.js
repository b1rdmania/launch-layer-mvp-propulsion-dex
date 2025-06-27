/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        accent: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        background: {
          primary: '#0a0b1e',
          secondary: '#0f172a',
          tertiary: '#1e293b',
        },
        glass: {
          light: 'rgba(37, 99, 235, 0.1)',
          medium: 'rgba(37, 99, 235, 0.2)',
          dark: 'rgba(37, 99, 235, 0.3)',
        },
        launchlayer: {
          background: '#0D1117', // Solid dark background
          surface: {
            DEFAULT: '#161B22', // Dark surface
            light: '#21262D' // Lighter surface
          },
          text: {
            primary: '#F9F9F9', // White text
            secondary: '#A8B3C1' // Lighter secondary text for better readability
          },
          accent: '#3277F5', // Blue accent per the guide
          secondary: '#6D5EB3', // Purple as secondary accent
          blue: '#3277F5', // Blue for highlights - same as accent
          mint: '#63CEC6', // Mint color for tags and icons (updated as per design doc)
          violet: '#A78BFA', // New violet color for accents
          error: '#FF6D3B', // Keeping error color
          success: '#2ECC71', // Keeping success color
          "field-bg": '#181A25' // Background for field containers
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        'gradient-blue': 'linear-gradient(135deg, #2563eb, #3b82f6)',
        'gradient-blue-light': 'linear-gradient(135deg, #3b82f6, #60a5fa)',
        'gradient-card': 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(59, 130, 246, 0.05))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'pulse-blue': 'pulse-blue 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-out': 'fadeOut 0.3s ease-out',
        'shimmer': 'shimmer 1.5s infinite linear',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'pulse-violet': 'pulse-violet 4s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 15s ease infinite',
      },
      keyframes: {
        'fadeIn': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fadeOut': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(10px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-468px 0' },
          '100%': { backgroundPosition: '468px 0' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', boxShadow: '0 0 5px rgba(50, 119, 245, 0.3)' },
          '50%': { opacity: '1', boxShadow: '0 0 15px rgba(50, 119, 245, 0.6)' }
        },
        'pulse-violet': {
          '0%, 100%': { opacity: '0.6', boxShadow: '0 0 5px rgba(167, 139, 250, 0.3)' },
          '50%': { opacity: '1', boxShadow: '0 0 15px rgba(167, 139, 250, 0.6)' }
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        }
      },
      boxShadow: {
        'neon': '0 0 20px rgba(37, 99, 235, 0.3)',
        'neon-strong': '0 0 30px rgba(37, 99, 235, 0.5)',
        'blue': '0 10px 25px rgba(37, 99, 235, 0.4)',
        'glass': '0 8px 32px rgba(37, 99, 235, 0.15)',
        'card': '0px 2px 8px rgba(0, 0, 0, 0.15)',
        'button': '0px 2px 8px rgba(50, 119, 245, 0.15)',
        'violet': '0px 2px 8px rgba(167, 139, 250, 0.15)'
      },
      borderColor: {
        'glass': 'rgba(37, 99, 235, 0.2)',
        'glass-strong': 'rgba(37, 99, 235, 0.3)',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        satoshi: ['Satoshi', 'sans-serif']
      },
      letterSpacing: {
        'wider': '0.2px'
      },
      lineHeight: {
        'relaxed': '1.6',
      }
    },
  },
  plugins: [],
} 