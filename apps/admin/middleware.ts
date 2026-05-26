import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import type { NextRequest } from 'next/server'

// All admin routes are protected — only super admin / tenant admin
const isPublicRoute = createRouteMatcher(['/sign-in(.*)'])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
