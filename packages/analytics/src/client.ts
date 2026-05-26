'use client'
import posthog from 'posthog-js'
import type { AnalyticsEventName } from '@apex/types'

let initialized = false

export function initAnalytics(tenantSlug: string) {
  if (initialized || typeof window === 'undefined') return
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com',
    capture_pageview: false, // We handle this manually
    capture_pageleave: true,
    persistence: 'localStorage+cookie',
    bootstrap: {
      distinctID: posthog.get_distinct_id(),
    },
  })

  // Tag every event with tenant for segmentation
  posthog.register({ tenant: tenantSlug })
  initialized = true
}

export function trackEvent(
  name: AnalyticsEventName,
  properties?: Record<string, unknown>,
) {
  if (typeof window === 'undefined') return
  posthog.capture(name, properties)
}

export function trackPageView(url: string) {
  if (typeof window === 'undefined') return
  posthog.capture('$pageview', { $current_url: url })
}

export function identifyUser(userId: string, traits?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  posthog.identify(userId, traits)
}

export function resetUser() {
  if (typeof window === 'undefined') return
  posthog.reset()
}

export { posthog }
