import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export const agencyTailwindConfig: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#F8F7F5',      // warm off-white — main background
          graphite: '#EDEDEB',   // light gray — secondary section bg
          border: '#DDDBD6',     // light warm border
          muted: '#888888',      // mid gray — secondary text
          offwhite: '#111111',   // near-black — primary text / headlines
          gold: '#111111',       // black — accent (replaces gold)
          'gold-light': '#444444', // dark gray — hover states
          'gold-dark': '#000000',  // pure black
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
        'gradient-gold': 'linear-gradient(135deg, #111111 0%, #444444 50%, #111111 100%)',
      },
      boxShadow: {
        gold: '0 4px 24px rgba(0, 0, 0, 0.08)',
        'gold-lg': '0 8px 48px rgba(0, 0, 0, 0.12)',
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
