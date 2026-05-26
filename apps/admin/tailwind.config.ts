import type { Config } from 'tailwindcss'
import { agencyTailwindConfig } from '@apex/config/tailwind/agency'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  theme: { ...agencyTailwindConfig.theme, extend: { ...agencyTailwindConfig.theme?.extend } },
  plugins: [],
}
export default config
