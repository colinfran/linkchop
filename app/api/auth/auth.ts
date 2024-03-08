import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcrypt-ts"
import { getUser } from "app/db"
import { authConfig } from "@/app/api/auth/auth.config"

/**
 * Auth module for user authentication using NextAuth.
 * Provides authentication handlers, sign-in, and sign-out functionality.
 * @module Auth
 */

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // Authorization function for credentials provider.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async authorize(credentials): Promise<any> {
        const { email, password } = credentials
        const user = await getUser(email as string)
        // Check if user exists and compare passwords.
        if (user.length === 0) return null
        const passwordsMatch = await compare(password as string, user[0].password!)
        if (passwordsMatch) return user[0]
        return null
      },
    }),
  ],
  callbacks: {
    // Session callback to update user session data.
    session: ({ session, token }) => {
      session.user = { ...session.user, ...token }
      return session
    },
    // JWT callback to format JWT token data.
    jwt: ({ token, user }) => {
      let newVal = token
      if (user) {
        newVal = {
          data: user,
          exp: token.exp,
          iat: token.iat,
          jti: token.jti,
          sub: token.sub,
        }
      }
      return newVal
    },
  },
})
