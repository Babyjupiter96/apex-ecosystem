import type { Config } from 'tailwindcss'
import { ptTailwindConfig } from '@apex/config/tailwind/pt'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    ...ptTailwindConfig.theme,
    extend: {
      ...ptTailwindConfig.theme?.extend,
    },
  },
  plugins: [],
}

export default config
