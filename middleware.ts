import NextAuth from 'next-auth';
import { authConfig } from '@/app/api/auth/auth.config';
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    '/home', '/settings/:path*', '/subscribe/:path*',
    '/((?!api|_next/static|_next/image|.*\\.png$).*)'
  ],
};
