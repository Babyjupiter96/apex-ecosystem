import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export const ptTailwindConfig: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#111827',
          steel: '#1F2937',
          border: '#374151',
          muted: '#6B7280',
          white: '#F9FAFB',
          cyan: '#22D3EE',
          'cyan-dark': '#0891B2',
          'cyan-light': '#67E8F9',
          red: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        display: ['Barlow Condensed', 'Impact', 'sans-serif'],
        mono: ['Space Mono', ...fontFamily.mono],
      },
      backgroundImage: {
        'gradient-cyan': 'linear-gradient(135deg, #22D3EE 0%, #0891B2 100%)',
        'gradient-dark': 'linear-gradient(180deg, #111827 0%, #0F172A 100%)',
      },
      boxShadow: {
        cyan: '0 0 30px rgba(34, 211, 238, 0.2)',
        'cyan-lg': '0 0 60px rgba(34, 211, 238, 0.3)',
      },
      keyframes: {
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.5s ease-out forwards',
      },
    },
  },
}
