import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export const agencyTailwindConfig: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#0A0A0A',
          graphite: '#1A1A1A',
          border: '#2A2A2A',
          muted: '#888888',
          offwhite: '#F5F0E8',
          gold: '#C9A84C',
          'gold-light': '#E8D078',
          'gold-dark': '#8B6914',
        },
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        display: ['Freight Display Pro', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', ...fontFamily.mono],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
      },
      backgroundImage: {
        noise: "url('/textures/noise.png')",
        'gradient-gold': 'linear-gradient(135deg, #C9A84C 0%, #E8D078 50%, #C9A84C 100%)',
      },
      boxShadow: {
        gold: '0 0 30px rgba(201, 168, 76, 0.2)',
        'gold-lg': '0 0 60px rgba(201, 168, 76, 0.3)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'count-up': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'fade-up': 'fade-up 0.6s ease-out forwards',
      },
    },
  },
}
