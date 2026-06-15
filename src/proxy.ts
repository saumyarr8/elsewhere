import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(req: NextRequest) {
  const session = await auth()
  const { pathname } = req.nextUrl
  const isAdminRoute = pathname.startsWith('/admin')
  const isApiSign = pathname.startsWith('/api/cloudinary/sign')

  if ((isAdminRoute || isApiSign) && !session) {
    const loginUrl = new URL('/auth/login', req.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/cloudinary/sign'],
}
