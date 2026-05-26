import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { resolveTenant, injectTenantHeaders } from '@apex/auth/middleware'

const CLERK_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export async function middleware(req: NextRequest) {
  const tenant = resolveTenant(req)

  if (!CLERK_KEY) {
    if (!tenant) return NextResponse.next()
    return injectTenantHeaders(req, tenant)
  }

  const { clerkMiddleware, createRouteMatcher } = await import('@clerk/nextjs/server')
  const isPublicRoute = createRouteMatcher([
    '/', '/about(.*)', '/services(.*)', '/work(.*)', '/blog(.*)',
    '/pricing(.*)', '/contact(.*)', '/funnels(.*)',
    '/api/leads(.*)', '/api/webhooks(.*)', '/sign-in(.*)', '/sign-up(.*)',
  ])

  const handler = clerkMiddleware(async (auth, request: NextRequest) => {
    const t = resolveTenant(request)
    if (!t) return NextResponse.redirect(new URL('/', request.url))
    if (!isPublicRoute(request)) await auth.protect()
    return injectTenantHeaders(request, t)
  })

  return handler(req, {} as any)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
}
