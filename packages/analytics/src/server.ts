import { PostHog } from 'posthog-node'
import type { AnalyticsEventName } from '@apex/types'

let _client: PostHog | null = null

function getClient(): PostHog | null {
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return null

  if (!_client) {
    _client = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com',
      flushAt: 20,
      flushInterval: 10000,
    })
  }
  return _client
}

export function trackServerEvent(
  distinctId: string,
  name: AnalyticsEventName,
  properties?: Record<string, unknown>,
) {
  const client = getClient()
  if (!client) return
  client.capture({ distinctId, event: name, properties })
}

export async function shutdownAnalytics() {
  const client = getClient()
  if (client) await client.shutdown()
}
