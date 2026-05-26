import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { resolveTenant, injectTenantHeaders } from '@apex/auth/middleware'

const isPublicRoute = createRouteMatcher([
  '/',
  '/about(.*)',
  '/services(.*)',
  '/work(.*)',
  '/blog(.*)',
  '/pricing(.*)',
  '/contact(.*)',
  '/funnels(.*)',
  '/api/leads(.*)',
  '/api/webhooks(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // 1. Resolve tenant from domain
  const tenant = resolveTenant(req)
  if (!tenant) {
    return NextResponse.redirect('https://studioapex.com')
  }

  // 2. Protect authenticated routes
  if (!isPublicRoute(req)) {
    await auth.protect()
  }

  // 3. Inject tenant context headers
  return injectTenantHeaders(req, tenant)
})

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}
