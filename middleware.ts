import NextAuth from 'next-auth';
import { authConfig } from '@/app/api/auth/auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // Only the routes where authConfig.authorized() can redirect. Everything else
  // (short links via /:url_id, static files, bot probes) skips middleware, since
  // each run is a billed Edge Middleware invocation.
  matcher: ['/', '/auth', '/home', '/settings/:path*', '/subscribe/:path*'],
};
