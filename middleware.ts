import NextAuth from 'next-auth';
import { authConfig } from '@/app/auth/auth.config';
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export default NextAuth(authConfig).auth;


export const middleware = (req: NextRequest) => {
  const url = req.nextUrl
  const { pathname } = url
  if (pathname.startsWith(`/api/`)) {
    if (!req.headers.get("referer")?.includes(process.env.APP_URL as string)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  }
  return NextResponse.next()
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    '/home', '/settings/:path*',
    '/((?!api|_next/static|_next/image|.*\\.png$).*)'
  ],
};
