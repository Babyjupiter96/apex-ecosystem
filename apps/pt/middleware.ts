import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { resolveTenant, injectTenantHeaders } from '@apex/auth/middleware'

const isPublicRoute = createRouteMatcher([
  '/',
  '/programs(.*)',
  '/about(.*)',
  '/results(.*)',
  '/blog(.*)',
  '/book(.*)',
  '/funnels(.*)',
  '/api/leads(.*)',
  '/api/webhooks(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const tenant = resolveTenant(req)
  if (!tenant) return NextResponse.next()

  if (!isPublicRoute(req)) {
    await auth.protect()
  }

  return injectTenantHeaders(req, tenant)
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
}
