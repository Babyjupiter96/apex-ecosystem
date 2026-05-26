'use client'
export { useReducedMotion } from 'framer-motion'

import { useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { fadeUp, reducedFadeUp, staggerContainer } from '../animations'

export function useSafeAnimation(full: Variants, reduced: Variants): Variants {
  const prefersReduced = useReducedMotion()
  return prefersReduced ? reduced : full
}

export function useFadeUp() {
  const prefersReduced = useReducedMotion()
  return prefersReduced ? reducedFadeUp : fadeUp
}

export function useStagger() {
  const prefersReduced = useReducedMotion()
  return prefersReduced ? {} : staggerContainer
}
