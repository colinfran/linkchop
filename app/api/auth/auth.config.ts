import { NextAuthConfig } from "next-auth"

const privateRoutes = [
  "/home",
  "/settings",
  "/settings/profile",
  "/settings/subscription",
  "/settings/display",
  "/settings/security",
  "/subscribe",
  "/subscribe/cancel",
  "/subscribe/return",
]

export const authConfig = {
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user
      const { nextUrl } = request
      const isBanned = Boolean(auth?.user?.data?.is_banned)

      const isPrivateRoute =
        nextUrl.pathname === "/home" ||
        nextUrl.pathname.startsWith("/settings") ||
        nextUrl.pathname.startsWith("/subscribe")

      // banned users can only access /home to see the account restriction notice
      if (isLoggedIn && isBanned && isPrivateRoute && nextUrl.pathname !== "/home") {
        return Response.redirect(new URL("/home", nextUrl))
      }

      // prevent user from going to root route or auth route if logged in
      if (isLoggedIn && (nextUrl.pathname === "/" || nextUrl.pathname === "/auth")) {
        return Response.redirect(new URL("/home", nextUrl))
      }
      // allow user to go to all other routes if logged in
      if (isLoggedIn) return true
      // if user is not logged in, do not allow them access to private routes
      if (!isLoggedIn && privateRoutes.includes(nextUrl.pathname)) {
        return Response.redirect(new URL("/auth", nextUrl))
      }
      return true
    },
  },
} satisfies NextAuthConfig
