// Rate limiting via Upstash Redis (edge-compatible)
// Falls back gracefully if UPSTASH_* env vars are not set (local dev)

export type RateLimitResult = {
  success: boolean
  remaining: number
  reset: number
  limit: number
}

let _ratelimit: unknown

async function getRatelimit() {
  if (_ratelimit) return _ratelimit as Awaited<ReturnType<typeof createRatelimit>>

  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null
  }

  _ratelimit = await createRatelimit()
  return _ratelimit as Awaited<ReturnType<typeof createRatelimit>>
}

async function createRatelimit() {
  const { Ratelimit } = await import('@upstash/ratelimit')
  const { Redis } = await import('@upstash/redis')

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  })

  return {
    api: new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(60, '1 m'), prefix: 'rl:api' }),
    formSubmit: new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5, '10 m'), prefix: 'rl:form' }),
    auth: new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(10, '15 m'), prefix: 'rl:auth' }),
    aiChat: new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(20, '1 h'), prefix: 'rl:ai' }),
  }
}

type LimiterKey = 'api' | 'formSubmit' | 'auth' | 'aiChat'

export async function checkRateLimit(
  limiter: LimiterKey,
  identifier: string,
): Promise<RateLimitResult> {
  const rl = await getRatelimit()

  // Dev fallback — always allow
  if (!rl) {
    return { success: true, remaining: 999, reset: Date.now() + 60000, limit: 999 }
  }

  const result = await (rl as Record<LimiterKey, { limit: (id: string) => Promise<RateLimitResult> }>)[limiter].limit(identifier)
  return result
}
